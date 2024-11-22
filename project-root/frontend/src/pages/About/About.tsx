// frontend/src/pages/About/About.tsx

import React from "react";
import { Container, Typography, Grid, Box, Button } from "@mui/material";
import { Fade, Slide } from "react-awesome-reveal";
import { styled } from "@mui/system";

// Стили для секций
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.common.white,
  padding: theme.spacing(6, 2),
  borderRadius: theme.shape.borderRadius,
  textAlign: "center",
  marginBottom: theme.spacing(4),
}));

const HighlightCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(3),
  background: theme.palette.background.paper,
  // boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  textAlign: "center",
}));

// Контент
const highlights = [
  {
    title: "Years of Experience",
    description:
      "From designing cloud architectures to leading digital transformations, deliviring innovative solutions for enterprises worldwide.",
  },
  {
    title: "Global Projects",
    description:
      "Collaborated with diverse teams across Europe, Asia, and North America to implement scalable IT ecosystems tailored to human needs.",
  },
  {
    title: "Cutting-Edge Technologies",
    description:
      "IT architects: multi-cloud, serverless, Kubernetes, AI/ML integration, IoT frameworks, blockchain for distributed systems and sure AI.",
  },
];

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      {/* Hero Section */}
      <Fade triggerOnce>
        <HeroSection>
          <Typography variant="h3" component="h1" gutterBottom>
            Crafting Digital Solutions, Architecting Futures
          </Typography>
          <Typography variant="h6" component="p" sx={{ mb: 3 }}>
            A seasoned IT professional with a proven track record of delivering
            world-class web solutions and infrastructure.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            href="https://github.com/A1Smirnov"
            target="_blank"
          >
            View My GitHub
          </Button>
        </HeroSection>
      </Fade>

      {/* Highlights Section */}
      <Grid container spacing={4}>
        {highlights.map((highlight, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Slide direction="up" triggerOnce>
              <HighlightCard>
                <Typography variant="h5" component="h3" gutterBottom>
                  {highlight.title}
                </Typography>
                <Typography variant="body1">{highlight.description}</Typography>
              </HighlightCard>
            </Slide>
          </Grid>
        ))}
      </Grid>

      {/* Image Section */}
      <Box
        sx={{
          mt: 6,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Slide direction="left" triggerOnce>
          <Box
            component="img"
            src="../../../public/images/PerScholas-picture.jpg"
            alt="Professional portrait"
            sx={{
              width: "388px",
              height: "281px",
              borderRadius: "50%",
              boxShadow: 3,
            }}
          />
        </Slide>
        <Slide direction="right" triggerOnce>
          <Box sx={{ maxWidth: 500 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Meet the Architect
            </Typography>
            <Typography variant="body1" paragraph>
              With a passion for technology and innovation, I specialize in
              crafting scalable IT solutions that drive business growth. My
              approach combines strategic vision with hands-on expertise,
              ensuring seamless integration of technologies across diverse
              domains.
            </Typography>
            <Typography variant="body1" paragraph>
              When I'm not designing systems, you'll find me exploring the
              latest tech trends, mentoring aspiring developers, or brainstorming the next big idea.
            </Typography>
            <Typography variant="body1" paragraph>
              In the real world, you might spot me at a homeless shelter or in line at the local food pantry - gotta keep it balanced!
            </Typography>
          </Box>
        </Slide>
      </Box>
    </Container>
  );
};

export default About;
