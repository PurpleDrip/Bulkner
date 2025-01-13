# Use the official Node.js 18 image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
