---
name: Animaciones y 3D en React (animaciones-js)
description: Guía de buenas prácticas y herramientas para implementar animaciones y efectos 3D en el portafolio (Three.js, React Three Fiber, Framer Motion).
---

# Animaciones y Efectos 3D Profesionales en React

Para que el portafolio se vea espectacular sin comprometer el rendimiento, nos apoyaremos en estas reglas de oro al utilizar animaciones en el frontend.

## 1. Tecnologías Recomendadas

- **React Three Fiber (R3F)**: Wrapper declarativo de `three.js` para React. Se utilizará para cualquier escena 3D compleja (como la esfera de tecnologías).
- **@react-three/drei**: Ecosistema de utilidades para R3F que agiliza la creación de texto, controles, cámaras y html renderizado dentro del canvas 3D.
- **Framer Motion**: Librería para animaciones declarativas de componentes React (transiciones, animaciones al hacer scroll, spring physics).
- **React Icons**: Para extraer íconos vectoriales de manera sencilla y liviana sin depender de imágenes o assets pesados.

## 2. Esfera 3D (TechSphere) - Best Practices

- **Rendimiento Visual**: En lugar de cargar texturas de alta resolución muy pesadas para cada logo, utiliza SVGs o mapeo de texturas simples optimizadas. 
- **Componente HTML en Canvas**: Usa el helper `Html` de `@react-three/drei` para mostrar los *tooltips* informativos (ej. "🐍 Python - Intermedio") encima de los modelos 3D sin tener que dibujar texto manualmente en WebGL, lo cual es complicado y costoso computacionalmente.
- **Lazy Loading**: Si el canvas 3D no está en el viewport principal o pesa mucho, impórtalo dinámicamente con `React.lazy` para no bloquear el First Contentful Paint.
- **Interacción**: Haz que la esfera rote lentamente por defecto (`useFrame` en R3F) y detén la rotación cuando el usuario pasa el mouse.

## 3. Framer Motion y Scroll (Scroll Suave)

- Para que los elementos aparezcan al bajar por la página, usa el hook `useInView` o componentes `whileInView` de Framer Motion. 
- **Microinteracciones**: No sobrecargues la vista. Usa transiciones sutiles en la opacidad (Fade) y posición (Slide Up, `y: 20` a `y: 0`).
- Respeta la jerarquía visual: el contenido principal debe aparecer primero; los elementos secundarios (decorativos) después.

## 4. Tarjetas 3D y Efectos de Inclinación

- Usa matemáticas simples (calculando la posición del cursor respecto al centro de la tarjeta) o librerías livianas que envuelvan el tilt (Framer Motion o `react-tilt` si se requiere) para hacer que los proyectos "salgan" de la pantalla.
- Añade sombras dinámicas (`box-shadow`) que cambien dependiendo de la posición del cursor.
- Si usas Glassmorphism (fondos semitransparentes con `backdrop-filter: blur()`), asegúrate de tener un color de respaldo por si el navegador no lo soporta.

## 5. Prevención de Pérdida de FPS

1. No uses animaciones CSS de propiedades como `width`, `height`, `top` o `left`. Solo anima `transform` (translates, scales, rotates) y `opacity`.
2. En Three.js, asegúrate de no estar re-instanciando geometrías o materiales en cada render. Decláralos fuera del bucle de animación.
3. Prueba la aplicación desde dispositivos de gama media-baja. El portafolio debe sentirse rápido.
