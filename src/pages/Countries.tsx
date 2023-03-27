import React from 'react';

import { useEffect } from 'react';
import { getCountries } from '../services/api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import CountriesTable from '../features/CountriesTable';
import { addCountryToList } from '../reducers/counturies/favoriteCountriesSlice';

import { Country } from '../types/types';

const Countries = () => {
  const dispatch = useAppDispatch();
  const countriesList = useAppSelector(state => state.countryR.countries);
  const favoriteCountries = useAppSelector(
    state => state.favoriteCountriesListR.favoriteCountriesList
  );

  const isCountryFavorite = (id: string) => {
    return favoriteCountries.some(favoriteCountry => favoriteCountry.id === id);
  };

  const handleAddToFavorite = (country: Country) => {
    dispatch(addCountryToList(country));
  };

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

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
