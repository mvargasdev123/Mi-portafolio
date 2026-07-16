import React, { useState } from 'react';
import { sendContactMessage } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendContactMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title text-gradient" style={{textAlign: 'center', marginBottom: '3rem'}}>
        Hablemos
      </h2>
      <div className="contact-container">
        
        {/* Columna Izquierda: Foto y Datos */}
        <div className="contact-info glass-panel">
          <img 
            src="/foto_trabajo.jpg" 
            alt="Miguel Vargas" 
            className="profile-photo" 
            onError={(e) => {
              // Si la imagen no se encuentra en la ruta, mostramos un fallback
              e.target.src = "https://via.placeholder.com/200/131a2f/06b6d4?text=Foto+Pendiente";
            }} 
          />
          <h3 style={{fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)'}}>Miguel Vargas</h3>
          <p className="contact-email">mvargashernandez234@gmail.com</p>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <a href="https://www.linkedin.com/in/miguel-angel-vargas-hernandez-a28bb841a/" target="_blank" rel="noreferrer" className="btn-secondary" style={{padding: '0.5rem 1rem'}}>LinkedIn</a>
            <a href="https://github.com/mvargasdev123/mvargasdev123" target="_blank" rel="noreferrer" className="btn-secondary" style={{padding: '0.5rem 1rem'}}>GitHub</a>
          </div>
        </div>

        {/* Columna Derecha: Formulario */}
        <form className="contact-form glass-panel" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Nombre</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              className="form-input" 
              placeholder="¿Cómo te llamas?"
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="email">Correo Electrónico</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="form-input" 
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="message">Mensaje</label>
            <textarea 
              id="message" 
              name="message" 
              className="form-input" 
              placeholder="Cuéntame sobre tu proyecto..."
              value={formData.message}
              onChange={handleChange}
              required 
            ></textarea>
          </div>
          
          <button type="submit" className="btn-primary" disabled={status === 'sending'} style={{marginTop: '1rem', width: '100%'}}>
            {status === 'sending' ? 'Enviando...' : status === 'success' ? '¡Mensaje Enviado!' : status === 'error' ? 'Error al enviar' : 'Enviar Mensaje'}
          </button>
        </form>
        
      </div>
    </section>
  );
};

export default Contact;
