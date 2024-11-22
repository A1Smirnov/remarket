// frontend/src/page/Home/Home.tsx

import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  CssBaseline,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

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
        console.log(unsplashResponse.data);  // 
        setBackgroundImage(unsplashResponse.data.urls.regular);
      } catch (err) {
        console.error('Failed to fetch background image', err);
      }
    };

    fetchProducts();
    fetchBackgroundImage();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <CssBaseline />
      <main>
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
              First Marketplace that driven by AI
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
                  <Button variant="outlined" color="primary">
                    Learn More
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{ pt: '56.25%' }}
                    image={product.imageUrl}
                    alt={product.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Typography>${product.price.toFixed(2)}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
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



