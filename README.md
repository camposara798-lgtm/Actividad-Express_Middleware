# API de Solicitudes con Express

API básica construida con Node.js y Express para recibir solicitudes de registro de personas interesadas.

## Cómo la ejecute

npm install
npm run dev

El servidor queda en http://localhost:3000

## Rutas

- GET /inicio: devuelve un mensaje de bienvenida en JSON (200).
- GET /informacion: devuelve información general del servicio en JSON (200).
- POST /solicitudes: recibe nombre, apellido y correo en el cuerpo de la petición.
  - Datos válidos: 201 Created.
  - Campos faltantes o correo inválido: 400 Bad Request.
- Cualquier otra ruta: 404 Not Found.
- Errores inesperados: 500 Internal Server Error.

## Explicación del código (ejercicio.js)

1. Importe Express y se creo la aplicación en el puerto 3000.
2. El middleware registrarPeticion imprime en consola el método y la ruta de cada petición y llama a next() para continuar.
3. express.json() convierte el cuerpo JSON en un objeto disponible en req.body. Va antes de las rutas que leen req.body.
4. Las rutas GET responden con mensajes en JSON.
5. La ruta POST valida que existan nombre, apellido y correo, y que el correo tenga un formato válido; si todo está bien, responde 201.
6. Un middleware al final responde 404 cuando la ruta no existe.
7. Un middleware de errores responde 400 si el JSON está mal formado y 500 ante errores inesperados.
8. app.listen inicia el servidor.

## Cómo probar la API

Con Postman:

1. GET http://localhost:3000/inicio
2. GET http://localhost:3000/informacion
3. POST http://localhost:3000/solicitudes con Body raw JSON:
   {"nombre": "Sara", "apellido": "Campo", "correo": "sara@mail.com"}
4. POST con un campo faltante o un correo sin formato válido: debe dar 400.
5. GET http://localhost:3000/ruta-inventada: debe dar 404.

## Middleware

registrarPeticion se coloca antes de las rutas para registrar todas las peticiones. Si se ubicara después de una ruta que ya respondió, no se ejecutaría para esa petición.