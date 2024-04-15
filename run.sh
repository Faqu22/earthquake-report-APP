#!/bin/bash
echo "Iniciando servicio del backend"

cd backend

bash ./run.sh

cd ..

echo "Iniciando servicio del frontend"

cd frontend

docker-compose up -d frontend