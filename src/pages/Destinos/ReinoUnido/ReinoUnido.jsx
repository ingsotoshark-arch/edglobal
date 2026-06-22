import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';
import { destinationsGallery } from '../../../data/destinationsGallery';
import './ReinoUnido.css';

const ReinoUnido = () => {
  const navigate = useNavigate();
  const fallbackImages = destinationsGallery['reino-unido'] || [];
  const [images, setImages] = useState(fallbackImages);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from('destination_galleries')
          .select('image_url')
          .eq('destination_slug', 'reino-unido')
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

  const isVideoUrl = (url) => {
    if (!url) return false;
    const cleanUrl = url.split('?')[0];
    return cleanUrl.toLowerCase().endsWith('.mp4') ||
           cleanUrl.toLowerCase().endsWith('.mov') ||
           cleanUrl.toLowerCase().endsWith('.webm') ||
           cleanUrl.toLowerCase().endsWith('.ogg');
  };

  return (
    <div className="destination-page">
      <div className="destination-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80')` }}>
        <div className="destination-hero-overlay"></div>
        <div className="container destination-hero-content">
          <button className="btn-back glass-panel" onClick={() => navigate('/')}>
            ← Regresar a la página principal
          </button>
          <div className="destination-title-wrapper">
            <img src="https://flagcdn.com/w160/gb.png" alt="Bandera de Reino Unido" className="destination-flag" />
            <h1 className="destination-title">Reino Unido</h1>
          </div>
          <p className="destination-subtitle">Manchester / Londres</p>
        </div>
      </div>

      <div className="container destination-body">
        <div className="destination-info glass-panel">
          <h2>Sobre el destino</h2>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', marginTop: 'var(--spacing-md)', marginBottom: 'var(--spacing-xs)' }}>MANCHESTER / LONDRES, REINO UNIDO</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-accent)', fontStyle: 'italic', marginBottom: 'var(--spacing-md)', fontWeight: 'bold' }}>Mucho más que un curso de inglés</p>
          
          <p>Estudiar en Inglaterra significa vivir el idioma todos los días mientras exploras una de las culturas más influyentes del mundo.</p>
          <p>Desde las calles históricas de Londres hasta las tradicionales ciudades universitarias, los estudiantes tienen la oportunidad de aprender dentro y fuera del salón de clases. Las excursiones, actividades grupales y experiencias culturales permiten descubrir la historia, la innovación y la diversidad que caracterizan al Reino Unido.</p>
          <p>Es una experiencia diseñada para ampliar horizontes, fortalecer el inglés y crear recuerdos que acompañarán a los estudiantes durante toda la vida.</p>
        </div>

        <div className="destination-gallery-section glass-panel">
          <div className="gallery-header">
            <h2>Experiencias de nuestros estudiantes</h2>
            <p>Momentos inolvidables viviendo en Reino Unido</p>
          </div>
          
          {isLoading && <p style={{ color: 'var(--color-text-muted)' }}>Sincronizando galería...</p>}
          <div className="destination-collage">
            {images.map((imgUrl, index) => (
              isVideoUrl(imgUrl) ? (
                <video
                  key={index}
                  src={imgUrl}
                  className="collage-item"
                  muted
                  playsInline
                  loop
                  autoPlay
                  onClick={() => React.startTransition(() => setSelectedImage(imgUrl))}
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <img 
                  key={index} 
                  src={imgUrl} 
                  alt={`Experiencia en Reino Unido ${index + 1}`} 
                  className="collage-item" 
                  onClick={() => React.startTransition(() => setSelectedImage(imgUrl))}
                  style={{ cursor: 'pointer' }}
                />
              )
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="lightbox-modal" onClick={() => React.startTransition(() => setSelectedImage(null))}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => React.startTransition(() => setSelectedImage(null))}>×</button>
            {isVideoUrl(selectedImage) ? (
              <video
                src={selectedImage}
                controls
                autoPlay
                className="lightbox-img"
                style={{ outline: 'none' }}
              />
            ) : (
              <img src={selectedImage} alt="Vista ampliada" className="lightbox-img" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReinoUnido;
