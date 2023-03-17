import { createSlice, PayloadAction  } from "@reduxjs/toolkit"
import { Country } from "../../types/types"

const initialState = {
    favoriteCountriesList: [] as Country[],
};

export const favoriteCountriesList = createSlice ({
    name: 'favoriteCountriesList',
    initialState: initialState,
    reducers: {
        addCountryToList: (state, action:PayloadAction<Country>) => {
        state.favoriteCountriesList.push(action.payload)
        }
    },

})

export const { addCountryToList } = favoriteCountriesList.actions;
export default favoriteCountriesList.reducer