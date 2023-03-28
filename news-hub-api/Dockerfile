FROM php:8.2-fpm

# Install required PHP extensions
RUN docker-php-ext-install pdo_mysql

# Install netcat and MySQL client for checking database connectivity
RUN apt-get update && apt-get install -y netcat default-mysql-client

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application code
COPY . .

# Install dependencies
RUN composer install --no-dev --prefer-dist --optimize-autoloader

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 8000

RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]
