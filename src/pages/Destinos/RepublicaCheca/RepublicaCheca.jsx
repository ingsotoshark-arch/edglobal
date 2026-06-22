import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';
import { destinationsGallery } from '../../../data/destinationsGallery';
import '../ReinoUnido/ReinoUnido.css';

const RepublicaCheca = () => {
  const navigate = useNavigate();
  const fallbackImages = destinationsGallery['republica-checa'] || [];
  const [images, setImages] = useState(fallbackImages);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from('destination_galleries')
          .select('image_url')
          .eq('destination_slug', 'republica-checa')
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
      <div className="destination-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1600&q=80')` }}>
        <div className="destination-hero-overlay"></div>
        <div className="container destination-hero-content">
          <button className="btn-back glass-panel" onClick={() => navigate('/')}>
            ← Regresar a la página principal
          </button>
          <div className="destination-title-wrapper">
            <img src="https://flagcdn.com/w160/cz.png" alt="Bandera de República Checa" className="destination-flag" />
            <h1 className="destination-title">República Checa</h1>
          </div>
          <p className="destination-subtitle">Praga</p>
        </div>
      </div>

      <div className="container destination-body">
        <div className="destination-info glass-panel">
          <h2>Sobre el destino</h2>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', marginTop: 'var(--spacing-md)', marginBottom: 'var(--spacing-xs)' }}>PRAGA, REPÚBLICA CHECA</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-accent)', fontStyle: 'italic', marginBottom: 'var(--spacing-md)', fontWeight: 'bold' }}>Descubre el corazón de Europa</p>
          
          <p>Praga es uno de los destinos más fascinantes para estudiantes internacionales. Su combinación de historia, seguridad, arquitectura y ambiente multicultural la convierten en una experiencia educativa difícil de igualar.</p>
          <p>Durante tu estancia podrás perfeccionar tu inglés mientras exploras castillos medievales, plazas históricas y algunos de los lugares más emblemáticos de Europa Central. Cada semana incluye actividades culturales, excursiones y experiencias diseñadas para ayudarte a conocer nuevas culturas y desarrollar independencia.</p>
          <p>Además de las clases, visitarás ciudades icónicas como Berlín, Viena, Dresde y Český Krumlov, viviendo una experiencia internacional que va mucho más allá del salón de clases.</p>
          <p>Praga es ideal para estudiantes que buscan una inmersión cultural auténtica, nuevas amistades internacionales y una primera experiencia segura en Europa.</p>
        </div>

        <div className="destination-gallery-section glass-panel">
          <div className="gallery-header">
            <h2>Experiencias de nuestros estudiantes</h2>
            <p>Momentos inolvidables viviendo en República Checa</p>
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
                  onClick={() => setSelectedImage(imgUrl)}
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <img 
                  key={index} 
                  src={imgUrl} 
                  alt={`Experiencia en República Checa ${index + 1}`} 
                  className="collage-item" 
                  onClick={() => setSelectedImage(imgUrl)}
                  style={{ cursor: 'pointer' }}
                />
              )
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="lightbox-modal" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>×</button>
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

export default RepublicaCheca;
