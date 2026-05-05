import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    email: '',
    telefono: '',
    destino_interes: '',
    mensaje: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [lastSubmittedData, setLastSubmittedData] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          { 
            nombre_completo: formData.nombre_completo,
            email: formData.email,
            telefono: formData.telefono,
            destino_interes: formData.destino_interes,
            mensaje: formData.mensaje,
            estado: 'nuevo'
          }
        ]);

      if (error) throw error;

      setLastSubmittedData({...formData});
      setSubmitStatus('success');
      setFormData({
        nombre_completo: '',
        email: '',
        telefono: '',
        destino_interes: '',
        mensaje: ''
      });

    } catch (error) {
      console.error('Error enviando formulario:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '20px' }}>
              Comienza tu <span className="text-gradient">aventura hoy</span>
            </h2>
            <p className="contact-desc">
              Déjanos tus datos y uno de nuestros coordinadores educativos se pondrá en contacto contigo para brindarte una asesoría completamente gratuita.
            </p>
            
            <div className="contact-features">
              <div className="c-feature">
                <span className="c-icon">🌎</span> Asesoría en más de 6 destinos
              </div>
              <div className="c-feature">
                <span className="c-icon">🎓</span> Alianzas con las mejores escuelas
              </div>
              <div className="c-feature">
                <span className="c-icon">🛡️</span> Acompañamiento en todo momento
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper glass-panel">
            {submitStatus === 'success' ? (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <h3>¡Información enviada con éxito!</h3>
                <p>Nos pondremos en contacto contigo muy pronto para comenzar a planear tu viaje.</p>
                <div style={{ marginTop: '20px' }}>
                  <a 
                    href={`https://wa.me/527777110991?text=${encodeURIComponent(`Hola, soy ${lastSubmittedData?.nombre_completo}. Acabo de registrarme en el sitio web de EdGlobal porque me interesa el destino de ${lastSubmittedData?.destino_interes || 'uno de sus programas'}. ¿Podrían darme más información?`)}`}
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn btn-primary"
                    style={{ background: '#25D366', borderColor: '#25D366' }}
                  >
                    Hablar con un asesor por WhatsApp 💬
                  </a>
                </div>
                <button 
                  onClick={() => setSubmitStatus(null)}
                  style={{ 
                    marginTop: '15px', 
                    background: 'transparent', 
                    border: 'none', 
                    color: 'var(--color-primary)', 
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  ¿Deseas enviar otra solicitud?
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nombre_completo">Nombre Completo *</label>
                  <input 
                    type="text" 
                    id="nombre_completo" 
                    name="nombre_completo" 
                    required 
                    value={formData.nombre_completo}
                    onChange={handleChange}
                    placeholder="Ej. María Pérez"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group half">
                    <label htmlFor="email">Correo Electrónico *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                  <div className="form-group half">
                    <label htmlFor="telefono">Teléfono (WhatsApp)</label>
                    <input 
                      type="tel" 
                      id="telefono" 
                      name="telefono" 
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+52 123 456 7890"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="destino_interes">Destino de Interés</label>
                  <select 
                    id="destino_interes" 
                    name="destino_interes"
                    value={formData.destino_interes}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona un destino...</option>
                    <option value="Reino Unido">Reino Unido 🇬🇧</option>
                    <option value="Canadá">Canadá 🇨🇦</option>
                    <option value="España">España 🇪🇸</option>
                    <option value="Italia">Italia 🇮🇹</option>
                    <option value="República Checa">República Checa 🇨🇿</option>
                    <option value="Japón">Japón 🇯🇵</option>
                    <option value="Varios/Aún no decido">Aún no decido 🤔</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="mensaje">¿Qué programa te interesa?</label>
                  <textarea 
                    id="mensaje" 
                    name="mensaje" 
                    rows="4" 
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Cuéntanos un poco sobre tus planes (ej. quiero estudiar inglés en verano, o busco una maestría en negocios...)"
                  ></textarea>
                </div>

                {submitStatus === 'error' && (
                  <div className="error-message">
                    Ocurrió un error al enviar tu información. Por favor, intenta nuevamente.
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary btn-full submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Solicitar Asesoría Gratuita'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
