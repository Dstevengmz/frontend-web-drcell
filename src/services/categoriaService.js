import api from './api';

const categoriaService = {
  // Obtener todas las categorías
  getCategorias: () => {
    return api.get('/categorias');
  },

  // Crear categoría
  crearCategoria: (data) => {
    return api.post('/categorias', data);
  },

  // Actualizar categoría
  actualizarCategoria: (id, data) => {
    return api.put(`/categorias/${id}`, data);
  },

  // Eliminar categoría
  eliminarCategoria: (id) => {
    return api.delete(`/categorias/${id}`);
  },
};

export default categoriaService;
