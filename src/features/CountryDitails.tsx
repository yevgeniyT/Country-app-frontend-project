import React from 'react'
import { useAppSelector } from '../app/hooks';

const CountryDitails: React.FC = () => {

const countryDitailsData = useAppSelector((state)=>state.countryDitailsR.countryDitails)

  return (
    <div>
      <h1>Country Ditails</h1>
      {countryDitailsData.map((country)=> {
        return (
          <p>{country.population}</p>
        )
      })}
    
    </div>
  )
}

export default CountryDitails

