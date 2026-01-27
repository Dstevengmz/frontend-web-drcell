import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ordenService from '../../../services/ordenService';
import { sanitizeInput } from '../../../utils/security';
import EstadoBadge from '../../../components/common/EstadoBadge';
import Timeline from '../../../components/common/Timeline';
import { getEstadoBadgeClass, formatCurrency, formatDateTime, ESTADOS_ORDEN } from '../../../utils/helpers';
import './OrdenDetalle.css';

const OrdenDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [nuevoEstado, setNuevoEstado] = useState({ estadoNuevo: '', observaciones: '' });

  useEffect(() => {
    loadOrden();
  }, [id]);

  const loadOrden = async () => {
    try {
      const data = await ordenService.getById(id);
      setOrden(data);
      setNuevoEstado({ estadoNuevo: data.estado, observaciones: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleActualizarEstado = async (e) => {
    e.preventDefault();
    try {
      await ordenService.updateEstado(
        id, 
        nuevoEstado.estadoNuevo, 
        sanitizeInput(nuevoEstado.observaciones)
      );
      setShowModal(false);
      loadOrden();
    } catch (err) {
      alert('Error al actualizar el estado',err);
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (!orden) return <div className="error">Orden no encontrada</div>;

  return (
    <div className="orden-detalle-page">
      <div className="detalle-header">
        <div>
          <h1>📋 Detalle de Orden</h1>
          <p className="codigo">{orden.codigoSeguimiento}</p>
        </div>
        <div className="header-actions">
          <button onClick={() => setShowModal(true)} className="btn btn-primary">🔄 Estado</button>
          <Link to={`/admin/ordenes/${id}/editar`} className="btn btn-secondary">✏️ Editar</Link>
          <button onClick={() => navigate('/admin/ordenes')} className="btn btn-back">← Volver</button>
        </div>
      </div>

      <div className="detalle-grid">
        <div className="detalle-card">
          <h2>👤 Cliente</h2>
          <div className="info-row"><span className="label">Nombre:</span><span>{orden.cliente?.nombreCompleto}</span></div>
          <div className="info-row"><span className="label">Email:</span><span>{orden.cliente?.correo}</span></div>
          <div className="info-row"><span className="label">Teléfono:</span><span>{orden.cliente?.telefono}</span></div>
        </div>

        <div className="detalle-card">
          <h2>📱 Equipo</h2>
          <div className="info-row"><span className="label">Modelo:</span><span>{orden.marca} {orden.modelo}</span></div>
          <div className="info-row"><span className="label">IMEI:</span><span>{orden.imei || 'N/A'}</span></div>
          <div className="info-row"><span className="label">Estado:</span><EstadoBadge estado={orden.estado} /></div>
        </div>

        <div className="detalle-card full-width">
          <h2>🔧 Reparación</h2>
          <div className="info-row"><span className="label">Falla:</span><span>{orden.resumenFalla}</span></div>
          <div className="info-row"><span className="label">Detalle:</span><span>{orden.detalleFalla || 'N/A'}</span></div>
          <div className="info-row"><span className="label">Costo:</span><span className="precio">{formatCurrency(orden.costoEstimado)}</span></div>
          <div className="info-row"><span className="label">Fecha:</span><span>{formatDateTime(orden.createdAt)}</span></div>
        </div>

        {orden.historialEstados?.length > 0 && (
          <div className="detalle-card full-width">
            <h2>📜 Historial</h2>
            <Timeline items={orden.historialEstados} getItemClass={getEstadoBadgeClass} />
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>🔄 Actualizar Estado</h2>
            <form onSubmit={handleActualizarEstado}>
              <div className="form-group">
                <label>Estado:</label>
                <select value={nuevoEstado.estadoNuevo} onChange={(e) => setNuevoEstado({...nuevoEstado, estadoNuevo: e.target.value})} required>
                  {ESTADOS_ORDEN.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Observaciones:</label>
                <textarea value={nuevoEstado.observaciones} onChange={(e) => setNuevoEstado({...nuevoEstado, observaciones: e.target.value})} rows="4" maxLength="500" />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancelar</button>
                <button type="submit" className="btn btn-primary">Actualizar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdenDetalle;
