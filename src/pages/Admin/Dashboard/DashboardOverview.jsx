import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    total: 0,
    nuevos: 0,
    contactados: 0,
    cerrados: 0
  });
  
  const [destinationData, setDestinationData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Paleta de colores Premium
  const COLORS = ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#64748b'];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('estado, destino_interes');

      if (error) throw error;

      const total = data.length;
      const nuevos = data.filter(l => l.estado === 'nuevo').length;
      const contactados = data.filter(l => l.estado === 'contactado' || l.estado === 'en_tramite').length;
      const cerrados = data.filter(l => l.estado === 'cerrado_exito').length;
      setStats({ total, nuevos, contactados, cerrados });

      const destCount = {};
      data.forEach(l => {
        const d = l.destino_interes || 'No especificado';
        destCount[d] = (destCount[d] || 0) + 1;
      });
      const dData = Object.keys(destCount).map(key => ({ name: key, value: destCount[key] }));
      setDestinationData(dData);

      const sData = [
        { name: 'Nuevos', cantidad: nuevos },
        { name: 'Contactados', cantidad: data.filter(l => l.estado === 'contactado').length },
        { name: 'En Trámite', cantidad: data.filter(l => l.estado === 'en_tramite').length },
        { name: 'Éxito', cantidad: cerrados },
        { name: 'Perdidos', cantidad: data.filter(l => l.estado === 'cerrado_perdido').length }
      ];
      setStatusData(sData);

    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          padding: '12px 16px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)'
        }}>
          <p style={{ margin: 0, fontWeight: 600, color: '#1e293b', marginBottom: '4px' }}>{label || payload[0].name}</p>
          <p style={{ margin: 0, color: '#475569', fontSize: '14px' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: payload[0].payload.fill || payload[0].color, marginRight: '8px' }}></span>
            Cantidad: <strong style={{ color: '#0f172a' }}>{payload[0].value}</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) return <div>Cargando métricas...</div>;

  return (
    <div className="dashboard-overview">
      <h1 className="page-title">Resumen de Operaciones</h1>
      
      <div className="kpi-grid">
        <div className="kpi-card glass-panel" style={{ transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <h3>Total de Prospectos</h3>
          <div className="kpi-value">{stats.total}</div>
          <p className="kpi-desc">Leads históricos en el sistema</p>
        </div>
        
        <div className="kpi-card glass-panel" style={{ borderLeft: '4px solid #ef4444', transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <h3>Nuevos (Sin contactar)</h3>
          <div className="kpi-value text-red">{stats.nuevos}</div>
          <p className="kpi-desc">Requieren atención inmediata</p>
        </div>

        <div className="kpi-card glass-panel" style={{ borderLeft: '4px solid #eab308', transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <h3>En Seguimiento</h3>
          <div className="kpi-value text-yellow">{stats.contactados}</div>
          <p className="kpi-desc">Contactados y en trámite</p>
        </div>

        <div className="kpi-card glass-panel" style={{ borderLeft: '4px solid #10b981', transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <h3>Cierres Exitosos</h3>
          <div className="kpi-value text-green">{stats.cerrados}</div>
          <p className="kpi-desc">Estudiantes matriculados</p>
        </div>
      </div>

      <div className="charts-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)', marginTop: 'var(--spacing-2xl)' }}>
        
        {/* DONUT CHART COMPLETO */}
        <div className="chart-card glass-panel" style={{ padding: '24px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)' }}>
          <h3 style={{ marginBottom: '20px', color: '#1e293b', fontSize: '1.1rem', fontWeight: '600' }}>Distribución de Destinos</h3>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={destinationData}
                  cx="50%"
                  cy="45%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={6}
                  animationDuration={1200}
                >
                  {destinationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                  wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BAR CHART DEGRADADO */}
        <div className="chart-card glass-panel" style={{ padding: '24px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)' }}>
          <h3 style={{ marginBottom: '20px', color: '#1e293b', fontSize: '1.1rem', fontWeight: '600' }}>Embudo de Ventas (Estado)</h3>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <BarChart data={statusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#818cf8" stopOpacity={0.7}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 13 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 13 }} 
                />
                <Tooltip cursor={{ fill: '#f8fafc' }} content={<CustomTooltip />} />
                <Bar 
                  dataKey="cantidad" 
                  fill="url(#colorBar)" 
                  radius={[6, 6, 0, 0]} 
                  barSize={40}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardOverview;
