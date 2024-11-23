import React from "react";
import { Container, Grid, Card, CardContent, Typography, CardActionArea } from "@mui/material";

const Categories = () => {
  const categories = [
    { id: 1, name: "Electronics", image: "../public/images/products/electronics/workstation-pc.jpg" },
    { id: 2, name: "Clothing", image: "../public/images/products/clothing/comfortable-sneakers.jpg" },
    { id: 3, name: "Misc", image: "../public/images/products/misc/dancing-cactus.jpg" },
    { id: 4, name: "Home Decor", image: "../public/images/products/home/software-developer-cat.jpg" },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Products Categories
      </Typography>
      <Grid container spacing={4}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={3} key={category.id}>
            <Card>
              <CardActionArea>
                <img 
                  src={category.image} 
                  alt={category.name} 
                  style={{ width: "100%", height: "200px", objectFit: "cover" }} 
                />
                <CardContent>
                  <Typography variant="h6" align="center">{category.name}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Categories;
