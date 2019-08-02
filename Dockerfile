# Install node v10
FROM node:10-alpine
# Set the workdir /var/www/myapp
WORKDIR /var/www/myapp

# Copy the package.json to workdir
COPY package*.json ./

# Copy application source
COPY . .
