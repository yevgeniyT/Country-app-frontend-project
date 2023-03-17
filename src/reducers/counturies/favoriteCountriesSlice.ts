import { createSlice} from "@reduxjs/toolkit"
import { Country } from "../../types/types"

const initialState = {
    favoriteCountriesList: [] as Country[],
};

export const favoriteCountriesList = createSlice ({
    name: 'favoriteCountriesList',
    initialState: initialState,
    reducers: {
        addCountryToList: (state, action) => {
        state.favoriteCountriesList.push(action.payload)
        },
        deleteCountry: (state, action) => {
            state.favoriteCountriesList = state.favoriteCountriesList.filter((country)=>country.id !== action.payload)
            
        }

    },

})

export const { addCountryToList, deleteCountry } = favoriteCountriesList.actions;
export default favoriteCountriesList.reducer

