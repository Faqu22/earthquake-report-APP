@echo off
echo Iniciando servicio

cd backend

run.bat

cd ..

cd frontend

docker-compose up
