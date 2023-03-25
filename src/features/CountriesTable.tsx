//@ts-nocheck
import React from 'react';

import { getCountryDitails } from '../services/api';
import { Link } from 'react-router-dom';
import { deleteCountry } from '../reducers/counturies/favoriteCountriesSlice';
import EmptyFavoriteList from '../pages/EmptyFavoriteList';
import { useAppDispatch } from '../app/hooks';

// MUI imports
import { IconButton, Box } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';

//*Message imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CountriesTable = ({ data, handleAddToFavorite, isCountryFavorite }) => {
  const dispatch = useAppDispatch();
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
        <Box
          style={{
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            borderBottom: 'none',
          }}
        >
          {params.value}
        </Box>
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
          <Box
            style={{
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              borderBottom: 'none',
            }}
          >
            {params.value && params.value.join(', ')}
          </Box>
        );
      },
    },

    {
      field: 'favorites',
      headerName: 'Favorites',
      flex: 1,
      minWidth: 70,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        const isFavorite = isCountryFavorite(params.row.id);

        const handleFavoriteClick = () => {
          if (isFavorite) {
            dispatch(deleteCountry(params.row.id)); // Remove from favorites if it's already a favorite
            toast.error('Country removed from favorites.', { autoClose: 600 });
          } else {
            handleAddToFavorite(params.row); // Add to favorites if it's not a favorite yet
            toast.success('Country added to favorites.', { autoClose: 600 });
          }
        };

        return (
          <IconButton onClick={handleFavoriteClick}>
            <FavoriteIcon color={isFavorite ? 'error' : 'action'} />
          </IconButton>
        );
      },
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
              onClick={() =>
                dispatch(getCountryDitails(params.row.nameOfficial))
              }
            />
          </StyledLink>
        </IconButton>
      ),
    },
  ];
  console.log('Data received in CountriesTable:', data);

  const rows = data.map(country => {
    return {
      id: country.cca3 || country.id,
      flag: country.flags ? country.flags.png : country.flag,
      flagAlt: country.flags ? country.flags.alt : country.flagAlt,
      nameOfficial: country.name ? country.name.official : country.nameOfficial,
      region: country.region,
      population: country.population,
      languages: country.languages
        ? Object.values(country.languages)
        : country.languages,
    };
  });

  const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      textDecoration: 'none',
      color: 'primary.main',
    },
  });

  const CountriesTableContent = (
    <Box textAlign="center">
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
        />
      </Box>
    </Box>
  );
  return (
    <Box>
      {data.length === 0 ? <EmptyFavoriteList /> : CountriesTableContent}
      <ToastContainer hideProgressBar />
    </Box>
  );
};

export default CountriesTable;
