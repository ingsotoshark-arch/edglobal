import React, { useState } from 'react';
import './Destinations.css';

const destinationsData = [
  { 
    id: 1, 
    name: 'Reino Unido', 
    city: 'Manchester / Londres', 
    flagCode: 'gb', 
    img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80', 
    desc: 'Clima, historia y prestigio académico de primer nivel.',
    programs: [
      'High School Boarding (Año Escolar)',
      'Inglés Intensivo + Certificación IELTS',
      'Campamento de Verano Tecnológico'
    ]
  },
  { 
    id: 2, 
    name: 'Canadá', 
    city: 'Toronto / Vancouver', 
    flagCode: 'ca', 
    img: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=600&q=80', 
    desc: 'Paisajes majestuosos y una de las sociedades más seguras.',
    programs: [
      'Pathway Universitario (Pase Directo)',
      'High School Público',
      'Campamento de Invierno y Deportes'
    ]
  },
  { 
    id: 3, 
    name: 'España', 
    city: 'Madrid / Barcelona', 
    flagCode: 'es', 
    img: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=600&q=80', 
    desc: 'Arquitectura impresionante y facilidad para integrarse.',
    programs: [
      'Grados Universitarios (Business & Tech)',
      'Másters Especializados',
      'Semestre de Intercambio Cultural'
    ]
  },
  { 
    id: 4, 
    name: 'Italia', 
    city: 'Florencia / Roma', 
    flagCode: 'it', 
    img: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=600&q=80', 
    desc: 'Arte, cultura y tradición en un entorno inmersivo.',
    programs: [
      'Arte, Diseño y Moda en Florencia',
      'Italiano Intensivo + Gastronomía',
      'Gap Year Europeo'
    ]
  },
  { 
    id: 5, 
    name: 'República Checa', 
    city: 'Praga', 
    flagCode: 'cz', 
    img: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=600&q=80', 
    desc: 'Explora el Castillo y el Puente de Carlos en una ciudad mágica.',
    programs: [
      'Medicina o Ingeniería en Inglés',
      'Año Preparatorio Universitario',
      'Semestre Académico'
    ]
  },
  { 
    id: 6, 
    name: 'Japón', 
    city: 'Tokio / Kioto', 
    flagCode: 'jp', 
    img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80', 
    desc: 'Tecnología futurista conviviendo con templos milenarios.',
    programs: [
      'Inmersión Tecnológica y Cultura Pop',
      'Japonés desde Cero en Tokio',
      'Intercambio de Preparatoria'
    ]
  }
];

const Destinations = () => {
  const [selectedDest, setSelectedDest] = useState(null);

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
            <div 
              key={dest.id} 
              className="destination-card glass-panel"
              onClick={() => setSelectedDest(dest)}
              style={{ cursor: 'pointer' }}
            >
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
                <div className="card-link" style={{ marginTop: 'auto', display: 'block' }}>
                  Ver programas <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL PARA VER PROGRAMAS */}
      {selectedDest && (
        <div className="dest-modal-overlay" onClick={() => setSelectedDest(null)}>
          <div className="dest-modal glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="dest-modal-close" onClick={() => setSelectedDest(null)}>×</button>
            <div className="dest-modal-header" style={{ backgroundImage: `url(${selectedDest.img})` }}>
              <div className="dest-modal-header-overlay"></div>
              <img 
                src={`https://flagcdn.com/w80/${selectedDest.flagCode}.png`} 
                alt="Bandera" 
                className="dest-modal-flag"
              />
              <h2 className="dest-modal-title">{selectedDest.name}</h2>
            </div>
            <div className="dest-modal-body">
              <h3 className="dest-modal-subtitle">Programas Disponibles</h3>
              <ul className="dest-modal-list">
                {selectedDest.programs.map((prog, idx) => (
                  <li key={idx} className="dest-modal-list-item">
                    <span className="prog-icon">🎓</span>
                    {prog}
                  </li>
                ))}
              </ul>
              <a 
                href="#contacto" 
                className="btn btn-primary btn-full"
                onClick={() => setSelectedDest(null)}
                style={{ marginTop: '20px', display: 'block', textAlign: 'center' }}
              >
                Me interesa estudiar aquí
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Destinations;
