import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  // Navegación sin react-router: 'login' | 'register' | 'productos' | 'carrito'
  const [view, setView] = useState(() =>
    localStorage.getItem('token') ? 'productos' : 'login'
  );
  const [cart, setCart] = useState([]);

  const isLoggedIn = !!localStorage.getItem('token');

  const handleLoginSuccess = () => setView('productos');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCart([]);
    setView('login');
  };

  const addToCart = (producto) => {
    if (!cart.some((p) => p._id === producto._id)) {
      setCart((prev) => [...prev, producto]);
    }
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((p) => p._id !== id));

  // Protege rutas: si no hay token, redirige a login
  if (!isLoggedIn && view !== 'login' && view !== 'register') {
    handleLogout();
    return null;
  }

  return (
    <div>
      {/* Navbar — solo visible cuando el usuario está logueado */}
      {isLoggedIn && (
        <nav style={styles.nav}>
          <span style={styles.brand}>🛒 Tienda</span>
          <div style={styles.navLinks}>
            <button
              onClick={() => setView('productos')}
              style={{
                ...styles.navBtn,
                borderBottom: view === 'productos' ? '2px solid #4CAF50' : 'none',
              }}
            >
              Productos
            </button>
            <button
              onClick={() => setView('carrito')}
              style={{
                ...styles.navBtn,
                borderBottom: view === 'carrito' ? '2px solid #4CAF50' : 'none',
              }}
            >
              Carrito
              {cart.length > 0 && <span style={styles.badge}>{cart.length}</span>}
            </button>
            <button onClick={handleLogout} style={{ ...styles.navBtn, color: '#f44336' }}>
              Salir
            </button>
          </div>
        </nav>
      )}

      {/* Vistas */}
      {view === 'login' && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onGoToRegister={() => setView('register')}
        />
      )}
      {view === 'register' && (
        <Register onGoToLogin={() => setView('login')} />
      )}
      {view === 'productos' && isLoggedIn && (
        <ProductList onAddToCart={addToCart} cartItems={cart} />
      )}
      {view === 'carrito' && isLoggedIn && (
        <Cart
          items={cart}
          onRemove={removeFromCart}
          onClearCart={() => setCart([])}
        />
      )}
    </div>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    backgroundColor: '#1a1a2e',
    color: '#fff',
  },
  brand: { fontSize: 20, fontWeight: 'bold' },
  navLinks: { display: 'flex', gap: 12, alignItems: 'center' },
  navBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: 15,
    padding: '4px 8px',
  },
  badge: {
    backgroundColor: '#f44336',
    color: '#fff',
    borderRadius: '50%',
    padding: '1px 6px',
    fontSize: 11,
    marginLeft: 4,
  },
};

export default App;
