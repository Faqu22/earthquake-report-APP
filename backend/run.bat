@echo off
echo Iniciando el contenedor del backend...

docker-compose up -d web

:loop
for /f %%i in ('docker inspect -f "{{.State.Running}}" backend_frogmi') do (
    if "%%i"=="true" (
        goto :next
    )
)
echo Esperando a que el contenedor del backend inicie completamente...
timeout /t 3 /nobreak >nul
goto :loop

:next
echo Iniciando el contenedor de tareas...

docker-compose up -d cron

echo ¡Todos los contenedores del backend han sido iniciados correctamente!
