# Descripción

## Correr en dev

1. Clonar el repositorio.
2. Crear el ```.env``` en base al archivo ```env.js``` en las carpetas api y front.

# Levantar el backend
3. Instalar las dependencias con ``` npm install ```.
4. Correr las migraciones de Prisma ``` npx prisma migrate dev ```
5. Ejecutar seed ``` npm run seed ``` (cargar el seed a la base de datos).
6. Levantar el back, en la carpeta api. ```npm run server``` para levantarlo con nodemon.

# Levantar el frontend
7. Instalar las dependencias con ``` npm install ```.
8. Levantar el front, Correr el proyecto desde la carpeta client con ``` npm run dev ```.


