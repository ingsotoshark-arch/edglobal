import React from 'react';
import './ValueProposition.css';

const ValueProposition = () => {
  return (
    <section className="value-proposition">
      <div className="container vp-container">
        <div className="vp-content">
          <h2 className="section-title">No somos una agencia, <br/><span className="text-gradient">somos especialistas</span></h2>
          <p className="vp-description">
            Entendemos que estudiar en el extranjero es una de las decisiones más importantes para el futuro de un joven y su familia. Por eso, nuestro equipo te acompaña antes, durante y después de la aventura.
          </p>
          
          <div className="vp-features">
            <div className="vp-feature">
              <div className="feature-icon">🛡️</div>
              <div>
                <h4 className="feature-title">Seguridad Garantizada</h4>
                <p className="feature-desc">Instituciones certificadas y supervisión constante para tu tranquilidad.</p>
              </div>
            </div>
            <div className="vp-feature">
              <div className="feature-icon">🤝</div>
              <div>
                <h4 className="feature-title">Acompañamiento 24/7</h4>
                <p className="feature-desc">Coordinadores locales listos para ayudar en cualquier momento.</p>
              </div>
            </div>
            <div className="vp-feature">
              <div className="feature-icon">🎓</div>
              <div>
                <h4 className="feature-title">Calidad Académica</h4>
                <p className="feature-desc">Seleccionamos rigurosamente los mejores programas a nivel global.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="vp-visual">
          <div className="glass-panel vp-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" 
              alt="Estudiantes felices" 
              className="vp-image"
            />
            <div className="vp-badge glass-panel">
              <span className="badge-number">+10</span>
              <span className="badge-text">Años de<br/>Experiencia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
