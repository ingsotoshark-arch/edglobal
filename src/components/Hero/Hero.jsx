import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg-glow"></div>
      
      <div className="container hero-content">
        <div className="hero-text">
          <span className="badge">Especialistas en Viajes Educativos</span>
          <h1 className="hero-title">
            Viaja, estudia y <span className="text-gradient">transforma tu futuro</span> en el extranjero
          </h1>
          <p className="hero-subtitle">
            Conectamos a jóvenes con programas académicos internacionales diseñados para ampliar su visión del mundo, fortalecer su independencia y enriquecer su currículum. Más que una agencia, somos tus aliados.
          </p>
          <div className="hero-actions">
            <a href="#contacto" className="btn btn-primary">
              Agenda tu asesoría gratuita
            </a>
            <a href="#destinos" className="btn btn-outline">
              Explorar Destinos
            </a>
          </div>
        </div>

        <div className="hero-master-visual">
          {/* Panel Principal: Video Oficial */}
          <div className="master-panel-video glass-panel">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="bg-video"
              poster="https://images.unsplash.com/photo-1510531704581-5b28709e5a11?q=80&w=1200&auto=format&fit=crop"
            >
              <source src="/assets/hero-video.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
