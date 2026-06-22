import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';
import { destinationsGallery } from '../../../data/destinationsGallery';
import '../ReinoUnido/ReinoUnido.css';

const Italia = () => {
  const navigate = useNavigate();
  const fallbackImages = destinationsGallery['italia'] || [];
  const [images, setImages] = useState(fallbackImages);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from('destination_galleries')
          .select('image_url')
          .eq('destination_slug', 'italia')
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
      <div className="destination-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=1600&q=80')` }}>
        <div className="destination-hero-overlay"></div>
        <div className="container destination-hero-content">
          <button className="btn-back glass-panel" onClick={() => navigate('/')}>
            ← Regresar a la página principal
          </button>
          <div className="destination-title-wrapper">
            <img src="https://flagcdn.com/w160/it.png" alt="Bandera de Italia" className="destination-flag" />
            <h1 className="destination-title">Italia</h1>
          </div>
          <p className="destination-subtitle">Florencia / Roma</p>
        </div>
      </div>

      <div className="container destination-body">
        <div className="destination-info glass-panel">
          <h2>Sobre el destino</h2>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', marginTop: 'var(--spacing-md)', marginBottom: 'var(--spacing-xs)' }}>FLORENCIA / ROMA, ITALIA</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-accent)', fontStyle: 'italic', marginBottom: 'var(--spacing-md)', fontWeight: 'bold' }}>Vive la auténtica experiencia italiana</p>
          
          <p>Italia ofrece mucho más que clases de idioma. Es un país donde la historia, la gastronomía, el arte y la cultura forman parte de la vida diaria.</p>
          <p>Nuestros programas permiten a los estudiantes aprender italiano mientras exploran ciudades costeras, pueblos históricos y algunos de los destinos más reconocidos del mundo. Las actividades incluyen visitas culturales, experiencias gastronómicas y excursiones a lugares emblemáticos.</p>
          <p>Cada día representa una oportunidad para practicar el idioma en situaciones reales y desarrollar una comprensión profunda de la cultura italiana.</p>
          <p>Es una experiencia ideal para estudiantes interesados en idiomas, arte, diseño, historia y experiencias culturales auténticas.</p>
        </div>

        <div className="destination-gallery-section glass-panel">
          <div className="gallery-header">
            <h2>Experiencias de nuestros estudiantes</h2>
            <p>Momentos inolvidables viviendo en Italia</p>
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
                  alt={`Experiencia en Italia ${index + 1}`} 
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

export default Italia;
