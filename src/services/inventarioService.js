import api from './api';

export const inventarioService = {
  // Obtener todos los productos
  getAll: async (filtros = {}) => {
    const params = new URLSearchParams(filtros);
    const response = await api.get(`/inventario?${params}`);
    return response.data;
  },

  // Obtener productos con stock bajo
  getStockBajo: async () => {
    const response = await api.get('/inventario/stock-bajo');
    return response.data;
  },

  // Obtener producto por ID
  getById: async (id) => {
    const response = await api.get(`/inventario/${id}`);
    return response.data;
  },

  // Crear producto
  create: async (datos) => {
    const response = await api.post('/inventario', datos);
    return response.data;
  },

  // Actualizar producto
  update: async (id, datos) => {
    const response = await api.put(`/inventario/${id}`, datos);
    return response.data;
  },

  // Eliminar producto
  delete: async (id) => {
    const response = await api.delete(`/inventario/${id}`);
    return response.data;
  },

  // Registrar movimiento
  registrarMovimiento: async (datos) => {
    const response = await api.post('/inventario/movimiento', datos);
    return response.data;
  },

  // Obtener movimientos
  getMovimientos: async (filtros = {}) => {
    const params = new URLSearchParams(filtros);
    const response = await api.get(`/inventario/movimientos/historial?${params}`);
    return response.data;
  },
};

export const categoriaService = {
  getAll: async () => {
    const response = await api.get('/categorias');
    return response.data;
  },

  create: async (datos) => {
    const response = await api.post('/categorias', datos);
    return response.data;
  },

  update: async (id, datos) => {
    const response = await api.put(`/categorias/${id}`, datos);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/categorias/${id}`);
    return response.data;
  },
};

export const proveedorService = {
  getAll: async () => {
    const response = await api.get('/proveedores');
    return response.data;
  },

  create: async (datos) => {
    const response = await api.post('/proveedores', datos);
    return response.data;
  },

  update: async (id, datos) => {
    const response = await api.put(`/proveedores/${id}`, datos);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/proveedores/${id}`);
    return response.data;
  },
};

export default inventarioService;
