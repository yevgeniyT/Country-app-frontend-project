import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { CountriesResponse } from "../types/types";

const BASE_URL ="https://restcountries.com/v3.1"


//!Get all countries list

export const getCountries = createAsyncThunk <CountriesResponse>(
    'counties/getCountries',
    async () => {
    try {
        const response = await axios.get(`${BASE_URL}/all`, {
            params:{
                fields: 'name,region,flags,languages,population'
            }
        })
        return response.data
    }
    catch (error) {
        throw new Error ('Faild to fetch data')
    }
    }
)
//! Get countries ditails by name

export const getCountryDitails = createAsyncThunk <CountriesResponse, string> (
    'countries/getCountryDitails',
    async (endpoint) => {
        try {
            const response	= await axios.get (`${BASE_URL}/name/${endpoint}`)
         
            return response.data
        }
        catch (error) {

        }
    }
)