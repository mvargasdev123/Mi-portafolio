import React from 'react';
import { motion } from 'framer-motion';

const RevealOnScroll = ({ children, delay = 0, direction = 'up' }) => {
  // Configuración de direcciones para la animación
  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction]
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: [0.16, 1, 0.3, 1] // Curva de aceleración muy suave, estilo Apple/Premium
      }}
    >
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;
