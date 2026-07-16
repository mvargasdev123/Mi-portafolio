# 👨‍💻 Portafolio Full-Stack Web (mvargasdev.online)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

Portafolio personal web altamente optimizado, desarrollado con una arquitectura Full-Stack moderna. Combina un frontend dinámico e interactivo construido con React.js, impulsado por una API robusta y rápida escrita en Python con FastAPI. 

## ✨ Características Principales

*   **Diseño Premium (Glassmorphism):** Interfaz inmersiva, modo oscuro con acentos Cyan/Púrpura y micro-animaciones (Scroll Reveal, Typing Effects).
*   **Mobile-First & Accesible:** 100% responsivo y testeado contra los estándares de accesibilidad `a11y` de web.dev.
*   **CMS Privado (Dashboard):** Sistema de administración oculto y protegido por JWT que permite crear, editar y eliminar proyectos sin tocar una sola línea de código.
*   **Upload de Archivos Drag & Drop:** Carga de imágenes nativa e intuitiva conectada al backend.
*   **Arquitectura DevOps:** Orquestación multicontenedor con Docker (Nginx + Uvicorn) listo para despliegue en AWS EC2 o VPS.

## 🏗️ Estructura del Proyecto

```text
├── backend/                  # Servidor FastAPI
│   ├── routers/              # Controladores (CRUD, Auth, Uploads)
│   ├── schemas.py            # Modelos Pydantic (Validación de Datos)
│   └── main.py               # Punto de entrada API
├── frontend/                 # Aplicación React + Vite
│   ├── src/                  
│   │   ├── components/       # Componentes reutilizables (Hero, Forms, ProtectedRoutes)
│   │   ├── sections/         # Secciones de la Landing Page
│   │   └── services/         # Cliente Axios (Intercepción de JWT)
├── docker-compose.yml        # Orquestación de contenedores
└── requirements.txt          # Dependencias de Python
```

## 🚀 Despliegue y Ejecución

### Opción 1: Desarrollo Local (Sin Docker)
1. **Backend:**
   ```bash
   pip install -r requirements.txt
   fastapi dev backend/main.py
   ```
2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Opción 2: Producción (Docker)
Asegúrate de tener Docker y Docker Compose instalados.
```bash
# Levantar toda la infraestructura en segundo plano
docker-compose up -d --build
```
*El frontend estará disponible en `http://localhost:80` y la API en `http://localhost:8000`.*

---
*Diseñado y Desarrollado por **Miguel Vargas**.*
