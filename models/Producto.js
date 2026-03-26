import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre:       { type: String, required: true },
  precio:       { type: Number, required: true },
  descripcion:  { type: String, default: '' },
  fechaCreacion:{ type: Date,   default: Date.now },
});

export const Producto = mongoose.model('Producto', productoSchema);