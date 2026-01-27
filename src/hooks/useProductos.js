 import { useState } from 'react';
import productoService from '../../services/productoService';
import { confirmDelete, showSuccess, showError, showLoading, closeLoading } from '../../utils/sweetalert';

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagenUrl: '',
    estado: 'nuevo',
    categoriaId: ''
  });

  const fetchProductos = async (params = {}) => {
    try {
      const response = await productoService.getProductos(params);
      setProductos(response.data.productos || []);
      return response.data;
    } catch (error) {
      showError('Error al cargar productos');
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading();

    try {
      if (editingId) {
        await productoService.updateProducto(editingId, formData);
        closeLoading();
        await showSuccess('Producto actualizado exitosamente');
      } else {
        await productoService.createProducto(formData);
        closeLoading();
        await showSuccess('Producto creado exitosamente');
      }
      closeModal();
      return true;
    } catch (error) {
      closeLoading();
      await showError(error.response?.data?.message || 'Error al guardar producto');
      return false;
    }
  };

  const handleEdit = (producto) => {
    setEditingId(producto.id);
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion || '',
      precio: producto.precio,
      imagenUrl: producto.imagenUrl || '',
      estado: producto.estado || 'nuevo',
      categoriaId: producto.categoriaId || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await confirmDelete();
    if (result.isConfirmed) {
      showLoading();
      try {
        await productoService.deleteProducto(id);
        showSuccess('Producto eliminado');
        return true;
      } catch (error) {
        showError('Error al eliminar');
        return false;
      } finally {
        closeLoading();
      }
    }
    return false;
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      imagenUrl: '',
      estado: 'nuevo',
      categoriaId: ''
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return {
    productos,
    showModal,
    editingId,
    formData,
    setShowModal,
    setFormData,
    fetchProductos,
    handleSubmit,
    handleEdit,
    handleDelete,
    closeModal,
    handleChange
  };
};
