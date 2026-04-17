import { useState } from 'react';

// Nota: el backend no tiene endpoint de registro real.
// Este componente cumple la consigna académica con una respuesta simulada.
function Register({ onGoToLogin }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simula registro exitoso — el backend solo acepta admin/1234
    setMensaje('Registro simulado. Usá las credenciales admin / 1234 para ingresar.');
  };

  return (
    <div style={styles.container}>
      <h2>Registrarse</h2>
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
        {mensaje && <p style={styles.success}>{mensaje}</p>}
        <button type="submit" style={styles.button}>Registrarse</button>
      </form>
      <p style={{ marginTop: 16 }}>
        ¿Ya tenés cuenta?{' '}
        <button onClick={onGoToLogin} style={styles.link}>
          Iniciar sesión
        </button>
      </p>
    </div>
  );
}

const styles = {
  container: { maxWidth: 360, margin: '80px auto', textAlign: 'center', fontFamily: 'sans-serif' },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  input: { padding: 10, fontSize: 15, borderRadius: 4, border: '1px solid #ccc' },
  button: { padding: 10, fontSize: 15, backgroundColor: '#2196F3', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' },
  success: { color: 'green', margin: 0, fontSize: 14 },
  link: { background: 'none', border: 'none', color: '#2196F3', cursor: 'pointer', textDecoration: 'underline', fontSize: 14 },
};

export default Register;
