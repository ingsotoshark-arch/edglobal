import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../../../lib/supabaseClient';
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
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const isVideoUrl = (url) => {
    if (!url) return false;
    const cleanUrl = url.split('?')[0];
    return cleanUrl.toLowerCase().endsWith('.mp4') ||
           cleanUrl.toLowerCase().endsWith('.mov') ||
           cleanUrl.toLowerCase().endsWith('.webm') ||
           cleanUrl.toLowerCase().endsWith('.ogg');
  };

  useEffect(() => {
    fetchGalleryImages();
  }, [selectedCountry]);

  const fetchGalleryImages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('destination_galleries')
        .select('*')
        .eq('destination_slug', selectedCountry)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (err) {
      console.error('Error fetching gallery:', err);
      toast.error('Error al cargar imágenes de Supabase');
    } finally {
      setIsLoading(false);
    }
  };

  // 1. Carga y registro de videos en Supabase
  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/') ||
                    file.name.toLowerCase().endsWith('.mp4') ||
                    file.name.toLowerCase().endsWith('.mov') ||
                    file.name.toLowerCase().endsWith('.webm') ||
                    file.name.toLowerCase().endsWith('.ogg');

    if (!isVideo) {
      toast.error('Selecciona un archivo de video válido (.mp4, .mov, .webm, .ogg)');
      return;
    }

    const MAX_SIZE_MB = 25;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`El archivo de video excede el límite de ${MAX_SIZE_MB}MB. Por favor, comprímelo o redúcelo antes de subir.`);
      return;
    }

    setIsUploading(true);
    toast.loading('Subiendo video a Supabase...', { id: 'upload' });

    try {
      const extension = file.name.split('.').pop().toLowerCase();
      const fileName = `${selectedCountry}/${Date.now()}.${extension}`;

      const { data: storageData, error: storageError } = await supabase.storage
        .from('destinations')
        .upload(fileName, file, {
          contentType: file.type || `video/${extension === 'mov' ? 'quicktime' : extension}`,
          upsert: false
        });

      if (storageError) {
        throw new Error('Asegúrate de haber creado un bucket público llamado "destinations" en Supabase Storage');
      }

      const { data: publicUrlData } = supabase.storage
        .from('destinations')
        .getPublicUrl(fileName);

      const publicUrl = publicUrlData.publicUrl;

      const { data: dbData, error: dbError } = await supabase
        .from('destination_galleries')
        .insert([{ destination_slug: selectedCountry, image_url: publicUrl }])
        .select();

      if (dbError) throw dbError;

      setImages(prev => [dbData[0], ...prev]);
      toast.success('Video subido exitosamente a Supabase', { id: 'upload' });
    } catch (err) {
      console.error('Error en carga de video:', err);
      toast.error(err.message || 'Error al subir el video', { id: 'upload' });
    } finally {
      setIsUploading(false);
      if (videoInputRef.current) videoInputRef.current.value = '';
    }
  };

  // 2. Motor de Procesamiento y Compresión HTML5 Canvas para Carga Local
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isHeic = file.name.toLowerCase().endsWith('.heic') || 
                   file.name.toLowerCase().endsWith('.heif') || 
                   file.type === 'image/heic' || 
                   file.type === 'image/heif';

    if (!file.type.startsWith('image/') && !isHeic) {
      toast.error('Selecciona un archivo de imagen válido');
      return;
    }

    setIsUploading(true);
    toast.loading('Preparando archivo...', { id: 'upload' });

    try {
      let fileToProcess = file;

      if (isHeic) {
        toast.loading('Convirtiendo formato HEIC de Apple...', { id: 'upload' });
        const heic2any = (await import('heic2any')).default;
        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.8
        });

        const blobToUse = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
        fileToProcess = new File([blobToUse], file.name.replace(/\.[^/.]+$/, ".jpg"), {
          type: 'image/jpeg'
        });
      }

      toast.loading('Maximizando eficiencia y comprimiendo imagen...', { id: 'upload' });
      // Compresión mediante HTML5 Canvas
      const compressedBlob = await compressImage(fileToProcess, 1200, 0.8);
      const fileName = `${selectedCountry}/${Date.now()}.webp`;

      // Subir a Supabase Storage (Bucket: destinations)
      const { data: storageData, error: storageError } = await supabase.storage
        .from('destinations')
        .upload(fileName, compressedBlob, {
          contentType: 'image/webp',
          upsert: false
        });

      if (storageError) {
        throw new Error('Asegúrate de haber creado un bucket público llamado "destinations" en Supabase Storage');
      }

      // Obtener URL Pública
      const { data: publicUrlData } = supabase.storage
        .from('destinations')
        .getPublicUrl(fileName);

      const publicUrl = publicUrlData.publicUrl;

      // Insertar registro en la tabla destination_galleries
      const { data: dbData, error: dbError } = await supabase
        .from('destination_galleries')
        .insert([{ destination_slug: selectedCountry, image_url: publicUrl }])
        .select();

      if (dbError) throw dbError;

      setImages(prev => [dbData[0], ...prev]);
      toast.success('Fotografía procesada, comprimida y subida con éxito', { id: 'upload' });
    } catch (err) {
      console.error('Error en carga de archivo:', err);
      toast.error(err.message || 'Error durante la carga y compresión', { id: 'upload' });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Función de compresión con Canvas
  const compressImage = (file, maxWidth, quality) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Error en compresión de imagen'));
          },
          'image/webp',
          quality
        );
      };
      img.onerror = (err) => reject(err);
    });
  };

  // 3. Eliminar registro y archivo físico de Storage
  const handleDeleteImage = async (idToRemove) => {
    try {
      // Encontrar la imagen a eliminar
      const imgToDelete = images.find(img => img.id === idToRemove);

      if (imgToDelete && imgToDelete.image_url) {
        const url = imgToDelete.image_url;
        // Validar si pertenece a Supabase Storage
        if (url.includes('/storage/v1/object/public/destinations/')) {
          const parts = url.split('/storage/v1/object/public/destinations/');
          if (parts.length > 1) {
            const filePath = parts[1];
            // Eliminar archivo físico de Supabase Storage
            await supabase.storage.from('destinations').remove([filePath]);
          }
        }
      }

      // Eliminar registro de la base de datos
      const { error } = await supabase
        .from('destination_galleries')
        .delete()
        .eq('id', idToRemove);

      if (error) throw error;

      setImages(prev => prev.filter(img => img.id !== idToRemove));
      toast.success('Imagen eliminada completamente de base de datos y almacenamiento');
    } catch (err) {
      console.error('Error eliminando imagen:', err);
      toast.error('Error al eliminar en Supabase');
    }
  };

  return (
    <div className="gallery-manager">
      <div className="dashboard-header">
        <div className="header-title">
          <h1>Gestor de Galerías de Destinos</h1>
          <p>Sube y estandariza fotografías en tiempo real hacia Supabase Database y Storage</p>
        </div>
      </div>

      <div className="gallery-manager-content">
        {/* Selector de Destinos */}
        <div className="countries-tabs glass-panel" style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '15px', marginBottom: '20px', borderRadius: '12px', background: 'rgba(0, 0, 0, 0.03)' }}>
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
                border: selectedCountry === dest.id ? 'none' : '1px solid rgba(0, 0, 0, 0.1)',
                background: selectedCountry === dest.id ? 'var(--color-primary)' : '#fff',
                color: selectedCountry === dest.id ? '#fff' : 'var(--color-text, #1e293b)',
                cursor: 'pointer',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s',
                boxShadow: selectedCountry === dest.id ? '0 4px 12px rgba(10, 15, 30, 0.2)' : '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <span>{dest.icon}</span> {dest.name}
            </button>
          ))}
        </div>

        {/* Panel de Carga y Estandarización */}
        <div className="form-upload-container glass-panel" style={{ padding: '25px', borderRadius: '12px', marginBottom: '25px' }}>
          <h2>Añadir contenido a {destinationsList.find(d => d.id === selectedCountry)?.name}</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
            {/* Opción A: Carga de Archivo Local (Compresión Automática) */}
            <div className="upload-box" style={{ padding: '20px', border: '2px dashed rgba(255,255,255,0.2)', borderRadius: '12px', textAlign: 'center', background: 'rgba(0,0,0,0.2)' }}>
              <span style={{ fontSize: '2.5rem' }}>📸</span>
              <h3 style={{ margin: '10px 0 5px', fontSize: '1.2rem', color: '#fff' }}>Carga Local de Imagen</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '15px' }}>
                Compresión automática a WebP ligero antes de subir a Supabase. Admite HEIC/iPhone.
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,.heic,.heif"
                style={{ display: 'none' }}
                id="file-input"
              />
              <label htmlFor="file-input" className="btn btn-primary" style={{ display: 'inline-block', cursor: 'pointer', padding: '10px 25px' }}>
                {isUploading ? 'Procesando...' : 'Seleccionar Imagen'}
              </label>
            </div>

            {/* Opción B: Carga de Video Local */}
            <div className="upload-box" style={{ padding: '20px', border: '2px dashed rgba(255,255,255,0.2)', borderRadius: '12px', textAlign: 'center', background: 'rgba(0,0,0,0.2)' }}>
              <span style={{ fontSize: '2.5rem' }}>🎥</span>
              <h3 style={{ margin: '10px 0 5px', fontSize: '1.2rem', color: '#fff' }}>Carga Local de Video</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '15px' }}>
                Formatos MP4, MOV o WebM. Límite de 25 MB para asegurar un rendimiento óptimo.
              </p>
              <input
                type="file"
                ref={videoInputRef}
                onChange={handleVideoUpload}
                accept="video/mp4,video/quicktime,video/webm,video/ogg"
                style={{ display: 'none' }}
                id="video-input"
              />
              <label htmlFor="video-input" className="btn btn-primary" style={{ display: 'inline-block', cursor: 'pointer', padding: '10px 25px' }}>
                {isUploading ? 'Procesando...' : 'Seleccionar Video'}
              </label>
            </div>
          </div>
        </div>

        {/* Rejilla de Imágenes Actuales */}
        <div className="current-gallery glass-panel" style={{ padding: '25px', borderRadius: '12px' }}>
          <h2>Imágenes Activas en Supabase Database ({images.length})</h2>
          
          {isLoading ? (
            <p style={{ color: 'var(--color-text-muted)', margin: '20px 0' }}>Cargando galería desde Supabase...</p>
          ) : images.length === 0 ? (
            <p style={{ color: 'var(--color-text-muted)', margin: '20px 0' }}>No hay imágenes configuradas para este destino en la base de datos.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
              {images.map((img) => (
                <div key={img.id} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '160px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                  {isVideoUrl(img.image_url) ? (
                    <video
                      src={img.image_url}
                      muted
                      playsInline
                      loop
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onMouseEnter={(e) => e.target.play().catch(() => {})}
                      onMouseLeave={(e) => e.target.pause()}
                    />
                  ) : (
                    <img src={img.image_url} alt="Destino" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                  <button
                    onClick={() => handleDeleteImage(img.id)}
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
                      fontWeight: 'bold',
                      zIndex: 10
                    }}
                    title="Eliminar elemento"
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
