import React from 'react';
import { useSkills } from '../hooks/useApi';

const SkillGrid = () => {
  const { data: skills, loading, error } = useSkills();

  // Estado de carga visual (Skeleton)
  if (loading) {
    return (
      <div className="skill-grid">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="skeleton-box quadrant glass-panel"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p style={{color: 'var(--accent-primary)'}}>No se pudieron cargar las habilidades.</p>;
  }

  // Mapeo para dar un icono visual a cada cuadrante
  const categoryIcons = {
    "Lenguajes": "💻",
    "Frameworks & Librerías": "⚛️",
    "Bases de Datos": "🗄️",
    "Infraestructura & DevOps": "☁️"
  };

  return (
    <div className="skill-grid">
      {skills?.map((category) => (
        <div key={category.category} className="quadrant glass-panel">
          <h3 className="quadrant-title">
            <span className="quadrant-icon">{categoryIcons[category.category] || "🔧"}</span>
            {category.category}
          </h3>
          <div className="skill-tags">
            {category.skills?.map(skill => (
              <span key={skill.name} className="skill-badge">{skill.name}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillGrid;
