FROM node:20-alpine AS build
WORKDIR /app

# Install Chromium for PDF generation (required by puppeteer)
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Tell Puppeteer to use the installed Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

COPY package.json yarn.lock ./
COPY ./scripts ./scripts
RUN yarn install
COPY . .

# Start dev server in background and generate PDF first
RUN yarn start & \
    sleep 20 && \
    yarn build:pdf && \
    pkill -f "docusaurus start"

# Build the Docusaurus site (this will copy static/ including the PDF to build/)
RUN yarn build

FROM nginx:alpine
RUN apk add --no-cache apache2-utils \
 && htpasswd -bc /etc/nginx/.htpasswd phwt phwt \
 && rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build /usr/share/nginx/html
RUN printf 'server {\n\
    listen 80;\n\
    location / {\n\
        auth_basic "Restricted";\n\
        auth_basic_user_file /etc/nginx/.htpasswd;\n\
        root /usr/share/nginx/html;\n\
        index index.html;\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
