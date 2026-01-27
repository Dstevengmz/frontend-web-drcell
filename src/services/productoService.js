import api from './api';

const productoService = {
  // Obtener productos con paginación
  getProductos: (params = {}) => {
    return api.get('/productos', { params });
  },

  // Obtener producto por ID
  getProducto: (id) => {
    return api.get(`/productos/${id}`);
  },

  // Crear producto
  crearProducto: (formData) => {
    return api.post('/productos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Actualizar producto
  actualizarProducto: (id, formData) => {
    return api.put(`/productos/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Eliminar producto
  eliminarProducto: (id) => {
    return api.delete(`/productos/${id}`);
  },
};

export default productoService;
