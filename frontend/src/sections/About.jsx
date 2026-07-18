import React from 'react';
import { useProfile, useExperience } from '../hooks/useApi';
import TechSphere from '../components/TechSphere';
import { motion } from 'framer-motion';

const formatDate = (dateString) => {
  if (!dateString) return 'Presente';
  // Formatear la fecha (ej: 2023-01-01 -> Ene 2023)
  const [year, month] = dateString.split('-');
  if (!year || !month) return dateString;
  const date = new Date(year, parseInt(month) - 1);
  return new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: 'short' }).format(date);
};

const About = () => {
  const { data: profile, loading: profileLoading } = useProfile();
  const { data: experience, loading: expLoading } = useExperience();

  return (
    <section id="about" className="about-section animate-fade-in">
      <div className="about-container">
        
        {/* COLUMNA IZQUIERDA: Biografía y Experiencia */}
        <div className="about-bio">
          <h2 className="section-title text-gradient">Sobre Mí</h2>
          
          {profileLoading ? (
            <div className="skeleton-text"></div>
          ) : (
            <div className="bio-content">
              <p>{profile?.bio}</p>
            </div>
          )}

          <h3 className="subsection-title">Experiencia Destacada</h3>
          {expLoading ? (
            <div className="skeleton-box" style={{minHeight: '300px'}}></div>
          ) : (
            <div className="timeline">
              {experience?.map((exp, index) => (
                <motion.div 
                  key={exp.id} 
                  className="timeline-item glass-panel"
                  initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2, 
                    type: "spring", 
                    stiffness: 100 
                  }}
                  whileHover={{ 
                    scale: 1.02, 
                    x: 10,
                    backgroundColor: "rgba(10, 15, 29, 0.95)",
                    boxShadow: "0 10px 25px -5px rgba(6, 182, 212, 0.2)"
                  }}
                >
                  <h4 className="timeline-role">{exp.title}</h4>
                  <p className="timeline-company">
                    {exp.company} <span style={{opacity: 0.5}}>|</span> <span style={{color: 'var(--accent-primary)'}}>{formatDate(exp.start_date)} - {formatDate(exp.end_date)}</span>
                  </p>
                  <p className="timeline-desc">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA: Esfera 3D de Tecnologías */}
        <div className="about-skills">
          <h2 className="section-title text-gradient">Habilidades</h2>
          <div style={{ width: '100%', height: '100%' }}>
            <TechSphere />
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default About;
