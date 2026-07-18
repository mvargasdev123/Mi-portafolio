import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, TrackballControls } from '@react-three/drei';
import * as THREE from 'three';
import { FaPython, FaHtml5, FaCss3Alt, FaJsSquare, FaGitAlt, FaGithub, FaLinux, FaAws, FaRocket, FaJava } from 'react-icons/fa';
import { SiMysql, SiFastapi, SiObsidian, SiSupabase, SiFlutter, SiPostgresql, SiMongodb } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { useProjects } from '../hooks/useApi';

const baseSkills = [
  { id: 'python', name: 'Python', icon: <FaPython size={40} color="#3776AB" />, emoji: '🐍', dynamic: true },
  { id: 'html5', name: 'HTML5', icon: <FaHtml5 size={40} color="#E34F26" />, emoji: '🌐', dynamic: true },
  { id: 'css3', name: 'CSS3', icon: <FaCss3Alt size={40} color="#1572B6" />, emoji: '🎨', dynamic: true },
  { id: 'js', name: 'JavaScript', icon: <FaJsSquare size={40} color="#F7DF1E" />, emoji: '⚡', dynamic: true },
  { id: 'fastapi', name: 'FastAPI', icon: <SiFastapi size={40} color="#009688" />, emoji: '🚀', dynamic: true },
  { id: 'mysql', name: 'MySQL', icon: <SiMysql size={40} color="#4479A1" />, emoji: '🗄️', dynamic: true },
  { id: 'git', name: 'Git', icon: <FaGitAlt size={40} color="#F05032" />, exp: 'Control de versiones', emoji: '🌿', dynamic: false },
  { id: 'github', name: 'GitHub', icon: <FaGithub size={40} color="#ffffff" />, exp: 'Repositorios en la nube', emoji: '🐙', dynamic: false },
  { id: 'vscode', name: 'Visual Studio Code', icon: <VscVscode size={40} color="#007ACC" />, exp: 'Editor principal', emoji: '💻', dynamic: false },
  { id: 'antigravity', name: 'Antigravity', icon: <FaRocket size={40} color="#FF4500" />, exp: 'Agentes de automatización AI', emoji: '🌌', dynamic: false },
  { id: 'supabase', name: 'Supabase', icon: <SiSupabase size={40} color="#3ECF8E" />, exp: 'Backend as a Service', emoji: '⚡', dynamic: false },
  { id: 'aws', name: 'AWS', icon: <FaAws size={40} color="#FF9900" />, exp: 'Despliegue en la nube', emoji: '☁️', dynamic: false },
  { id: 'obsidian', name: 'Obsidian', icon: <SiObsidian size={40} color="#7A3EE8" />, emoji: '📓', dynamic: true },
  { id: 'linux', name: 'Linux', icon: <FaLinux size={40} color="#FCC624" />, exp: 'Administración de servidores', emoji: '🐧', dynamic: false },
  
  // Habilidades ocultas que aparecerán automáticamente cuando agregues proyectos con estas etiquetas
  { id: 'java', name: 'Java', icon: <FaJava size={40} color="#007396" />, emoji: '☕', dynamic: true, hideIfZero: true },
  { id: 'flutter', name: 'Flutter', icon: <SiFlutter size={40} color="#02569B" />, emoji: '📱', dynamic: true, hideIfZero: true },
  { id: 'postgresql', name: 'PostgreSQL', icon: <SiPostgresql size={40} color="#336791" />, emoji: '🐘', dynamic: true, hideIfZero: true },
  { id: 'mongodb', name: 'MongoDB', icon: <SiMongodb size={40} color="#47A248" />, emoji: '🍃', dynamic: true, hideIfZero: true },
];

function SkillIcon({ skill, position, isHoveredGroup, setHoveredGroup }) {
  const isHovered = isHoveredGroup === skill.id;

  return (
    <group position={position}>
      <Html transform center sprite zIndexRange={[100, 0]}>
        <div 
          className="tech-icon-wrapper" 
          onPointerEnter={() => setHoveredGroup(skill.id)} 
          onPointerLeave={() => setHoveredGroup(null)}
        >
          <div className={`tech-icon ${isHovered ? 'hovered' : ''}`}>
            {skill.icon}
          </div>
        </div>
      </Html>
    </group>
  );
}

function Sphere({ setHoveredGroup, hoveredGroup, skills }) {
  const groupRef = useRef();

  const positions = useMemo(() => {
    const count = skills.length;
    const pos = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // ángulo dorado
    const radius = 2.8;

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; 
      const radiusAtY = Math.sqrt(1 - y * y);

      const theta = phi * i; 

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      pos.push(new THREE.Vector3(x * radius, y * radius, z * radius));
    }
    return pos;
  }, [skills.length]);

  useFrame(() => {
    if (groupRef.current && !hoveredGroup) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => (
        <SkillIcon 
          key={skill.id} 
          skill={skill} 
          position={positions[index]} 
          isHoveredGroup={hoveredGroup}
          setHoveredGroup={setHoveredGroup}
        />
      ))}
    </group>
  );
}

export default function TechSphere() {
  const [hoveredGroup, setHoveredGroup] = useState(null);
  const { data: projectsData } = useProjects();
  
  // Computar skills dinámicamente y filtrar las ocultas
  const skills = useMemo(() => {
    const computed = baseSkills.map(skill => {
      if (!skill.dynamic) return skill;
      
      let count = 0;
      if (projectsData) {
        projectsData.forEach(p => {
          if (p.technologies && p.technologies.some(t => t.toLowerCase() === skill.name.toLowerCase() || t.toLowerCase() === skill.id.toLowerCase())) {
            count++;
          }
        });
      }
      
      let expText = `${count} proyectos desarrollados`;
      if (count === 1) expText = `1 proyecto desarrollado`;
      
      return { ...skill, exp: expText, _count: count };
    });
    
    // Filtrar los que están marcados como hideIfZero y no tienen proyectos
    return computed.filter(s => !(s.hideIfZero && s._count === 0));
  }, [projectsData]);

  const hoveredSkill = skills.find(s => s.id === hoveredGroup);

  return (
    <div className="tech-sphere-container">
      {/* Panel de información centralizado para evitar superposiciones y desbordes */}
      <div className={`tech-info-panel glass-panel ${hoveredSkill ? 'visible' : 'hidden'}`}>
        {hoveredSkill && (
          <>
            <p className="tech-name">
              <span className="tech-emoji">{hoveredSkill.emoji}</span> {hoveredSkill.name}
            </p>
            <p className="tech-exp">{hoveredSkill.exp}</p>
          </>
        )}
      </div>

      <Canvas camera={{ position: [0, 0, 7.5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Sphere setHoveredGroup={setHoveredGroup} hoveredGroup={hoveredGroup} skills={skills} />
        <TrackballControls noZoom noPan rotateSpeed={2.0} />
      </Canvas>
    </div>
  );
}
