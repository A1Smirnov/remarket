import React from "react";
import { Container, Typography, Button, Grid, Box, Paper } from "@mui/material";
import { Fade } from "react-awesome-reveal";

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Fade cascade triggerOnce>
        <Typography variant="h3" align="center" gutterBottom>
          About the Developer
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 3 }}>
              <Typography variant="h5" gutterBottom>
                Hi, I'm a Developer!
              </Typography>
              <Typography variant="body1" paragraph>
                I create modern web applications using technologies like React, TypeScript, Node.js, MongoDB, and more.
              </Typography>
              <Typography variant="body1" paragraph>
                My goal is to develop user-friendly and visually appealing applications that solve real-world problems. 
                In this project, I am using advanced technologies and practices.
              </Typography>
              <Button variant="contained" color="primary" href="https://github.com/A1Smirnov" target="_blank">
                My GitHub
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img 
                src="https://via.placeholder.com/300" 
                alt="developer photo"
                style={{ borderRadius: '50%' }} 
              />
            </Box>
          </Grid>
        </Grid>
      </Fade>
    </Container>
  );
};

export default About;
