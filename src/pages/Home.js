import React from 'react'
import { useEffect } from 'react';


import { getCountries } from '../services/api';
import { useAppDispatch} from '../app/hooks';
import CountriesList from './CountriesList';

const Home = () => {
  const dispatch = useAppDispatch();

useEffect (()=>{
    dispatch(getCountries())
  }, [dispatch])

  return (
    <div>
      Home
    </div>
  )
}

export default Home