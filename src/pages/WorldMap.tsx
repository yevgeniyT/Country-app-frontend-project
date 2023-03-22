// @ts-nocheck
import React, {useEffect} from 'react';

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import '../App.css';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../app/hooks';
import { useAppDispatch} from '../app/hooks';
import { getGeoData } from '../services/api';

const center = [20, 100];

const WorldMap = () => {

const dispatch = useAppDispatch()    
const geoData = useAppSelector ((state)=>state.geoDataR.geoData)
const countriesData = useAppSelector ((state)=>state.countryR.countries)
  
useEffect(() => {
    dispatch(getGeoData());
  }, [dispatch]);

const countryStyle ={
  color: 'grey',
  weight: 1,
  dashArray: 5
}
const highlightStyle = {
  color: 'blue',
  weight: 2,
  dashArray: '',
};

const onEachCountry = (country, layer) => {
  const countryCode = country.properties.ISO_A3;
  const countryInfo = countriesData.find((c) => c.cca3 === countryCode);
  if (countryInfo) {
    const popupContent = `
      <h3>${countryInfo.name.common} (${countryInfo.capital[0]})</h3>
      <img src="${countryInfo.flags.png}" alt="${countryInfo.name.common} flag">
      <p>Region: ${countryInfo.region}</p>
      <p>Population: ${countryInfo.population.toLocaleString()}</p>
      <p>Langusges: ${Object.values(countryInfo.languages).join(', ')} </p>
      `;
    layer.bindPopup(popupContent);
  } else {
    layer.bindPopup('No information available');
  }

  const onClick = (event) => {
    event.target.openPopup();
  };

  const mouseover = (event) => {
    event.target.setStyle(highlightStyle);
  };

  const mouseout = (event) => {
    event.target.setStyle(countryStyle);
  };

  layer.on('click', onClick).on('mouseover', mouseover).on('mouseout', mouseout);
};
  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={3}
        style={{ width: '100vw', height: '100vh' }}
      >
        {geoData && <GeoJSON style={countryStyle} data={geoData.features} onEachFeature={onEachCountry}/>}
        <TileLayer
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=ByX2FrOZQJ9mKw8J0YV7"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
     </MapContainer>
    </div>
  );
};

export default WorldMap;
