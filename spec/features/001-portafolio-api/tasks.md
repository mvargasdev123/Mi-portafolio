# Tareas: API Backend (FastAPI)

- [x] 1. Inicializar `backend/main.py` con una instancia básica de FastAPI y el endpoint `/health`.
- [x] 2. Configurar el middleware `CORSMiddleware` en `main.py` para permitir la comunicación con el frontend.
- [ ] 3. Crear `backend/schemas.py` para todos los modelos (Públicos y Auth).
- [ ] 4. Crear `backend/core/security.py` para manejo de contraseñas (bcrypt) y JWT.
- [ ] 5. Crear `backend/routers/auth.py` para el endpoint de login.
- [ ] 6. Crear `backend/routers/profile.py` con endpoints de perfil, habilidades y experiencia (mock).
- [ ] 7. Crear `backend/routers/projects.py` (GET públicos, y POST/PUT/DELETE protegidos con token).
- [ ] 8. Crear `backend/routers/contact.py` con endpoint POST.
- [ ] 9. Registrar todos los routers en `main.py` y verificar en `/docs`.