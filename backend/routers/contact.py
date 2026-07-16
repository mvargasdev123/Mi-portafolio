from fastapi import APIRouter
from schemas import ContactMessage

router = APIRouter(
    prefix="/api/v1/contact",
    tags=["Contact"]
)

@router.post("", status_code=200)
async def send_contact_message(message: ContactMessage):
    """
    Recibe los datos del formulario de contacto del portafolio.
    (Actualmente es una simulación (mock). En el futuro se puede conectar
    a un servicio de mensajería como AWS SES o guardarlo en la Base de Datos).
    """
    # Aquí irá la lógica de Rate Limiting y envío de correo real.
    
    # Simulación de procesamiento exitoso:
    return {
        "status": "success", 
        "message": f"¡Gracias por contactarme, {message.name}! He recibido tu mensaje y te responderé pronto a {message.email}."
    }
