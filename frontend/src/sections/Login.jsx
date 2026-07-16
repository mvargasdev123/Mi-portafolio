import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await loginAdmin(username, password);
      // Si el login es exitoso, redirigimos al dashboard del administrador
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError('Credenciales incorrectas o error en el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section animate-fade-in">
      {/* Añadimos un orbe de fondo para mantener la estética Cyberpunk */}
      <div className="bg-orb orb-1" style={{top: '5%', left: '5%', filter: 'blur(150px)', opacity: '0.3'}}></div>
      
      <div className="login-container glass-panel">
        <h2 className="section-title text-gradient" style={{textAlign: 'center', marginBottom: '1.5rem', fontSize: '2rem'}}>
          Acceso Restringido
        </h2>
        
        {!showForgotPassword ? (
          <form className="login-form" onSubmit={handleLogin}>
            {error && <p className="error-message">{error}</p>}
            
            <div className="form-group">
              <label className="form-label">Usuario</label>
              <input 
                type="text" 
                className="form-input" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <input 
                type="password" 
                className="form-input" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            
            <button type="submit" className="btn-primary" disabled={loading} style={{marginTop: '1.5rem'}}>
              {loading ? 'Verificando...' : 'Ingresar al Dashboard'}
            </button>
            
            <button 
              type="button" 
              className="btn-link" 
              onClick={() => setShowForgotPassword(true)}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </form>
        ) : (
          <div className="forgot-password-view animate-fade-in">
            <p style={{color: 'var(--text-secondary)', marginBottom: '1.5rem', textAlign: 'center', lineHeight: '1.6'}}>
              Ingresa el correo electrónico asociado a tu cuenta de administrador. Te enviaremos un enlace seguro para restablecer tu contraseña.
            </p>
            
            <div className="form-group">
              <label className="form-label">Correo de Recuperación</label>
              <input type="email" className="form-input" placeholder="tucorreo@gmail.com" />
            </div>
            
            <button className="btn-primary" style={{marginTop: '1.5rem', width: '100%'}}>
              Enviar Enlace
            </button>
            
            <button 
              type="button" 
              className="btn-link" 
              onClick={() => setShowForgotPassword(false)}
            >
              ← Volver al inicio de sesión
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;
