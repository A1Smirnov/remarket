// frontend/src/pages/Products.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Products.css';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [category, setCategory] = useState<string>('');
    
    const [filterCategory, setFilterCategory] = useState<string>('');
    const [sortOption, setSortOption] = useState<string>('popularity');
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/products', {
            params: { category } 
          });
          setProducts(response.data);
          setLoading(false);
        } catch (err) {
          setError('Failed to load products');
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, [category]); 
  
    // Применяем фильтрацию по категориям
    const filteredProducts = products.filter((product) =>
      filterCategory ? product.category === filterCategory : true
    );
  
    // Сортировка продуктов
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortOption === 'priceAsc') return a.price - b.price;
      if (sortOption === 'priceDesc') return b.price - a.price;
      return 0; // По умолчанию не сортируем (или сортировка по популярности)
    });
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
  
    return (
      <div className="products-page">
        <h1>All Products</h1>
  
        {/* Фильтрация и сортировка */}
        <div className="filters">
          {/* Фильтрация по категории */}
          <div>
            <label htmlFor="categoryFilter">Filter by category:</label>
            <select
              id="categoryFilter"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home">Home</option>
              {/* Добавьте сюда другие категории, если нужно */}
            </select>
          </div>
  
          {/* Сортировка */}
          <div>
            <label htmlFor="sortOption">Sort by:</label>
            <select
              id="sortOption"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="popularity">Popularity</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
        </div>
  
        {/* Список продуктов */}
        <div className="products-grid">
          {sortedProducts.map((product) => (
            <div className="product-card" key={product._id}>
              <Link to={`/products/${product._id}`}>
                <img src={product.imageUrl} alt={product.name} />
                <h2>{product.name}</h2>
              </Link>
              <p>${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Products;
