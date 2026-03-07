FROM mcr.microsoft.com/playwright:v1.58.2-jammy
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# This ensures the config is found in the current WORKDIR
CMD ["npx", "playwright", "test"]