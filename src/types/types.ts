
//! API types starts

export type Country = {
    name:{};
    flags:{};
    languages:{};
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
    message: string
}

//! contriesSlice types ends here