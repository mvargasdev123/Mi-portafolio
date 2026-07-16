import React from 'react';
import '../index.css';

const Hero = () => {
  return (
    <section className="hero-section" id="hero">
      {/* Elementos decorativos (WOW Factor) */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      
      <div className="hero-content animate-fade-in">
        <p className="greeting">Hola, soy</p>
        <h1 className="name text-gradient">Miguel Vargas</h1>
        
        <div className="title-wrapper">
          <h1 className="typing-effect typing-text">Full-Stack Developer</h1>
        </div>
        
        <p className="bio-short">
          Construyendo aplicaciones modernas, rápidas y altamente escalables.
          Especializado en la fusión de fuertes tecnologías tanto de backend como de frontend.
        </p>
        
        <div className="hero-buttons">
          <button 
            className="btn-primary" 
            onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}
          >
            Explorar Proyectos
          </button>
          <a href="https://github.com/mvargasdev123/mvargasdev123" target="_blank" rel="noreferrer" className="btn-secondary">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/miguel-angel-vargas-hernandez-a28bb841a/" target="_blank" rel="noreferrer" className="btn-secondary">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
