from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
import shutil
import os
import uuid
from .auth import get_current_admin

router = APIRouter(
    prefix="/api/v1/upload",
    tags=["Uploads"]
)

# La ruta será absoluta basada en dónde se encuentra este archivo para evitar errores
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
UPLOAD_DIR = os.path.join(BASE_DIR, "frontend", "public", "uploads")

@router.post("", status_code=status.HTTP_201_CREATED)
async def upload_image(file: UploadFile = File(...), current_admin=Depends(get_current_admin)):
    """Recibe una imagen con validación estricta de seguridad (Lista Blanca, Tamaño, Sanitización)."""
    
    # 1. Validación de extensión estricta (Lista Blanca)
    ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
    file_extension = os.path.splitext(file.filename)[1].lower()
    
    if file_extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400, 
            detail=f"Extensión no permitida. Solo se admiten: {', '.join(ALLOWED_EXTENSIONS)}"
        )
        
    # 2. Validación MIME type estricta
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="El tipo de archivo no coincide con una imagen válida.")
        
    # 3. Validación de Tamaño (Máximo 5MB)
    MAX_FILE_SIZE = 5 * 1024 * 1024 # 5 MB en bytes
    file.file.seek(0, 2)
    file_size = file.file.tell()
    file.file.seek(0) # Regresar el cursor al inicio para poder guardarlo
    
    if file_size > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="La imagen es demasiado grande. Tamaño máximo permitido: 5MB.")
    
    # Crear carpeta si no existe
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    
    # Sanitización: Generar nombre 100% aleatorio sin rastros del original
    unique_filename = f"{uuid.uuid4().hex}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    # Guardar archivo físicamente
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error guardando el archivo: {str(e)}")
        
    return {"url": f"/uploads/{unique_filename}"}
