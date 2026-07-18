import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import MagneticButton from './MagneticButton';
import '../index.css';

const Hero = () => {
  // Parallax del mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 400 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Mover las orbes en dirección opuesta al mouse
  const orb1X = useTransform(springX, [-1, 1], [30, -30]);
  const orb1Y = useTransform(springY, [-1, 1], [30, -30]);
  
  const orb2X = useTransform(springX, [-1, 1], [-40, 40]);
  const orb2Y = useTransform(springY, [-1, 1], [-40, 40]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const xPct = (e.clientX / innerWidth) * 2 - 1; // -1 to 1
      const yPct = (e.clientY / innerHeight) * 2 - 1; // -1 to 1
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Variantes para la animación en cascada
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="hero-section" id="hero">
      {/* Elementos decorativos con Parallax */}
      <motion.div 
        className="bg-orb orb-1" 
        style={{ x: orb1X, y: orb1Y }}
      />
      <motion.div 
        className="bg-orb orb-2" 
        style={{ x: orb2X, y: orb2Y }}
      />
      
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={itemVariants} className="greeting">Hola, soy</motion.p>
        <motion.h1 variants={itemVariants} className="name text-gradient" style={{ display: 'inline-block' }}>
          Miguel Vargas
        </motion.h1>
        
        <motion.div variants={itemVariants} className="title-wrapper">
          <h1 className="typing-effect typing-text">Full-Stack Developer</h1>
        </motion.div>
        
        <motion.p variants={itemVariants} className="bio-short">
          Construyendo aplicaciones modernas, rápidas y altamente escalables.
          Especializado en la fusión de fuertes tecnologías tanto de backend como de frontend.
        </motion.p>
        
        <motion.div variants={itemVariants} className="hero-buttons">
          <MagneticButton>
            <button 
              className="btn-primary" 
              onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}
            >
              Explorar Proyectos
            </button>
          </MagneticButton>
          
          <MagneticButton>
            <a href="https://github.com/mvargasdev123/mvargasdev123" target="_blank" rel="noreferrer" className="btn-secondary">
              GitHub
            </a>
          </MagneticButton>

          <MagneticButton>
            <a href="https://www.linkedin.com/in/miguel-angel-vargas-hernandez-a28bb841a/" target="_blank" rel="noreferrer" className="btn-secondary">
              LinkedIn
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
