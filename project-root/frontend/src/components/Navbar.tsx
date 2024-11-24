// frontend/src/components/Navbar.tsx

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Products', path: '/products' },
    { text: 'Categories', path: '/categories' },
    { text: 'Cart', path: '/cart' },
    ...(isAuthenticated
      ? [
          { text: 'Profile', path: '/profile' },
          { text: 'Logout', action: handleLogout }, // Кнопка Logout только для авторизованных пользователей
        ]
      : [
          { text: 'Login', path: '/login' },
        ]),
  ];

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>

        {/* Логотип */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src="/images/Logo.png" // Путь к логотипу в папке public
            alt="REMarket Logo"
            style={{ width: '40px', height: '40px', marginRight: '10px' }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
            REMarket
          </Typography>
        </Link>

        {/* Кнопки меню (выравнивание по правому краю) */}
        <div style={{ marginLeft: 'auto' }}>
          {menuItems
            .filter((item) => !item.action) // Только элементы с `path`, без `action`
            .map((item) => (
              <Button key={item.text} color="inherit" component={Link} to={item.path}>
                {item.text}
              </Button>
            ))}
        </div>
      </Toolbar>

      {/* Мобильное меню */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={item.action ? item.action : toggleDrawer} // Если есть `action`, то выполняем его
              component={item.path ? Link : 'button'}
              {...(item.path ? { to: item.path } : {})} // Передаем `to` только если есть путь
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;

