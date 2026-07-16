from fastapi import APIRouter
from typing import List

from schemas import Profile, SkillCategory, Experience

router = APIRouter(
    prefix="/api/v1",
    tags=["Profile & Experience"]
)

# ==========================================
# MOCK DATA (Datos simulados)
# Estos diccionarios simulan lo que la Base de Datos devolverá.
# ==========================================

MOCK_PROFILE = {
    "name": "Miguel Vargas",
    "title": "Full-Stack Developer",
    "bio": "Desarrollador Full-Stack capaz de integrar arquitecturas Backend robustas con interfaces Frontend dinámicas. Apasionado por las buenas prácticas, la infraestructura en la nube y el aprendizaje continuo.",
    "github_url": "https://github.com/mvargasdev",
    "linkedin_url": "https://linkedin.com/in/mvargasdev",
    "email": "mvargashernandez234@gmail.com"
}

MOCK_SKILLS = [
    {
        "category": "Lenguajes",
        "skills": [
            {"name": "Python", "icon": "python"}, 
            {"name": "JavaScript", "icon": "js"}, 
            {"name": "TypeScript", "icon": "ts"},
            {"name": "Java", "icon": "java"}
        ]
    },
    {
        "category": "Herramientas & Frameworks",
        "skills": [
            {"name": "FastAPI", "icon": "fastapi"}, 
            {"name": "React", "icon": "react"}, 
            {"name": "Vite", "icon": "vite"}
        ]
    },
    {
        "category": "Infraestructura & Cloud",
        "skills": [
            {"name": "Linux", "icon": "linux"}, 
            {"name": "Docker", "icon": "docker"}, 
            {"name": "AWS", "icon": "aws"},
            {"name": "Git & Gitea", "icon": "git"}
        ]
    },
    {
        "category": "Bases de Datos",
        "skills": [
            {"name": "PostgreSQL", "icon": "postgres"}, 
            {"name": "MySQL", "icon": "mysql"},
            {"name": "SQLModel", "icon": "sql"}
        ]
    }
]

MOCK_EXPERIENCE = [
    {
        "id": 1,
        "title": "Desarrollador Full-Stack",
        "company": "Asocolgi (Proyecto Independiente)",
        "start_date": "2023-01-01",
        "end_date": None,
        "description": "Diseño, desarrollo y despliegue de una API en FastAPI conectada a un Frontend interactivo. Gestión completa de la arquitectura y la base de datos.",
        "is_education": False
    },
    {
        "id": 2,
        "title": "Desarrollador Web",
        "company": "OrusStyle",
        "start_date": "2022-01-01",
        "end_date": "2022-12-31",
        "description": "Desarrollo de plataforma e-commerce / landing page enfocada en conversión y diseño responsivo.",
        "is_education": False
    },
    {
        "id": 3,
        "title": "Homelab & Second Brain",
        "company": "Proyectos de Infraestructura y Gestión de Conocimiento",
        "start_date": "2021-01-01",
        "end_date": None,
        "description": "Despliegue y administración de un servidor local (Ubuntu Server) configurando una nube privada y control de versiones propio con Gitea. Gestión integral de documentación técnica y apuntes mediante una arquitectura de 'Segundo Cerebro' en Obsidian.",
        "is_education": True
    }
]

# ==========================================
# ENDPOINTS
# ==========================================

@router.get("/profile", response_model=Profile)
async def get_profile():
    """Devuelve la información biográfica básica y enlaces a redes."""
    return MOCK_PROFILE

@router.get("/skills", response_model=List[SkillCategory])
async def get_skills():
    """Devuelve los cuadrantes de habilidades técnicas del desarrollador."""
    return MOCK_SKILLS

@router.get("/experience", response_model=List[Experience])
async def get_experience():
    """Devuelve la línea de tiempo de experiencia laboral y estudios."""
    return MOCK_EXPERIENCE
