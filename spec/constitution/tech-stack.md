# Tech Stack: Portafolio mvargasdev.online

## Frontend (Interfaz de Usuario)
- **Librería Principal:** React (Componentes funcionales y Hooks).
- **Herramienta de Build:** Vite (arranque rápido del servidor de desarrollo).
- **Estilos:** CSS3 Vanilla (diseño responsivo y UI/UX estricto, sin frameworks externos de diseño salvo aprobación previa).

## Backend (API & Lógica de Negocio)
- **Framework:** FastAPI (Python 3.10+).
- **ORM / Gestión de Datos:** SQLModel + Motor de base de datos relacional (PostgreSQL/MySQL adaptado a AWS Free Tier).
- **Servidor ASGI:** Uvicorn.

## Infraestructura y Despliegue
- **Entorno Local:** Arch Linux / Ubuntu Server.
- **Contenedores:** Docker (para empaquetar la API de manera aislada antes del despliegue).
- **Hosting / Nube:** AWS (Capa gratuita - configuración mínima indispensable para no generar costes).
- **Dominio:** mvargasdev.online (Gestión de DNS pendiente).

## Convenciones de Desarrollo
- La carpeta `spec/` y sus archivos actúan como el cerebro y memoria persistente del proyecto[cite: 1].
- Prohibida la instalación de dependencias de npm o pip que no figuren en los requerimientos sin autorización explícita.