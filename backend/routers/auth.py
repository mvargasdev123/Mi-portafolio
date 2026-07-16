from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Annotated
from datetime import timedelta

import jwt
from core.security import (
    verify_password, 
    create_access_token, 
    ACCESS_TOKEN_EXPIRE_MINUTES, 
    get_password_hash,
    SECRET_KEY,
    ALGORITHM
)
from schemas import Token, TokenData

router = APIRouter(
    prefix="/api/v1/auth",
    tags=["Authentication"]
)

# Simularemos un usuario administrador en memoria (mock)
# Cuando integremos SQLModel en el futuro, esto consultará a la Base de Datos.
# NOTA: Para esta demo local, las credenciales válidas serán mvargasdev / 123Cosa123
FAKE_ADMIN_USER = {
    "username": "mvargasdev",
    "hashed_password": get_password_hash("123Cosa123"),
}

# OAuth2PasswordBearer le indica a FastAPI dónde obtener el token para las rutas protegidas
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

@router.post("/login", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    """
    Endpoint para autenticarse como administrador.
    (Solo requerido si quieres usar el CMS para gestionar proyectos).
    Recibe `username` y `password` y devuelve el JWT.
    """
    # Verificación de usuario
    if not form_data.username == FAKE_ADMIN_USER["username"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Verificación de contraseña contra el hash
    if not verify_password(form_data.password, FAKE_ADMIN_USER["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Si pasa las validaciones, generamos el JWT y lo devolvemos
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": form_data.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")

async def get_current_admin(token: Annotated[str, Depends(oauth2_scheme)]):
    """
    Dependencia que extrae y valida el JWT. Si es inválido, rechaza la petición.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciales inválidas o token expirado",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None or username != FAKE_ADMIN_USER["username"]:
            raise credentials_exception
        token_data = TokenData(username=username)
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expirado. Por favor, inicia sesión nuevamente para refrescar tu acceso.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.InvalidTokenError:
        raise credentials_exception
    return token_data
