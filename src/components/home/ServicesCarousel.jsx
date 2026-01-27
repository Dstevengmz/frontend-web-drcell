import { useState, useEffect } from 'react';
import { SERVICIOS_DATA } from '../../constants/servicios';

const ServicesCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleWhatsAppClick = (servicioId) => {
    const phoneNumber = '573122650861';
    const servicio = SERVICIOS_DATA.find(s => s.id === servicioId);
    const mensaje = servicio 
      ? `Hola! Me interesa el servicio de ${servicio.titulo}`
      : 'Hola! Me gustaría información sobre sus servicios';
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SERVICIOS_DATA.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SERVICIOS_DATA.length) % SERVICIOS_DATA.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-deslizar cada 5 segundos
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="services-carousel-section">
      <div className="section-header">
        <h2 className="section-title">Nuestros Servicios</h2>
        <p className="section-subtitle">Todo lo que necesitas en un solo lugar</p>
      </div>
      
      <div className="carousel-wrapper">
        {/* Indicadores */}
        <div className="carousel-indicators">
          {SERVICIOS_DATA.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${currentSlide === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slides */}
        <div className="carousel-container">
          <div 
            className="carousel-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {SERVICIOS_DATA.map((servicio) => (
              <div 
                key={servicio.id}
                className="carousel-slide"
                onClick={() => handleWhatsAppClick(servicio.id)}
              >
                <div className="slide-image">
                  <img src={servicio.imagen} alt={servicio.titulo} />
                  <div className="slide-overlay">
                    <span className="slide-icon">{servicio.icono}</span>
                    <h3 className="slide-title">{servicio.titulo}</h3>
                    <p className="slide-subtitle">{servicio.subtitulo}</p>
                    <p className="slide-description">{servicio.descripcion}</p>
                    <button className="slide-btn">
                      💬 Cotizar por WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controles */}
          <button 
            className="carousel-control prev"
            onClick={prevSlide}
            aria-label="Anterior"
          >
            <svg width="21" height="37" viewBox="0 0 21 37" xmlns="http://www.w3.org/2000/svg">
              <polygon transform="translate(10.5, 18.5) scale(1, -1) rotate(90) translate(-10.5, -18.5)" points="27.055 8.5 28.8695 10.3145 10.4331667 28.2916667 -8 10.3145 -6.1855 8.5 10.1605223 24.3797564 10.7121443 24.3797564"/>
            </svg>
          </button>
          <button 
            className="carousel-control next"
            onClick={nextSlide}
            aria-label="Siguiente"
          >
            <svg width="21" height="37" viewBox="0 0 21 37" xmlns="http://www.w3.org/2000/svg">
              <polygon transform="translate(10.5, 18.5) scale(-1, -1) rotate(90) translate(-10.5, -18.5)" points="27.055 8.5 28.8695 10.3145 10.4331667 28.2916667 -8 10.3145 -6.1855 8.5 10.1605223 24.3797564 10.7121443 24.3797564"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;
