// Script para poblar la base de datos con productos de prueba
// Uso: node seed.js

import mongoose from 'mongoose';
import { Producto } from './models/Producto.js';

const MONGO_URI = 'mongodb://localhost:27017/tienda';

// Las imágenes vienen de Picsum Photos — URL estable, sin API key, sin costo.
// https://picsum.photos/seed/{semilla}/300/300 → misma imagen siempre para la misma semilla
const productos = [
  {
    nombre: 'Escoba',
    precio: 5000,
    descripcion: 'Escoba de paja natural, ideal para exteriores',
    imagen: 'https://picsum.photos/seed/escoba/300/300',
  },
  {
    nombre: 'Trapeador',
    precio: 8500,
    descripcion: 'Trapeador con mango extensible de 1.5m',
    imagen: 'https://picsum.photos/seed/trapeador/300/300',
  },
  {
    nombre: 'Balde Plástico 10L',
    precio: 3200,
    descripcion: 'Balde resistente con asa de metal',
    imagen: 'https://picsum.photos/seed/balde/300/300',
  },
  {
    nombre: 'Detergente 1L',
    precio: 2800,
    descripcion: 'Detergente concentrado limón, rinde hasta 5 litros',
    imagen: 'https://picsum.photos/seed/detergente/300/300',
  },
  {
    nombre: 'Esponjas x3',
    precio: 1500,
    descripcion: 'Pack de 3 esponjas doble función (suave y abrasiva)',
    imagen: 'https://picsum.photos/seed/esponja/300/300',
  },
  {
    nombre: 'Guantes de Goma',
    precio: 2200,
    descripcion: 'Guantes reutilizables talle M, antideslizantes',
    imagen: 'https://picsum.photos/seed/guantes/300/300',
  },
  {
    nombre: 'Bolsas de Basura x50',
    precio: 1800,
    descripcion: 'Bolsas negras reforzadas 60x90cm, 50 unidades',
    imagen: 'https://picsum.photos/seed/bolsas/300/300',
  },
  {
    nombre: 'Lavandina 1L',
    precio: 1900,
    descripcion: 'Lavandina concentrada al 55g/L, máxima desinfección',
    imagen: 'https://picsum.photos/seed/lavandina/300/300',
  },
  {
    nombre: 'Desodorante de Ambientes',
    precio: 4500,
    descripcion: 'Spray 360ml, fragancia lavanda, dura hasta 8 horas',
    imagen: 'https://picsum.photos/seed/desodorante/300/300',
  },
  {
    nombre: 'Cepillo para Ropa',
    precio: 3500,
    descripcion: 'Cepillo de cerdas naturales para ropa delicada',
    imagen: 'https://picsum.photos/seed/cepillo/300/300',
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado a MongoDB');

    // Elimina los productos existentes para evitar duplicados
    await Producto.deleteMany({});
    console.log('Colección limpiada');

    const insertados = await Producto.insertMany(productos);
    console.log(`✓ ${insertados.length} productos insertados:`);
    insertados.forEach((p) => console.log(`  - ${p.nombre} ($${p.precio})`));
  } catch (err) {
    console.error('Error en seed:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  }
}

seed();
