function Cart({ items, onRemove, onClearCart }) {
  const total = items.reduce((sum, p) => sum + p.precio, 0);

  return (
    <div style={styles.container}>
      <h2>Carrito de compras</h2>
      {items.length === 0 ? (
        <p style={styles.empty}>El carrito está vacío.</p>
      ) : (
        <>
          <ul style={styles.list}>
            {items.map((p) => (
              <li key={p._id} style={styles.item}>
                <span style={styles.nombre}>{p.nombre}</span>
                <span style={styles.precio}>${p.precio.toLocaleString()}</span>
                <button onClick={() => onRemove(p._id)} style={styles.removeBtn} title="Eliminar">
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <div style={styles.footer}>
            <strong style={{ fontSize: 18 }}>Total: ${total.toLocaleString()}</strong>
            <button onClick={onClearCart} style={styles.clearBtn}>
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: 600, margin: '24px auto', padding: 24, fontFamily: 'sans-serif' },
  empty: { color: '#888', marginTop: 16 },
  list: { listStyle: 'none', padding: 0, margin: '0 0 20px' },
  item: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' },
  nombre: { flex: 1 },
  precio: { color: '#4CAF50', fontWeight: 'bold', margin: '0 16px' },
  removeBtn: { background: 'none', border: 'none', color: '#f44336', cursor: 'pointer', fontSize: 18, lineHeight: 1 },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 },
  clearBtn: { padding: '8px 18px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 14 },
};

export default Cart;
