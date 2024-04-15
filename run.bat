@echo off
echo Iniciando servicio del backend

cd backend

run.bat

cd ..

echo Iniciando servicio del frontend

cd frontend

docker-compose up -d frontend
