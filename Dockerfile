FROM mcr.microsoft.com/playwright:v1.45.0-jammy

WORKDIR /tests
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# We don't use 'up -d' here because we WANT the logs 
# to stream into Jenkins so we can see why a test failed.
CMD ["npx", "playwright", "test"]