import React, { useState, useEffect } from 'react';
import './Hero.css';

const carouselImages = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop", // Campus
  "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop", // London
  "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=600&auto=format&fit=crop"  // Spain
];

const Hero = () => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="btn btn-primary">
              Agenda tu asesoría gratuita
            </a>
            <a href="#destinos" className="btn btn-outline">
              Explorar Destinos
            </a>
          </div>
        </div>

        <div className="hero-master-visual">
          {/* Panel Principal: Video Cinematográfico */}
          <div className="master-panel-video glass-panel">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="bg-video"
              poster="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
            >
              <source src="https://cdn.pixabay.com/video/2020/05/25/40141-424883335_medium.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay"></div>
          </div>

          {/* Panel Secundario: Carrusel Flotante */}
          <div className="master-panel-carousel glass-panel">
            {carouselImages.map((img, idx) => (
              <img 
                key={idx}
                src={img} 
                alt={`Destino ${idx}`} 
                className={`carousel-img ${idx === currentImg ? 'active' : ''}`}
              />
            ))}
          </div>

          {/* Toque Final: Estudiante Flotante */}
          <div className="master-cutout-placeholder">
            <img 
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop" 
              alt="Estudiante Internacional" 
              className="student-portrait"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
