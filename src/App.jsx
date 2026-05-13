import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Landing from './pages/Landing/Landing';
import Login from './pages/Admin/Login';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import DashboardLayout from './pages/Admin/Dashboard/DashboardLayout';
import DashboardOverview from './pages/Admin/Dashboard/DashboardOverview';
import LeadsManager from './pages/Admin/Dashboard/LeadsManager';
import UserManager from './pages/Admin/Dashboard/UserManager';
import RoleManager from './pages/Admin/Dashboard/RoleManager';
import GalleryManager from './pages/Admin/Dashboard/GalleryManager';

/* Rutas de Destinos SPA */
import ReinoUnido from './pages/Destinos/ReinoUnido/ReinoUnido';
import Canada from './pages/Destinos/Canada/Canada';
import Espana from './pages/Destinos/Espana/Espana';
import Italia from './pages/Destinos/Italia/Italia';
import RepublicaCheca from './pages/Destinos/RepublicaCheca/RepublicaCheca';
import Japon from './pages/Destinos/Japon/Japon';

import './App.css';

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<Login />} />
        
        {/* Rutas de Destinos */}
        <Route path="/destinos/reino-unido" element={<ReinoUnido />} />
        <Route path="/destinos/canada" element={<Canada />} />
        <Route path="/destinos/espana" element={<Espana />} />
        <Route path="/destinos/italia" element={<Italia />} />
        <Route path="/destinos/republica-checa" element={<RepublicaCheca />} />
        <Route path="/destinos/japon" element={<Japon />} />

        {/* Rutas Privadas del ERP */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardOverview />} />
          <Route path="leads" element={<LeadsManager />} />
          <Route path="gallery" element={<GalleryManager />} />
          <Route path="users" element={<UserManager />} />
          <Route path="roles" element={<RoleManager />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
