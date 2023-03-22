
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../app/hooks';
import { useAppDispatch} from '../app/hooks';
import { getCountryDitails } from '../services/api';
import { Link } from 'react-router-dom';
import {addCountryToList} from '../reducers/counturies/favoriteCountriesSlice'
import {Country} from '../types/types'
import Loading from '../pages/loading';
import ErrorFetch from '../pages/ErrorFetch';
import NoDataFound from '../pages/NoDataFound';

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
import { styled } from '@mui/system';


const CountriesList: React.FC = () => {
    const dispatch = useAppDispatch()    
    const countryData = useAppSelector ((state)=>state.countryR.countries)
    const isLoading = useAppSelector((state)=>state.countryR.loading)
    const isError = useAppSelector((state)=>state.countryR.error)
    
    const handleAddToFavorite = (country: Country) =>{
    if (isCountryFavorite(country)){
        toast.error(`${country.name.official} is already in your favoriets`)
    } else {
        dispatch(addCountryToList(country))
        toast.success(`${country.name.official} has been added to your favoriets`)
    }}
    

// change colore of favorite icon based on condition if the county in favorite list
    //get the store in this component

const favoriteCountries = useAppSelector((state)=>state.favoriteCountriesListR.favoriteCountriesList)

    // add fanction to check is the county in list

const isCountryFavorite = (country:Country) =>{
    return favoriteCountries.some(favoriteCountry=>favoriteCountry.name.official===country.name.official)
    
}
const tableContainerSx: SxProps = {
    border: "1px solid rgba(128,128,128,0.4)",
    width: '100%',
    maxWidth: "max-content",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 2,
    borderRadius: 2,
    maxHeight: 'calc(100vh - 110px - 40px)',
}
const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit', 
    '&:hover': {
    textDecoration: 'none',
    color: 'primary.main',
    },
});

if(isLoading) {
    return <Loading/>
}
if(isError) {
    return <ErrorFetch/>
}

if (countryData.length === 0) {
    return <NoDataFound />;
}
return (
    <Box>
        <ToastContainer />
        <Paper sx={{width:'100%', overflow:'hidden'}}>
            <TableContainer sx={tableContainerSx}>
                <Table stickyHeader={true} aria-label="country list table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' width='150' classes={{ head: 'head' }} sx={{ padding: { xs: '4px', sm: '8px',md: '16px'}, fontSize: {xs:'0.8rem', sm: '1rem', md:'1.2rem', lg: '1.4rem', xl: '1.6rem'}}}>Flag</TableCell>

                            <TableCell align='center' width='300' classes={{ head: 'head' }} sx={{ padding: { xs: '4px', sm: '8px',md: '16px'}, fontSize: {xs:'0.8rem', sm: '1rem', md:'1.2rem', lg: '1.4rem', xl: '1.6rem'}}} >Name</TableCell>

                            <TableCell align='center' width='300' classes={{ head: 'head' }}sx={{ padding: { xs: '4px', sm: '8px',md: '16px'}, fontSize: {xs:'0.8rem', sm: '1rem', md:'1.2rem', lg: '1.4rem', xl: '1.6rem'}}}>Region</TableCell>

                            <TableCell align='center' width='300' classes={{ head: 'head' }} sx={{ padding: { xs: '4px', sm: '8px',md: '16px'}, fontSize: {xs:'0.8rem', sm: '1rem', md:'1.2rem', lg: '1.4rem', xl: '1.6rem'}}}>Population</TableCell>

                            <TableCell align='center' width='300' classes={{ head: 'head' }} sx={{ padding: { xs: '4px', sm: '8px',md: '16px'}, fontSize: {xs:'0.8rem', sm: '1rem', md:'1.2rem', lg: '1.4rem', xl: '1.6rem'}}}>Languages</TableCell>
                            <TableCell align='center' width='250' classes={{ head: 'head' }} sx={{ padding: { xs: '4px', sm: '8px',md: '16px'}, fontSize: {xs:'0.8rem', sm: '1rem', md:'1.2rem', lg: '1.4rem', xl: '1.6rem'}}}>Favorite</TableCell>

                            <TableCell align='center' width='250' classes={{ head: 'head' }} sx={{ padding: { xs: '4px', sm: '8px',md: '16px'}, fontSize: {xs:'0.8rem', sm: '1rem', md:'1.2rem', lg: '1.4rem', xl: '1.6rem'}}}>Ditails</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {countryData.map((country)=> {
                        return (
                        <TableRow
                            key={uuidv4()}
                        >
                            <TableCell 
                            align='center'
                            sx={{ padding: { xs: '0.5px', sm: '4px' },  }}
                            >
                                <img src={country.flags.png} alt={country.flags.alt}/>
                            </TableCell>

                            <TableCell
                            align='center'
                            sx={{ padding: { xs: '2px', sm: '4px' },fontSize: {xs:'0.8rem', sm: '0.8rem', md:'1rem', lg: '1.2rem', xl: '1.4rem'} }}
                            >
                                <StyledLink
                                    to="/country_ditails"
                                    onClick={()=>dispatch(getCountryDitails(country.name.official))}
                                >
                                {country.name.official}
                                </StyledLink>
                            </TableCell>

                            <TableCell
                                align='center'
                                sx={{ padding: { xs: '2px', sm: '4px' }, fontSize: {xs:'0.8rem', sm: '0.8rem', md:'1rem', lg: '1.2rem', xl: '1.4rem'} }}
                            >
                                {country.region}
                            </TableCell>

                            <TableCell
                                align='center'
                                sx={{ padding: { xs: '2px', sm: '4px' },fontSize: {xs:'0.8rem', sm: '0.8rem', md:'1rem', lg: '1.2rem', xl: '1.4rem'} }}
                            >
                                {country.population.toLocaleString()}
                            </TableCell>

                            <TableCell
                                align='center'
                                sx={{ padding: { xs: '2px', sm: '4px' },fontSize: {xs:'0.8rem', sm: '0.8rem', md:'1rem', lg: '1.2rem', xl: '1.4rem'} }}
                            > 
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

                            <TableCell
                                align='center'
                                sx={{ padding: { xs: '2px', sm: '4px' }}}
                            >
                                <IconButton onClick={()=> handleAddToFavorite (country)}>
                                    <FavoriteIcon sx={{fontSize: {xs:'1rem', sm: '1.2rem', md:'1.4rem', lg: '1.6rem', xl: '2rem'}}}  color={isCountryFavorite(country)? 'error': 'action'}/>
                                </IconButton>
                            </TableCell>

                            <TableCell
                                align='center'
                                sx={{ padding: { xs: '2px', sm: '4px' } }}
                            >
                            <IconButton >
                                <StyledLink
                                    to="/country_ditails"
                                >
                                    <InfoIcon sx={{fontSize: {xs:'1rem', sm: '1.2rem', md:'1.4rem', lg: '1.6rem', xl: '2rem'}}} onClick={()=>dispatch(getCountryDitails(country.name.official))}/>
                                </StyledLink>
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