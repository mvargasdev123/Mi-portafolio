import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_check():
    """Prueba que el servidor arranca y el endpoint de salud funciona."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "message": "Servidor FastAPI corriendo y saludable."}

def test_get_profile():
    """Prueba que el perfil devuelve datos válidos."""
    response = client.get("/api/v1/profile")
    assert response.status_code == 200
    data = response.json()
    assert "name" in data
    assert data["name"] == "Miguel Vargas"

def test_get_skills():
    """Prueba que los skills devuelvan una lista."""
    response = client.get("/api/v1/skills")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_projects_public():
    """Prueba que la lista de proyectos sea pública."""
    response = client.get("/api/v1/projects")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) > 0

def test_get_project_not_found():
    """Prueba el manejo de errores (404) al buscar un proyecto inexistente."""
    response = client.get("/api/v1/projects/slug-invalido")
    assert response.status_code == 404

def test_login_success():
    """Prueba el login de administrador (camino feliz)."""
    response = client.post(
        "/api/v1/auth/login",
        data={"username": "admin", "password": "admin123"}
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

def test_login_failure():
    """Prueba el login con contraseña incorrecta (edge case)."""
    response = client.post(
        "/api/v1/auth/login",
        data={"username": "admin", "password": "wrongpassword"}
    )
    assert response.status_code == 401

def test_create_project_unauthorized():
    """Prueba que no se pueda crear un proyecto sin JWT (edge case)."""
    response = client.post(
        "/api/v1/projects",
        json={
            "title": "Test", 
            "slug": "test", 
            "short_description": "test",
            "content": "test", 
            "cover_image": "http://test.com",
            "technologies": []
        }
    )
    assert response.status_code == 401

def test_create_project_authorized():
    """Prueba la creación de un proyecto usando el JWT válido."""
    login_response = client.post(
        "/api/v1/auth/login",
        data={"username": "admin", "password": "admin123"}
    )
    token = login_response.json()["access_token"]
    
    response = client.post(
        "/api/v1/projects",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "title": "Test Project", 
            "slug": "test-project", 
            "short_description": "A test project",
            "content": "Test content", 
            "cover_image": "http://example.com/image.png",
            "technologies": ["Test"]
        }
    )
    assert response.status_code == 201
    assert response.json()["slug"] == "test-project"

def test_contact_form():
    """Prueba el envío correcto del formulario de contacto."""
    response = client.post(
        "/api/v1/contact",
        json={
            "name": "Reclutador",
            "email": "reclutador@empresa.com",
            "subject": "Oferta Laboral",
            "message": "Mensaje de prueba muy largo para pasar validacion"
        }
    )
    assert response.status_code == 200
    assert "success" in response.json()["status"]

def test_contact_form_invalid_email():
    """Prueba que el validador Pydantic bloquee un email falso (edge case)."""
    response = client.post(
        "/api/v1/contact",
        json={
            "name": "Spammer",
            "email": "not-an-email",
            "subject": "Spam",
            "message": "Hello world message long enough"
        }
    )
    assert response.status_code == 422 # Error de Pydantic
