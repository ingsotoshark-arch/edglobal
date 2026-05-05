import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { toast } from 'react-hot-toast';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modales
  const [showModal, setShowModal] = useState(null); // 'CREATE', 'EDIT_PASS', 'EDIT_META'
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Form States
  const [formEmail, setFormEmail] = useState('');
  const [formFullName, setFormFullName] = useState('');
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formRoleId, setFormRoleId] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch Roles for the dropdown
      const { data: rolesData } = await supabase.from('roles').select('*');
      setRoles(rolesData || []);

      // Fetch User Profiles with Role Join
      const { data: profilesData, error } = await supabase
        .from('profiles')
        .select(`
          id, email, full_name, username, created_at, role_id,
          roles (name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(profilesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminAction = async (action, payload) => {
    setActionLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-users', {
        body: { action, payload }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      toast.success('Operación completada con éxito');
      setShowModal(null);
      fetchData(); // Refresh
    } catch (error) {
      console.error('Admin action error:', error);
      toast.error('Error: ' + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async (user) => {
    if (user.username === 'ingsoto' || user.email === 'ing_soto@hotmail.com') {
      toast.error('No se puede dar de baja al administrador maestro.');
      return;
    }

    if (window.confirm(`¿Está seguro de que desea dar de baja a ${user.full_name}? Esta acción eliminará permanentemente su acceso y perfil.`)) {
      handleAdminAction('DELETE_USER', { targetUserId: user.id });
    }
  };

  const openCreateModal = () => {
    setFormEmail(''); setFormFullName(''); setFormUsername(''); setFormPassword(''); setFormRoleId(roles[0]?.id || '');
    setShowModal('CREATE');
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormEmail(user.email);
    setFormFullName(user.full_name || '');
    setFormUsername(user.username || '');
    setFormRoleId(user.role_id || '');
    setShowModal('EDIT_META');
  };

  const openPasswordModal = (user) => {
    setSelectedUser(user);
    setFormPassword('');
    setShowModal('EDIT_PASS');
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Nunca';
    const date = new Date(isoString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  if (loading) return <div>Cargando directorio de personal...</div>;

  return (
    <div className="users-manager">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Administración de Personal</h1>
        <button className="btn btn-primary" onClick={openCreateModal}>
          + Nuevo Empleado
        </button>
      </div>

      <div className="table-container glass-panel">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Empleado</th>
              <th>Usuario (ID)</th>
              <th>Correo Corporativo</th>
              <th>Rol Asignado</th>
              <th>Antigüedad</th>
              <th>Acciones (Admin)</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{user.full_name || 'Sin Nombre'}</td>
                <td style={{ fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <span className="badge" style={{ background: user.roles?.name === 'Administrador' ? '#fee2e2' : '#e0e7ff', color: user.roles?.name === 'Administrador' ? '#ef4444' : '#4f46e5' }}>
                    {user.roles?.name || 'Sin Asignar'}
                  </span>
                </td>
                <td>{formatDate(user.created_at)}</td>
                <td>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-view" onClick={() => openEditModal(user)}>Editar</button>
                    <button className="btn-view" style={{ borderColor: '#ef4444', color: '#ef4444' }} onClick={() => openPasswordModal(user)}>Llaves</button>
                    <button className="btn-view" style={{ borderColor: '#6b7280', color: '#6b7280' }} onClick={() => handleDeleteUser(user)}>Baja</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(null)}>
          <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {showModal === 'CREATE' && 'Alta de Nuevo Empleado'}
                {showModal === 'EDIT_META' && `Editar Datos de ${selectedUser?.full_name}`}
                {showModal === 'EDIT_PASS' && `Cambiar Contraseña a ${selectedUser?.full_name}`}
              </h2>
              <button className="close-btn" onClick={() => setShowModal(null)}>×</button>
            </div>
            
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {(showModal === 'CREATE' || showModal === 'EDIT_META') && (
                <>
                  <div className="form-group">
                    <label>Nombre Completo</label>
                    <input 
                      type="text" 
                      placeholder="Ej. Juan Pérez"
                      style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                      value={formFullName} 
                      onChange={e => setFormFullName(e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Usuario (ID para Login)</label>
                    <input 
                      type="text" 
                      placeholder="Ej. jperez (sin espacios)"
                      style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                      value={formUsername} 
                      onChange={e => setFormUsername(e.target.value.toLowerCase().replace(/\s/g, ''))} 
                    />
                    <small style={{ color: '#666', fontSize: '0.8rem' }}>Este será el nombre con el que inicien sesión.</small>
                  </div>
                  <div className="form-group">
                    <label>Correo Electrónico</label>
                    <input 
                      type="email" 
                      style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                      value={formEmail} 
                      onChange={e => setFormEmail(e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Rol del Sistema</label>
                    <select 
                      style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                      value={formRoleId} 
                      onChange={e => setFormRoleId(e.target.value)}
                    >
                      <option value="" disabled>Seleccione un rol</option>
                      {roles.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {(showModal === 'CREATE' || showModal === 'EDIT_PASS') && (
                <div className="form-group">
                  <label>Contraseña Temporal</label>
                  <input 
                    type="password" 
                    style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                    value={formPassword} 
                    onChange={e => setFormPassword(e.target.value)} 
                  />
                </div>
              )}

              <button 
                className="btn btn-primary btn-full" 
                style={{ marginTop: '10px' }}
                disabled={actionLoading}
                onClick={() => {
                  if (showModal === 'CREATE') {
                    if (!formUsername || !formFullName || !formEmail || !formPassword || !formRoleId) {
                      toast.error('Todos los campos son obligatorios.');
                      return;
                    }
                    handleAdminAction('CREATE_USER', { 
                      email: formEmail, 
                      username: formUsername, 
                      full_name: formFullName, 
                      password: formPassword, 
                      role_id: formRoleId 
                    });
                  } else if (showModal === 'EDIT_META') {
                    if (!formUsername || !formFullName || !formEmail || !formRoleId) {
                      toast.error('Todos los campos son obligatorios.');
                      return;
                    }
                    handleAdminAction('UPDATE_METADATA', { 
                      targetUserId: selectedUser.id, 
                      newEmail: formEmail, 
                      newUsername: formUsername, 
                      newFullName: formFullName, 
                      newRoleId: formRoleId 
                    });
                  } else if (showModal === 'EDIT_PASS') {
                    if (!formPassword) {
                      toast.error('Debe ingresar una nueva contraseña.');
                      return;
                    }
                    handleAdminAction('UPDATE_PASSWORD', { 
                      targetUserId: selectedUser.id, 
                      newPassword: formPassword 
                    });
                  }
                }}
              >
                {actionLoading ? 'Ejecutando...' : 'Confirmar Acción'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManager;
