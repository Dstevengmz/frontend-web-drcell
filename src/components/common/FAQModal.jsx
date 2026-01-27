import { useState } from 'react';
import './FAQModal.css';

const FAQModal = ({ isOpen, onClose }) => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqData = [
    {
      id: 1,
      pregunta: '¿Cuánto tiempo tarda una reparación?',
      respuesta: 'La mayoría de reparaciones se completan en 24-48 horas. Reparaciones complejas pueden tomar hasta 5 días hábiles.'
    },
    {
      id: 2,
      pregunta: '¿Tienen garantía las reparaciones?',
      respuesta: 'Sí, todas nuestras reparaciones incluyen garantía de 30 días en repuestos y mano de obra.'
    },
    {
      id: 3,
      pregunta: '¿Manejan crédito para compras?',
      respuesta: 'Sí, ofrecemos planes de financiamiento flexibles. Contáctanos para conocer opciones según tu necesidad.'
    },
    {
      id: 4,
      pregunta: '¿Compran celulares usados?',
      respuesta: 'Sí, compramos celulares usados en buen estado. El precio depende del modelo y condición del equipo.'
    },
    {
      id: 5,
      pregunta: '¿Usan repuestos originales?',
      respuesta: 'Trabajamos con repuestos originales y de alta calidad. El tipo de repuesto se define según disponibilidad y presupuesto del cliente.'
    }
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  if (!isOpen) return null;

  return (
    <div className="faq-modal-overlay" onClick={onClose}>
      <div className="faq-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="faq-modal-header">
          <h2>Preguntas Frecuentes</h2>
          <button className="faq-modal-close" onClick={onClose}>×</button>
        </div>

        <div className="faq-modal-body">
          <div className="faq-list">
            {faqData.map((faq) => (
              <div 
                key={faq.id} 
                className={`faq-chat-item ${expandedFaq === faq.id ? 'active' : ''}`}
              >
                <button 
                  className="faq-chat-question"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <span>{faq.pregunta}</span>
                  <span className="faq-chat-icon">
                    {expandedFaq === faq.id ? '−' : '+'}
                  </span>
                </button>
                
                <div className="faq-chat-answer">
                  <p>{faq.respuesta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQModal;
