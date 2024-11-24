// frontend/src/pages/Products/Products.tsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material'; // Добавляем Button из MUI
import './Products.css';
import { useCart } from '../context/CartContext';

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
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('popularity');
  const [addedToCartMessage, setAddedToCartMessage] = useState<string | null>(null); 
  const { addToCart } = useCart(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products', {
          params: { category: '' } 
        });
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  const handleAddToCart = (product: Product) => {
    const cartItem = { ...product, quantity: 1 };  // Добавляем поле quantity
    addToCart(cartItem);
    setAddedToCartMessage(`Added ${product.name} to your cart!`);
    setTimeout(() => setAddedToCartMessage(null), 3000);
  };

  const filteredProducts = products.filter((product) =>
    filterCategory ? product.category === filterCategory : true
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'priceAsc') return a.price - b.price;
    if (sortOption === 'priceDesc') return b.price - a.price;
    return 0;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="products-page">
      <h1>All Products</h1>
      {addedToCartMessage && <div className="added-to-cart-message">{addedToCartMessage}</div>}
      <div className="filters">
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
          </select>
        </div>

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

      <div className="products-grid">
        {sortedProducts.map((product) => (
          <div className="product-card" key={product._id}>
            <Link to={`/products/${product._id}`}>
              <img src={product.imageUrl} alt={product.name} />
              <h2>{product.name}</h2>
            </Link>
            <p>${product.price.toFixed(2)}</p>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleAddToCart(product)}
              sx={{
                marginTop: '10px',
                textTransform: 'none',
                padding: '10px',
              }}
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
