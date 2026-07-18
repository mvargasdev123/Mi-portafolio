import React from 'react';
import { useProjects } from '../hooks/useApi';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Project3DCard = ({ project }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card glass-panel"
    >
      <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d", height: "100%", display: "flex", flexDirection: "column" }}>
        <div className="project-image-placeholder" style={{ transform: "translateZ(30px)", boxShadow: "0 15px 25px rgba(0,0,0,0.4)" }}>
          {/* Aquí conectaremos la imagen real más adelante */}
          <h3 className="project-placeholder-title" style={{ transform: "translateZ(20px)" }}>{project.title}</h3>
        </div>
        <div className="project-info" style={{ transform: "translateZ(20px)", flex: 1, display: "flex", flexDirection: "column" }}>
          <h3 className="project-title" style={{ transform: "translateZ(15px)" }}>{project.title}</h3>
          <p className="project-desc" style={{ transform: "translateZ(10px)" }}>{project.short_description}</p>
          
          <div className="skill-tags" style={{marginTop: 'auto', marginBottom: '1.5rem', transform: "translateZ(25px)"}}>
            {project.technologies.map(tech => (
               <span key={tech} className="skill-badge">{tech}</span>
            ))}
          </div>

          <div className="project-links" style={{ transform: "translateZ(35px)" }}>
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
    </motion.div>
  );
};

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
              <Project3DCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
