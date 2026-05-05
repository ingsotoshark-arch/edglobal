import React, { useState } from 'react';
import './HowItWorks.css';

const steps = [
  { 
    id: 1, 
    title: 'Elige tu destino', 
    desc: 'Explora nuestros programas y selecciona el país que más te apasione.',
    extendedDesc: 'Sumérgete en nuestro catálogo global. Ya sea perfeccionando tu inglés en Londres, viviendo la cultura en Japón o estudiando en las majestuosas montañas de Canadá. Te ofrecemos programas académicos de excelencia, campamentos de verano y años escolares en las ciudades más vibrantes del mundo.'
  },
  { 
    id: 2, 
    title: 'Asesoría Gratuita', 
    desc: 'Nuestros expertos te ayudarán a definir el plan perfecto para ti y tu familia.',
    extendedDesc: 'Sabemos que cada estudiante es único. Agenda una sesión personalizada (virtual o presencial) donde nuestros consultores educativos evaluarán tu perfil, metas a futuro y presupuesto para diseñar un plan a la medida que garantice el éxito académico y personal.'
  },
  { 
    id: 3, 
    title: 'Financiamiento', 
    desc: 'Ajustamos el proyecto a tu presupuesto con opciones flexibles de pago.',
    extendedDesc: 'La educación internacional es la mejor inversión. Contamos con alianzas estratégicas y planes de pago diferidos para que el factor económico no sea un obstáculo. Estructuramos un cronograma financiero transparente, sin letras pequeñas ni sorpresas.'
  },
  { 
    id: 4, 
    title: '¡Viaja Seguro!', 
    desc: 'Nos encargamos del papeleo, el seguro y el alojamiento. Solo preocúpate por empacar.',
    extendedDesc: 'Tu tranquilidad es nuestra prioridad. Gestionamos todo el proceso burocrático: trámites de visado, inscripciones escolares, vuelos, seguros de gastos médicos mayores y selección de familias anfitrionas certificadas. Nosotros hacemos el trabajo pesado para que tú disfrutes el viaje.'
  }
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(null);

  const toggleStep = (id) => {
    if (activeStep === id) {
      setActiveStep(null);
    } else {
      setActiveStep(id);
    }
  };

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
            <div 
              key={step.id} 
              className={`step-card ${activeStep === step.id ? 'active' : ''}`}
              onClick={() => toggleStep(step.id)}
            >
              <div className="step-number">{step.id}</div>
              <h3 className="step-title">{step.title}</h3>
              
              <div className="step-content-wrapper">
                <p className={`step-desc original-desc ${activeStep === step.id ? 'hidden' : ''}`}>
                  {step.desc}
                </p>
                <p className={`step-desc extended-desc ${activeStep === step.id ? 'visible' : ''}`}>
                  {step.extendedDesc}
                </p>
              </div>

              <div className="step-hint">
                {activeStep === step.id ? 'Ocultar detalles' : 'Ver más detalles'}
              </div>

              {index !== steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
