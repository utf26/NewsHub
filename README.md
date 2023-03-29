# News Hub Project
News Hub is a web application that provides users with a platform to browse and read news articles from various sources. The project consists of a backend API built with Laravel and a frontend application developed with Vue.js. The backend API is responsible for fetching news articles from various news sources and storing them in a database, while the frontend application provides a user-friendly interface for browsing and reading the news articles.

The project integrates three news APIs, namely The Guardian, News API, and The New York Times. Users can search for news articles by keyword, source, category, and date range. Additionally, users can create an account, save their preferred sources, categories, and authors, and view personalized news articles based on their preferences.

The project is designed to be highly scalable and customizable. It leverages Docker to simplify the deployment process and can easily be deployed to any hosting platform that supports Docker containers.

## Setup Instructions
This document provides instructions for running the News Hub project. News Hub is a web application that allows users to browse and read news articles from various sources. The project consists of a backend API and a frontend application.

### Prerequisites
Before running the project, make sure that you have the following prerequisites installed on your system:

- Docker
- Composer
- Node.js

### Backend Environment
Before running the project, make sure to copy the .env.example file to .env and set the following credentials to use the MySQL database running inside the Docker Compose:

```
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=news_hub_api
DB_USERNAME=root
DB_PASSWORD=example
```

Additionally, you need to update the API keys for the following News sources in the .env file:

```
NEWSAPI_KEY=
GUARDIAN_API_KEY=
NYTIMES_API_KEY=
NYTIMES_SECRET=
```

Make sure to generate the API keys for these sources and add them to the .env file. If you don't have the API keys, you may use the default keys provided in the .env.example file for testing purposes.

### Running the Project
To run the project, ensure that Docker is running. Then, run the following commands in the main directory:

```
docker-compose build # This command builds the necessary containers.
docker-compose up    # This command starts the containers for the frontend, backend, and database.
```

### Installing dependencies
To install the dependencies required for the backend, navigate to the /news-hub-api directory and run the following command:

```
composer install
```
To install the dependencies required for the frontend, navigate to the /news-hub-frontend directory and run the following command:

```
npm install
```

### List of APIs used in the project:

- News API
- The Guardian
- The New York Times

To access the container running the newshub-php image, copy the CONTAINER ID of the newshub-php image from the docker ps command and run the following command in the main directory:

```
docker exec -it <container-id> /bin/bash
```

Replace <container-id> with the actual CONTAINER ID of the newshub-php image. This will open a bash shell inside the container.

### Fetching articles
By default, articles will fetch automatically. If they are not shown, run the following command inside the container:

```
php artisan fetch:articles
```

This command will fetch the latest news articles from the sources specified in the config/services.php file and store them in the database.

### Accessing the application
Once the containers are running, you can access the application by opening a web browser and navigating to http://localhost. This will take you to the News Hub homepage where you can browse and read the news articles.

## Conclusion
Congratulations, you have successfully installed and ran the News Hub project. Now, you can explore the application and customize it according to your requirements.