import mongoose from 'mongoose';

export async function conectarDB() {
  try {
    const dbURI = 'mongodb://localhost:27017/tienda';
    await mongoose.connect(dbURI);
    console.log('Conexión a MongoDB exitosa');
  } catch (error) {
    console.error('Error al conectar a MongoDB', error);
    process.exit(1);
  }
}