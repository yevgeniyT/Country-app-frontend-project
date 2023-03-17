import React from 'react';
import { useAppSelector } from '../app/hooks';
import { useAppDispatch } from '../app/hooks';
import { getCountryDitails } from '../services/api';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// MUI imports
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';

const FavoriteCountriesList = () => {
  const dispatch = useAppDispatch();
  const favoriteList = useAppSelector(
    (state) => state.favoriteCountriesListR.favoriteCountriesList
  );

  return (
    <Box>
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
            {favoriteList.map((country) => {
              return (
                <TableRow key={uuidv4()}>
                  <TableCell>
                    <img src={country.flags.png} alt={country.flags.alt} />
                  </TableCell>

                  <TableCell>
                    <Link
                      to="/country_ditails"
                      onClick={() =>
                        dispatch(getCountryDitails(country.name.official))
                      }
                    >
                      {country.name.official}
                    </Link>
                  </TableCell>

                  <TableCell>{country.region}</TableCell>

                  <TableCell>{country.population}</TableCell>

                  <TableCell>
                    {Object.values(country.languages).map((language) => {
                      return (
                        <ul key={uuidv4()}>
                          <li>{language}</li>
                        </ul>
                      );
                    })}
                  </TableCell>

                  <TableCell>
                    <IconButton>
                      <FavoriteIcon />
                    </IconButton>
                  </TableCell>

                  <TableCell>
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FavoriteCountriesList;
