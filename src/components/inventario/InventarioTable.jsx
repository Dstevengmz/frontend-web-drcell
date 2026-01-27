import { formatCurrency } from '../../utils/helpers';

const getStockClass = (stock, stockMinimo) => {
  if (stock === 0) return 'stock-agotado';
  if (stock <= stockMinimo) return 'stock-bajo';
  return 'stock-ok';
};

const InventarioTable = ({ productos, onEdit, onDelete, onAjustarStock }) => {
  return (
    <div className="inventario-table-container">
      <table className="inventario-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Proveedor</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Stock Mín.</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td colSpan="8" className="no-data">No hay productos registrados</td>
            </tr>
          ) : (
            productos.map(producto => (
              <tr key={producto.id}>
                <td>
                  <div className="producto-info">
                    <strong>{producto.nombre}</strong>
                    {producto.descripcion && <p className="descripcion-small">{producto.descripcion}</p>}
                  </div>
                </td>
                <td>{producto.Categoria?.nombre || 'Sin categoría'}</td>
                <td>{producto.Proveedor?.nombre || 'Sin proveedor'}</td>
                <td>{formatCurrency(producto.precioVenta)}</td>
                <td>
                  <span className={`stock-badge ${getStockClass(producto.stockActual, producto.stockMinimo)}`}>
                    {producto.stockActual}
                  </span>
                </td>
                <td>{producto.stockMinimo || 0}</td>
                <td>
                  {producto.stockActual === 0 ? (
                    <span className="badge badge-danger">Agotado</span>
                  ) : producto.stockActual <= producto.stockMinimo ? (
                    <span className="badge badge-warning">Bajo</span>
                  ) : (
                    <span className="badge badge-success">Disponible</span>
                  )}
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-icon btn-edit" 
                      onClick={() => onEdit(producto)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn-icon btn-delete" 
                      onClick={() => onDelete(producto.id)}
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                    <button 
                      className="btn-icon btn-ajuste" 
                      onClick={() => {
                        const cantidad = prompt('Ingrese la cantidad para ajustar el stock (+ o -)');
                        if (cantidad) onAjustarStock(producto.id, parseInt(cantidad));
                      }}
                      title="Ajustar stock"
                    >
                      📊
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventarioTable;
