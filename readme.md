# node-test-mongo 🛒

API RESTful construida con **Node.js**, **Express** y **MongoDB** (Mongoose), con autenticación mediante **JWT**. Proyecto práctico de las clases 36 y 37 del curso de Backend — Grupo iDT.

---

## 📁 Estructura del proyecto

```
node-test-mongo/
├── config/
│   └── db.js                  # Conexión a MongoDB
├── controllers/
│   └── productoController.js  # Lógica CRUD de productos
├── middlewares/
│   └── authMiddleware.js      # Verificación de token JWT
├── models/
│   └── Producto.js            # Schema y modelo Mongoose
├── routes/
│   ├── authRoutes.js          # Ruta de login
│   └── productoRoutes.js      # Rutas CRUD de productos
├── app.js                     # Configuración de Express
├── index.js                   # Punto de entrada del servidor
└── package.json
```

---

## 🚀 Tecnologías utilizadas

| Tecnología | Versión |
|---|---|
| Node.js | v20.x |
| Express | ^5.1.0 |
| MongoDB | 7.0 |
| Mongoose | ^8.13.2 |
| JSON Web Token | ^9.0.0 |
| CORS | ^2.8.5 |

---

## ⚙️ Instalación y uso

### Prerequisitos

- Node.js v20+
- MongoDB instalado y corriendo

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/node-test-mongo.git
cd node-test-mongo

# 2. Instalar dependencias
npm install

# 3. Iniciar MongoDB (en WSL/Linux)
sudo service mongod start

# 4. Iniciar el servidor
npm start
```

El servidor quedará escuchando en `http://localhost:3000`.

---

## 🔐 Autenticación JWT

Las rutas de **crear**, **actualizar** y **eliminar** productos requieren un token JWT en el header de la petición.

### Obtener el token

```http
POST /api/auth/login
Content-Type: application/json

{
  "usuario": "admin",
  "password": "1234"
}
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Usar el token en las peticiones protegidas

```
Authorization: Bearer <token>
```

---

## 📋 Endpoints

### Autenticación

| Método | Endpoint | Descripción | Requiere token |
|---|---|---|---|
| POST | `/api/auth/login` | Obtener token JWT | No |

### Productos

| Método | Endpoint | Descripción | Requiere token |
|---|---|---|---|
| GET | `/api/productos` | Listar todos los productos | No |
| GET | `/api/productos/:id` | Obtener un producto por ID | No |
| POST | `/api/productos` | Crear un nuevo producto | ✅ Sí |
| PUT | `/api/productos/:id` | Actualizar un producto | ✅ Sí |
| DELETE | `/api/productos/:id` | Eliminar un producto | ✅ Sí |

---

## 📦 Ejemplos de uso

### Crear un producto
```http
POST /api/productos
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "Escoba",
  "precio": 5000,
  "descripcion": "Para barrer el patio"
}
```

**Respuesta (201 Created):**
```json
{
  "_id": "68085ea02b3c76c675468b15",
  "nombre": "Escoba",
  "precio": 5000,
  "descripcion": "Para barrer el patio",
  "fechaCreacion": "2026-03-26T18:29:36.986Z",
  "__v": 0
}
```

### Listar productos
```http
GET /api/productos
```

### Actualizar un producto
```http
PUT /api/productos/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "Escoba Premium",
  "precio": 7500,
  "descripcion": "Escoba con mango largo"
}
```

### Eliminar un producto
```http
DELETE /api/productos/:id
Authorization: Bearer <token>
```

---

## 🔁 Códigos de respuesta HTTP

| Código | Significado |
|---|---|
| 200 | OK — solicitud exitosa |
| 201 | Created — recurso creado |
| 400 | Bad Request — datos inválidos o ID incorrecto |
| 401 | Unauthorized — token no enviado |
| 403 | Forbidden — token inválido o expirado |
| 404 | Not Found — recurso no encontrado |
| 500 | Internal Server Error — error del servidor |

---

## 📝 Notas

- La base de datos utilizada es `tienda` en MongoDB local (`mongodb://localhost:27017/tienda`).
- El secret JWT usado es `secreto123` (en producción se debe guardar en variables de entorno `.env`).
- Los datos persisten en MongoDB, a diferencia de un CRUD en memoria.

---

## 👨‍💻 Autor

**Wilson** — Curso Backend con Node.js — Grupo iDT