# earthquake-report-APP

## Descripción del proyecto

Este proyecto es una aplicación desarrollada con Ruby on Rails y React que utiliza el servicio de earthquake.usgs.gov para obtener datos sísmicos. La aplicación realiza esta tarea a través de una tarea programada y guarda los datos en una base de datos.

### Backend

Puedes acceder al backend de la aplicación a través de los siguientes endpoints:

- `GET http://localhost:3000/api/features`: Este endpoint devuelve una lista de características (features). Puedes aplicar filtros opcionales como `per_page`, `page` y `mag_type` (que acepta los valores 'md', 'ml', 'ms', 'me', 'mi', 'mb', 'mlg').

- `POST http://localhost:3000/api/features/:feature_id/comments`: Este endpoint te permite agregar un comentario a una característica específica. Debes proporcionar el ID de la característica en la URL.

¡Eso es todo! Ahora puedes interactuar con la aplicación y explorar los datos sísmicos obtenidos a través del servicio de earthquake.usgs.gov.

### Frontend
Este proyecto fue desarrollado con React que utiliza el servicio de earthquake.usgs.gov para obtener datos sísmicos. El frontend contiene una única vista, la cual se encuentra en la ruta principal '/' (ruta completa: http://localhost:8000). En esta vista, se muestra una tabla con la información de las características (features) de los terremotos obtenidos.

Además, el frontend proporciona la funcionalidad de filtrar los resultados según el tipo de magnitud, la cantidad de artículos por página y la página actual. Estos filtros pueden ser modificados directamente desde el frontend, lo que hará que se realicen solicitudes al backend con los filtros seleccionados.

## Página oficial de información

Puedes obtener más información sobre los datos sísmicos y el servicio de earthquake.usgs.gov visitando su [página oficial](https://earthquake.usgs.gov/).



## Instrucciones de ejecución

1. Asegúrate de tener Docker instalado en tu sistema.

### Ubuntu

2. Abre una terminal y navega hasta la ubicación del proyecto.

3. Ejecuta el siguiente comando para dar permisos de ejecución al archivo run.sh:
  ```bash
  chmod +x run.sh
  ```

4. Ejecuta el archivo run.sh:
  ```bash
  ./run.sh
  ```

### Windows

2. Abre una terminal o símbolo del sistema y navega hasta la ubicación del proyecto.

3. Ejecuta el siguiente comando para ejecutar el archivo run.bat:
  ```bash
  run.bat
  ```

¡Eso es todo! El proyecto debería comenzar a ejecutarse utilizando Docker.

## Requisitos del sistema

- Docker instalado en tu sistema operativo.
