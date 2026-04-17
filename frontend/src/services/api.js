import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Instancia de axios con la base URL del backend
const api = axios.create({
  baseURL: BASE_URL,
});

// Interceptor: adjunta el token JWT a cada request si existe en localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (usuario, password) =>
  api.post('/api/auth/login', { usuario, password });

// Productos
export const getProductos = () => api.get('/api/productos');
export const createProducto = (data) => api.post('/api/productos', data);
export const updateProducto = (id, data) => api.put(`/api/productos/${id}`, data);
export const deleteProducto = (id) => api.delete(`/api/productos/${id}`);

export default api;
