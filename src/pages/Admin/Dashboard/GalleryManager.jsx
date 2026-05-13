import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { destinationsGallery } from '../../../data/destinationsGallery';
import './Dashboard.css';

const destinationsList = [
  { id: 'reino-unido', name: 'Reino Unido', icon: '🇬🇧' },
  { id: 'canada', name: 'Canadá', icon: '🇨🇦' },
  { id: 'espana', name: 'España', icon: '🇪🇸' },
  { id: 'italia', name: 'Italia', icon: '🇮🇹' },
  { id: 'republica-checa', name: 'República Checa', icon: '🇨🇿' },
  { id: 'japon', name: 'Japón', icon: '🇯🇵' }
];

const GalleryManager = () => {
  const [selectedCountry, setSelectedCountry] = useState('reino-unido');
  const [newImageUrl, setNewImageUrl] = useState('');
  // Estado local para reflejar cambios en tiempo real en la sesión de administración
  const [galleries, setGalleries] = useState({ ...destinationsGallery });

  const currentImages = galleries[selectedCountry] || [];

  const handleAddImage = (e) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;

    if (!newImageUrl.startsWith('http')) {
      toast.error('Por favor, ingresa una URL válida (http/https)');
      return;
    }

    const updatedImages = [...currentImages, newImageUrl.trim()];
    const updatedGalleries = {
      ...galleries,
      [selectedCountry]: updatedImages
    };

    // Actualizar el estado local y el catálogo estático en memoria
    setGalleries(updatedGalleries);
    destinationsGallery[selectedCountry] = updatedImages;

    setNewImageUrl('');
    toast.success('Imagen añadida a la galería exitosamente');
  };

  const handleDeleteImage = (indexToRemove) => {
    const updatedImages = currentImages.filter((_, idx) => idx !== indexToRemove);
    const updatedGalleries = {
      ...galleries,
      [selectedCountry]: updatedImages
    };

    setGalleries(updatedGalleries);
    destinationsGallery[selectedCountry] = updatedImages;
    toast.success('Imagen removida de la galería');
  };

  return (
    <div className="gallery-manager">
      <div className="dashboard-header">
        <div className="header-title">
          <h1>Gestor de Galerías de Destinos</h1>
          <p>Administra las fotografías dinámicas que se muestran en cada país</p>
        </div>
      </div>

      <div className="gallery-manager-content">
        {/* Selector de Destinos */}
        <div className="countries-tabs glass-panel" style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '15px', marginBottom: '20px', borderRadius: '12px' }}>
          {destinationsList.map((dest) => (
            <button
              key={dest.id}
              className={`btn-tab ${selectedCountry === dest.id ? 'active' : ''}`}
              onClick={() => setSelectedCountry(dest.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                border: 'none',
                background: selectedCountry === dest.id ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.05)',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s'
              }}
            >
              <span>{dest.icon}</span> {dest.name}
            </button>
          ))}
        </div>

        {/* Formulario de Carga Dinámica */}
        <div className="form-upload-container glass-panel" style={{ padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
          <h2>Añadir nueva fotografía a {destinationsList.find(d => d.id === selectedCountry)?.name}</h2>
          <form onSubmit={handleAddImage} style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
            <input
              type="text"
              placeholder="Ingresa la URL de la imagen (ej. https://images.unsplash.com/...)"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.2)', background: 'rgba(0,0,0,0.3)', color: '#fff' }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0 25px' }}>
              Añadir a la Galería
            </button>
          </form>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
            En producción con Supabase Storage, las imágenes se cargarán y sincronizarán directamente en el bucket.
          </p>
        </div>

        {/* Rejilla de Imágenes Actuales */}
        <div className="current-gallery glass-panel" style={{ padding: '20px', borderRadius: '12px' }}>
          <h2>Imágenes Activas en el Collage ({currentImages.length})</h2>
          
          {currentImages.length === 0 ? (
            <p style={{ color: 'var(--color-text-muted)', margin: '20px 0' }}>No hay imágenes configuradas para este destino.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
              {currentImages.map((imgUrl, index) => (
                <div key={index} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '160px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                  <img src={imgUrl} alt={`Preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button
                    onClick={() => handleDeleteImage(index)}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: 'rgba(239, 68, 68, 0.9)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold'
                    }}
                    title="Eliminar imagen"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryManager;
