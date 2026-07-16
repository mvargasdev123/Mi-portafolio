# Plan de Implementación: Frontend React Interactivo

## Enfoque Técnico
Se utilizará Vite para el andamiaje del proyecto React. Para el enrutamiento interno (SPA) usaremos `react-router-dom`. La comunicación con la API se gestionará mediante Custom Hooks (ej. `useProfile`, `useProjects`) para separar completamente la lógica de negocio de la capa visual. Todo el estilizado será Vanilla CSS3 avanzado para un control absoluto del diseño "premium", sin frameworks restrictivos.

## Estructura de Directorios (`src/`)
- `components/`: Componentes puros y reutilizables (Botones, Tarjetas, Spinners).
- `pages/`: Vistas completas (`Home.jsx`, `ProjectDetail.jsx`).
- `services/`: Lógica estricta de consumo de la API (`api.js`).
- `hooks/`: Custom Hooks para el manejo de estados asíncronos de la API.
- `styles/`: CSS global, variables de color y animaciones base.

## Secuencia de Ejecución
1. Inicializar Vite (`npm create vite@latest frontend -- --template react`) e instalar enrutador.
2. Configurar la paleta de colores globales y las tipografías modernas.
3. Construir la capa de red (`services/api.js`) apuntando a la API en `http://127.0.0.1:8000/api/v1`.
4. Crear los Custom Hooks para abstraer las llamadas a la API.
5. Maquetar la página `Home` conectándola a los hooks de Perfil, Experiencia y Habilidades.
6. Construir la grilla de proyectos y configurar la ruta dinámica de Detalle (`ProjectDetail`).
7. Construir y validar el Formulario de Contacto interactivo.
8. Refinamiento final de UI/UX (Glassmorphism, responsividad, y micro-animaciones).