import React from 'react';
import './About.css';
// Importaremos la imagen generada
import aboutImg from '../../assets/images/about_us_consultants.png';

const About = () => {
  return (
    <section id="nosotros" className="about-section">
      <div className="container">
        <div className="about-grid">
          
          <div className="about-image-wrapper">
            <div className="image-decoration"></div>
            <img src={aboutImg} alt="Equipo EdGlobal asesorando a un estudiante" className="about-image" />
            
            <div className="experience-badge glass-panel">
              <span className="exp-number">10+</span>
              <span className="exp-text">Años de<br/>Experiencia</span>
            </div>
          </div>

          <div className="about-content">
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Más que una agencia, somos tus <span className="text-gradient">aliados estratégicos</span>
            </h2>
            <p className="about-description">
              En EdGlobal Beyond, entendemos que estudiar en el extranjero no es solo un viaje, es una inversión en tu futuro. Nuestro equipo de expertos certificados te acompaña paso a paso para garantizar que tu experiencia internacional sea perfecta, desde la selección del programa hasta tu llegada al destino.
            </p>

            <div className="about-features">
              <div className="a-feature">
                <div className="a-feature-icon glass-panel">🤝</div>
                <div className="a-feature-text">
                  <h4>Asesoría 100% Gratuita</h4>
                  <p>No cobramos honorarios por nuestros servicios de orientación e inscripción.</p>
                </div>
              </div>

              <div className="a-feature">
                <div className="a-feature-icon glass-panel">🎖️</div>
                <div className="a-feature-text">
                  <h4>Certificaciones Internacionales</h4>
                  <p>Agentes reconocidos y certificados por las principales embajadas e instituciones globales.</p>
                </div>
              </div>

              <div className="a-feature">
                <div className="a-feature-icon glass-panel">✈️</div>
                <div className="a-feature-text">
                  <h4>Acompañamiento Integral</h4>
                  <p>Apoyo en visas, alojamiento, seguros médicos y recepción en el aeropuerto.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
