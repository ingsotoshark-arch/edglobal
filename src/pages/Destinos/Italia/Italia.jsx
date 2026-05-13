import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../ReinoUnido/ReinoUnido.css';

const Italia = () => {
  const navigate = useNavigate();

  return (
    <div className="destination-page">
      <div className="destination-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=1600&q=80')` }}>
        <div className="destination-hero-overlay"></div>
        <div className="container destination-hero-content">
          <button className="btn-back glass-panel" onClick={() => navigate('/')}>
            ← Regresar a la página principal
          </button>
          <div className="destination-title-wrapper">
            <img src="https://flagcdn.com/w160/it.png" alt="Bandera de Italia" className="destination-flag" />
            <h1 className="destination-title">Italia</h1>
          </div>
          <p className="destination-subtitle">Florencia / Roma</p>
        </div>
      </div>

      <div className="container destination-body">
        <div className="destination-info glass-panel">
          <h2>Sobre el destino</h2>
          <p>Arte, cultura y tradición en un entorno inmersivo. Estudia en el epicentro histórico del diseño, la moda y las bellas artes mientras perfeccionas el idioma y disfrutas del estilo de vida mediterráneo.</p>
          
          <div className="programs-list">
            <h3>Programas Destacados</h3>
            <ul>
              <li>🎓 Arte, Diseño y Moda en Florencia</li>
              <li>🎓 Italiano Intensivo + Gastronomía</li>
              <li>🎓 Gap Year Europeo</li>
            </ul>
          </div>
        </div>

        <div className="destination-gallery-section glass-panel">
          <div className="gallery-header">
            <h2>Galería de Imágenes</h2>
            <p>Sube y gestiona fotografías de la experiencia en Italia</p>
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

export default Italia;
