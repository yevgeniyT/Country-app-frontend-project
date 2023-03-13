import React from 'react'
import { useEffect } from 'react';

import { getCountries } from '../services/api';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const Home = () => {
  const dispatch = useAppDispatch();
  const countryData = useAppSelector ((state)=>state.countryR.countries)
  
   useEffect (()=>{
    dispatch(getCountries())
  }, [dispatch])

  return (
    <div>Home</div>
  )
}

export default Home