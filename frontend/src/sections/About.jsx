import React from 'react';
import { useProfile, useExperience } from '../hooks/useApi';
import SkillGrid from '../components/SkillGrid';

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
              {experience?.map((exp) => (
                <div key={exp.id} className="timeline-item glass-panel">
                  <h4 className="timeline-role">{exp.title}</h4>
                  <p className="timeline-company">{exp.company} | {exp.start_date} - {exp.end_date || 'Presente'}</p>
                  <p className="timeline-desc">{exp.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA: Grilla de Habilidades */}
        <div className="about-skills">
          <h2 className="section-title text-gradient">Habilidades</h2>
          <SkillGrid />
        </div>
        
      </div>
    </section>
  );
};

export default About;
