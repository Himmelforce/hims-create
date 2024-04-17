#!/bin/bash
docker-compose down
docker volume prune -f
docker system prune -a -f