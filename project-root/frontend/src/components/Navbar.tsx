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
          { text: 'Logout', action: handleLogout },
        ]
      : [
          { text: 'Login', path: '/login' },
          // { text: 'Register', path: '/register' },
        ]),
  ];

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          REMarket
        </Typography>
        <div>
          {menuItems
            .filter((item) => !item.action) // Only items with a `path`
            .map((item) => (
              <Button key={item.text} color="inherit" component={Link} to={item.path}>
                {item.text}
              </Button>
            ))}
        </div>
      </Toolbar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={item.action ? item.action : toggleDrawer}
              component={item.path ? Link : 'button'}
              {...(item.path ? { to: item.path } : {})} // Передаём `to` только если `item.path` существует
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

