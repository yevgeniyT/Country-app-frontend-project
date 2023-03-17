import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: 'primary.main', py: 3, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Typography variant="body1" align="center" color="text.secondary">
          Footer content goes here
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
