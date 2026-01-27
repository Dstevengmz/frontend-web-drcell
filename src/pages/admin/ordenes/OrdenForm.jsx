import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ordenService from '../../../services/ordenService';
import { sanitizeFormData, validateEmail, validatePhone } from '../../../utils/security';
import FormField from '../../../components/common/FormField';
import { ESTADOS_ORDEN } from '../../../utils/helpers';
import './OrdenForm.css';

const OrdenForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    correo: '',
    telefono: '',
    marcaModelo: '',
    imei: '',
    resumenFalla: '',
    detalleFalla: '',
    costoEstimado: '',
    estado: 'En espera',
  });

  useEffect(() => {
    if (id) loadOrden();
  }, [id]);

  const loadOrden = async () => {
    try {
      const data = await ordenService.getById(id);
      setFormData({
        nombreCompleto: data.cliente?.nombreCompleto || '',
        correo: data.cliente?.correo || '',
        telefono: data.cliente?.telefono || '',
        marcaModelo: `${data.marca || ''} ${data.modelo || ''}`.trim(),
        imei: data.imei || '',
        resumenFalla: data.resumenFalla,
        detalleFalla: data.detalleFalla || '',
        costoEstimado: data.costoEstimado,
        estado: data.estado,
      });
    } catch (err) {
      setError('Error al cargar la orden');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validaciones
    if (!validateEmail(formData.correo)) {
      setError('Correo electrónico inválido');
      setLoading(false);
      return;
    }

    if (!validatePhone(formData.telefono)) {
      setError('Número de teléfono inválido');
      setLoading(false);
      return;
    }

    try {
      const sanitizedData = sanitizeFormData(formData);
      if (id) {
        await ordenService.update(id, sanitizedData);
      } else {
        // Mapear campos para el backend al crear
        const dataToSend = {
          clienteNombre: sanitizedData.nombreCompleto,
          clienteEmail: sanitizedData.correo,
          clienteTelefono: sanitizedData.telefono,
          marca: sanitizedData.marcaModelo.split(' ')[0] || sanitizedData.marcaModelo,
          modelo: sanitizedData.marcaModelo.split(' ').slice(1).join(' ') || sanitizedData.marcaModelo,
          imei: sanitizedData.imei || '',
          problemaReportado: sanitizedData.resumenFalla,
          observaciones: sanitizedData.detalleFalla || '',
          costoEstimado: parseFloat(sanitizedData.costoEstimado) || 0
        };
        await ordenService.create(dataToSend);
      }
      navigate('/admin/ordenes');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar la orden');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="orden-form-page">
      <div className="form-header">
        <h1>{id ? '✏️ Editar Orden' : '➕ Nueva Orden'}</h1>
        <button onClick={() => navigate('/admin/ordenes')} className="btn-back">
          ← Volver
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="orden-form">
        <div className="form-section">
          <h2>📱 Información del Cliente</h2>
          <div className="form-row">
            <FormField label="Nombre Completo" name="nombreCompleto" value={formData.nombreCompleto} onChange={handleChange} required />
            <FormField label="Teléfono" name="telefono" type="tel" value={formData.telefono} onChange={handleChange} required />
          </div>
          <FormField label="Correo Electrónico" name="correo" type="email" value={formData.correo} onChange={handleChange} required />
        </div>

        <div className="form-section">
          <h2>📲 Información del Equipo</h2>
          <div className="form-row">
            <FormField label="Marca y Modelo" name="marcaModelo" value={formData.marcaModelo} onChange={handleChange} placeholder="Samsung Galaxy S21" required />
            <FormField label="IMEI" name="imei" value={formData.imei} onChange={handleChange} placeholder="Opcional" />
          </div>
        </div>

        <div className="form-section">
          <h2>🔧 Información de la Reparación</h2>
          <FormField label="Resumen de la Falla" name="resumenFalla" value={formData.resumenFalla} onChange={handleChange} placeholder="Pantalla rota" required />
          <FormField label="Detalle de la Falla" name="detalleFalla" type="textarea" value={formData.detalleFalla} onChange={handleChange} placeholder="Descripción detallada (opcional)" rows={4} />
          <div className="form-row">
            <FormField label="Costo Estimado" name="costoEstimado" type="number" value={formData.costoEstimado} onChange={handleChange} required />
            <FormField label="Estado" name="estado" type="select" value={formData.estado} onChange={handleChange} options={ESTADOS_ORDEN} required />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/admin/ordenes')} className="btn btn-secondary">
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Guardando...' : (id ? 'Actualizar' : 'Crear Orden')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrdenForm;
