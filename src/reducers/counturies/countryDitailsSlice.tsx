import { createSlice } from '@reduxjs/toolkit';

import { getCountryDitails } from '../../services/api';
import { CountryDitailsState } from '../../types/types';

const INITIAL_STATE: CountryDitailsState = {
  countryDitails: [],
  loading: false,
  error: false,
  message: '',
};

export const countryDitails = createSlice({
  name: 'countryDitails',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCountryDitails.pending, state => {
        state.loading = true;
        state.message = 'Data is loading';
      })
      .addCase(getCountryDitails.fulfilled, (state, action) => {
        state.countryDitails = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(getCountryDitails.rejected, state => {
        state.loading = false;
        state.error = true;
        state.message = 'Failed to fetch data...';
        state.countryDitails = [];
      });
  },
});

export default countryDitails.reducer;
