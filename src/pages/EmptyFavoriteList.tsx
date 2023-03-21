import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';

const bounce = keyframes`
  0%, 20%, 60%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15px);
  }
  80% {
    transform: translateY(-5px);
  }
`;

const AnimatedEmojiFlagsIcon = styled(EmojiFlagsIcon)`
  font-size: 6rem;
  animation: ${bounce} 2s infinite;
  color: #3f51b5;
`;

const EmptyFavoriteList = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        textAlign: 'center',
      }}
    >
      <AnimatedEmojiFlagsIcon />
      <Typography variant="h4" mt={2}>
        Uh-oh! Your list is empty.
      </Typography>
      <Typography variant="subtitle1" mt={1}>
        Start adding countries to your list to see them here.
      </Typography>
    </Box>
  );
};

export default EmptyFavoriteList;
