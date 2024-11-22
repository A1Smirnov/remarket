// frontend/src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/User/Profile';
import Layout from './components/Layout';
// import Navbar from './components/Navbar';
import Products from './pages/Products/Products';
import ProductDetails from './pages/Products/ProductDetails';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import { CartProvider } from './pages/context/CartContext';
import Cart from './pages/User/Cart';  // Импортируем компонент корзины

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* CartProvider */}
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/forgot-password" element={<div>Forgot Password Page</div>} />
              <Route path="/cart" element={<Cart />} />  {/* Route for cart */}
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;

