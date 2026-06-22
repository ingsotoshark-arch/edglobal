import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';
import { destinationsGallery } from '../../../data/destinationsGallery';
import '../ReinoUnido/ReinoUnido.css';

const Canada = () => {
  const navigate = useNavigate();
  const fallbackImages = destinationsGallery['canada'] || [];
  const [images, setImages] = useState(fallbackImages);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from('destination_galleries')
          .select('image_url')
          .eq('destination_slug', 'canada')
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
      <div className="destination-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1600&q=80')` }}>
        <div className="destination-hero-overlay"></div>
        <div className="container destination-hero-content">
          <button className="btn-back glass-panel" onClick={() => navigate('/')}>
            ← Regresar a la página principal
          </button>
          <div className="destination-title-wrapper">
            <img src="https://flagcdn.com/w160/ca.png" alt="Bandera de Canadá" className="destination-flag" />
            <h1 className="destination-title">Canadá</h1>
          </div>
          <p className="destination-subtitle">Toronto / Vancouver</p>
        </div>
      </div>

      <div className="container destination-body">
        <div className="destination-info glass-panel">
          <h2>Sobre el destino</h2>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', marginTop: 'var(--spacing-md)', marginBottom: 'var(--spacing-xs)' }}>TORONTO / VANCOUVER, CANADÁ</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-accent)', fontStyle: 'italic', marginBottom: 'var(--spacing-md)', fontWeight: 'bold' }}>Aprende inglés en uno de los países más seguros del mundo</p>
          
          <p>Canadá es reconocido internacionalmente por la calidad de su educación, su diversidad cultural y su excelente calidad de vida.</p>
          <p>Durante el programa los estudiantes desarrollan sus habilidades lingüísticas mientras descubren ciudades modernas, espacios naturales impresionantes y una cultura abierta e inclusiva.</p>
          <p>Las actividades combinan aprendizaje, entretenimiento y exploración, permitiendo que cada estudiante aproveche al máximo su experiencia internacional.</p>
          <p>Canadá es ideal para quienes buscan un ambiente seguro, multicultural y orientado al crecimiento académico y personal.</p>
        </div>

        <div className="destination-gallery-section glass-panel">
          <div className="gallery-header">
            <h2>Experiencias de nuestros estudiantes</h2>
            <p>Momentos inolvidables viviendo en Canadá</p>
          </div>
          
          {isLoading && <p style={{ color: 'var(--color-text-muted)' }}>Sincronizando galería...</p>}
          <div className="destination-collage">
            {images.map((imgUrl, index) => (
              <img 
                key={index} 
                src={imgUrl} 
                alt={`Experiencia en Canadá ${index + 1}`} 
                className="collage-item" 
                onClick={() => setSelectedImage(imgUrl)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="lightbox-modal" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>×</button>
            <img src={selectedImage} alt="Vista ampliada" className="lightbox-img" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Canada;
