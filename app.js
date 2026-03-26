import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import productoRoutes from './routes/productoRoutes.js';

const app = express();

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Log simple
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/api/auth',     authRoutes);
app.use('/api/productos', productoRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('API REST con Express y MongoDB - Clase 37');
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Recurso no encontrado' });
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

export default app;