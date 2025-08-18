FROM node:20-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
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
