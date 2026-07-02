# Stage 1: Build the application
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# We set a placeholder API URL for now; you will change this when deploying to AWS
ENV NEXT_PUBLIC_API_URL=http://localhost:8080 
RUN npm run build

# Stage 2: Run the production application
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npm", "run", "start"]