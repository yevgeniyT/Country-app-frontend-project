//@ts-nocheck
import React from 'react';

import { useAppSelector } from '../app/hooks';
import { useAppDispatch } from '../app/hooks';
import { getCountryDitails } from '../services/api';
import { Link } from 'react-router-dom';
import { deleteCountry } from '../reducers/counturies/favoriteCountriesSlice';
import EmptyFavoriteList from '../pages/EmptyFavoriteList';

// MUI imports
import { IconButton, TableCell, Box, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';

const FavoriteCountriesList = () => {
  const dispatch = useAppDispatch();
  const favoriteList = useAppSelector(
    state => state.favoriteCountriesListR.favoriteCountriesList
  );

  const columns: GridColDef[] = [
    {
      field: 'flag',
      headerName: 'Flag',
      width: 200,
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: params => (
        <img src={params.row.flag} alt={params.row.flagAlt} />
      ),
    },
    {
      field: 'nameOfficial',
      headerName: 'Name',
      flex: 1,
      minWidth: 150,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <TableCell
          style={{
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            borderBottom: 'none',
          }}
        >
          {params.value}
        </TableCell>
      ),
    },
    {
      field: 'region',
      headerName: 'Region',
      flex: 1,
      minWidth: 120,
      disableColumnMenu: true,
    },
    {
      field: 'population',
      headerName: 'Population',
      flex: 1,
      minWidth: 140,
      disableColumnMenu: true,
    },
    {
      field: 'languages',
      headerName: 'Languages',
      flex: 1,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <TableCell
            style={{
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              borderBottom: 'none',
            }}
          >
            {params.value && params.value.join(', ')}
          </TableCell>
        );
      },
    },

    {
      field: 'delete',
      headerName: 'Delete',
      flex: 1,
      minWidth: 70,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
    {
      field: 'details',
      headerName: 'Details',
      flex: 1,
      minWidth: 70,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton>
          <StyledLink to="/country_ditails">
            <InfoIcon
              onClick={() => dispatch(getCountryDitails(country.name.official))}
            />
          </StyledLink>
        </IconButton>
      ),
    },
  ];

  const rows = favoriteList.map(country => {
    return {
      id: country.cca3,
      flag: country.flags.png,
      flagAlt: country.flags.alt,
      nameOfficial: country.name.official,
      region: country.region,
      population: country.population,
      languages: Object.values(country.languages),
    };
  });
  console.log(rows);

  const handleDelete = (id: string) => {
    dispatch(deleteCountry(id));
  };

  const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      textDecoration: 'none',
      color: 'primary.main',
    },
  });

  const favoriteCountriesTable = (
    <Box textAlign="center">
      <Typography
        variant="h4"
        mt={2}
        mb={2}
        sx={{
          fontSize: {
            xs: '0.8rem',
            sm: '1rem',
            md: '1.2rem',
            lg: '1.4rem',
            xl: '1.6rem',
          },
        }}
      >
        {`You have ${favoriteList.length} ${
          favoriteList.length === 1 ? 'country' : 'countries '
        }in your list`}
      </Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={150}
          style={{
            height: 'calc(100vh - 130px - 40px)',
            border: 'none',
            maxWidth: '95%',
          }}
          pageSize={5}
          rowsPerPageOptions={[15, 25, 50]}
        />
      </Box>
    </Box>
  );

  return (
    <Box>
      {favoriteList.length === 0 ? (
        <EmptyFavoriteList />
      ) : (
        favoriteCountriesTable
      )}
    </Box>
  );
};

export default FavoriteCountriesList;
