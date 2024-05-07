#!/bin/bash

echo '


            __  __     __     __    __     ______    
           /\ \_\ \   /\ \   /\ "-./  \   /\  ___\   
           \ \  __ \  \ \ \  \ \ \-./\ \  \ \___  \  
            \ \_\ \_\  \ \_\  \ \_\ \ \_\  \/\_____\ 
             \/_/\/_/   \/_/   \/_/  \/_/   \/_____/
             
                          By Himmelforce


'

echo "[GLOBAL] Enter environment (dev/prod):"
read ENVIRONMENT

echo "[GLOBAL] Enter project-name (example: localhost/Himmelforce/Himmel-force):"
read PROJECT_NAME

echo  "[GLOBAL] Enter security-mode (example: insecure/secure):"
read SECURITY_MODE

echo "[API] Enter user-secret-key (example: 560048952817caee2be121a5070201a0):"
read SECRET_KEY_USER

echo "[API] Enter admin-user-secret-key (example: 560148955817caee2be1d1a5070201aw):"
read SECRET_KEY

echo "[ADMIN] Enter admin-username (example: root):"
read INIT_ADMIN_USERNAME

echo "[ADMIN] Enter admin-password (example: oYeY26!nz19oYu@Q4oyb%rV):"
read INIT_ADMIN_PASSWORD


echo "[DATABASE] Enter mongo root password (example: oYeY26!nz19oYu@Q4oyb%rV):"
read MONGO_PASSWORD

echo "[DATABASE] Enter redis root password (example: oYeY26!nz19oYu@Q4oyb%rV):"
read REDIS_PASSWORD

echo "[SMTP] Enter smtp-service (example: Gmail):"
read SMTP_SERVICE

echo "[SMTP] Enter smtp-host (example: smtp.gmail.com):"
read SMTP_HOST

echo "[SMTP] Enter smtp-email (example :examle@examle.com):"
read SMTP_EMAIL

echo "[SMTP] Enter smtp-app-password (example: acbd efgh ijkl mnop):"
read SMTP_PASSWORD

echo "[NETWORK] Enter host (example: localhost, himmelforce.com):"
read HOST

if [ -e ./.env.data ]; then
    read -p "The .env.data file already exists. Do you want to overwrite it? (Y/N) " choice
    if [ "$choice" == "Y" ] || [ "$choice" == "y" ]; then
        rm ./.env.data
        echo "Old ./.env.data file removed. Creating a new one."
    else
        echo "Operation canceled. No changes made."
        exit 1
    fi
fi
echo "#GLOBALS">> ./.env.data
echo "" >> ./.env.data
echo "PROJECT_NAME=$PROJECT_NAME" >> ./.env.data
echo "ENVIRONMENT=$ENVIRONMENT" >> ./.env.data
echo "REACT_APP_PROJECT_NAME=\${PROJECT_NAME}" >> ./.env.data
echo "SECURITY_MODE=$SECURITY_MODE" >> ./.env.data
echo "" >> ./.env.data

echo "#API">> ./.env.data
echo "" >> ./.env.data
echo "SECRET_KEY_USER=$SECRET_KEY_USER" >> ./.env.data
echo "SECRET_KEY=$SECRET_KEY" >> ./.env.data
echo "" >> ./.env.data

echo "#ADMIN">> ./.env.data
echo "" >> ./.env.data
echo "INIT_ADMIN_USERNAME=$INIT_ADMIN_USERNAME" >> ./.env.data
echo "INIT_ADMIN_PASSWORD=$INIT_ADMIN_PASSWORD" >> ./.env.data
echo "" >> ./.env.data

echo "#DATABASE">> ./.env.data
echo "" >> ./.env.data
echo "MONGO_USERNAME=$MONGO_USERNAME" >> ./.env.data
echo "MONGO_PASSWORD=$MONGO_PASSWORD" >> ./.env.data
echo "MONGO_DATABASE=\${PROJECT_NAME}" >> ./.env.data
echo "REDIS_PASSWORD=$REDIS_PASSWORD" >> ./.env.data
echo "" >> ./.env.data

echo "#SMTP">> ./.env.data
echo "" >> ./.env.data
echo "SMTP_SERVICE=$SMTP_SERVICE" >> ./.env.data
echo "SMTP_HOST=$SMTP_HOST" >> ./.env.data
echo "SMTP_EMAIL=$SMTP_EMAIL" >> ./.env.data
echo "SMTP_PASSWORD=$SMTP_PASSWORD" >> ./.env.data
echo "" >> ./.env.data

echo "#NETWORK">> ./.env.data
echo "HOST=$HOST" >> ./.env.data
echo "" >> ./.env.data

echo ".env.data file created/updated successfully!"
exit 0