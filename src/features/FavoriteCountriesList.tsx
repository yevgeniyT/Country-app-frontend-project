import React from 'react';

import { useAppSelector } from '../app/hooks';
import { useAppDispatch } from '../app/hooks';
import { getCountryDitails } from '../services/api';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { deleteCountry } from '../reducers/counturies/favoriteCountriesSlice';
import EmptyFavoriteList from '../pages/EmptyFavoriteList';

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
  Typography
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';

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
  width: "100%",
  maxWidth: "max-content",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: 2,
  borderRadius: 2,
  maxHeight: 'calc(100vh - 60px - 40px)'
}
const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit', 
  '&:hover': {
  textDecoration: 'none',
  color: 'primary.main',
  },
});

const favoriteCountriesTable = (
  <Box textAlign='center'>
      <Typography variant="h4" mt={2} sx={{fontSize: {xs:'0.8rem', sm: '1rem', md:'1.2rem', lg: '1.4rem', xl: '1.6rem'}}}>
          {`You have ${favoriteList.length} ${favoriteList.length ===1 ? 'country' : 'countries '}in your list`}
      </Typography>
      <Paper sx={{width:'100%', overflow:'hidden'}}>
      <TableContainer
        component={Paper}
        sx={tableContainerSx}
      >
        <Table stickyHeader={true} aria-label="favorite country list table">
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
            {favoriteList.map((country) => {
              return (
                <TableRow key={uuidv4()}>
                  <TableCell align='center' sx={{ padding: { xs: '0.5px', sm: '4px' } }}>
                    <img src={country.flags.png} alt={country.flags.alt} />
                  </TableCell>

                  <TableCell align='center'sx={{ padding: { xs: '2px', sm: '4px' },fontSize: {xs:'0.8rem', sm: '0.8rem', md:'1.0rem', lg: '1.2rem', xl: '1.4rem'} }}>
                    <StyledLink
                      to="/country_ditails"
                      onClick={() =>
                        dispatch(getCountryDitails(country.name.official))
                      }
                    >
                      {country.name.official}
                    </StyledLink>
                  </TableCell>

                  <TableCell align='center'sx={{ padding: { xs: '2px', sm: '4px' },fontSize: {xs:'0.8rem', sm: '0.8rem', md:'1.0rem', lg: '1.2rem', xl: '1.4rem'} }}>{country.region}</TableCell>

                  <TableCell align='center'sx={{ padding: { xs: '2px', sm: '4px' },fontSize: {xs:'0.8rem', sm: '0.8rem', md:'1.0rem', lg: '1.2rem', xl: '1.4rem'} }}>{country.population}</TableCell>

                  <TableCell align='center'sx={{ padding: { xs: '2px', sm: '4px' },fontSize: {xs:'0.8rem', sm: '0.8rem', md:'1.0rem', lg: '1.2rem', xl: '1.4rem'} }}>
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
                      <DeleteIcon  sx={{fontSize: {xs:'1rem', sm: '1.2rem', md:'1.5rem', lg: '2rem', xl: '2rem'}}}  />
                    </IconButton>
                  </TableCell>

                  <TableCell align='center'>
                    <IconButton>
                      <StyledLink
                        to="/country_ditails"
                      >
                          <InfoIcon sx={{fontSize: {xs:'1rem', sm: '1.2rem', md:'1.5rem', lg: '2rem', xl: '2rem'}}} onClick={()=>dispatch(getCountryDitails(country.name.official))}/>
                      </StyledLink>
                    </IconButton >
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
  </Box>
)

  return (
    <Box>
      {favoriteList.length === 0? <EmptyFavoriteList/> : favoriteCountriesTable}
    </Box>
  );
};

export default FavoriteCountriesList;
