import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dashboardService from '../../services/dashboardService';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await dashboardService.getStats();
      setStats(data || {
        totalOrdenes: 0,
        ordenesActivas: 0,
        productosStock: 0,
        stockBajo: 0,
        totalClientes: 0,
        totalProveedores: 0
      });
    } catch (err) {
      console.error('Error al cargar estadísticas:', err);
      setError('Error al cargar estadísticas');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="dashboard">
      <h1>📊 Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card stat-primary">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>Total Órdenes</h3>
            <p className="stat-number">{stats?.totalOrdenes || 0}</p>
          </div>
        </div>

        <div className="stat-card stat-success">
          <div className="stat-icon">⚙️</div>
          <div className="stat-content">
            <h3>Órdenes Activas</h3>
            <p className="stat-number">{stats?.ordenesActivas || 0}</p>
          </div>
        </div>

        <div className="stat-card stat-info">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>Productos en Stock</h3>
            <p className="stat-number">{stats?.productosStock || 0}</p>
          </div>
        </div>

        <div className="stat-card stat-warning">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <h3>Stock Bajo</h3>
            <p className="stat-number">{stats?.stockBajo || 0}</p>
          </div>
        </div>

        <div className="stat-card stat-secondary">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Clientes</h3>
            <p className="stat-number">{stats?.totalClientes || 0}</p>
          </div>
        </div>

        <div className="stat-card stat-secondary">
          <div className="stat-icon">🏢</div>
          <div className="stat-content">
            <h3>Proveedores</h3>
            <p className="stat-number">{stats?.totalProveedores || 0}</p>
          </div>
        </div>
      </div>

      {(stats?.stockBajo || 0) > 0 && (
        <div className="alert alert-warning">
          <strong>⚠️ Atención:</strong> Hay {stats.stockBajo} producto(s) con stock bajo. 
          <Link to="/admin/inventario" style={{color: '#856404', fontWeight: 'bold'}}> Ver inventario →</Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
