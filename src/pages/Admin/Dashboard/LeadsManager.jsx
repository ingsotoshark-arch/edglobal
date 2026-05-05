import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { toast } from 'react-hot-toast';

const LeadsManager = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    fetchLeads();

    // Set up Realtime subscription
    const subscription = supabase
      .channel('leads-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, payload => {
        fetchLeads(); // Refresh en tiempo real
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ estado: newStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success('Estado actualizado');
      // Optimistic update
      setLeads(leads.map(lead => lead.id === id ? { ...lead, estado: newStatus } : lead));
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Hubo un error al actualizar el estado');
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (loading) return <div>Cargando base de datos de prospectos...</div>;

  return (
    <div className="leads-manager">
      <h1 className="page-title">Gestión de Prospectos (CRM)</h1>

      <div className="table-container glass-panel">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Destino</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No hay prospectos aún.</td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className={lead.estado === 'nuevo' ? 'row-new' : ''}>
                  <td>{formatDate(lead.created_at)}</td>
                  <td style={{ fontWeight: '500' }}>{lead.nombre_completo}</td>
                  <td>{lead.destino_interes || 'No especificado'}</td>
                  <td>
                    <select 
                      className={`status-select status-${lead.estado}`}
                      value={lead.estado}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                    >
                      <option value="nuevo">🔴 Nuevo</option>
                      <option value="contactado">🟡 Contactado</option>
                      <option value="en_tramite">🔵 En Trámite</option>
                      <option value="cerrado_exito">🟢 Cerrado - Éxito</option>
                      <option value="cerrado_perdido">⚫ Cerrado - Perdido</option>
                    </select>
                  </td>
                  <td>
                    <button 
                      className="btn-view"
                      onClick={() => setSelectedLead(lead)}
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* QUICK VIEW MODAL */}
      {selectedLead && (
        <div className="modal-overlay" onClick={() => setSelectedLead(null)}>
          <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Expediente del Prospecto</h2>
              <button className="close-btn" onClick={() => setSelectedLead(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="info-group">
                <label>Nombre Completo</label>
                <p>{selectedLead.nombre_completo}</p>
              </div>
              <div className="info-group">
                <label>Correo Electrónico</label>
                <p><a href={`mailto:${selectedLead.email}`}>{selectedLead.email}</a></p>
              </div>
              <div className="info-group">
                <label>Teléfono (WhatsApp)</label>
                <p>
                  {selectedLead.telefono ? (
                    <a href={`https://wa.me/${selectedLead.telefono.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                      {selectedLead.telefono} 💬
                    </a>
                  ) : 'No proporcionado'}
                </p>
              </div>
              <div className="info-group">
                <label>Destino de Interés</label>
                <p>{selectedLead.destino_interes || 'No especificado'}</p>
              </div>
              <div className="info-group">
                <label>Mensaje / Intereses</label>
                <div className="message-box">
                  {selectedLead.mensaje || 'Sin mensaje adicional.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsManager;
