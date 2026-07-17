from sqlmodel import SQLModel, Field, Column, JSON
from typing import List, Optional

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
