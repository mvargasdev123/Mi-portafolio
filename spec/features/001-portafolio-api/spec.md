# Spec: API Backend (FastAPI) para Portafolio

## Descripción
Construcción de una API RESTful robusta y documentada automáticamente, encargada de servir los datos dinámicos al frontend (React), gestionar las solicitudes de contacto y proporcionar un panel de administración seguro para gestionar el contenido. Se desplegará bajo el dominio `mvargasdev.online`.

## Requerimientos Funcionales (Endpoints)
**Públicos:**
- **`GET /api/v1/health`**: Un endpoint de "pulso" para balanceadores de carga.
- **`GET /api/v1/profile`**: Devuelve la información biográfica básica y redes.
- **`GET /api/v1/skills`**: Devuelve las habilidades (Lenguajes, Herramientas, Entornos, Infraestructura).
- **`GET /api/v1/experience`**: Línea de tiempo de experiencia laboral y estudios.
- **`GET /api/v1/projects`**: Lista de proyectos con soporte para paginación y filtros.
- **`GET /api/v1/projects/{slug}`**: Vista detallada de un proyecto.
- **`POST /api/v1/contact`**: Envío de mensajes con validación estricta y Rate Limiting.

**Protegidos (Admin con JWT):**
- **`POST /api/v1/auth/login`**: Generación de token JWT para el administrador.
- **`POST / PUT / DELETE /api/v1/projects`**: CRUD para gestionar proyectos.
- **`POST / PUT / DELETE /api/v1/experience`**: CRUD para experiencia/estudios.

## Criterios de Aceptación (Verificación)
- Documentación interactiva (Swagger UI) 100% funcional en `/docs`.
- Inputs y outputs tipados y validados usando Pydantic.
- Autenticación JWT implementada y requerida para endpoints de escritura.
- Políticas de CORS configuradas estrictamente.
- Inyección de dependencias (Depends) para manejo de sesión de base de datos y seguridad.