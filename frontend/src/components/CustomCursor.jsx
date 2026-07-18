import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  // Posición original
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Físicas elásticas (spring) para un movimiento suave
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detectar si el dispositivo tiene cursor (ignorar móviles)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e) => {
      mouseX.set(e.clientX - 16); // Centrar el círculo de 32px
      mouseY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      // Detectar hover en elementos interactivos
      const tagName = e.target.tagName.toLowerCase();
      const isInteractive = ['a', 'button', 'input', 'textarea'].includes(tagName) || 
                            e.target.closest('.project-card') || 
                            e.target.closest('.tech-icon') ||
                            window.getComputedStyle(e.target).cursor === 'pointer';
                            
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  // Si es un dispositivo móvil, no renderizar nada
  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <motion.div
      className="custom-cursor"
      style={{
        translateX: cursorX,
        translateY: cursorY,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 99999,
        border: '1px solid var(--accent-primary)',
        boxShadow: '0 0 10px rgba(6, 182, 212, 0.4)'
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? 'rgba(6, 182, 212, 0.4)' : 'rgba(10, 15, 29, 0.1)',
        backdropFilter: isHovering ? 'blur(2px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.2 }}
    />
  );
};

export default CustomCursor;
