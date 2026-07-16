FROM python:3.11-slim

WORKDIR /app

# Instalar dependencias
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código del backend
COPY backend /app/backend

# Crear el directorio público para las subidas de archivos en caso de que sea necesario montar volúmenes
RUN mkdir -p /app/frontend/public/uploads

WORKDIR /app/backend

# Exponer el puerto
EXPOSE 8000

# Comando para ejecutar FastAPI con Uvicorn para producción
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
