import { useEffect, useState } from 'react';
import { getProductos } from '../services/api';

function ProductList({ onAddToCart, cartItems }) {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductos()
      .then((res) => setProductos(res.data))
      .catch(() => setError('Error al cargar productos. Verificá que el backend esté corriendo.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={styles.center}>Cargando productos...</p>;
  if (error) return <p style={{ ...styles.center, color: 'red' }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2>Productos disponibles</h2>
      {productos.length === 0 ? (
        <p>No hay productos. Ejecutá <code>node seed.js</code> en el backend.</p>
      ) : (
        <div style={styles.grid}>
          {productos.map((p) => {
            const enCarrito = cartItems.some((c) => c._id === p._id);
            return (
              <div key={p._id} style={styles.card}>
                <img
                  src={p.imagen || `https://picsum.photos/seed/${p._id}/300/300`}
                  alt={p.nombre}
                  style={styles.img}
                  loading="lazy"
                />
                <div style={styles.body}>
                  <h3 style={styles.nombre}>{p.nombre}</h3>
                  <p style={styles.precio}>${p.precio.toLocaleString()}</p>
                  {p.descripcion && <p style={styles.desc}>{p.descripcion}</p>}
                  <button
                    onClick={() => onAddToCart(p)}
                    disabled={enCarrito}
                    style={{
                      ...styles.btn,
                      backgroundColor: enCarrito ? '#aaa' : '#4CAF50',
                      cursor: enCarrito ? 'default' : 'pointer',
                    }}
                  >
                    {enCarrito ? 'Agregado ✓' : 'Agregar al carrito'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: 1024, margin: '0 auto', padding: 24, fontFamily: 'sans-serif' },
  center: { textAlign: 'center', marginTop: 40 },
  grid: { display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 16 },
  card: {
    border: '1px solid #ddd',
    borderRadius: 10,
    width: 220,
    overflow: 'hidden',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  img: { width: '100%', height: 180, objectFit: 'cover' },
  body: { padding: 14, display: 'flex', flexDirection: 'column', flex: 1 },
  nombre: { margin: '0 0 6px', fontSize: 15, fontWeight: 'bold' },
  precio: { color: '#4CAF50', fontWeight: 'bold', margin: '0 0 6px', fontSize: 17 },
  desc: { fontSize: 12, color: '#666', margin: '0 0 12px', flex: 1 },
  btn: { padding: '8px 0', color: '#fff', border: 'none', borderRadius: 4, width: '100%', fontSize: 14 },
};

export default ProductList;
