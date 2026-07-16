# Plan de Implementación: API Backend (Arquitectura Extendida)

## Enfoque Técnico
La API se construirá utilizando FastAPI y el servidor Uvicorn. Se aplicará separación de responsabilidades usando routers. 
Se incluirá autenticación JWT para proteger las rutas de escritura (CMS), y se añadirán módulos para experiencia y habilidades. Inicialmente, las respuestas de lectura devolverán datos simulados (mock data) en memoria, los cuales más adelante serán sustituidos por consultas reales a AWS (SQLModel).

## Archivos a Modificar / Crear
Dentro de la carpeta `backend/`:
- `main.py`: Punto de entrada, configuración de FastAPI y CORS.
- `schemas.py`: Modelos de Pydantic para validación (Lectura, Escritura y Tokens).
- `core/security.py`: Lógica de hashing de contraseñas y generación de JWT.
- `routers/auth.py`: Endpoint de login y generación de tokens.
- `routers/profile.py`: Rutas públicas de perfil, habilidades y experiencia.
- `routers/projects.py`: Rutas públicas (GET) y protegidas (POST/PUT/DELETE) para proyectos.
- `routers/contact.py`: Lógica de recepción de mensajes (futuro Rate Limiting).

## Secuencia de Acción
1. **(Completado)** Configurar el esqueleto básico en `main.py` (CORS y `/health`).
2. Definir los modelos de validación base en `schemas.py`.
3. Implementar el módulo de seguridad (`core/security.py`) y el router de autenticación JWT.
4. Implementar los endpoints públicos de Perfil, Habilidades y Experiencia con datos mockeados.
5. Implementar el router de Proyectos (público y CRUD protegido con dependencias JWT).
6. Implementar el router de Contacto.
7. Conectar todos los routers en `main.py` y probar globalmente en Swagger.