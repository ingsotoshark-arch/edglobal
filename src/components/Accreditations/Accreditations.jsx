import React from 'react';
import './Accreditations.css';

import amteLogo from '../../assets/logos/amte.png';
import flywireLogo from '../../assets/logos/flywire.png';
import ialcLogo from '../../assets/logos/ialc.png';
import icefLogo from '../../assets/logos/icef.png';
import stLogo from '../../assets/logos/st-reference.png';

const accreditationsData = [
  {
    id: 'amte',
    logo: amteLogo,
    name: 'AMTE',
    title: 'Asociación Mexicana de Turismo Educativo',
    desc: 'Formamos parte de la Asociación Mexicana de Turismo Educativo (AMTE), organismo que promueve las mejores prácticas y estándares de calidad dentro de la educación internacional en México.',
    benefit: 'Trabajas con una agencia reconocida dentro de la industria educativa internacional y comprometida con procesos profesionales y transparentes.'
  },
  {
    id: 'icef',
    logo: icefLogo,
    name: 'ICEF Agency Status',
    title: 'Reconocimiento Internacional para Agencias Educativas',
    desc: 'ICEF es una de las organizaciones más reconocidas a nivel mundial dentro del sector de educación internacional. Nuestro estatus ICEF demuestra que cumplimos con criterios de profesionalismo, transparencia y operación dentro de la industria.',
    benefit: 'Mayor confianza al elegir una agencia con reconocimiento internacional y presencia dentro de una red global de instituciones educativas.'
  },
  {
    id: 'ialc',
    logo: ialcLogo,
    name: 'IALC Expert Agent',
    title: 'Especialistas en Educación Internacional',
    desc: 'IALC reúne algunas de las mejores escuelas de idiomas del mundo. El reconocimiento Expert Agent distingue a agencias con experiencia trabajando con instituciones que cumplen altos estándares académicos y de calidad.',
    benefit: 'Acceso a programas respaldados por escuelas reconocidas internacionalmente y una asesoría basada en experiencia real.'
  },
  {
    id: 'st',
    logo: stLogo,
    name: 'ST Reference Checked',
    title: 'Agencia Verificada por la Industria',
    desc: 'Este reconocimiento confirma que nuestra agencia ha sido evaluada y referenciada dentro de una de las redes profesionales más importantes del sector de educación internacional.',
    benefit: 'La tranquilidad de trabajar con una empresa que ha demostrado confiabilidad y profesionalismo ante organizaciones de la industria.'
  },
  {
    id: 'flywire',
    logo: flywireLogo,
    name: 'Flywire',
    title: 'Pagos Internacionales Seguros',
    desc: 'Trabajamos con Flywire, una plataforma global especializada en pagos para educación internacional, utilizada por instituciones educativas alrededor del mundo.',
    benefit: 'Pagos internacionales más seguros, transparentes y con seguimiento durante todo el proceso.'
  }
];

const Accreditations = () => {
  return (
    <section id="acreditaciones" className="accreditations-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Acreditaciones</h2>
          <p className="section-subtitle">
            Respaldados por organizaciones líderes de la educación internacional
          </p>
        </div>
        
        <div className="accreditations-grid">
          {accreditationsData.map((item) => (
            <div key={item.id} className="accreditation-card glass-panel">
              <div className="accreditation-logo-wrapper">
                <img src={item.logo} alt={item.name} className="accreditation-logo" />
              </div>
              <div className="accreditation-content">
                <h3 className="accreditation-name">{item.name}</h3>
                <h4 className="accreditation-title-text">{item.title}</h4>
                <p className="accreditation-desc">{item.desc}</p>
                
                <div className="accreditation-benefit-box">
                  <span className="benefit-icon">💡</span>
                  <div className="benefit-details">
                    <strong className="benefit-title">¿Qué significa para ti?</strong>
                    <p className="benefit-text">{item.benefit}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accreditations;
