#!/bin/sh

# Wait for the database to be ready
while ! nc -z $DB_HOST 3306; do
    sleep 1
done

# Create the database if it doesn't exist
echo "CREATE DATABASE IF NOT EXISTS $DB_DATABASE" | mysql -h $DB_HOST -u $DB_USERNAME -p$DB_PASSWORD

# Run migrations
php artisan migrate

# Start the Laravel application
php artisan serve --host=0.0.0.0 --port=8000
