import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../app/hooks';
import { InputChangeHandler } from '../types/types';
import { useAppDispatch} from '../app/hooks';
import { search} from '../reducers/counturies/countriesSlice';
import { getCountryDitails } from '../services/api';
import { Link } from 'react-router-dom';

//*MUI imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';

const CountriesList: React.FC = () => {
    const dispatch = useAppDispatch()    
    const countryData = useAppSelector ((state)=>state.countryR.countries)
    
    const handleSerchQuery: InputChangeHandler = (event) => {
        dispatch(search(event.target.value))
    }

return (
    <Box>
        <div>
            <input type='text' placeholder='serch' onChange={handleSerchQuery}/>
        </div>

        <TableContainer component={Paper}>
            <Table>
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
                        <TableCell>Fav</TableCell>
                        <TableCell>Ditails</TableCell>
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

export default CountriesList