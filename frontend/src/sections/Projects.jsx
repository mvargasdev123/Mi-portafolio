import React from 'react';
import { useProjects } from '../hooks/useApi';

const Projects = () => {
  const { data: projects, loading, error } = useProjects();

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="section-title text-gradient" style={{textAlign: 'center', marginBottom: '3rem'}}>
          Mis Proyectos
        </h2>
        
        {loading ? (
           <div className="projects-grid">
             {[1, 2, 3].map(i => <div key={i} className="skeleton-box project-card glass-panel" style={{minHeight: '350px'}}></div>)}
           </div>
        ) : error ? (
           <p style={{textAlign: 'center', color: 'var(--accent-primary)'}}>Error cargando los proyectos.</p>
        ) : (
          <div className="projects-grid">
            {projects?.map(project => (
              <div key={project.slug} className="project-card glass-panel">
                <div className="project-image-placeholder">
                  {/* Aquí conectaremos la imagen real más adelante */}
                  <h3 className="project-placeholder-title">{project.title}</h3>
                </div>
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.short_description}</p>
                  
                  <div className="skill-tags" style={{marginTop: '1.5rem', marginBottom: '1.5rem'}}>
                    {project.technologies.map(tech => (
                       <span key={tech} className="skill-badge">{tech}</span>
                    ))}
                  </div>

                  <div className="project-links">
                     {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noreferrer" className="btn-secondary" aria-label={`Ver código en GitHub del proyecto ${project.title}`} style={{padding: '0.4rem 1rem', fontSize: '0.9rem'}}>
                          Código
                        </a>
                     )}
                     {project.demo_url && (
                        <a href={project.demo_url} target="_blank" rel="noreferrer" className="btn-primary" aria-label={`Ver demo interactiva del proyecto ${project.title}`} style={{padding: '0.4rem 1rem', fontSize: '0.9rem'}}>
                          Demo
                        </a>
                     )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
