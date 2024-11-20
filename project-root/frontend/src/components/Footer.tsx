// frontend/src/components/Footer.tsx
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 3, mt: 'auto' }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        REMarket
      </Typography>
      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} REMarket. All rights reserved.{' '}
        <Link href="/" color="inherit" underline="hover">
          Terms
        </Link>{' '}
        |{' '}
        <Link href="/" color="inherit" underline="hover">
          Privacy
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
