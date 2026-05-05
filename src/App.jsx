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
import './App.css';

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<Login />} />
        
        {/* Rutas Privadas del ERP */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardOverview />} />
          <Route path="leads" element={<LeadsManager />} />
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
