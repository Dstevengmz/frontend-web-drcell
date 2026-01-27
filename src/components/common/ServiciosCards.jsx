import './ServiciosCards.css';

const ServiciosCards = () => {
  const servicios = [
    {
      id: 1,
      titulo: 'Reparación de Baterías',
      icono: '🔋',
      descripcion: 'Cambio de baterías originales y de alta calidad'
    },
    {
      id: 2,
      titulo: 'Reparación de Pantalla',
      icono: '📱',
      descripcion: 'Reemplazo de pantallas LCD y OLED'
    },
    {
      id: 3,
      titulo: 'Reparación Face ID',
      icono: '🔐',
      descripcion: 'Reparación de sensores de reconocimiento facial'
    },
    {
      id: 4,
      titulo: 'Cristal Trasero',
      icono: '🔨',
      descripcion: 'Cambio de tapa trasera y cristal'
    },
    {
      id: 5,
      titulo: 'Reparaciones Electrónicas',
      icono: '⚡',
      descripcion: 'Problemas de carga, audio y conectividad'
    },
    {
      id: 6,
      titulo: 'Aumento de Memoria',
      icono: '💾',
      descripcion: 'Expansión de almacenamiento interno'
    },
    {
      id: 7,
      titulo: 'Cristal de Cámara',
      icono: '📷',
      descripcion: 'Reemplazo de cristal de lente de cámara'
    },
    {
      id: 8,
      titulo: 'Reparación Auriculares',
      icono: '🔊',
      descripcion: 'Auricular, altavoz y micrófono'
    },
    {
      id: 9,
      titulo: 'Mantenimiento',
      icono: '🛠️',
      descripcion: 'Limpieza y mantenimiento preventivo'
    },
    {
      id: 10,
      titulo: 'Otras Fallas',
      icono: '🔧',
      descripcion: 'Diagnóstico y reparación de fallas diversas'
    }
  ];

  const handleServicioClick = (servicio) => {
    const mensaje = `Hola! Me interesa el servicio de ${servicio.titulo}`;
    const url = `https://wa.me/573122650861?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="servicios-cards-section">
      <div className="servicios-header">
        <h2 className="servicios-title">Servicios de Reparación</h2>
        <p className="servicios-subtitle">Especialistas en reparación de dispositivos móviles</p>
      </div>
      
      <div className="servicios-grid">
        {servicios.map((servicio) => (
          <div 
            key={servicio.id} 
            className="servicio-card"
            onClick={() => handleServicioClick(servicio)}
          >
            <div className="servicio-icono">{servicio.icono}</div>
            <h3 className="servicio-titulo">{servicio.titulo}</h3>
            <p className="servicio-descripcion">{servicio.descripcion}</p>
            <button className="servicio-btn">Cotizar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiciosCards;
