import { useState } from 'react';
import inventarioService from '../services/inventarioService';
import { confirmDelete, showSuccess, showError, showLoading, closeLoading } from '../utils/sweetalert';

export const useInventario = () => {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precioVenta: '',
    stockActual: '',
    stockMinimo: '',
    categoriaId: '',
    proveedorId: ''
  });

  const fetchProductos = async (filtros = {}) => {
    try {
      const response = await inventarioService.getAll(filtros);
      setProductos(response.data || []);
    } catch (error) {
      showError('Error al cargar productos');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading();

    try {
      if (editingId) {
        await inventarioService.update(editingId, formData);
        closeLoading();
        await showSuccess('Producto actualizado exitosamente');
      } else {
        await inventarioService.create(formData);
        closeLoading();
        await showSuccess('Producto creado exitosamente');
      }
      closeModal();
      return true;
    } catch (error) {
      closeLoading();
      const mensaje = error.response?.data?.message || 'Error al guardar producto';
      await showError(mensaje);
      return false;
    }
  };

  const handleEdit = (producto) => {
    setEditingId(producto.id);
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion || '',
      precioVenta: producto.precioVenta,
      stockActual: producto.stockActual,
      stockMinimo: producto.stockMinimo || 5,
      categoriaId: producto.categoriaId || '',
      proveedorId: producto.proveedorId || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await confirmDelete();
    if (result.isConfirmed) {
      showLoading();
      try {
        await inventarioService.delete(id);
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

  const handleAjustarStock = async (id, cantidad) => {
    try {
      showLoading();
      await inventarioService.ajustarStock(id, { cantidad, tipo: 'ajuste', motivo: 'Ajuste manual' });
      showSuccess('Stock ajustado');
      return true;
    } catch (error) {
      showError('Error al ajustar stock');
      return false;
    } finally {
      closeLoading();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      nombre: '',
      descripcion: '',
      precioVenta: '',
      stockActual: '',
      stockMinimo: '',
      categoriaId: '',
      proveedorId: ''
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
    fetchProductos,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleAjustarStock,
    closeModal,
    handleChange
  };
};
