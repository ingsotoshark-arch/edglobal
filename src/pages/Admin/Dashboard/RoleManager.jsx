import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { toast } from 'react-hot-toast';

const RoleManager = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('roles')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setRoles(data || []);
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRole = async () => {
    try {
      if (editingRole) {
        const { error } = await supabase
          .from('roles')
          .update({ name: formName, description: formDescription })
          .eq('id', editingRole.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('roles')
          .insert([{ name: formName, description: formDescription }]);
        if (error) throw error;
      }
      
      setShowModal(false);
      toast.success(editingRole ? 'Rol actualizado correctamente' : 'Nuevo rol creado con éxito');
      fetchRoles();
    } catch (error) {
      toast.error('Error al guardar el rol: ' + error.message);
    }
  };

  const openCreate = () => {
    setEditingRole(null);
    setFormName('');
    setFormDescription('');
    setShowModal(true);
  };

  const openEdit = (role) => {
    setEditingRole(role);
    setFormName(role.name);
    setFormDescription(role.description);
    setShowModal(true);
  };

  if (loading) return <div>Cargando roles del sistema...</div>;

  return (
    <div className="users-manager">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Roles y Permisos</h1>
        <button className="btn btn-primary" onClick={openCreate}>
          + Nuevo Rol
        </button>
      </div>

      <div className="table-container glass-panel">
        <table className="leads-table">
          <thead>
            <tr>
              <th>ID del Rol</th>
              <th>Nombre del Rol</th>
              <th>Descripción y Permisos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{role.id.split('-')[0]}...</td>
                <td style={{ fontWeight: 'bold' }}>{role.name}</td>
                <td>{role.description}</td>
                <td>
                  <button className="btn-view" onClick={() => openEdit(role)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingRole ? 'Editar Rol' : 'Crear Nuevo Rol'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="form-group">
                <label>Nombre del Rol</label>
                <input 
                  type="text" 
                  style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                  value={formName} 
                  onChange={e => setFormName(e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label>Descripción y Permisos</label>
                <textarea 
                  style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '80px'}}
                  value={formDescription} 
                  onChange={e => setFormDescription(e.target.value)} 
                />
              </div>
              <button className="btn btn-primary btn-full" onClick={handleSaveRole}>
                Guardar Configuración
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManager;
