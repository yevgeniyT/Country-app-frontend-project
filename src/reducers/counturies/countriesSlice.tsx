import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid';


import { getCountries } from "../../services/api"

import { CountriesState } from "../../types/types"

const INITIAL_STATE: CountriesState = {
  countries : [],
  loading: false,
  error: false,
  message: '',
  originalCountrie: []
}

export const countriesSlice = createSlice ({
  name: 'countries',
  initialState: INITIAL_STATE,
  reducers: {
    search: (state, action) => {
      let searchQuery = action.payload
      if(searchQuery === ''){
        state.countries=state.originalCountrie
      } else {
      state.countries= state.originalCountrie.filter((country) => 
        country.name.official.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
      )}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state)=>{
        state.loading = true;
        state.message = 'Data is pending....'}
      )
      .addCase(getCountries.fulfilled, (state, action) =>{
        state.countries=action.payload.map((country) => ({
          ...country,
          id: uuidv4 ()
        })
        )
        state.originalCountrie = action.payload;
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
export const {search}=countriesSlice.actions