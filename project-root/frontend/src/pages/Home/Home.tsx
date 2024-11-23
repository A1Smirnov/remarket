// frontend/src/page/Home/Home.tsx

import React, { useEffect, useState } from 'react';
import {
  CssBaseline,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [addedToCartMessage, setAddedToCartMessage] = useState<string | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };

    const fetchBackgroundImage = async () => {
      try {
        const unsplashResponse = await axios.get('http://localhost:5000/api/unsplash/random-photos');
        setBackgroundImage(unsplashResponse.data.urls.regular);
      } catch (err) {
        console.error('Failed to fetch background image', err);
      }
    };

    fetchProducts();
    fetchBackgroundImage();
  }, []);

  const handleAddToCart = (product: Product) => {
    const cartItem = { ...product, quantity: 1 }; // Убедитесь, что добавленное свойство 'category' присутствует
    addToCart(cartItem); 
    setAddedToCartMessage(`Added ${product.name} to your cart!`);
    setTimeout(() => setAddedToCartMessage(null), 3000);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <CssBaseline />
      <main>
        {/* Hero Section */}
        <Box
          sx={{
            pt: 8,
            pb: 6,
            animation: 'fadeIn 1s ease-out',
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
          }}
        >
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" gutterBottom>
              Welcome to REMarket!
            </Typography>
            <Typography variant="h5" align="center" paragraph>
              First Marketplace driven by AI
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
              <Grid item>
                <Link to="/products">
                  <Button variant="contained" color="primary">
                    Shop Now
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/about">
                  <Button variant="contained" color="secondary">
                    About Us
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Notification for added to cart */}
        {addedToCartMessage && (
          <Box
            sx={{
              position: 'fixed',
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              zIndex: 1000,
            }}
          >
            {addedToCartMessage}
          </Box>
        )}

        {/* Products Section */}
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{ pt: '10%' }}
                    image={product.imageUrl}
                    alt={product.name}
                    onClick={() => window.location.href = `/products/${product._id}`}
                    style={{ cursor: 'pointer' }}
                  />
                  <CardContent
                    sx={{ flexGrow: 1, textAlign: 'center', cursor: 'pointer' }}
                    onClick={() => window.location.href = `/products/${product._id}`}
                  >
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Typography>${product.price.toFixed(2)}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      component={Link}
                      to={`/products/${product._id}`}
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Buy
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Home;

