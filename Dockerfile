# Install node v10
FROM node:10-alpine AS release  
# Set the workdir /var/www/myapp
WORKDIR /var/www/myapp

# Copy the package.json to workdir
COPY package*.json ./

# Run npm install - install the npm dependencies
RUN npm install

# Copy application source
COPY . .


# Start the application
CMD ["npm", "run", "container:start"]