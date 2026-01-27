import { useNavigate } from 'react-router-dom';
import icono from '../../assets/img/icono.png';

const HomeHeader = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="home-header">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="store-name">
              <img src={icono} alt="DR CELL 2.0" className="store-icon" />
              DR CELL 2.0
            </h1>
            <p className="store-tagline">Tu tienda de confianza</p>
          </div>
          <nav className="header-nav">
            <button className="nav-button" onClick={() => navigate('/admin/login')}>
              👤 Admin
            </button>
            <button className="nav-button tracking-button" onClick={() => navigate('/tracking')}>
              📦 Rastrear Orden
            </button>
          </nav>
        </div>
      </header>

      <div className="top-banner">
        <div className="banner-content">
          <span className="banner-item">📍 Popayán, Cauca</span>
          <span className="banner-divider">•</span>
          <span className="banner-item">📞 312 265 0861</span>
          <span className="banner-divider">•</span>
          <span className="banner-item">💳 Crédito disponible</span>
          <span className="banner-divider">•</span>
          <span className="banner-item">🔧 Reparaciones express</span>
        </div>
      </div>
    </>
  );
};

export default HomeHeader;
