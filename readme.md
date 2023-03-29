# Instructions for running News Hub Project

This document provides instructions for running the News Hub project. News Hub is a web application that allows users to browse and read news articles from various sources. The project consists of a backend API and a frontend application.

## Prerequisites

Before running the project, make sure that you have the following prerequisites installed on your system:

### 'Docker'

### 'Composer'

### 'Node.js'

## Installing dependencies

To install the dependencies required for the backend, navigate to the /news-hub-api directory and run the following command:


### 'composer install'

To install the dependencies required for the frontend, navigate to the /news-hub-frontend directory and run the following command:


### 'npm install'

Building and running the project
To build the project using Docker, navigate to the main directory and run the following commands:


### 'docker-compose build'

#### 'docker-compose up'

This will build the Docker images and start the containers. Once the containers are running, you can check the list of running containers by running the following command:


### 'docker ps'

Copy the CONTAINER ID of the newshub-php image and run the following command to access the container running the newshub-php image, copy the CONTAINER ID and run the following command in the main directory:

### 'docker exec -it <container-id> /bin/bash'

Replace <container-id> with the actual CONTAINER ID of the newshub-php image. This will open a bash shell inside the container.

## Fetching articles

To fetch articles, run the following command inside the container:


### 'php artisan fetch:articles'

This command will fetch the latest news articles from the sources specified in the config/news-api.php file and store them in the database.

## Accessing the application

Once the containers are running, you can access the application by opening a web browser and navigating to http://localhost This will take you to the News Hub homepage where you can browse and read the news articles.

## Conclusion

Congratulations, you have successfully installed and ran the News Hub project. Now, you can explore the application and customize it according to your requirements.