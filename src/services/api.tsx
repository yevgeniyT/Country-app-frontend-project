import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { CountriesResponse } from "../types/types";

const BASE_URL ="https://restcountries.com/v3.1/all"

export const getCountries = createAsyncThunk <CountriesResponse>(
    'counties/getCountries',
    async () => {
      try {
        const response = await axios.get(BASE_URL, {
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