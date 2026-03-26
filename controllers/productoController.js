import { Producto } from '../models/Producto.js';
import mongoose from 'mongoose';

// GET /api/productos
export async function listarProductos(req, res) {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar productos' });
  }
}

// GET /api/productos/:id
export async function obtenerProducto(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: 'ID inválido' });

  try {
    const producto = await Producto.findById(id);
    if (!producto) 
      return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
}

// POST /api/productos  (requiere token)
export async function crearProducto(req, res) {
  const { nombre, precio, descripcion } = req.body;
  if (!nombre || !precio)
    return res.status(400).json({ error: 'Nombre y precio son obligatorios' });

  try {
    const nuevo = new Producto({ nombre, precio, descripcion });
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar producto' });
  }
}

// PUT /api/productos/:id  (requiere token)
export async function actualizarProducto(req, res) {
  const { id } = req.params;
  const { nombre, precio, descripcion } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: 'ID inválido' });

  try {
    const actualizado = await Producto.findByIdAndUpdate(
      id,
      { nombre, precio, descripcion },
      { new: true }
    );
    if (!actualizado) 
      return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar' });
  }
}

// DELETE /api/productos/:id  (requiere token)
export async function eliminarProducto(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: 'ID inválido' });

  try {
    const eliminado = await Producto.findByIdAndDelete(id);
    if (!eliminado) 
      return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto eliminado', producto: eliminado });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
}