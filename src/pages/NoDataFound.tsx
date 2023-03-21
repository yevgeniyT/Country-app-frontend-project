import React from 'react';
import { Box, Typography } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const NoDataFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        textAlign: 'center',
        mt: 4,
      }}
    >
      <SentimentDissatisfiedIcon
        sx={{
          fontSize: '5rem',
          color: 'primary.main',
        }}
      />
      <Typography variant="h4" component="h1" gutterBottom>
        Oops! No data found.
      </Typography>
      <Typography variant="h6" component="h2">
        We couldn't find any country matching your search.
      </Typography>
      <Typography variant="subtitle1" component="p" mt={1}>
        Please try searching with a different keyword or check your spelling.
      </Typography>
    </Box>
  );
};

export default NoDataFound;
