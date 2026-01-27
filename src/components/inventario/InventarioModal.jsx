const InventarioModal = ({ 
  show, 
  editingId, 
  formData, 
  categorias, 
  proveedores, 
  onClose, 
  onSubmit, 
  onChange 
}) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{editingId ? 'Editar' : 'Nuevo'} Producto</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={onChange}
              rows="3"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Precio Venta *</label>
              <input
                type="number"
                name="precioVenta"
                value={formData.precioVenta}
                onChange={onChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="form-group">
              <label>Stock *</label>
              <input
                type="number"
                name="stockActual"
                value={formData.stockActual}
                onChange={onChange}
                min="0"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Stock Mínimo</label>
              <input
                type="number"
                name="stockMinimo"
                value={formData.stockMinimo}
                onChange={onChange}
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Categoría</label>
              <select
                name="categoriaId"
                value={formData.categoriaId}
                onChange={onChange}
              >
                <option value="">Seleccionar...</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Proveedor</label>
            <select
              name="proveedorId"
              value={formData.proveedorId}
              onChange={onChange}
            >
              <option value="">Seleccionar...</option>
              {proveedores.map(prov => (
                <option key={prov.id} value={prov.id}>{prov.nombre}</option>
              ))}
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
            <button type="submit" className="btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventarioModal;
