import React from 'react';

import { useEffect } from 'react';
import { getCountries } from '../services/api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import CountriesTable from '../features/CountriesTable';
import { addCountryToList } from '../reducers/counturies/favoriteCountriesSlice';

import { Country } from '../types/types';

//imports to handle errors
import Loading from '../pages/loading';
import ErrorFetch from '../pages/ErrorFetch';

const Countries = () => {
  const dispatch = useAppDispatch();
  const countriesList = useAppSelector(state => state.countryR.countries);
  const favoriteCountries = useAppSelector(
    state => state.favoriteCountriesListR.favoriteCountriesList
  );

  const loading = useAppSelector(state => state.countryR.loading);
  const error = useAppSelector(state => state.countryR.error);
  console.log(error);

  const isCountryFavorite = (id: string) => {
    return favoriteCountries.some(favoriteCountry => favoriteCountry.id === id);
  };

  const handleAddToFavorite = (country: Country) => {
    dispatch(addCountryToList(country));
  };

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorFetch />;
  }
  return (
    <div>
      <CountriesTable
        data={countriesList}
        handleAddToFavorite={handleAddToFavorite}
        isCountryFavorite={isCountryFavorite}
      />
    </div>
  );
};

export default Countries;
