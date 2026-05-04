import React from 'react';
import './Destinations.css';

const destinationsData = [
  { id: 1, name: 'Reino Unido', city: 'Manchester / Londres', flagCode: 'gb', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80', desc: 'Clima, historia y prestigio académico de primer nivel.' },
  { id: 2, name: 'Canadá', city: 'Toronto / Vancouver', flagCode: 'ca', img: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=600&q=80', desc: 'Paisajes majestuosos y una de las sociedades más seguras.' },
  { id: 3, name: 'España', city: 'Madrid / Barcelona', flagCode: 'es', img: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=600&q=80', desc: 'Arquitectura impresionante y facilidad para integrarse.' },
  { id: 4, name: 'Italia', city: 'Florencia / Roma', flagCode: 'it', img: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=600&q=80', desc: 'Arte, cultura y tradición en un entorno inmersivo.' },
  { id: 5, name: 'República Checa', city: 'Praga', flagCode: 'cz', img: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=600&q=80', desc: 'Explora el Castillo y el Puente de Carlos en una ciudad mágica.' },
  { id: 6, name: 'Japón', city: 'Tokio / Kioto', flagCode: 'jp', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80', desc: 'Tecnología futurista conviviendo con templos milenarios.' }
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
              <div className="card-image-wrapper">
                <img src={dest.img} alt={`Estudiar en ${dest.name}`} className="card-bg-img" />
                <div className="card-image-overlay"></div>
                <img 
                  src={`https://flagcdn.com/w80/${dest.flagCode}.png`} 
                  alt={`Bandera de ${dest.name}`} 
                  className="card-flag-badge" 
                />
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
