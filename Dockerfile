# -------------------------
# Stage 1: Build Stage
# -------------------------
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy dependency files first (layer caching)
COPY package*.json ./
# Install curl for healthcheck
RUN apk add --no-cache curl
# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build production assets
RUN npm run build


# -------------------------
# Stage 2: Runtime Stage
# -------------------------
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config (we'll add next step)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check (used by Docker / monitoring)
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -fsS http://127.0.0.1/health.json || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

