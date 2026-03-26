import app from './app.js';
import { conectarDB } from './config/db.js';

const PORT = process.env.PORT || 3000;

conectarDB();

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});