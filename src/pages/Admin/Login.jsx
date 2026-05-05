import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './Login.css';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let loginEmail = identifier.trim();

    // Si no contiene '@', asumimos que es un nombre de usuario y buscamos su correo
    if (!loginEmail.includes('@')) {
      const { data, error: rpcError } = await supabase.rpc('get_email_by_username', {
        p_username: loginEmail
      });

      if (rpcError || !data) {
        setError('Usuario no encontrado o credenciales inválidas.');
        setLoading(false);
        return;
      }
      
      loginEmail = data; // El correo devuelto por la base de datos
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password,
    });

    if (error) {
      setError(error.message === 'Invalid login credentials' ? 'Credenciales inválidas.' : error.message);
      setLoading(false);
    } else {
      // Login exitoso, enviar al panel de control (Dashboard)
      toast.success('Bienvenido al portal EdGlobal');
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card glass-panel">
        <div className="login-header">
          <h2>EdGlobal Portal</h2>
          <p>Acceso exclusivo para administradores</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="identifier">Usuario o Correo</label>
            <input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="ej. ingsoto o admin@edglobal.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button 
            type="submit" 
            className="btn btn-primary btn-full login-btn"
            disabled={loading}
          >
            {loading ? 'Autenticando...' : 'Iniciar Sesión'}
          </button>
        </form>
        
        <div className="login-footer">
          <a href="/" className="back-link">← Volver al sitio web</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
