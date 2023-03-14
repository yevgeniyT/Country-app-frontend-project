import { ChangeEvent } from 'react';

//! API types starts

export type Country = {
    name:{
        official:string
    };
    flags:{
        png:string;
        alt:string;
    };
    languages:{
        [key:string]:string
    };
    population:number;
    region:string
}

export type CountriesResponse = Country[]

//! API types ends

//! contriesSlice types starts here

export type CountriesState = {
    countries: CountriesResponse;
    loading: boolean;
    error: boolean;
    message: string;
    originalCountrie: CountriesResponse
}

export type InputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;

//! contriesSlice types ends here


//! contryDitailsSlice types starts here

export type CountryDitailsState = {
    countryDitails: CountriesResponse;
    loading: boolean;
    error: boolean;
    message: string;
}

//! contryDitailsSlice types ends here