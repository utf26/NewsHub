FROM node:19-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Build production version
RUN npm run build

# Serve the app using the serve package
RUN npm install -g serve
CMD serve -s build

# Expose the app port
EXPOSE 3000
