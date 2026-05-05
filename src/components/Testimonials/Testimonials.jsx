import React from 'react';
import './Testimonials.css';

const testimonialsData = [
  {
    id: 1,
    quote: "Viajar a Canadá cambió la vida de mi hijo. Volvió más seguro de sí mismo, maduro y dominando el inglés. La atención de EdGlobal fue impecable desde el día uno.",
    author: "María Fernanda López",
    role: "Madre de estudiante en Toronto",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    quote: "Estudiar un semestre en España me abrió los ojos a nuevas culturas. EdGlobal me ayudó a encontrar la universidad perfecta que se alineaba con mis metas profesionales.",
    author: "Diego Ramírez",
    role: "Estudiante en Madrid",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    quote: "Teníamos miedo de mandar a nuestra hija tan lejos, pero los coordinadores de EdGlobal estuvieron siempre en contacto con nosotros. La mejor inversión que hemos hecho.",
    author: "Familia García",
    role: "Padres de estudiante en Reino Unido",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonios" className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Historias de éxito</h2>
          <p className="section-subtitle">
            No lo decimos nosotros, lo dicen las familias que ya vivieron la experiencia EdGlobal.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonialsData.map((test) => (
            <div key={test.id} className="testimonial-card glass-panel">
              <div className="quote-mark">"</div>
              <p className="testimonial-quote">{test.quote}</p>
              <div className="testimonial-author">
                <img src={test.avatar} alt={test.author} className="author-avatar" />
                <div className="author-info">
                  <h4 className="author-name">{test.author}</h4>
                  <span className="author-role">{test.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
