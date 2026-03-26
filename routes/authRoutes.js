import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  if (usuario === 'admin' && password === '1234') {
    const token = jwt.sign({ usuario }, 'secreto123', { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ error: 'Credenciales inválidas' });
});

export default router;