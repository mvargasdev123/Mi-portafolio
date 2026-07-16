from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
import shutil
import os
import uuid
from .auth import get_current_admin

router = APIRouter(
    prefix="/api/v1/upload",
    tags=["Uploads"]
)

# La ruta será absoluta basada en dónde se encuentra este archivo para evitar errores si ejecutas el comando desde otro lado
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
UPLOAD_DIR = os.path.join(BASE_DIR, "frontend", "public", "uploads")

@router.post("", status_code=status.HTTP_201_CREATED)
async def upload_image(file: UploadFile = File(...), current_admin=Depends(get_current_admin)):
    """Recibe una imagen y la guarda en la carpeta pública del frontend."""
    # Validación simple de que sea una imagen
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="El archivo no es una imagen válida.")
    
    # Crear carpeta si no existe
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    
    # Generar nombre único para evitar sobreescribir archivos con el mismo nombre
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4().hex}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    # Guardar archivo físicamente
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error guardando el archivo: {str(e)}")
        
    return {"url": f"/uploads/{unique_filename}"}
