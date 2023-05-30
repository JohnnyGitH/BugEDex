# Base image
ARG VARIANT="16-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT} AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Storying node modules on separate layer will prevent unnecessary npm installs at each build
# Install dependencies as well
RUN npm ci --silent

# Copy the project files
COPY . .

# Build the Angular app
RUN npm run build

# Stage 2: Create a lightweight image
FROM nginx:latest

# Copy the built files from the builder stage to the nginx server
COPY --from=builder /app/dist/bugedex /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start the nginx server
CMD ["nginx","-g","daemon off;"]

