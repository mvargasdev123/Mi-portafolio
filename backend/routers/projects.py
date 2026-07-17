from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlmodel import Session, select

from schemas import ProjectCreate, ProjectUpdate
from models import Project
from database import get_session
from .auth import get_current_admin

router = APIRouter(
    prefix="/api/v1/projects",
    tags=["Projects (CMS)"]
)

# ==========================================
# ENDPOINTS PÚBLICOS (Lectura)
# ==========================================
@router.get("", response_model=List[Project])
def list_projects(session: Session = Depends(get_session)):
    """Obtiene la lista completa de proyectos (Público)."""
    projects = session.exec(select(Project)).all()
    return projects

@router.get("/{slug}", response_model=Project)
def get_project(slug: str, session: Session = Depends(get_session)):
    """Obtiene el detalle de un proyecto por su slug (Público)."""
    project = session.exec(select(Project).where(Project.slug == slug)).first()
    if not project:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
    return project

# ==========================================
# ENDPOINTS PROTEGIDOS (Admin CMS - Requieren Token)
# ==========================================
@router.post("", response_model=Project, status_code=status.HTTP_201_CREATED)
def create_project(project: ProjectCreate, session: Session = Depends(get_session), current_admin=Depends(get_current_admin)):
    """Crea un nuevo proyecto. REQUIERE JWT válido."""
    # Verificar si el slug ya existe
    existing = session.exec(select(Project).where(Project.slug == project.slug)).first()
    if existing:
        raise HTTPException(status_code=400, detail="El slug ya está en uso")
        
    db_project = Project.model_validate(project)
    session.add(db_project)
    session.commit()
    session.refresh(db_project)
    return db_project

@router.put("/{slug}", response_model=Project)
def update_project(slug: str, project_update: ProjectUpdate, session: Session = Depends(get_session), current_admin=Depends(get_current_admin)):
    """Actualiza un proyecto existente. REQUIERE JWT válido."""
    db_project = session.exec(select(Project).where(Project.slug == slug)).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
        
    project_data = project_update.model_dump(exclude_unset=True)
    for key, value in project_data.items():
        setattr(db_project, key, value)
        
    session.add(db_project)
    session.commit()
    session.refresh(db_project)
    return db_project

@router.delete("/{slug}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(slug: str, session: Session = Depends(get_session), current_admin=Depends(get_current_admin)):
    """Elimina un proyecto del portafolio. REQUIERE JWT válido."""
    db_project = session.exec(select(Project).where(Project.slug == slug)).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
        
    session.delete(db_project)
    session.commit()
    return

