// Reusable component that recievs data as props from Country and Favorite pages and render them
import React from 'react';

import { Link } from 'react-router-dom';

// components import
import { getCountryDitails } from '../services/api';
import { deleteCountry } from '../reducers/counturies/favoriteCountriesSlice';
import { useAppDispatch } from '../app/hooks';

// MUI imports
import { IconButton, Box } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';

//Message imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Types imports
import { Country, CountriesTableProps, CountryRow } from '../types/types';

const CountriesTable: React.FC<CountriesTableProps> = ({
  // recive data as props from Countries.tsx and Favoprite.tsx
  data,
  handleAddToFavorite,
  isCountryFavorite,
}) => {
  // declare const to despatch actions
  const dispatch = useAppDispatch();
  //Define an array object that represents an colums of the dataGrid layout in MUI
  const columns: GridColDef[] = [
    {
      field: 'flag',
      headerName: 'Flag',
      width: 200,
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      //The params object is automatically provided by the DataGrid.  When the DataGrid renders the table, it iterates through each row in the rows array and maps the data from the row to the corresponding columns defined in the columns array.
      //For each cell, the DataGrid component creates a params object that contains information about the cell, such as the row data, column data, rowIndex, and columnIndex
      renderCell: params => (
        <StyledLink
          to="/country_ditails"
          onClick={() => dispatch(getCountryDitails(params.row.nameOfficial))}
        >
          <img src={params.row.flag} alt={params.row.flagAlt} />
        </StyledLink>
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
            (handleAddToFavorite || (() => {}))(params.row); // Add to favorites if it's not a favorite yet. This pattern is used to make sure that the code doesn't throw an error if the handleAddToFavorite function is not provided. It's a way to provide a "safe" fallback function that doesn't do anything when called.
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
  //map data
  const rows: CountryRow[] = data.map((country: Country) => {
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

  // Styling component, which is used for navigation to the country details page.
  const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      textDecoration: 'none',
      color: 'primary.main',
    },
  });

  //creates the content of the table using the DataGrid component, with custom styling and properties. The table displays the list of countries with the columns defined earlier.
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
      {CountriesTableContent}
      <ToastContainer hideProgressBar />
    </Box>
  );
};

export default CountriesTable;
