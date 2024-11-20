import React from 'react';
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
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const Home: React.FC = () => {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      <CssBaseline />
      <AppBar position="relative" color="primary">
        <Toolbar>
          <PhotoCameraIcon sx={{ marginRight: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            REMarket
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero Section */}
        <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6 }}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
              Welcome to REMarket
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Discover our curated selection of the best products. Shop now for exclusive deals!
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
              <Grid item>
                <Button variant="contained" color="primary">
                  Shop Now
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  Learn More
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
        {/* Product Cards Section */}
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{ pt: '56.25%' }} // 16:9
                    image={`https://source.unsplash.com/random?sig=${card}`}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Product {card}
                    </Typography>
                    <Typography>
                      This is a description of the product. Add details here to entice buyers!
                    </Typography>
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
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Thank you for visiting REMarket!
        </Typography>
      </Box>
    </>
  );
};

export default Home;
