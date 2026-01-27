import api from './api';

const proveedorService = {
  // Obtener todos los proveedores
  getProveedores: () => {
    return api.get('/proveedores');
  },

  // Crear proveedor
  crearProveedor: (data) => {
    return api.post('/proveedores', data);
  },

  // Actualizar proveedor
  actualizarProveedor: (id, data) => {
    return api.put(`/proveedores/${id}`, data);
  },

  // Eliminar proveedor
  eliminarProveedor: (id) => {
    return api.delete(`/proveedores/${id}`);
  },
};

export default proveedorService;
