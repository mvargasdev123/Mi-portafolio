# Spec: Frontend React Interactivo (mvargasdev.online)

## Descripción
Interfaz de usuario del portafolio, construida como Single Page Application (SPA) en React. Diseño premium y profesional con paleta oscura (tonos azul medianoche con acentos rojizos). Esta aplicación consumirá de manera dinámica la API Backend construida en FastAPI.

## Requerimientos Visuales y Funcionales
- **Sección Hero:** Altura completa de pantalla con diseño vanguardista. Título "Full-Stack Developer", nombre "Miguel Vargas". Micro-animaciones en los botones principales.
- **Sección Proyectos:** Grilla interactiva. Consumirá `GET /api/v1/projects`. Cada tarjeta de proyecto redirigirá a una vista detallada.
- **Detalle de Proyecto:** Ruta dinámica `/project/:slug` que consume `GET /api/v1/projects/{slug}` para mostrar el contenido largo del proyecto.
- **Sección Perfil y Experiencia:** Consumirá `GET /api/v1/profile`, `GET /api/v1/skills` y `GET /api/v1/experience` para poblar dinámicamente la biografía y la línea de tiempo.
- **Formulario de Contacto:** Envíos a `POST /api/v1/contact` con manejo de estados de carga (spinners) y mensajes visuales de éxito/error.

## Integración con API
- Capa de servicios (`src/services/api.js`) centralizada para comunicación con el backend (Fetch nativo o Axios).
- Manejo asíncrono robusto: Toda vista que requiera datos debe tener un estado de carga "Esqueleto" (Skeleton Loader) mientras la API responde.

## Criterios de Aceptación Visual
- "WOW Effect": Animaciones fluidas, transiciones, hover states y uso de fuentes modernas (ej. Inter o Roboto). 
- Implementación de tendencias modernas (Glassmorphism sutil, gradientes suaves).
- Mobile First y accesibilidad impecable.