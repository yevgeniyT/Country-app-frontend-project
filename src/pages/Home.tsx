import React from 'react';
import { useEffect } from 'react';

import { getCountries } from '../services/api';
import { useAppDispatch } from '../app/hooks';
import CountriesList from '../features/CountriesList';

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div>
      <CountriesList />
    </div>
  );
};

export default Home;
