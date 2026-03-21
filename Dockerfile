# Stage 1: Build the Angular app
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve with Nginx (Tiny!)
FROM nginx:alpine
COPY --from=build /app/dist/your-app-name /usr/share/nginx/html
EXPOSE 80