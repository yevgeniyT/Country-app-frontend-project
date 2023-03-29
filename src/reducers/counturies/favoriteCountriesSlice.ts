import { createSlice } from '@reduxjs/toolkit';
import { Country } from '../../types/types';

const initialState = {
  favoriteCountriesList: [] as Country[],
  // originalFavoriteCountriesList: [] as Country[],
};

export const favoriteCountriesList = createSlice({
  name: 'favoriteCountriesList',
  initialState: initialState,
  reducers: {
    addCountryToList: (state, action) => {
      state.favoriteCountriesList.push(action.payload);
      // state.originalFavoriteCountriesList = [
      //   ...state.originalFavoriteCountriesList,
      //   action.payload,
      // ];
    },

    deleteCountry: (state, action) => {
      state.favoriteCountriesList = state.favoriteCountriesList.filter(
        country => country.id !== action.payload
      );
    },

    serchFavoriteCountries: (state, action) => {
      let searchQuery = action.payload;
      state.favoriteCountriesList = state.favoriteCountriesList.filter(
        country =>
          country.nameOfficial
            .toLocaleLowerCase()
            .includes(searchQuery.toLocaleLowerCase())
      );
    },
  },
});

export const { addCountryToList, deleteCountry, serchFavoriteCountries } =
  favoriteCountriesList.actions;
export default favoriteCountriesList.reducer;
