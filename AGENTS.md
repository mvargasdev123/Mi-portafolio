# Portafolio Web Full-Stack (mvargasdev.online)
Aplicación web para mi portafolio profesional, compuesto por un frontend en React y una API backend robusta en Python desplegada en la nube.

## Stack
Frontend: React, HTML5, CSS3, JavaScript/TypeScript.
Backend: Python 3+, FastAPI.
Base de datos: AWS (Capa gratuita - RDS PostgreSQL/MySQL u otra opción serverless).
Dominio y Hosting: mvargasdev.online

## Comandos
Backend: `fastapi dev backend/main.py` (arranca el servidor de desarrollo en local).
Frontend: `npm run dev` (arranca el entorno de desarrollo de React).

## Estructura del proyecto
frontend/    Todo lo relacionado a la vista visual en React.
backend/     API, rutas, modelos y lógica de negocio.
spec/        Documentación SDD y especificaciones.

## Convenciones
- Frontend: Componentes funcionales de React.
- Backend: Tipado estricto en Python. Rutas claras y documentadas automáticamente por FastAPI.
- AWS: Minimizar el uso de recursos para mantenernos estrictamente en la capa gratuita.
- General: La documentación es la única fuente de la verdad.

## No hagas
- NO inventes librerías ni frameworks que no estén definidos.
- NO instales dependencias de npm o pip sin mi autorización.
- NO toques la carpeta `spec/` para modificar el código.

## Flujo de trabajo
Antes de una tarea no trivial, propón un plan y espera mi OK.
Una tarea a la vez; al terminar, dime qué cambiaste para que lo revise.
Si no estás seguro al 80%, pregunta. No inventes.