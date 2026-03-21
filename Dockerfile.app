# Stage 1: Build the Angular application
FROM node:18-dev as build
WORKDIR /app

# Copy the app source from the folder Jenkins created
COPY ./app-source/package*.json ./
RUN npm install

# Copy the rest of the application code
COPY ./app-source/ .

# Build the app for production (this creates the 'dist' folder)
RUN npm run build --configuration=production

# Stage 2: Serve the app using Nginx (Uses ~5MB of RAM)
FROM nginx:alpine

# IMPORTANT: 
# If your project name is NOT 'bondar-app', check the 'dist' folder 
# and update 'bondar-app' below to match your actual project folder name.
COPY --from=build /app/dist/ /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]