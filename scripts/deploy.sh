#!/bin/bash

# Build the application
npm run build

# Create deployment directory if it doesn't exist
ssh user@your-server "mkdir -p /var/www/parking-locator"

# Copy dist files to server
rsync -avz --delete dist/ user@your-server:/var/www/parking-locator/dist/

# Copy Nginx configuration
scp server/nginx.conf user@your-server:/etc/nginx/sites-available/parking-locator

# Enable site and restart Nginx
ssh user@your-server "ln -sf /etc/nginx/sites-available/parking-locator /etc/nginx/sites-enabled/ && systemctl restart nginx"