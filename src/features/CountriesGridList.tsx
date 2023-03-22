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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';

const CountriesGridList: React.FC = () => {
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

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <th>Flag</th>
                        <th>Name</th>
                        <th>Region</th>
                        <th>Population</th>
                        <th>Languages</th>
                        <th> </th>
                        <th></th>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {countryData.map((country)=> {
                    return (
                    <TableRow key={uuidv4()}>
                        <TableCell>
                            <img src={country.flags.png} alt={country.flags.alt}/>
                        </TableCell>

                        <TableCell>
                            <Link to="/country_ditails" onClick={()=>dispatch(getCountryDitails(country.name.official))}>
                            {country.name.official}
                            </Link>
                        </TableCell>

                        <TableCell>{country.region}</TableCell>

                        <TableCell>{country.population}</TableCell>

                        <TableCell> 
                            {Object.values(country.languages).map((language)=>{
                                return (
                                    <ul key={uuidv4()}>
                                        <li>
                                            {language}
                                        </li>
                                    </ul>
                                )
                            })}
                        </TableCell>

                        <TableCell>
                            <IconButton onClick={()=> handleAddToFavorite (country)}>
                                <FavoriteIcon color={isCountryFavorite(country)? 'secondary': 'action'}/>
                            </IconButton>
                        </TableCell>

                        <TableCell>
                        <IconButton >
                            <Link
                                to="/country_ditails"
                                >
                                <InfoIcon onClick={()=>dispatch(getCountryDitails(country.name.official))}/>
                            </Link>
                        </IconButton>
                        </TableCell>
                    </TableRow>
                    )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
)
}

export default CountriesGridList

