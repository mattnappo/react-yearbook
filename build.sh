#!/bin/bash

npm run build
sudo systemctl restart nginx
rm -rf /var/cache/nginx
