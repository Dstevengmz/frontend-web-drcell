import { useState, useEffect } from 'react';
import categoriaService from '../../../services/categoriaService';
import { confirmDelete, showSuccess, showError, showLoading, closeLoading } from '../../../utils/sweetalert';
import '../../../utils/sweetalert.css';
import './CategoriasPage.css';

const CategoriasPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await categoriaService.getCategorias();
      setCategorias(response.data.data || []);
    } catch (error) {
      showError('Error al cargar categorías');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading();

    try {
      if (editingId) {
        await categoriaService.actualizarCategoria(editingId, formData);
        showSuccess('Categoría actualizada');
      } else {
        await categoriaService.crearCategoria(formData);
        showSuccess('Categoría creada');
      }
      closeModal();
      fetchCategorias();
    } catch (error) {
      showError('Error al guardar categoría');
    } finally {
      closeLoading();
    }
  };

  const handleEdit = (categoria) => {
    setEditingId(categoria.id);
    setFormData({ nombre: categoria.nombre, descripcion: categoria.descripcion || '' });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await confirmDelete();
    if (result.isConfirmed) {
      showLoading();
      try {
        await categoriaService.eliminarCategoria(id);
        showSuccess('Categoría eliminada');
        fetchCategorias();
      } catch (error) {
        showError('Error al eliminar');
      } finally {
        closeLoading();
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ nombre: '', descripcion: '' });
  };

  return (
    <div className="categorias-page">
      <div className="page-header">
        <h1>🏷️ Categorías</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          ➕ Nueva Categoría
        </button>
      </div>

      <div className="categorias-list">
        {categorias.map(cat => (
          <div key={cat.id} className="categoria-item">
            <div>
              <h3>{cat.nombre}</h3>
              {cat.descripcion && <p>{cat.descripcion}</p>}
            </div>
            <div className="item-actions">
              <button className="btn-edit" onClick={() => handleEdit(cat)}>✏️</button>
              <button className="btn-delete" onClick={() => handleDelete(cat.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Editar' : 'Nueva'} Categoría</h2>
              <button className="close-btn" onClick={closeModal}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-body">
              <input
                type="text"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
                className="form-input"
              />
              <textarea
                placeholder="Descripción"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className="form-textarea"
                rows="3"
              />
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingId ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriasPage;
