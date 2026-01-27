const InventarioFilters = ({ busqueda, onBusquedaChange, filtroCategoria, onCategoriaChange, categorias }) => {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={(e) => onBusquedaChange(e.target.value)}
        className="search-input"
      />
      <select
        value={filtroCategoria}
        onChange={(e) => onCategoriaChange(e.target.value)}
        className="filter-select"
      >
        <option value="">Todas las categorías</option>
        {categorias.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.nombre}</option>
        ))}
      </select>
    </div>
  );
};

export default InventarioFilters;
