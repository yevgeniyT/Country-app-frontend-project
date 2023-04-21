import React from 'react';

import CountriesTable from '../features/CountriesTable';
import { useAppSelector } from '../app/hooks';
import { Typography } from '@mui/material';
import EmptyFavoriteList from '../pages/EmptyFavoriteList';
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
      {/* Conditional rendering page, is there is at least one country in favorite country list the it will be rendered, else emptyFavorite page will be rendered */}
      {favoriteList.length === 0 ? (
        <EmptyFavoriteList />
      ) : (
        <CountriesTable
          data={favoriteList}
          isCountryFavorite={isCountryFavorite}
        />
      )}
    </div>
  );
};
export default Favorite;
