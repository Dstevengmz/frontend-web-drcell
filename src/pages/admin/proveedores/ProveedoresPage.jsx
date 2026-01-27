import { useState, useEffect } from 'react';
import proveedorService from '../../../services/proveedorService';
import { confirmDelete, showSuccess, showError, showLoading, closeLoading } from '../../../utils/sweetalert';
import '../../../utils/sweetalert.css';
import './ProveedoresPage.css';

const ProveedoresPage = () => {
  const [proveedores, setProveedores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    contacto: '',
    telefono: '',
    email: '',
    direccion: ''
  });

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    try {
      const response = await proveedorService.getProveedores();
      setProveedores(response.data.data || []);
    } catch (error) {
      showError('Error al cargar proveedores');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading();

    try {
      if (editingId) {
        await proveedorService.actualizarProveedor(editingId, formData);
        showSuccess('Proveedor actualizado');
      } else {
        await proveedorService.crearProveedor(formData);
        showSuccess('Proveedor creado');
      }
      closeModal();
      fetchProveedores();
    } catch (error) {
      showError('Error al guardar proveedor');
    } finally {
      closeLoading();
    }
  };

  const handleEdit = (proveedor) => {
    setEditingId(proveedor.id);
    setFormData({
      nombre: proveedor.nombre,
      contacto: proveedor.contacto || '',
      telefono: proveedor.telefono || '',
      email: proveedor.email || '',
      direccion: proveedor.direccion || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await confirmDelete();
    if (result.isConfirmed) {
      showLoading();
      try {
        await proveedorService.eliminarProveedor(id);
        showSuccess('Proveedor eliminado');
        fetchProveedores();
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
    setFormData({ nombre: '', contacto: '', telefono: '', email: '', direccion: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="proveedores-page">
      <div className="page-header">
        <h1>📦 Proveedores</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          ➕ Nuevo Proveedor
        </button>
      </div>

      <div className="proveedores-table-container">
        <table className="proveedores-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.length === 0 ? (
              <tr><td colSpan="6" className="empty-message">No hay proveedores</td></tr>
            ) : (
              proveedores.map(prov => (
                <tr key={prov.id}>
                  <td><strong>{prov.nombre}</strong></td>
                  <td>{prov.contacto || 'N/A'}</td>
                  <td>{prov.telefono || 'N/A'}</td>
                  <td>{prov.email || 'N/A'}</td>
                  <td>{prov.direccion || 'N/A'}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-edit" onClick={() => handleEdit(prov)}>✏️</button>
                      <button className="btn-delete" onClick={() => handleDelete(prov.id)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingId ? 'Editar' : 'Nuevo'} Proveedor</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contacto</label>
                <input
                  type="text"
                  name="contacto"
                  value={formData.contacto}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Dirección</label>
                <textarea
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  rows="3"
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={closeModal} className="btn-secondary">Cancelar</button>
                <button type="submit" className="btn-primary">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProveedoresPage;
