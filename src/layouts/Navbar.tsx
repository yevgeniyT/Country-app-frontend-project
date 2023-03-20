import { AppBar, Badge, Box, IconButton, Toolbar } from '@mui/material'
import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../app/hooks';
import { useAppDispatch } from '../app/hooks';
import {toggleDarkMode} from '../reducers/counturies/themeSlice'
import { search} from '../reducers/counturies/countriesSlice';
import { InputChangeHandler } from '../types/types';

import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PublicIcon from '@mui/icons-material/Public';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate} from 'react-router-dom';


const Navbar = () => {
  const dispatch = useAppDispatch();

  const favoriteCountriesCount = useAppSelector(
    (state) => state.favoriteCountriesListR.favoriteCountriesList.length
  );
  const darkMode = useAppSelector((state) => state.themeSelectorR.darkMode);

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
  useState <null | HTMLElement>(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  setMobileMoreAnchorEl(event.currentTarget);
  }
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleSwitchMode =()=>{
    dispatch(toggleDarkMode())
  }

  const renderMobileMenu = (
  <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <NavLink to="/">
          <IconButton>
            <HomeIcon/>
          </IconButton>
        </NavLink>
      </MenuItem>

      <MenuItem>
        <IconButton>
          <PublicIcon/>
        </IconButton>
      </MenuItem>

      <MenuItem>
        <NavLink to="/favorite">
          <IconButton>
            <Badge badgeContent={favoriteCountriesCount} color="error">
              <FavoriteIcon/>
            </Badge>
          </IconButton>
        </NavLink>  
      </MenuItem>

      <MenuItem>
        {darkMode ? (
          <IconButton onClick={handleSwitchMode}>
            <LightModeIcon />
          </IconButton>
            ) : (
          <IconButton onClick={handleSwitchMode}>
            <DarkModeIcon />
          </IconButton>
          )
        }
      </MenuItem>
  </Menu>
  )

//* Serch feature elements
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const handleSerchQuery: InputChangeHandler = (event) => {
  dispatch(search(event.target.value))
}

  return (
    <Box sx={{flexGrow:1}}>
      <AppBar position='sticky'>
        <Toolbar>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Country Explorer App
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSerchQuery}
            />
          </Search>

          <Box sx={{flexGrow:1}}>
            <Box sx={{ display: { xs: 'none', md: 'flex' },
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    gap: 1.5}}>
            <NavLink to="/">
              <IconButton>
                <HomeIcon/>
              </IconButton>
            </NavLink>
              <IconButton>
                <PublicIcon/>
              </IconButton>
            <NavLink to="/favorite">
              <IconButton>
                <Badge badgeContent={favoriteCountriesCount} color="error">
                  <FavoriteIcon/>
                </Badge>
              </IconButton>
            </NavLink>  

            {darkMode ? (
              <IconButton onClick={handleSwitchMode}>
                <LightModeIcon />
              </IconButton>
              ) : (
              <IconButton onClick={handleSwitchMode}>
                <DarkModeIcon />
              </IconButton>
              )
            }

            </Box>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  )
}

export default Navbar