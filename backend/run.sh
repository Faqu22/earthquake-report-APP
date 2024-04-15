#!/bin/bash
echo "Iniciando el contenedor del backend..."

docker-compose up -d mysql

docker-compose up -d web

while [[ "$(docker inspect -f '{{json .State.Running}}' backend_frogmi)" != "true" ]]; do
    echo "Esperando a que el contenedor del backend inicie completamente..."
    sleep 3
done

echo "Iniciando el contenedor de tareas..."

docker-compose up -d cron

echo "¡Todos los contenedores han sido iniciados correctamente!"
