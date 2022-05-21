# rinconcito_mexicano

Aplicación para el proyecto final de IS3, Daniel Ardila, Nicolás Triana

Sistema de gestión de reservas para el rinconcito mexicano, restaurante ubicado en meryland, el sistema va a constar de lo siguiente.

- Aplicación de clientes (flutter)
- Aplicación del restaurante (flutter)
- Backend de clientes (node.js)
- Backend del restaurante (node.js)
- Base de datos no relacional en mongoDB

Esta es la aplicación para el restaurante, donde se van a poder gestionar las reservas y configurar las mesas disponibles


Pasos para correr el proyecto

1. Instalar Flutter (verificar todo con flutter doctor)
2. Instalar node.js
3. Instalar mongodb
4. Ubicarse en la carpeta server/
5. Ejecutar el comando npm install y luego npm run format
6. **Ejecutar el comando npm run dev para correr el server**
7. Ir a lib/config.dart y cambiar la URL por la ip local, es decir con un ipconfig
8. Correr la app de administrador (NOTA: CONFIGURAR AVD UN PIXEL 4)

CREDENCIALES PARA INICIAR SESIÓN EN EL RESTAURANTE

rinconcitomexicano@gmail.com
holamundo

En el fichero server/utils/data.js está el populate del paso 5 para iniciar la base de datos, ahí se puede alterar el JSON para los productos