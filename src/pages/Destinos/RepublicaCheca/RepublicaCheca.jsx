import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../ReinoUnido/ReinoUnido.css';

const RepublicaCheca = () => {
  const navigate = useNavigate();

  return (
    <div className="destination-page">
      <div className="destination-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1600&q=80')` }}>
        <div className="destination-hero-overlay"></div>
        <div className="container destination-hero-content">
          <button className="btn-back glass-panel" onClick={() => navigate('/')}>
            ← Regresar a la página principal
          </button>
          <div className="destination-title-wrapper">
            <img src="https://flagcdn.com/w160/cz.png" alt="Bandera de República Checa" className="destination-flag" />
            <h1 className="destination-title">República Checa</h1>
          </div>
          <p className="destination-subtitle">Praga</p>
        </div>
      </div>

      <div className="container destination-body">
        <div className="destination-info glass-panel">
          <h2>Sobre el destino</h2>
          <p>Explora el Castillo y el Puente de Carlos en una ciudad mágica. Praga combina una rica herencia medieval con universidades de excelencia investigativa y un costo de vida sumamente accesible en el corazón de Europa.</p>
          
          <div className="programs-list">
            <h3>Programas Destacados</h3>
            <ul>
              <li>🎓 Medicina o Ingeniería en Inglés</li>
              <li>🎓 Año Preparatorio Universitario</li>
              <li>🎓 Semestre Académico</li>
            </ul>
          </div>
        </div>

        <div className="destination-gallery-section glass-panel">
          <div className="gallery-header">
            <h2>Galería de Imágenes</h2>
            <p>Sube y gestiona fotografías de la experiencia en República Checa</p>
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

export default RepublicaCheca;
