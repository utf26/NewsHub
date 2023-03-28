# Use an official Node.js runtime as a parent image
FROM node:19-alpine

# Set the working directory
WORKDIR /app

# Copy the app source code
COPY . .

# Install app dependencies
RUN npm install

# Expose the app port
EXPOSE 3000

CMD ["npm", "run", "start"]