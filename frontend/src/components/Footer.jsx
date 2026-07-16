import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ 
      padding: '3rem 2rem 2rem 2rem', 
      textAlign: 'center', 
      borderTop: '1px solid var(--glass-border)', 
      marginTop: 'auto',
      background: 'var(--bg-primary)'
    }}>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} Miguel Vargas. Todos los derechos reservados.
      </p>
      
      <div style={{ marginTop: '1.5rem' }}>
        <Link 
          to="/admin/login" 
          style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '0.8rem', 
            textDecoration: 'none', 
            opacity: 0.3, 
            transition: 'opacity 0.3s ease, color 0.3s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.opacity = 1;
            e.currentTarget.style.color = 'var(--accent-primary)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.opacity = 0.3;
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          <span>🔒</span> Acceso Restringido
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
