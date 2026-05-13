import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../ReinoUnido/ReinoUnido.css';

const Canada = () => {
  const navigate = useNavigate();

  return (
    <div className="destination-page">
      <div className="destination-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1600&q=80')` }}>
        <div className="destination-hero-overlay"></div>
        <div className="container destination-hero-content">
          <button className="btn-back glass-panel" onClick={() => navigate('/')}>
            ← Regresar a la página principal
          </button>
          <div className="destination-title-wrapper">
            <img src="https://flagcdn.com/w160/ca.png" alt="Bandera de Canadá" className="destination-flag" />
            <h1 className="destination-title">Canadá</h1>
          </div>
          <p className="destination-subtitle">Toronto / Vancouver</p>
        </div>
      </div>

      <div className="container destination-body">
        <div className="destination-info glass-panel">
          <h2>Sobre el destino</h2>
          <p>Paisajes majestuosos y una de las sociedades más seguras. Canadá ofrece una calidad de vida insuperable, un sistema educativo de primer nivel y un entorno multicultural acogedor para estudiantes internacionales.</p>
          
          <div className="programs-list">
            <h3>Programas Destacados</h3>
            <ul>
              <li>🎓 Pathway Universitario (Pase Directo)</li>
              <li>🎓 High School Público</li>
              <li>🎓 Campamento de Invierno y Deportes</li>
            </ul>
          </div>
        </div>

        <div className="destination-gallery-section glass-panel">
          <div className="gallery-header">
            <h2>Galería de Imágenes</h2>
            <p>Sube y gestiona fotografías de la experiencia en Canadá</p>
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

export default Canada;
