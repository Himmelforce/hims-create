#!/bin/bash

cat .env > .temp.env

echo -e "\t" >> .temp.env

cat .env.data >> .temp.env

docker-compose --env-file .temp.env up -d

rm .temp.env