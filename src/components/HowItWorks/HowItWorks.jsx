import React, { useState } from 'react';
import './HowItWorks.css';

const steps = [
  { 
    id: 1, 
    title: 'Exploramos tu perfil', 
    desc: 'Conocemos edad, intereses, presupuesto y objetivos.',
    extendedDesc: 'Todo empieza con una conversación. Nuestro equipo evalúa tus objetivos, fechas disponibles, preferencias de destino y expectativas para diseñar una ruta personalizada. También resolvemos dudas sobre costos, duración de los programas y requisitos antes de avanzar. El resultado es un plan claro y adaptado a tu perfil desde el primer día.'
  },
  { 
    id: 2, 
    title: 'Elegimos el destino ideal', 
    desc: 'Comparamos países, fechas y tipo de programa.',
    extendedDesc: 'Con cientos de opciones disponibles, elegir puede ser complicado. Nosotros lo simplificamos. Comparamos países, ciudades, escuelas y tipos de programa para ayudarte a identificar la mejor alternativa según tus objetivos. Evaluamos factores como calidad académica, seguridad, presupuesto, clima, idioma y experiencia cultural. Te presentamos únicamente las opciones que realmente tienen sentido para ti.'
  },
  { 
    id: 3, 
    title: 'Organizamos el proceso', 
    desc: 'Te guiamos con documentos, pagos y preparación.',
    extendedDesc: 'Una vez elegido tu programa, nos encargamos de acompañarte en cada paso. Te orientamos con la inscripción, documentación, pagos, seguros, vuelos y preparación previa al viaje. Nuestro equipo está disponible para resolver dudas y asegurarse de que todo avance correctamente. Transformamos un proceso complejo en una experiencia organizada y sin estrés.'
  },
  { 
    id: 4, 
    title: 'Vives la experiencia', 
    desc: 'Viajas con mayor claridad, respaldo y acompañamiento.',
    extendedDesc: 'Tu viaje es mucho más que un cambio de país. Es una oportunidad para crecer, aprender y descubrir nuevas posibilidades para tu futuro. Cada experiencia internacional deja aprendizajes que trascienden el aula y se convierten en herramientas para la vida personal y profesional. Nuestro compromiso es acompañarte desde la primera consulta hasta que regreses con nuevas historias por contar.'
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
