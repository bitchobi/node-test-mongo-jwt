import { Router } from 'express';
import {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from '../controllers/productoController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Rutas públicas (no necesitan token)
router.get('/',    listarProductos);
router.get('/:id', obtenerProducto);

// Rutas protegidas (necesitan token)
router.post('/',    verificarToken, crearProducto);
router.put('/:id',  verificarToken, actualizarProducto);
router.delete('/:id', verificarToken, eliminarProducto);

export default router;