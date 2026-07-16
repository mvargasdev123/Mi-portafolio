import React, { useState, useEffect } from 'react';
import { uploadImage } from '../services/api';

const ProjectForm = ({ initialData, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    short_description: '',
    content: '',
    cover_image: '',
    technologies: '', 
    github_url: '',
    demo_url: ''
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        technologies: initialData.technologies?.join(', ') || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setIsUploading(true);
      try {
        const data = await uploadImage(file);
        setFormData(prev => ({ ...prev, cover_image: data.url }));
      } catch (error) {
        alert('Error al subir la imagen. Verifica que el backend soporte subidas.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t !== '')
    };
    
    if (!submissionData.cover_image) {
      submissionData.cover_image = "https://via.placeholder.com/800x400/131a2f/06b6d4?text=Proyecto";
    }
    
    onSubmit(submissionData);
  };

  return (
    <form className="admin-form glass-panel animate-fade-in" onSubmit={handleSubmit}>
      <h3 className="text-gradient" style={{marginBottom: '1.5rem', fontSize: '1.8rem'}}>
        {initialData ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}
      </h3>
      
      <div className="form-group">
        <label className="form-label" htmlFor="input-title">Título del Proyecto</label>
        <input type="text" id="input-title" name="title" className="form-input" value={formData.title} onChange={handleChange} required placeholder="Ej: E-Commerce React" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="input-slug">Slug (URL amigable)</label>
        <input type="text" id="input-slug" name="slug" className="form-input" value={formData.slug} onChange={handleChange} required disabled={!!initialData} placeholder="ej: e-commerce-react" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="input-short-desc">Descripción Corta (Aparece en la tarjeta)</label>
        <input type="text" id="input-short-desc" name="short_description" className="form-input" value={formData.short_description} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="input-content">Contenido Detallado</label>
        <textarea id="input-content" name="content" className="form-input" value={formData.content} onChange={handleChange} required style={{minHeight: '120px'}}></textarea>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="input-technologies">Tecnologías (separadas por comas)</label>
        <input type="text" id="input-technologies" name="technologies" className="form-input" value={formData.technologies} onChange={handleChange} placeholder="React, Node.js, MongoDB" required />
      </div>
      
      <div 
        className="form-group"
        onDragOver={handleDragOver} 
        onDragLeave={handleDragLeave} 
        onDrop={handleDrop}
        style={{
          border: isDragging ? '2px dashed var(--accent-primary)' : '2px dashed transparent',
          padding: '1rem',
          margin: '-1rem',
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          background: isDragging ? 'rgba(6, 182, 212, 0.05)' : 'transparent'
        }}
      >
        <label className="form-label" htmlFor="input-cover">
          URL Imagen de Portada (Opcional) 
          {isUploading && <span style={{color: 'var(--accent-primary)', fontSize: '0.8rem', marginLeft: '0.5rem'}}>⏳ Subiendo foto...</span>}
        </label>
        <div style={{position: 'relative'}}>
          <input type="text" id="input-cover" name="cover_image" className="form-input" value={formData.cover_image || ''} onChange={handleChange} placeholder="https://dominio.com/imagen.jpg o arrastra tu foto aquí..." disabled={isUploading} />
          {isDragging && (
            <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(6,182,212,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', pointerEvents: 'none'}}>
              <strong style={{color: 'var(--accent-primary)'}}>Suelta la imagen aquí para subirla</strong>
            </div>
          )}
        </div>
      </div>

      <div style={{display: 'flex', gap: '1rem', marginTop: '0.5rem'}}>
        <div className="form-group" style={{flex: 1}}>
          <label className="form-label" htmlFor="input-github">URL del Repositorio (GitHub)</label>
          <input type="url" id="input-github" name="github_url" className="form-input" value={formData.github_url || ''} onChange={handleChange} />
        </div>
        <div className="form-group" style={{flex: 1}}>
          <label className="form-label" htmlFor="input-demo">URL del Proyecto Vivo (Demo)</label>
          <input type="url" id="input-demo" name="demo_url" className="form-input" value={formData.demo_url || ''} onChange={handleChange} />
        </div>
      </div>

      <div style={{display: 'flex', gap: '1rem', marginTop: '2rem'}}>
        <button type="submit" className="btn-primary" disabled={loading} style={{flex: 1}}>
          {loading ? 'Guardando...' : 'Guardar Proyecto'}
        </button>
        <button type="button" className="btn-secondary" onClick={onCancel} style={{flex: 1}}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
