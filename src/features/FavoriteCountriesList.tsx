import React from 'react';

import { useAppSelector } from '../app/hooks';
import { useAppDispatch } from '../app/hooks';
import { getCountryDitails } from '../services/api';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { deleteCountry } from '../reducers/counturies/favoriteCountriesSlice';

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
  SxProps,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';


const FavoriteCountriesList = () => {
  const dispatch = useAppDispatch();
  const favoriteList = useAppSelector(
    (state) => state.favoriteCountriesListR.favoriteCountriesList
  );

const handleDelete = (id:string)=>{
  dispatch(deleteCountry(id))
  
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
      <TableContainer
        component={Paper}
        sx={tableContainerSx}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
            {favoriteList.map((country) => {
              return (
                <TableRow key={uuidv4()}>
                  <TableCell align='center'>
                    <img src={country.flags.png} alt={country.flags.alt} />
                  </TableCell>

                  <TableCell align='center'>
                    <Link
                      to="/country_ditails"
                      onClick={() =>
                        dispatch(getCountryDitails(country.name.official))
                      }
                    >
                      {country.name.official}
                    </Link>
                  </TableCell>

                  <TableCell align='center'>{country.region}</TableCell>

                  <TableCell align='center'>{country.population}</TableCell>

                  <TableCell align='center'>
                    {Object.values(country.languages).map((language) => {
                      return (
                        <ul key={uuidv4()}>
                          <li>{language}</li>
                        </ul>
                      );
                    })}
                  </TableCell>

                  <TableCell align='center'>
                    <IconButton onClick={()=>handleDelete(country.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>

                  <TableCell align='center'>
                    <IconButton>
                      <Link
                        to="/country_ditails"
                      >
                          <InfoIcon onClick={()=>dispatch(getCountryDitails(country.name.official))}/>
                      </Link>
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
