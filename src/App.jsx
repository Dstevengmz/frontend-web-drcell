import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';

// Páginas públicas
import HomePage from './pages/public/HomePage';
import TrackingPage from './pages/public/TrackingPage';

// Páginas de admin
import LoginPage from './pages/admin/LoginPage';
import Dashboard from './pages/admin/Dashboard';
import OrdenesPage from './pages/admin/ordenes/OrdenesPage';
import OrdenForm from './pages/admin/ordenes/OrdenForm';
import OrdenDetalle from './pages/admin/ordenes/OrdenDetalle';
import ProductosPage from './pages/admin/productos/ProductosPage';
import CategoriasPage from './pages/admin/categorias/CategoriasPage';
import InventarioPage from './pages/admin/inventario/InventarioPage';
import ProveedoresPage from './pages/admin/proveedores/ProveedoresPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/tracking" element={<TrackingPage />} />

          {/* Login */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Rutas protegidas */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="ordenes" element={<OrdenesPage />} />
            <Route path="ordenes/nueva" element={<OrdenForm />} />
            <Route path="ordenes/:id" element={<OrdenDetalle />} />
            <Route path="ordenes/:id/editar" element={<OrdenForm />} />
            <Route path="productos" element={<ProductosPage />} />
            <Route path="categorias" element={<CategoriasPage />} />
            <Route path="inventario" element={<InventarioPage />} />
            <Route path="proveedores" element={<ProveedoresPage />} />
          </Route>

          {/* Ruta no encontrada */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
