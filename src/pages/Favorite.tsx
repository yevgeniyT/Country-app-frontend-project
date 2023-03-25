import React from 'react';

import CountriesTable from '../features/CountriesTable';
import { useAppSelector } from '../app/hooks';
import { Typography } from '@mui/material';

const Favorite: React.FC = () => {
  const favoriteList = useAppSelector(
    state => state.favoriteCountriesListR.favoriteCountriesList
  );
  const isCountryFavorite = (countryId: string) => {
    return favoriteList.some(country => country.id === countryId);
  };
  return (
    <div>
      <Typography
        variant="h4"
        mt={2}
        mb={2}
        sx={{
          fontSize: {
            xs: '0.8rem',
            sm: '1rem',
            md: '1.2rem',
            lg: '1.4rem',
            xl: '1.6rem',
          },
        }}
      >
        {`You have ${favoriteList.length} ${
          favoriteList.length === 1 ? 'country' : 'countries '
        }in your list`}
      </Typography>
      <CountriesTable
        data={favoriteList}
        isCountryFavorite={isCountryFavorite}
      />
    </div>
  );
};
export default Favorite;
