from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import date

# -----------------
# AUTH & TOKENS
# -----------------
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# -----------------
# PROFILE
# -----------------
class ProfileBase(BaseModel):
    name: str
    title: str
    bio: str
    github_url: str
    linkedin_url: str
    email: EmailStr

class Profile(ProfileBase):
    pass

# -----------------
# SKILLS
# -----------------
class Skill(BaseModel):
    name: str
    icon: Optional[str] = None

class SkillCategory(BaseModel):
    category: str
    skills: List[Skill]

# -----------------
# EXPERIENCE
# -----------------
class ExperienceBase(BaseModel):
    title: str
    company: str
    start_date: date
    end_date: Optional[date] = None
    description: str
    is_education: bool = False

class ExperienceCreate(ExperienceBase):
    pass

class Experience(ExperienceBase):
    id: int

# -----------------
# PROJECTS
# -----------------
class ProjectBase(BaseModel):
    title: str
    slug: str
    short_description: str
    content: str
    cover_image: str
    technologies: List[str]
    github_url: Optional[str] = None
    demo_url: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    short_description: Optional[str] = None
    content: Optional[str] = None
    cover_image: Optional[str] = None
    technologies: Optional[List[str]] = None
    github_url: Optional[str] = None
    demo_url: Optional[str] = None

class Project(ProjectBase):
    id: int

# -----------------
# CONTACT (Eliminado, ahora se usa el modelo de SQLModel directamente en models.py)
# -----------------
