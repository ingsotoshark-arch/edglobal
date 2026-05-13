import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';
import './Dashboard.css';

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('full_name, roles(name)')
        .eq('id', user.id)
        .single();
      
      if (data) {
        setUserName(data.full_name || user.email);
        setUserRole(data.roles?.name);
      }
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const isAdmin = userRole === 'Administrador';

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>EdGlobal ERP</h2>
          <span className="badge">{userRole || 'Admin'}</span>
        </div>
        
        <nav className="sidebar-nav">
          <Link 
            to="/admin/dashboard" 
            className={`nav-item ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
          >
            <span className="nav-icon">📊</span> Panel Principal
          </Link>
          <Link 
            to="/admin/dashboard/leads" 
            className={`nav-item ${location.pathname === '/admin/dashboard/leads' ? 'active' : ''}`}
          >
            <span className="nav-icon">👥</span> Prospectos (CRM)
          </Link>
          <Link 
            to="/admin/dashboard/gallery" 
            className={`nav-item ${location.pathname === '/admin/dashboard/gallery' ? 'active' : ''}`}
          >
            <span className="nav-icon">🖼️</span> Galerías de Destinos
          </Link>
          
          {isAdmin && (
            <>
              <Link 
                to="/admin/dashboard/users" 
                className={`nav-item ${location.pathname === '/admin/dashboard/users' ? 'active' : ''}`}
              >
                <span className="nav-icon">🛡️</span> Empleados
              </Link>
              <Link 
                to="/admin/dashboard/roles" 
                className={`nav-item ${location.pathname === '/admin/dashboard/roles' ? 'active' : ''}`}
              >
                <span className="nav-icon">🔑</span> Roles y Permisos
              </Link>
            </>
          )}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn" disabled={isLoggingOut}>
            <span className="nav-icon">🚪</span> 
            {isLoggingOut ? 'Saliendo...' : 'Cerrar Sesión'}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div className="topbar-welcome">
            Bienvenido al Panel de Control Corporativo
          </div>
          <div className="topbar-profile" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', fontWeight: 'bold' }}>
              {userName}
            </span>
            <div className="avatar">{userName ? userName.substring(0, 2).toUpperCase() : 'AD'}</div>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
