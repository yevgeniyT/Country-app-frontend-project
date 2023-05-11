import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { getCountries } from '../../services/api';
import { CountriesState } from '../../types/types';

const INITIAL_STATE: CountriesState = {
  countries: [],
  loading: false,
  error: false,
  message: '',
  originalCountries: [],
  // store state of serch query in order to render NoDataFound in case oo no countriy avalible from sersh pr some misspell
  isSearchEmpty: false,
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: INITIAL_STATE,
  reducers: {
    searchCountries: (state, action) => {
      let searchQuery = action.payload;
      //user has cleared the search input, and we should display the full list of countries again.
      if (searchQuery === '') {
        state.countries = state.originalCountries;
        //Since the search input is empty, we set false  indicating that we're not dealing with an empty search result.
        state.isSearchEmpty = false;
      } else {
        //Ceate a new array containing only the countries that match the search query,
        const filteredCountries = state.originalCountries.filter(country =>
          country.name.official
            .toLocaleLowerCase()
            .includes(searchQuery.toLocaleLowerCase())
        );
        //update state.countries to the filtered list of countries, which will be displayed in the UI.
        state.countries = filteredCountries;
        // if filteredCountries.length returns 0 it means 0=0 => thre, i this way isSerchEmty will be saved as true
        state.isSearchEmpty = filteredCountries.length === 0;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCountries.pending, state => {
        state.loading = true;
        state.message = 'Data is pending....';
        state.error = false;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.countries = action.payload.map(country => ({
          ...country,
          id: uuidv4(),
        }));
        state.originalCountries = action.payload;
        state.loading = false;
      })
      .addCase(getCountries.rejected, state => {
        state.loading = false;
        state.error = true;
        state.message = 'Date fetching failed';
        state.countries = [];
      });
  },
});

export default countriesSlice.reducer;
export const { searchCountries } = countriesSlice.actions;
