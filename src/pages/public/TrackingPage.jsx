import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ordenService from '../../services/ordenService';
import { sanitizeInput, validateCodigoSeguimiento, checkRateLimit } from '../../utils/security';
import Timeline from '../../components/common/Timeline';
import EstadoBadge from '../../components/common/EstadoBadge';
import { getEstadoBadgeClass, formatCurrency, formatDate } from '../../utils/helpers';
import './TrackingPage.css';

const TrackingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ codigoSeguimiento: '' });
  const [ordenData, setOrdenData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: sanitizeInput(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setOrdenData(null);

    // Validaciones de seguridad
    if (!validateCodigoSeguimiento(formData.codigoSeguimiento)) {
      setError('Código de seguimiento inválido. Formato: REP-ABC123');
      return;
    }

    // Rate limiting
    if (!checkRateLimit('tracking', 5, 60000)) {
      setError('Demasiadas consultas. Espera un momento e intenta de nuevo');
      return;
    }

    setLoading(true);
    try {
      const codigoLimpio = formData.codigoSeguimiento.trim().toUpperCase();
      const response = await ordenService.consultarEstado(codigoLimpio);
      setOrdenData(response);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al consultar el estado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tracking-page">
      <div className="tracking-container">
        <div className="tracking-header">        <button 
          onClick={() => navigate('/')} 
          className="back-home-btn"
          aria-label="Volver al inicio"
        >
          ← Volver al inicio
        </button>          <h1>📱 Consulta el Estado de tu Reparación</h1>
          <p>Ingresa tu código de seguimiento</p>
        </div>

        <form className="tracking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="codigoSeguimiento">Código de Seguimiento</label>
            <input
              type="text"
              id="codigoSeguimiento"
              name="codigoSeguimiento"
              value={formData.codigoSeguimiento}
              onChange={handleChange}
              placeholder="REP-XXXXXXXX"
              maxLength="15"
              required
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Consultando...' : 'Consultar Estado'}
          </button>
        </form>

        {error && <div className="alert alert-error"><strong>Error:</strong> {error}</div>}

        {ordenData && (
          <div className="orden-result">
            <div className="orden-header">
              <h2>Información de tu Reparación</h2>
              <EstadoBadge estado={ordenData.estado} />
            </div>

            <div className="orden-details">
              <div className="detail-row">
                <span className="label">Código:</span>
                <span className="value">{ordenData.codigoSeguimiento}</span>
              </div>
              <div className="detail-row">
                <span className="label">Equipo:</span>
                <span className="value">{ordenData.marcaModelo}</span>
              </div>
              <div className="detail-row">
                <span className="label">Falla:</span>
                <span className="value">{ordenData.resumenFalla}</span>
              </div>
              <div className="detail-row">
                <span className="label">Costo:</span>
                <span className="value">{formatCurrency(ordenData.costoEstimado)}</span>
              </div>
              <div className="detail-row">
                <span className="label">Fecha:</span>
                <span className="value">{formatDate(ordenData.createdAt)}</span>
              </div>
            </div>

            {ordenData.historial?.length > 0 && (
              <div className="historial-section">
                <h3>Historial de Estados</h3>
                <Timeline items={ordenData.historial} getItemClass={getEstadoBadgeClass} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;
