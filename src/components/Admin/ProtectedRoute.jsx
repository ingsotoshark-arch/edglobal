import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Cargando portal seguro...</div>;
  }

  if (!session) {
    // Si no hay sesión, expulsa al login
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
