import api from './api';

export const ordenService = {
  // Consulta pública
  consultarEstado: async (codigoSeguimiento) => {
    const response = await api.post('/ordenes/consultar', {
      codigoSeguimiento,
    });
    return response.data.data;
  },

  // Obtener todas las órdenes
  getAll: async (filtros = {}) => {
    const params = new URLSearchParams(filtros);
    const response = await api.get(`/ordenes?${params}`);
    return response.data;
  },

  // Obtener orden por ID
  getById: async (id) => {
    const response = await api.get(`/ordenes/${id}`);
    return response.data.data;
  },

  // Crear orden
  create: async (datos) => {
    const response = await api.post('/ordenes', datos);
    return response.data.data;
  },

  // Actualizar orden
  update: async (id, datos) => {
    const response = await api.put(`/ordenes/${id}`, datos);
    return response.data.data;
  },

  // Actualizar estado
  updateEstado: async (id, estado, notaPublica) => {
    const response = await api.put(`/ordenes/${id}/estado`, {
      estado,
      notaPublica,
    });
    return response.data.data;
  },

  // Eliminar orden
  delete: async (id) => {
    const response = await api.delete(`/ordenes/${id}`);
    return response.data;
  },
};

export default ordenService;
