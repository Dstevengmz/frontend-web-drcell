import { useState, useEffect } from 'react';
import categoriaService from '../../../services/categoriaService';
import proveedorService from '../../../services/proveedorService';
import InventarioFilters from '../../../components/inventario/InventarioFilters';
import InventarioTable from '../../../components/inventario/InventarioTable';
import InventarioModal from '../../../components/inventario/InventarioModal';
import { useInventario } from '../../../hooks/useInventario';
import '../../../utils/sweetalert.css';
import './InventarioPage.css';

const InventarioPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const {
    productos,
    showModal,
    editingId,
    formData,
    setShowModal,
    fetchProductos,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleAjustarStock,
    closeModal,
    handleChange
  } = useInventario();

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
    fetchProveedores();
  }, []);

  useEffect(() => {
    const filtros = {};
    if (filtroCategoria) filtros.categoriaId = filtroCategoria;
    if (busqueda) filtros.busqueda = busqueda;
    fetchProductos(filtros);
  }, [filtroCategoria, busqueda]);

  const fetchCategorias = async () => {
    try {
      const response = await categoriaService.getCategorias();
      setCategorias(response.data.data || []);
    } catch (error) {
      console.error('Error al cargar categorías');
    }
  };

  const fetchProveedores = async () => {
    try {
      const response = await proveedorService.getProveedores();
      setProveedores(response.data.data || []);
    } catch (error) {
      console.error('Error al cargar proveedores');
    }
  };

  const onSubmit = async (e) => {
    const success = await handleSubmit(e);
    if (success) fetchProductos();
  };

  const onDelete = async (id) => {
    const success = await handleDelete(id);
    if (success) fetchProductos();
  };

  const onAjustarStock = async (id, cantidad) => {
    const success = await handleAjustarStock(id, cantidad);
    if (success) fetchProductos();
  };

  return (
    <div className="inventario-page">
      <div className="page-header">
        <h1>📦 Inventario</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          ➕ Nuevo Producto
        </button>
      </div>

      <InventarioFilters
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
        filtroCategoria={filtroCategoria}
        onCategoriaChange={setFiltroCategoria}
        categorias={categorias}
      />

      <InventarioTable
        productos={productos}
        onEdit={handleEdit}
        onDelete={onDelete}
        onAjustarStock={onAjustarStock}
      />

      <InventarioModal
        show={showModal}
        editingId={editingId}
        formData={formData}
        categorias={categorias}
        proveedores={proveedores}
        onClose={closeModal}
        onSubmit={onSubmit}
        onChange={handleChange}
      />
    </div>
  );
};

export default InventarioPage;
