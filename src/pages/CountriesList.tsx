import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../app/hooks';
import { InputChangeHandler } from '../types/types';
import { useAppDispatch} from '../app/hooks';
import { search, selectCountry } from '../reducers/counturies/countriesSlice';


const CountriesList: React.FC = () => {
const dispatch = useAppDispatch()    

const countryData = useAppSelector ((state)=>state.countryR.countries)

const handleSerchQuery: InputChangeHandler = (event) => {
    dispatch(search(event.target.value))
}

return (
    <div>
        <div>
            <input type='text' placeholder='serch' onChange={handleSerchQuery}/>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Flag</th>
                    <th>Name</th>
                    <th>Region</th>
                    <th>Population</th>
                    <th>Languages</th>
                    <th> </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {countryData.map((country)=> {
                return (
                <tr key={uuidv4()}>
                    <td>
                        <img src={country.flags.png} alt={country.flags.alt}/>
                    </td>
                    <td>
                        <button onClick={()=>dispatch(selectCountry(country.name.official))}>
                        {country.name.official}
                        </button>
                    </td>
                    <td>{country.region}</td>
                    <td>{country.population}</td>
                    <td> 
                        {Object.values(country.languages).map((language)=>{
                            return (
                                <ul key={uuidv4()}>
                                    <li>
                                        {language}
                                    </li>
                                </ul>
                            )
                        })}
                    </td>
                    <td>Fav</td>
                    <td>Ditails</td>
                </tr>
                )
                    })
                }
            </tbody>
        </table>
    </div>
)
}

export default CountriesList