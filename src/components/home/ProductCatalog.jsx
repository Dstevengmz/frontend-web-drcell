import { formatCurrency } from '../../utils/helpers';

const ProductCatalog = ({ 
  loading, 
  productos, 
  categorias, 
  selectedCategory, 
  searchQuery, 
  currentPage, 
  totalPages,
  onCategoryChange,
  onSearchChange,
  onPageChange
}) => {
  return (
    <section className="catalog-section">
      <div className="section-header">
        <h2 className="section-title">Catálogo de Productos</h2>
        <p className="section-subtitle">Encuentra el producto perfecto para ti</p>
      </div>

      {/* Filtros */}
      <div className="catalog-filters">
        <div className="category-filters">
          {categorias.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(cat.id)}
            >
              {cat.nombre}
            </button>
          ))}
        </div>
        
        <div className="search-box">
          <input
            type="search"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {/* Grid de Productos */}
      {loading ? (
        <div className="loading-message">Cargando productos...</div>
      ) : productos.length === 0 ? (
        <div className="no-products">
          <p>No se encontraron productos</p>
        </div>
      ) : (
        <>
          <div className="products-grid">
            {productos.map(producto => (
              <div key={producto.id} className="product-card">
                <div className="product-image-container">
                  {producto.imagenUrl ? (
                    <img src={producto.imagenUrl} alt={producto.nombre} className="product-image" />
                  ) : (
                    <div className="no-image-placeholder">📱</div>
                  )}
                </div>
                <div className="product-info">
                  <h3 className="product-name">{producto.nombre}</h3>
                  <p className="product-description">
                    {producto.estado === 'nuevo' ? 'Nuevo' : producto.estado === 'usado' ? 'Usado' : 'Reacondicionado'}
                    {producto.descripcion && `, ${producto.descripcion}`}
                  </p>
                  <p className="product-price">{formatCurrency(producto.precio)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="pagination-section">
              <button
                className="pagination-btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ← Anterior
              </button>
              <span className="pagination-info">
                Página {currentPage} de {totalPages}
              </span>
              <button
                className="pagination-btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Siguiente →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ProductCatalog;
