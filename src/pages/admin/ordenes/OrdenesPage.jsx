import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ordenService from '../../../services/ordenService';
import EstadoBadge from '../../../components/common/EstadoBadge';
import { formatCurrency, formatDate } from '../../../utils/helpers';
import './OrdenesPage.css';

const OrdenesPage = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todas');

  useEffect(() => {
    loadOrdenes();
  }, []);

  const loadOrdenes = async () => {
    try {
      const data = await ordenService.getAll();
      setOrdenes(data.data || []);
    } catch (err) {
      console.error('Error al cargar órdenes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta orden?')) return;
    try {
      await ordenService.delete(id);
      setOrdenes(ordenes.filter(o => o.id !== id));
    } catch (err) {
      alert('Error al eliminar orden');
    }
  };

  const ordenesFiltradas = filtro === 'todas' 
    ? ordenes 
    : ordenes.filter(o => o.estado === filtro);

  const estados = ['En espera', 'En revisión', 'Reparando', 'Reparado'];

  if (loading) return <div className="loading">Cargando órdenes...</div>;

  return (
    <div className="ordenes-page">
      <div className="page-header">
        <h1>📋 Gestión de Órdenes</h1>
        <Link to="/admin/ordenes/nueva" className="btn btn-primary">+ Nueva Orden</Link>
      </div>

      <div className="filters">
        <button 
          className={filtro === 'todas' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFiltro('todas')}
        >
          Todas ({ordenes.length})
        </button>
        {estados.map(estado => (
          <button 
            key={estado}
            className={filtro === estado ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFiltro(estado)}
          >
            {estado} ({ordenes.filter(o => o.estado === estado).length})
          </button>
        ))}
      </div>

      <div className="ordenes-table-container">
        <table className="ordenes-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Cliente</th>
              <th>Equipo</th>
              <th>Estado</th>
              <th>Costo</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenesFiltradas.length === 0 ? (
              <tr><td colSpan="7" className="empty-message">No hay órdenes</td></tr>
            ) : (
              ordenesFiltradas.map(orden => (
                <tr key={orden.id}>
                  <td><strong>{orden.codigoSeguimiento}</strong></td>
                  <td>{orden.cliente?.nombreCompleto || 'N/A'}<br/><small>{orden.cliente?.correo}</small></td>
                  <td>{orden.marca} {orden.modelo}</td>
                  <td><EstadoBadge estado={orden.estado} /></td>
                  <td>{formatCurrency(orden.costoEstimado)}</td>
                  <td>{formatDate(orden.createdAt)}</td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/admin/ordenes/${orden.id}`} className="btn-action" title="Ver">👁️</Link>
                      <Link to={`/admin/ordenes/${orden.id}/editar`} className="btn-action" title="Editar">✏️</Link>
                      <button onClick={() => handleDelete(orden.id)} className="btn-action" title="Eliminar">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdenesPage;
