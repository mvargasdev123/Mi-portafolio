import axios from 'axios';

// La URL base de la API FastAPI que construimos
const API_URL = 'http://127.0.0.1:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==========================================
// INTERCEPTORES (Seguridad JWT Automática)
// ==========================================

// 1. Inyectar el Token en cada petición automáticamente
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('portfolio_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 2. Interceptar el error 401 (Token Expirado)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si el backend nos avisa que el token expiró, limpiamos el localStorage
      localStorage.removeItem('portfolio_token');
    }
    return Promise.reject(error);
  }
);

// ==========================================
// ENDPOINTS PÚBLICOS (Visitantes)
// ==========================================
export const getProfile = () => apiClient.get('/profile').then(res => res.data);
export const getSkills = () => apiClient.get('/skills').then(res => res.data);
export const getExperience = () => apiClient.get('/experience').then(res => res.data);
export const getProjects = () => apiClient.get('/projects').then(res => res.data);
export const getProjectBySlug = (slug) => apiClient.get(`/projects/${slug}`).then(res => res.data);
export const sendContactMessage = (data) => apiClient.post('/contact', data).then(res => res.data);

// ==========================================
// ENDPOINTS PROTEGIDOS (Administrador)
// ==========================================
export const loginAdmin = async (username, password) => {
  // FastAPI OAuth2PasswordBearer espera 'application/x-www-form-urlencoded'
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);
  
  const response = await axios.post(`${API_URL}/auth/login`, formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  
  if (response.data.access_token) {
    localStorage.setItem('portfolio_token', response.data.access_token);
  }
  return response.data;
};

export const logoutAdmin = () => {
  localStorage.removeItem('portfolio_token');
};

export const createProject = (data) => apiClient.post('/projects', data).then(res => res.data);
export const updateProject = (slug, data) => apiClient.put(`/projects/${slug}`, data).then(res => res.data);
export const deleteProject = (slug) => apiClient.delete(`/projects/${slug}`).then(res => res.data);

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await apiClient.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};
