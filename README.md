# Favs-API

Favs-API es una API REST que permite a un usuario organizar mejor tus cosas favoritas: música, ropa, cursos, etc., todo en un solo lugar.

## Instalación

Para instalar las dependencias ejecutar el comando: `$ npm install` o `$ yarn`

## Uso

Primero ejecutar el servidor: `$ npm run dev` o `$ yarn dev`

## Requisitos

1. MongoDB
2. Postman
3. Node.js

## Tecnologias:

1. JavaScript
2. Express
3. bcrypt
4. cors
5. dotenv
6. jsonwebtoken
7. mongoose
8. morgan
9. jest

## Endpoints

#### Get all favs

**Descripcion:**. Obtener toda la lista de favoritos
```http
  GET /api/favs
```
#### Post favs

**Descripcion:**. Crea una nueva lista de favoritos
```http
  POST /api/favs
```
#### Get favs:id

**Descripcion:**. Obtener una lista única de favoritos
```http
  GET /api/favs/id
```
#### Delete favs:id

**Descripcion:**. Elimina una lista de favoritos
```http
  DELETE /api/favs/id
```
#### Post signup

**Descripcion:**. Registrarse con un correo y contraseña.

```http
  POST /auth/local/signup
```
**Ejemplo:**

```json
{
    "email": "test01@test.com",
    "password": "Hola123%"
}
```
**Respuesta:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNmRjODg2M2NhNTIxMWMxYTdkY2E3NyIsImlhdCI6MTY1MTM2MTkyNywiZXhwIjoxNjgyODk3OTI3fQ.iiPg6pXS8gT5Z5SX3ZRQTdG6oBUvt6CZcvcdDWukj2c"
}
```
#### Post signin

**Descripcion:**. iniciar sesión con un correo y contraseña.

```http
  POST /auth/local/signin
```
**Ejemplo:**

```json
{
    "email": "test01@test.com",
    "password": "Hola123%"
}
```
**Respuesta:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNmRjODg2M2NhNTIxMWMxYTdkY2E3NyIsImlhdCI6MTY1MTM2MTkyNywiZXhwIjoxNjgyODk3OTI3fQ.iiPg6pXS8gT5Z5SX3ZRQTdG6oBUvt6CZcvcdDWukj2c"
}
```
