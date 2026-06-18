import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';
import { destinationsGallery } from '../../../data/destinationsGallery';
import '../ReinoUnido/ReinoUnido.css';

const Espana = () => {
  const navigate = useNavigate();
  const fallbackImages = destinationsGallery['espana'] || [];
  const [images, setImages] = useState(fallbackImages);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from('destination_galleries')
          .select('image_url')
          .eq('destination_slug', 'espana')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setImages(data.map(item => item.image_url));
        }
      } catch (err) {
        console.error('Error cargando imágenes de Supabase:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="destination-page">
      <div className="destination-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1600&q=80')` }}>
        <div className="destination-hero-overlay"></div>
        <div className="container destination-hero-content">
          <button className="btn-back glass-panel" onClick={() => navigate('/')}>
            ← Regresar a la página principal
          </button>
          <div className="destination-title-wrapper">
            <img src="https://flagcdn.com/w160/es.png" alt="Bandera de España" className="destination-flag" />
            <h1 className="destination-title">España</h1>
          </div>
          <p className="destination-subtitle">Madrid / Barcelona</p>
        </div>
      </div>

      <div className="container destination-body">
        <div className="destination-info glass-panel">
          <h2>Sobre el destino</h2>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', marginTop: 'var(--spacing-md)', marginBottom: 'var(--spacing-xs)' }}>MADRID / BARCELONA, ESPAÑA</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-accent)', fontStyle: 'italic', marginBottom: 'var(--spacing-md)', fontWeight: 'bold' }}>Aprende, explora y conecta con una cultura extraordinaria</p>
          
          <p>Estudiar en España significa vivir rodeado de historia, arte, innovación y tradición. Durante el programa tendrás la oportunidad de participar en clases dinámicas, visitar ciudades emblemáticas y convivir con estudiantes internacionales.</p>
          <p>Las actividades incluyen recorridos culturales, visitas a museos, experiencias deportivas y excursiones diseñadas para complementar el aprendizaje académico.</p>
          <p>Cada experiencia está pensada para ayudar a los estudiantes a desarrollar confianza, independencia y una visión global del futuro.</p>
        </div>

        <div className="destination-gallery-section glass-panel">
          <div className="gallery-header">
            <h2>Experiencias de nuestros estudiantes</h2>
            <p>Momentos inolvidables viviendo en España</p>
          </div>
          
          {isLoading && <p style={{ color: 'var(--color-text-muted)' }}>Sincronizando galería...</p>}
          <div className="destination-collage">
            {images.map((imgUrl, index) => (
              <img 
                key={index} 
                src={imgUrl} 
                alt={`Experiencia en España ${index + 1}`} 
                className="collage-item" 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Espana;
