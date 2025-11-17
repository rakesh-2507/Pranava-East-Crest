FROM php:8.2-apache

# Enable Apache Rewrite
RUN a2enmod rewrite

# Copy project files to web directory
COPY . /var/www/html/

# Set correct permissions
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
