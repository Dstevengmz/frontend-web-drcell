import { useState, useEffect } from 'react';
import productoService from '../../../services/productoService';
import categoriaService from '../../../services/categoriaService';
import { confirmDelete, showSuccess, showError, showLoading, closeLoading } from '../../../utils/sweetalert';
import ImageUploader from '../../../components/common/ImageUploader';
import Pagination from '../../../components/common/Pagination';
import '../../../utils/sweetalert.css';
import './ProductosPage.css';

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoriaId: '',
    estado: 'nuevo',
    destacado: false,
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
  }, [currentPage, selectedCategoria, searchTerm]);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 8,
      };
      if (selectedCategoria) params.categoria = selectedCategoria;
      if (searchTerm) params.buscar = searchTerm;

      const response = await productoService.getProductos(params);
      setProductos(response.data.productos || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      showError('Error al cargar productos',error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await categoriaService.getCategorias();
      setCategorias(response.data.data || []);
    } catch (error) {
      console.error('Error al cargar categorías', error);
      setCategorias([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading('Guardando producto...');

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      if (selectedImage) {
        data.append('imagen', selectedImage);
      }

      if (editingId) {
        await productoService.actualizarProducto(editingId, data);
        showSuccess('Producto actualizado correctamente');
      } else {
        await productoService.crearProducto(data);
        showSuccess('Producto creado correctamente');
      }

      closeModal();
      fetchProductos();
    } catch (error) {
      showError(error.response?.data?.message || 'Error al guardar producto');
    } finally {
      closeLoading();
    }
  };

  const handleEdit = (producto) => {
    setEditingId(producto.id);
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion || '',
      precio: producto.precio,
      stock: producto.stock,
      categoriaId: producto.categoriaId || '',
      estado: producto.estado,
      destacado: producto.destacado,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await confirmDelete();
    if (result.isConfirmed) {
      showLoading('Eliminando...');
      try {
        await productoService.eliminarProducto(id);
        showSuccess('Producto eliminado');
        fetchProductos();
      } catch (error) {
        showError('Error al eliminar producto',error);
      } finally {
        closeLoading();
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      categoriaId: '',
      estado: 'nuevo',
      destacado: false,
    });
    setSelectedImage(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="productos-page">
      <div className="page-header">
        <h1>📱 Gestión de Productos</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          ➕ Nuevo Producto
        </button>
      </div>

      <div className="filters-section">
        <input
          type="search"
          placeholder="🔍 Buscar productos..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <select
          value={selectedCategoria}
          onChange={(e) => { setSelectedCategoria(e.target.value); setCurrentPage(1); }}
          className="filter-select"
        >
          <option value="">Todas las categorías</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="loading-spinner">Cargando...</div>
      ) : (
        <>
          <div className="productos-grid">
            {productos.map(producto => (
              <div key={producto.id} className="producto-card">
                <div className="card-image">
                  {producto.imagenUrl ? (
                    <img src={producto.imagenUrl} alt={producto.nombre} />
                  ) : (
                    <div className="no-image">Sin imagen</div>
                  )}
                  {producto.destacado && <span className="badge-destacado">⭐ Destacado</span>}
                </div>
                <div className="card-body">
                  <h3>{producto.nombre}</h3>
                  <p className="categoria-name">{producto.categoria?.nombre || 'Sin categoría'}</p>
                  <p className="precio">${Number(producto.precio).toLocaleString('es-CO')}</p>
                  <p className="stock">Stock: {producto.stock}</p>
                  <div className="card-actions">
                    <button className="btn-edit" onClick={() => handleEdit(producto)}>✏️ Editar</button>
                    <button className="btn-delete" onClick={() => handleDelete(producto.id)}>🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Editar Producto' : 'Nuevo Producto'}</h2>
              <button className="close-btn" onClick={closeModal}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-body">
              <input
                type="text"
                placeholder="Nombre del producto"
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
              <div className="form-row">
                <input
                  type="number"
                  placeholder="Precio"
                  value={formData.precio}
                  onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                  required
                  className="form-input"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-row">
                <select
                  value={formData.categoriaId}
                  onChange={(e) => setFormData({ ...formData, categoriaId: e.target.value })}
                  className="form-select"
                >
                  <option value="">Sin categoría</option>
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                  ))}
                </select>
                <select
                  value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                  className="form-select"
                >
                  <option value="nuevo">Nuevo</option>
                  <option value="usado">Usado</option>
                  <option value="reacondicionado">Reacondicionado</option>
                </select>
              </div>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.destacado}
                  onChange={(e) => setFormData({ ...formData, destacado: e.target.checked })}
                />
                Producto destacado
              </label>
              <ImageUploader
                currentImage={editingId ? productos.find(p => p.id === editingId)?.imagenUrl : null}
                onImageSelect={setSelectedImage}
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

export default ProductosPage;
