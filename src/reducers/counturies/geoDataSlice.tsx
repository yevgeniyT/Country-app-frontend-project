//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import { getGeoData } from '../../services/api'; //!

const initialState = {
    geoData: [],
    loading: false,
    error: false
};

const geoDataSlice = createSlice({
    name: "geoData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(getGeoData.pending, (state) => {
        state.loading = true
        })
        .addCase(getGeoData.fulfilled, (state, action) => {
        state.loading = false
        state.geoData = action.payload
        state.error = false;
        })
        .addCase(getGeoData.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.geoData=[]
        });
    },
});

export default geoDataSlice.reducer