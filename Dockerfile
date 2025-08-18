FROM node:20-alpine AS build

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build


FROM nginx:alpine

# entferne die default nginx statische Seite
RUN rm -rf /usr/share/nginx/html/*

# kopiere das Docusaurus Build-Output ins nginx Webverzeichnis
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
