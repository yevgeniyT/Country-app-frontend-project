import React from 'react'
import FavoriteCountriesList from '../features/FavoriteCountriesList'

const Favorite = () => {
  return (
    <div>
      <div className='centered main-heading'>
        <h2>List of favourite countries</h2>
      </div>
      <FavoriteCountriesList/>
    </div>
  )
}
export default Favorite