import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ReinoUnido.css';

const ReinoUnido = () => {
  const navigate = useNavigate();

  return (
    <div className="destination-page">
      <div className="destination-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80')` }}>
        <div className="destination-hero-overlay"></div>
        <div className="container destination-hero-content">
          <button className="btn-back glass-panel" onClick={() => navigate('/')}>
            ← Regresar a la página principal
          </button>
          <div className="destination-title-wrapper">
            <img src="https://flagcdn.com/w160/gb.png" alt="Bandera de Reino Unido" className="destination-flag" />
            <h1 className="destination-title">Reino Unido</h1>
          </div>
          <p className="destination-subtitle">Manchester / Londres</p>
        </div>
      </div>

      <div className="container destination-body">
        <div className="destination-info glass-panel">
          <h2>Sobre el destino</h2>
          <p>Clima, historia y prestigio académico de primer nivel. Sumérgete en la cuna del idioma inglés y vive una experiencia educativa en instituciones de renombre mundial.</p>
          
          <div className="programs-list">
            <h3>Programas Destacados</h3>
            <ul>
              <li>🎓 High School Boarding (Año Escolar)</li>
              <li>🎓 Inglés Intensivo + Certificación IELTS</li>
              <li>🎓 Campamento de Verano Tecnológico</li>
            </ul>
          </div>
        </div>

        <div className="destination-gallery-section glass-panel">
          <div className="gallery-header">
            <h2>Galería de Imágenes</h2>
            <p>Sube y gestiona fotografías de la experiencia en Reino Unido</p>
          </div>
          
          {/* Zona de carga y placeholder para imágenes futuras */}
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

export default ReinoUnido;
