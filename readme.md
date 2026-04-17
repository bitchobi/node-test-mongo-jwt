# node-test-mongo 🛒

Proyecto fullstack académico — API RESTful con **Node.js**, **Express** y **MongoDB** (Mongoose), autenticación **JWT**, y frontend en **React + Vite**. Clases 36 y 37 del curso de Backend — Grupo iDT.

---

## 📁 Estructura del proyecto

```
node-test-mongo/
├── config/
│   └── db.js                        # Conexión a MongoDB
├── controllers/
│   └── productoController.js        # Lógica CRUD de productos
├── middlewares/
│   └── authMiddleware.js            # Verificación de token JWT
├── models/
│   └── Producto.js                  # Schema Mongoose (nombre, precio, descripcion, imagen)
├── routes/
│   ├── authRoutes.js                # Ruta de login
│   └── productoRoutes.js            # Rutas CRUD de productos
├── frontend/                        # Frontend React + Vite
│   ├── .env                         # VITE_API_URL=http://localhost:3000
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx                  # Navegación y estado global
│       ├── services/
│       │   └── api.js               # Axios con interceptor JWT
│       └── components/
│           ├── Login.jsx
│           ├── Register.jsx
│           ├── ProductList.jsx      # Grilla de productos con imágenes
│           └── Cart.jsx             # Carrito con total
├── app.js                           # Configuración de Express
├── index.js                         # Punto de entrada del servidor
├── seed.js                          # Script para poblar la base de datos
└── package.json
```

---

## 🚀 Tecnologías utilizadas

### Backend

| Tecnología | Versión |
|---|---|
| Node.js | v20.x |
| Express | ^5.1.0 |
| MongoDB | 7.0 |
| Mongoose | ^8.13.2 |
| JSON Web Token | ^9.0.0 |
| CORS | ^2.8.5 |

### Frontend

| Tecnología | Versión |
|---|---|
| React | ^18.3.1 |
| Vite | ^5.4.1 |
| Axios | ^1.7.2 |

---

## ⚙️ Instalación y uso

### Prerequisitos

- Node.js v20+
- MongoDB instalado y corriendo

### 1. Backend

```bash
# Instalar dependencias del backend
npm install

# Iniciar MongoDB (WSL/Linux)
sudo service mongod start

# Poblar la base de datos con productos de prueba
node seed.js

# Iniciar el servidor
npm start
```

El servidor queda escuchando en `http://localhost:3000`.

### 2. Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```

El frontend queda disponible en `http://localhost:5173`.

---

## 🌱 Seed — datos de prueba

El archivo `seed.js` inserta 10 productos de ejemplo en la colección `productos`. **Borra los existentes** antes de insertar, por lo que se puede ejecutar varias veces sin duplicar.

```bash
node seed.js
```

Productos insertados: Escoba, Trapeador, Balde Plástico, Detergente, Esponjas, Guantes de Goma, Bolsas de Basura, Lavandina, Desodorante de Ambientes, Cepillo para Ropa.

Las imágenes de producto provienen de **Picsum Photos** (`https://picsum.photos/seed/{nombre}/300/300`): sin API key, sin costo, imagen consistente por semilla.

---

## 🖥️ Frontend — funcionalidades

| Vista | Descripción |
|---|---|
| Login | Formulario usuario/contraseña — guarda el JWT en `localStorage` |
| Registro | UI de registro simulada (el backend no expone endpoint real) |
| Productos | Grilla de productos con imagen, precio y botón "Agregar al carrito" — requiere login |
| Carrito | Lista local con total y opción de vaciar — no requiere backend |

- Navegación manejada con `useState` (sin react-router)
- El JWT se adjunta automáticamente a cada request via interceptor de Axios
- Rutas protegidas: redirige a login si no hay token en `localStorage`

---

## 🔐 Autenticación JWT

Las rutas de **crear**, **actualizar** y **eliminar** productos requieren un token JWT en el header.

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
  "descripcion": "Para barrer el patio",
  "imagen": "https://picsum.photos/seed/escoba/300/300"
}
```

**Respuesta (201 Created):**
```json
{
  "_id": "68085ea02b3c76c675468b15",
  "nombre": "Escoba",
  "precio": 5000,
  "descripcion": "Para barrer el patio",
  "imagen": "https://picsum.photos/seed/escoba/300/300",
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
- El secret JWT es `secreto123` (en producción debe ir en variables de entorno `.env`).
- El campo `imagen` en el modelo es opcional — si no se envía, el frontend usa el `_id` como semilla de Picsum.
- Los datos persisten en MongoDB, a diferencia de un CRUD en memoria.

---

## 👨‍💻 Autor

**Wilson** — Curso Backend con Node.js — Grupo iDT
