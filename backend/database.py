import os
from sqlmodel import create_engine, SQLModel, Session

# Si la variable de entorno DATABASE_URL existe (AWS RDS), usa esa. 
# De lo contrario, crea una base local en SQLite (perfecta para desarrollo).
DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./portfolio.db")

# AWS y SQLAlchemy prefieren postgresql:// en lugar de postgres://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Argumentos especiales para SQLite
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)

def create_db_and_tables():
    """Crea las tablas en la base de datos basándose en los modelos."""
    SQLModel.metadata.create_all(engine)

def get_session():
    """Inyecta la sesión de la DB en las peticiones de FastAPI."""
    with Session(engine) as session:
        yield session
