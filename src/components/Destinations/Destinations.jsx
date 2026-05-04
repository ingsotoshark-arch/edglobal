import React from 'react';
import './Destinations.css';

const destinationsData = [
  { id: 1, name: 'Reino Unido', city: 'Manchester / Londres', icon: '🇬🇧', desc: 'Clima, historia y prestigio académico de primer nivel.' },
  { id: 2, name: 'Canadá', city: 'Toronto / Vancouver', icon: '🇨🇦', desc: 'Paisajes majestuosos y una de las sociedades más seguras.' },
  { id: 3, name: 'España', city: 'Madrid / Barcelona', icon: '🇪🇸', desc: 'Arquitectura impresionante y facilidad para integrarse.' },
  { id: 4, name: 'Italia', city: 'Florencia / Roma', icon: '🇮🇹', desc: 'Arte, cultura y tradición en un entorno inmersivo.' },
  { id: 5, name: 'República Checa', city: 'Praga', icon: '🇨🇿', desc: 'Explora el Castillo y el Puente de Carlos en una ciudad mágica.' },
  { id: 6, name: 'Japón', city: 'Tokio / Kioto', icon: '🇯🇵', desc: 'Tecnología futurista conviviendo con templos milenarios.' }
];

const Destinations = () => {
  return (
    <section id="destinos" className="destinations">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">El mundo es tu aula</h2>
          <p className="section-subtitle">
            Elige entre los mejores destinos internacionales para vivir una experiencia inolvidable.
          </p>
        </div>

        <div className="destinations-grid">
          {destinationsData.map((dest) => (
            <div key={dest.id} className="destination-card glass-panel">
              <div className="card-image-placeholder">
                <span className="card-icon">{dest.icon}</span>
              </div>
              <div className="card-content">
                <h3 className="card-title">{dest.name}</h3>
                <span className="card-city">{dest.city}</span>
                <p className="card-desc">{dest.desc}</p>
                <a href="#contacto" className="card-link">Ver programas <span>→</span></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
