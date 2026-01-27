const HomeFooter = () => {
  return (
    <>
      {/* Sección de Información */}
      <section className="info-section">
        <div className="info-grid">
          <div className="info-card">
            <span className="info-icon">✅</span>
            <h3 className="info-title">Garantía Extendida</h3>
            <p className="info-text">90 días en todas nuestras reparaciones</p>
          </div>
          <div className="info-card">
            <span className="info-icon">⚡</span>
            <h3 className="info-title">Servicio Express</h3>
            <p className="info-text">Reparaciones en menos de 24 horas</p>
          </div>
          <div className="info-card">
            <span className="info-icon">🏆</span>
            <h3 className="info-title">Técnicos Certificados</h3>
            <p className="info-text">Más de 10 años de experiencia</p>
          </div>
          <div className="info-card">
            <span className="info-icon">🎯</span>
            <h3 className="info-title">Repuestos Originales</h3>
            <p className="info-text">Calidad garantizada en cada repuesto</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-title">Tienda Móvil</h4>
            <p className="footer-text">Tu tienda de tecnología móvil de confianza en Popayán</p>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Contacto</h4>
            <p className="footer-text">📍 Calle 5A con Carrera 14, Popayán</p>
            <p className="footer-text">📞 312 265 0861</p>
            <p className="footer-text">✉️ info@tiendamovil.com</p>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Horarios</h4>
            <p className="footer-text">Lunes a Viernes: 8:00 AM - 7:00 PM</p>
            <p className="footer-text">Sábados: 9:00 AM - 6:00 PM</p>
            <p className="footer-text">Domingos: 10:00 AM - 2:00 PM</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 DR CELL 2.0 Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
};

export default HomeFooter;
