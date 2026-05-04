import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      {/* Background decoration */}
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
            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="btn btn-primary">
              Agenda tu asesoría gratuita
            </a>
            <a href="#destinos" className="btn btn-outline">
              Explorar Destinos
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="glass-panel image-placeholder">
            {/* Real image from Drive will go here */}
            <div className="placeholder-text">Estudiante en Europa</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
