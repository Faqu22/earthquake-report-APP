#!/bin/bash
echo "Iniciando servicio"

cd backend

bash ./run.sh

cd ..

cd frontend

docker-compose up