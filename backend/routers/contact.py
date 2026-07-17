from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from typing import List
from models import ContactMessage
from database import get_session
from .auth import get_current_admin

router = APIRouter(
    prefix="/api/v1/contact",
    tags=["Contact"]
)

@router.post("", status_code=200)
async def send_contact_message(message: ContactMessage, session: Session = Depends(get_session)):
    """Recibe los datos del formulario de contacto y los guarda en la base de datos."""
    session.add(message)
    session.commit()
    
    return {
        "status": "success", 
        "message": f"¡Gracias por contactarme, {message.name}! He recibido tu mensaje y te responderé pronto a {message.email}."
    }

@router.get("", response_model=List[ContactMessage])
async def list_messages(session: Session = Depends(get_session), current_admin=Depends(get_current_admin)):
    """Obtiene todos los mensajes de contacto (Solo Administrador)."""
    messages = session.exec(select(ContactMessage).order_by(ContactMessage.created_at.desc())).all()
    return messages
