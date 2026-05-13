import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../ReinoUnido/ReinoUnido.css';

const Japon = () => {
  const navigate = useNavigate();

  return (
    <div className="destination-page">
      <div className="destination-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80')` }}>
        <div className="destination-hero-overlay"></div>
        <div className="container destination-hero-content">
          <button className="btn-back glass-panel" onClick={() => navigate('/')}>
            ← Regresar a la página principal
          </button>
          <div className="destination-title-wrapper">
            <img src="https://flagcdn.com/w160/jp.png" alt="Bandera de Japón" className="destination-flag" />
            <h1 className="destination-title">Japón</h1>
          </div>
          <p className="destination-subtitle">Tokio / Kioto</p>
        </div>
      </div>

      <div className="container destination-body">
        <div className="destination-info glass-panel">
          <h2>Sobre el destino</h2>
          <p>Tecnología futurista conviviendo con templos milenarios. Japón ofrece una inmersión cultural única, altos niveles de seguridad ciudadana y programas educativos enfocados en la innovación tecnológica y el idioma japonés.</p>
          
          <div className="programs-list">
            <h3>Programas Destacados</h3>
            <ul>
              <li>🎓 Inmersión Tecnológica y Cultura Pop</li>
              <li>🎓 Japonés desde Cero en Tokio</li>
              <li>🎓 Intercambio de Preparatoria</li>
            </ul>
          </div>
        </div>

        <div className="destination-gallery-section glass-panel">
          <div className="gallery-header">
            <h2>Galería de Imágenes</h2>
            <p>Sube y gestiona fotografías de la experiencia en Japón</p>
          </div>
          
          <div className="upload-placeholder">
            <div className="upload-icon">📸</div>
            <h3>Área de Carga de Imágenes</h3>
            <p className="upload-tip">Próximamente: Podrás seleccionar y subir imágenes directamente a este destino.</p>
            <button className="btn btn-primary" onClick={() => alert('La función de carga de imágenes estará disponible próximamente.')}>
              Subir Imágenes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Japon;
