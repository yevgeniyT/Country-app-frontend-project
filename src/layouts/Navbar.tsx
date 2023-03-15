import { AppBar, Badge, Box, IconButton, Toolbar } from '@mui/material'
import React, {useState,} from 'react'
import { NavLink } from 'react-router-dom'

import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PublicIcon from '@mui/icons-material/Public';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MoreIcon from '@mui/icons-material/MoreVert';

const Navbar = () => {
  const mobileMenuId = 'primary-search-account-menu-mobile';

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
  useState <null | HTMLElement>(null);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  setMobileMoreAnchorEl(event.currentTarget);
  }
  
  return (
    <Box sx={{flexGrow:1}}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            sx={{mr:2}}
          >
            <MenuIcon/>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Countries
          </Typography>
          <Box sx={{flexGrow:1}}>
            <Box sx={{display:{xs:'none', md:'flex'}}}>
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
                <Badge>
                  <FavoriteIcon/>
                </Badge>
              </IconButton>
            </NavLink>  
              <IconButton>
                <DarkModeIcon/>
              </IconButton>
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
    </Box>
  )
}

export default Navbar