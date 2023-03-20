import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../app/hooks';
import { useAppDispatch} from '../app/hooks';
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
import { Box, SxProps } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';

const CountriesList: React.FC = () => {
    const dispatch = useAppDispatch()    
    const countryData = useAppSelector ((state)=>state.countryR.countries)
    
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
const tableContainerSx: SxProps = {
    border: "1px solid rgba(128,128,128,0.4)",
    width: "max-content",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 2,
    borderRadius: 2,
    maxHeight: 1000
}
return (
    <Box>
        <ToastContainer />
        <Paper sx={{width:'100%', overflow:'hidden'}}>
            <TableContainer sx={tableContainerSx}>
                <Table stickyHeader={true} aria-label="country list table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' width='200'>Flag</TableCell>
                            <TableCell align='center' width='200'>Name</TableCell>
                            <TableCell align='center' width='200'>Region</TableCell>
                            <TableCell align='center' width='200'>Population</TableCell>
                            <TableCell align='center' width='200'>Languages</TableCell>
                            <TableCell align='center' width='100'> </TableCell>
                            <TableCell align='center' width='100'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {countryData.map((country)=> {
                        return (
                        <TableRow key={uuidv4()}>
                            <TableCell 
                            align='center'
                        >
                                <img src={country.flags.png} alt={country.flags.alt}/>
                            </TableCell>

                            <TableCell
                            align='center' 
                            >
                                <Link to="/country_ditails" onClick={()=>dispatch(getCountryDitails(country.name.official))}>
                                {country.name.official}
                                </Link>
                            </TableCell>

                            <TableCell align='center'>{country.region}</TableCell>

                            <TableCell align='center'>{country.population}</TableCell>

                            <TableCell align='center'> 
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

                            <TableCell align='center'>
                                <IconButton onClick={()=> handleAddToFavorite (country)}>
                                    <FavoriteIcon color={isCountryFavorite(country)? 'secondary': 'action'}/>
                                </IconButton>
                            </TableCell>

                            <TableCell align='center'>
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
        </Paper>
        
    </Box>
)
}

export default CountriesList