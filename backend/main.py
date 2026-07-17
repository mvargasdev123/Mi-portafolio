from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from routers import auth, profile, projects, upload, contact
from database import create_db_and_tables

app = FastAPI(
    title="Portafolio API",
    description="API para el portafolio web personal",
    version="1.0.0"
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# Configuración estricta de CORS para Frontend y producción
origins = [
    "http://localhost:5173",  # Vite default
    "https://mvargasdev.online",
    "https://www.mvargasdev.online",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Tipado de respuesta usando Pydantic para seguir las reglas de calidad
class HealthResponse(BaseModel):
    status: str
    message: str

@app.get("/api/v1/health", response_model=HealthResponse, tags=["Health"])
async def health_check() -> HealthResponse:
    """
    Endpoint de pulso (Health check) para confirmar el estado del servidor.
    Requerido para la comprobación de salud del balanceador de carga de AWS.
    """
    return HealthResponse(status="ok", message="Servidor FastAPI corriendo y saludable.")

# ==========================================
# REGISTRO DE ROUTERS
# ==========================================
app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(projects.router)
app.include_router(upload.router)
app.include_router(contact.router)
