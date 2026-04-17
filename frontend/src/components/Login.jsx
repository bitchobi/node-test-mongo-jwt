import { useState } from 'react';
import { login } from '../services/api';

function Login({ onLoginSuccess, onGoToRegister }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(usuario, password);
      localStorage.setItem('token', res.data.token);
      onLoginSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Cargando...' : 'Entrar'}
        </button>
      </form>
      <p style={{ marginTop: 16 }}>
        ¿No tenés cuenta?{' '}
        <button onClick={onGoToRegister} style={styles.link}>
          Registrarse
        </button>
      </p>
      <p style={styles.hint}>Credenciales de prueba: admin / 1234</p>
    </div>
  );
}

const styles = {
  container: { maxWidth: 360, margin: '80px auto', textAlign: 'center', fontFamily: 'sans-serif' },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  input: { padding: 10, fontSize: 15, borderRadius: 4, border: '1px solid #ccc' },
  button: { padding: 10, fontSize: 15, backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' },
  error: { color: 'red', margin: 0 },
  link: { background: 'none', border: 'none', color: '#2196F3', cursor: 'pointer', textDecoration: 'underline', fontSize: 14 },
  hint: { color: '#888', fontSize: 13, marginTop: 8 },
};

export default Login;
