import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const HomePage: React.FC = () => {
  const categories = [
    { name: 'Electronics', link: '/categories/electronics', image: '/assets/electronics.jpg' },
    { name: 'Fashion', link: '/categories/fashion', image: '/assets/fashion.jpg' },
    { name: 'Home & Kitchen', link: '/categories/home-kitchen', image: '/assets/home-kitchen.jpg' },
  ];

  const popularProducts = [
    { name: 'Smartphone', price: '$699', image: '/assets/smartphone.jpg' },
    { name: 'Headphones', price: '$199', image: '/assets/headphones.jpg' },
    { name: 'Coffee Maker', price: '$99', image: '/assets/coffee-maker.jpg' },
  ];

  return (
    <div className="homepage">
      <header className="homepage__header">
        <h1>Welcome to Marketplace</h1>
        <p>Find everything you need in one place!</p>
        <Link to="/products" className="homepage__cta">
          Shop Now
        </Link>
      </header>

      <section className="homepage__categories">
        <h2>Popular Categories</h2>
        <div className="categories__grid">
          {categories.map((category) => (
            <Link to={category.link} key={category.name} className="category__card">
              <img src={category.image} alt={category.name} />
              <div className="category__name">{category.name}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="homepage__popular-products">
        <h2>Popular Products</h2>
        <div className="products__grid">
          {popularProducts.map((product) => (
            <div key={product.name} className="product__card">
              <img src={product.image} alt={product.name} />
              <div className="product__info">
                <div className="product__name">{product.name}</div>
                <div className="product__price">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
