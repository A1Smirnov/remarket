// frontend/src/pages/User/Cart.tsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { Button, Container, Grid, Typography, Card, CardContent, CardMedia, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      {cart.length === 0 ? (
        <Typography>No items in the cart</Typography>
      ) : (
        <Grid container spacing={4}>
          {cart.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.imageUrl}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    ${item.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2">Quantity: {item.quantity}</Typography>
                  <Box display="flex" alignItems="center" mt={2}>
                    <Button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</Button>
                    <Button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</Button>
                    <Button
                      color="error"
                      onClick={() => removeFromCart(item._id)}
                      sx={{ marginLeft: 'auto' }}
                    >
                      Remove
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Total: ${total.toFixed(2)}
      </Typography>
      <Box mt={2}>
        <Link to="/checkout" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">Checkout</Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Cart;

