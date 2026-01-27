import { useState, useEffect } from 'react';
import productoService from '../../services/productoService';
import categoriaService from '../../services/categoriaService';
import HomeHeader from '../../components/home/HomeHeader';
import ServicesCarousel from '../../components/home/ServicesCarousel';
import ProductCatalog from '../../components/home/ProductCatalog';
import HomeFooter from '../../components/home/HomeFooter';
import FAQModal from '../../components/common/FAQModal';
import FloatingContactMenu from '../../components/common/FloatingContactMenu';
import './HomePage.css';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);

  useEffect(() => {
    fetchCategorias();
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [currentPage, selectedCategory, searchQuery]);

  const fetchCategorias = async () => {
    try {
      const response = await categoriaService.getCategorias();
      setCategorias([{ id: 'todos', nombre: 'Todos los productos' }, ...(response.data.data || [])]);
    } catch (error) {
      console.error('Error al cargar categorías', error);
    }
  };

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 8,
      };
      if (selectedCategory !== 'todos') params.categoria = selectedCategory;
      if (searchQuery) params.buscar = searchQuery;

      const response = await productoService.getProductos(params);
      setProductos(response.data.productos || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error al cargar productos', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      <HomeHeader />
      <ServicesCarousel />
      <ProductCatalog
        loading={loading}
        productos={productos}
        categorias={categorias}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        currentPage={currentPage}
        totalPages={totalPages}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
        onPageChange={handlePageChange}
      />
      <HomeFooter />
      <FloatingContactMenu onOpenFAQ={() => setIsFAQModalOpen(true)} />
      <FAQModal 
        isOpen={isFAQModalOpen} 
        onClose={() => setIsFAQModalOpen(false)} 
      />
    </div>
  );
};

export default HomePage;
