from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from schemas import Project, ProjectCreate, ProjectUpdate
from .auth import get_current_admin

router = APIRouter(
    prefix="/api/v1/projects",
    tags=["Projects (CMS)"]
)

# ==========================================
# MOCK DATA
# ==========================================
MOCK_PROJECTS = [
    {
        "id": 1,
        "title": "API Backend Portafolio",
        "slug": "api-backend-portafolio",
        "short_description": "API RESTful robusta construida con FastAPI y protegida por JWT.",
        "content": "Desarrollo completo del backend siguiendo la metodología SDD, integrando validación estricta con Pydantic y seguridad de grado de producción.",
        "cover_image": "https://via.placeholder.com/800x400",
        "technologies": ["FastAPI", "Python", "JWT", "AWS"],
        "github_url": "https://github.com/mvargasdev/portafolio-api",
        "demo_url": "https://api.mvargasdev.online"
    },
    {
        "id": 2,
        "title": "Plataforma Asocolgi",
        "slug": "plataforma-asocolgi",
        "short_description": "Sistema de gestión integrado.",
        "content": "Desarrollado para optimizar los procesos de la compañía con un diseño moderno...",
        "cover_image": "https://via.placeholder.com/800x400",
        "technologies": ["React", "FastAPI", "PostgreSQL"],
        "github_url": None,
        "demo_url": None
    }
]

# ==========================================
# ENDPOINTS PÚBLICOS (Lectura)
# ==========================================
@router.get("", response_model=List[Project])
async def list_projects():
    """Obtiene la lista completa de proyectos (Público)."""
    return MOCK_PROJECTS

@router.get("/{slug}", response_model=Project)
async def get_project(slug: str):
    """Obtiene el detalle de un proyecto por su slug (Público)."""
    for p in MOCK_PROJECTS:
        if p["slug"] == slug:
            return p
    raise HTTPException(status_code=404, detail="Proyecto no encontrado")


# ==========================================
# ENDPOINTS PROTEGIDOS (Admin CMS - Requieren Token)
# ==========================================
@router.post("", response_model=Project, status_code=status.HTTP_201_CREATED)
async def create_project(project: ProjectCreate, current_admin=Depends(get_current_admin)):
    """Crea un nuevo proyecto. REQUIERE JWT válido."""
    new_project = project.model_dump()
    new_project["id"] = len(MOCK_PROJECTS) + 1
    MOCK_PROJECTS.append(new_project)
    return new_project

@router.put("/{slug}", response_model=Project)
async def update_project(slug: str, project_update: ProjectUpdate, current_admin=Depends(get_current_admin)):
    """Actualiza un proyecto existente. REQUIERE JWT válido."""
    for i, p in enumerate(MOCK_PROJECTS):
        if p["slug"] == slug:
            # Actualizamos solo los campos que fueron enviados
            updated_data = project_update.model_dump(exclude_unset=True)
            MOCK_PROJECTS[i].update(updated_data)
            return MOCK_PROJECTS[i]
    raise HTTPException(status_code=404, detail="Proyecto no encontrado")

@router.delete("/{slug}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(slug: str, current_admin=Depends(get_current_admin)):
    """Elimina un proyecto del portafolio. REQUIERE JWT válido."""
    for i, p in enumerate(MOCK_PROJECTS):
        if p["slug"] == slug:
            MOCK_PROJECTS.pop(i)
            return
    raise HTTPException(status_code=404, detail="Proyecto no encontrado")
