import React from 'react';
import './HowItWorks.css';

const steps = [
  { id: 1, title: 'Elige tu destino', desc: 'Explora nuestros programas y selecciona el país que más te apasione.' },
  { id: 2, title: 'Asesoría Gratuita', desc: 'Nuestros expertos te ayudarán a definir el plan perfecto para ti y tu familia.' },
  { id: 3, title: 'Financiamiento', desc: 'Ajustamos el proyecto a tu presupuesto con opciones flexibles de pago.' },
  { id: 4, title: '¡Viaja Seguro!', desc: 'Nos encargamos del papeleo, el seguro y el alojamiento. Solo preocúpate por empacar.' }
];

const HowItWorks = () => {
  return (
    <section id="programas" className="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Tu viaje comienza aquí</h2>
          <p className="section-subtitle">
            Hacemos que el proceso sea simple, transparente y completamente libre de estrés.
          </p>
        </div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={step.id} className="step-card">
              <div className="step-number">{step.id}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
              {index !== steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
