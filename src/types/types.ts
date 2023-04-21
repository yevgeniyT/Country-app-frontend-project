import { ChangeEvent } from 'react';

//! API types starts

export type Country = {
  name: {
    official: string;
    common: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  flags: {
    png: string;
    alt: string;
  };
  languages: {
    [key: string]: string;
  };
  nativeName: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
  population: number;
  region: string;
  status: string;
  subregion: string;
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  capital: string[];
  borders: string[];
  unMember: boolean;
  timezones: string[];
  area: number;
  gini: {
    [key: string]: number;
  };
  car: {
    signs: string[];
    side: string;
  };
  postalCode: {
    format: string;
    regex: string;
  };
  id: string;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  cca3: string;
  flag: string;
  flagAlt: string;
  nameOfficial: string;
  coatOfArms: {
    png: string;
  };
  latlng: {
    0: number;
    1: number;
  };
};

export type CountriesResponse = Country[];

//! API types ends

//! contriesSlice types starts here

export type CountriesState = {
  countries: CountriesResponse;
  loading: boolean;
  error: boolean;
  message: string;
  originalCountrie: CountriesResponse;
  isSearchEmpty: boolean;
};

export type InputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;

//! contryDitailsSlice types starts here

export type CountryDitailsState = {
  countryDitails: CountriesResponse;
  loading: boolean;
  error: boolean;
  message: string;
};

//! themeSlice types starts here

export type ThemeState = {
  darkMode: boolean;
};

//! CountriesTable types starts here

export interface CountriesTableProps {
  data: Country[];
  handleAddToFavorite?: (country: Country) => void;
  isCountryFavorite: (id: string) => boolean;
}

export interface CountryRow {
  id: string;
  flag: string | string;
  flagAlt: string | string;
  nameOfficial: string | string;
  region: string;
  population: number;
  languages: string[];
}
