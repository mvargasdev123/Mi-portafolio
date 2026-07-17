from sqlmodel import SQLModel, Field, Column, JSON
from typing import List, Optional
from datetime import datetime

class Project(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    slug: str = Field(index=True, unique=True)
    short_description: str
    content: str
    cover_image: str
    # En SQLite y Postgres, mapeamos la lista a una columna JSON nativa
    technologies: List[str] = Field(default=[], sa_column=Column(JSON))
    github_url: Optional[str] = None
    demo_url: Optional[str] = None

class ContactMessage(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(min_length=2, max_length=100)
    email: str
    message: str = Field(min_length=10)
    created_at: datetime = Field(default_factory=datetime.utcnow)
