import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, createProject, updateProject, deleteProject, logoutAdmin, getMessages } from '../services/api';
import ProjectForm from '../components/ProjectForm';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error cargando proyectos del panel", error);
      // Si el error es 401, el interceptor de api.js ya borró el token, redirigimos
      if (error.response && error.response.status === 401) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  const handleDownloadMessages = async () => {
    try {
      const msgs = await getMessages();
      if (msgs.length === 0) {
        alert("No hay mensajes en la bandeja de entrada todavía.");
        return;
      }
      
      const headers = ["ID", "Fecha", "Nombre", "Correo", "Mensaje"];
      const csvRows = [headers.join(",")];
      
      for (const m of msgs) {
        const safeMessage = `"${m.message.replace(/"/g, '""').replace(/\n/g, " ")}"`;
        const row = [
          m.id,
          new Date(m.created_at).toLocaleString(),
          `"${m.name}"`,
          `"${m.email}"`,
          safeMessage
        ];
        csvRows.push(row.join(","));
      }
      
      const blob = new Blob([csvRows.join("\\n")], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `mensajes_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert("Error conectando con la base de datos de mensajes.");
    }
  };

  const handleDelete = async (slug) => {
    if (window.confirm('🚨 ¿Estás totalmente seguro de eliminar este proyecto? Esta acción no se puede deshacer.')) {
      try {
        await deleteProject(slug);
        setProjects(projects.filter(p => p.slug !== slug));
      } catch (error) {
        alert('Hubo un error al eliminar el proyecto. La sesión pudo haber expirado.');
      }
    }
  };

  const handleCreate = async (data) => {
    setActionLoading(true);
    try {
      await createProject(data);
      setIsCreating(false);
      await fetchProjects(); // Recargamos lista completa
    } catch (error) {
      alert('Error creando el proyecto. Verifica los datos.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    setActionLoading(true);
    try {
      await updateProject(data.slug, data);
      setEditingProject(null);
      await fetchProjects();
    } catch (error) {
      alert('Error actualizando el proyecto.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <section className="dashboard-section animate-fade-in" style={{padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh'}}>
      <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem'}}>
        <h1 className="text-gradient" style={{fontSize: '2.5rem', margin: 0}}>Panel de Administración</h1>
        <button className="btn-secondary" onClick={handleLogout}>Cerrar Sesión</button>
      </header>

      {isCreating || editingProject ? (
        <ProjectForm 
          initialData={editingProject} 
          onSubmit={isCreating ? handleCreate : handleUpdate} 
          onCancel={() => { setIsCreating(false); setEditingProject(null); }}
          loading={actionLoading}
        />
      ) : (
        <div className="admin-content">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
            <h2 style={{color: 'var(--text-primary)'}}>Tus Proyectos Públicos</h2>
            <div style={{display: 'flex', gap: '1rem'}}>
              <button className="btn-secondary" onClick={handleDownloadMessages} style={{background: 'var(--bg-card)', color: 'var(--primary-color)', border: '1px solid var(--primary-color)'}}>📥 Descargar CSV de Mensajes</button>
              <button className="btn-primary" onClick={() => setIsCreating(true)}>+ Nuevo Proyecto</button>
            </div>
          </div>
          
          {loading ? (
            <div className="skeleton-box" style={{height: '300px'}}></div>
          ) : (
            <div className="admin-table-container glass-panel" style={{padding: '0', overflowX: 'auto'}}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Slug</th>
                    <th>Tecnologías</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(project => (
                    <tr key={project.id}>
                      <td><strong style={{color: 'var(--text-primary)'}}>{project.title}</strong></td>
                      <td><span style={{background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px'}}>{project.slug}</span></td>
                      <td>
                        <div className="skill-tags" style={{gap: '0.5rem'}}>
                          {project.technologies.slice(0, 3).map(t => (
                            <span key={t} className="skill-badge" style={{fontSize: '0.7rem', padding: '0.2rem 0.5rem'}}>{t}</span>
                          ))}
                          {project.technologies.length > 3 && <span style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>+{project.technologies.length - 3}</span>}
                        </div>
                      </td>
                      <td style={{display: 'flex', gap: '0.5rem'}}>
                        <button className="btn-edit" onClick={() => setEditingProject(project)}>Editar</button>
                        <button className="btn-delete" onClick={() => handleDelete(project.slug)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                  {projects.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)'}}>No tienes proyectos subidos todavía. ¡Crea el primero!</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Dashboard;
