//@ts-nocheck
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../app/hooks';
import { InputChangeHandler } from '../types/types';
import { useAppDispatch} from '../app/hooks';
import { search} from '../reducers/counturies/countriesSlice';
import { getCountryDitails } from '../services/api';
import { Link } from 'react-router-dom';
import {addCountryToList} from '../reducers/counturies/favoriteCountriesSlice'
import {Country} from '../types/types'

//*Message imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//*MUI imports
import {IconButton} from '@mui/material';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';


const CountriesGrid: React.FC = () => {
    const dispatch = useAppDispatch()    
    const countryData = useAppSelector ((state)=>state.countryR.countries)
    
    const handleSerchQuery: InputChangeHandler = (event) => {
        dispatch(search(event.target.value))
    }

const handleAddToFavorite = (country: Country) =>{
    if (isCountryFavorite(country)){
        toast.error(`${country.name.official} is already in your favoriets`)
    } else {
        dispatch(addCountryToList(country))
        toast.success(`${country.name.official} has been added to your favoriets`)
    }}
    
//* change colore of favorite icon based on condition if the county in favorite list
    //*get the store in this component

const favoriteCountries = useAppSelector((state)=>state.favoriteCountriesListR.favoriteCountriesList)

    //* add fanction to check is the county in list

const isCountryFavorite = (country:Country) =>{
    return favoriteCountries.some(favoriteCountry=>favoriteCountry.name.official===country.name.official)
    
}

const columns: GridColDef[] = [
    {
    field: 'flag',
    headerName: 'Flag',
    width: 120,
    renderCell: (params: GridCellParams) => {
        const flagUrl = params.getValue(params.id, 'flagUrl') as string;
        return <img src={flagUrl} alt="Country flag" width="20" />;
    },
    },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'region', headerName: 'Region', width: 150 },
    { field: 'population', headerName: 'Population', width: 150 },
    { field: 'languages', headerName: 'Languages', width: 200 },
    {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params: GridCellParams) => {
        const country = params.row as Country;
        const isFavorite = isCountryFavorite(country);
        return (
        <>
            <IconButton onClick={() => handleAddToFavorite(country)}>
            <FavoriteIcon color={isFavorite ? 'secondary' : 'action'} />
            </IconButton>
            <IconButton>
            <Link to="/country_ditails" onClick={() => dispatch(getCountryDitails(country.name.official))}>
                <InfoIcon />
            </Link>
            </IconButton>
        </>
        );
    },
    },
];

const rows = countryData.map((country) => ({
    id: uuidv4(),
    flagUrl: country.flags.png,
    name: country.name.official,
    region: country.region,
    population: country.population,
    languages: Object.values(country.languages).join(', '),
}));



return (
    <Box>
        <ToastContainer />
        <div>
            <TextField
                    id="standard-search"
                    label="Search"
                    type="search"
                    onChange={handleSerchQuery}
                />
        </div>
        <Box style={{ height: 500, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} disableSelectionOnClick />
        </Box>

    </Box>
)
}

export default CountriesGrid

