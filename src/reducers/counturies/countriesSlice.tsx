import { createSlice } from "@reduxjs/toolkit"

import { getCountries } from "../../services/api"

import { CountriesState } from "../../types/types"

const initialState: CountriesState = {
  countries : [],
  loading: false,
  error: false,
  message: ''
}

export const countriesSlice = createSlice ({
  name: 'countries',
  initialState: initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state)=>{
        state.loading = true;
        state.message = 'Data is pending....'}
      )
      .addCase(getCountries.fulfilled, (state, action) =>{
        state.countries=action.payload;
        state.loading = false}
      )
      .addCase(getCountries.rejected, (state)=>{
        state.loading = false;
        state.error = true;
        state.message = 'Date fetching failed'
        state.countries = []
      })
  }
}

)

export default countriesSlice.reducer