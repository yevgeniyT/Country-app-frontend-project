import React from 'react';

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { FeatureCollection } from 'geojson';

import '../App.css';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../app/hooks';
import countries from '../data/countries.json';
//import types for Layer leaflet
import { Layer, LeafletEvent } from 'leaflet';

interface CountryProperties {
  ISO_A3: string;
}
interface Country {
  properties: CountryProperties;
}

const WorldMap = () => {
  const countriesData = useAppSelector(state => state.countryR.countries);

  const countryStyle = {
    color: 'grey',
    weight: 1,
    dashArray: '5',
  };
  const highlightStyle = {
    color: 'blue',
    weight: 2,
    dashArray: '',
  };

  const onEachCountry = (country: Country, layer: Layer) => {
    const countryCode = country.properties.ISO_A3;
    const countryInfo = countriesData.find(c => c.cca3 === countryCode);
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

    const onClick = (event: LeafletEvent) => {
      event.target.openPopup();
    };

    const mouseover = (event: LeafletEvent) => {
      event.target.setStyle(highlightStyle);
    };

    const mouseout = (event: LeafletEvent) => {
      event.target.setStyle(countryStyle);
    };

    layer
      .on('click', onClick)
      .on('mouseover', mouseover)
      .on('mouseout', mouseout);
  };
  return (
    <div className="map-container">
      <MapContainer
        center={[20, 100]}
        zoom={3}
        style={{ width: '100%', height: 'calc(100vh - 87px - 40px)' }}
      >
        {countries && (
          <GeoJSON
            style={countryStyle}
            data={countries as FeatureCollection}
            onEachFeature={onEachCountry}
          />
        )}
        <TileLayer
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=ByX2FrOZQJ9mKw8J0YV7"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
      </MapContainer>
    </div>
  );
};

export default WorldMap;
