# Build stage
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20-slim
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./build
EXPOSE 8080
CMD ["serve", "-s", "build", "-l", "8080"]