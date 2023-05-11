//This component displays detailed information about a selected country, including its name, capital, flag, coat of arms, time zone, language, currency, description, and location. The data for the country is retrieved from the global state using a Redux selector.

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../app/hooks';
import { v4 as uuidv4 } from 'uuid';

//MUI imports
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
  IconButtonProps,
  Paper,
} from '@mui/material';
import { Box } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';

type ExpandMoreProps = {
  expand: boolean;
} & IconButtonProps;

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})<{ expand: boolean }>(props => {
  const theme = useTheme();
  const { expand } = props;
  return {
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  };
});

const CountryDitails: React.FC = () => {
  const countryDitailsData = useAppSelector(
    state => state.countryDitailsR.countryDitails
  );

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box>
      {countryDitailsData.map(country => {
        return (
          //Create a Paper component to center the card vertically and horizontally.
          <Paper
            key={uuidv4()}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 'calc(100vh - 90px - 40px)',
            }}
          >
            <Card key={uuidv4()} sx={{ maxWidth: '40%' }}>
              <CardHeader
                avatar={
                  <Avatar
                    src={country.coatOfArms.png}
                    alt={country.flags.alt}
                  ></Avatar>
                }
                title={`${country.name.official} (${country.capital[0]}) `}
                subheader={`TimeZone: ${country.timezones[0]} | Language: ${
                  country.languages[Object.keys(country.languages)[0]]
                } | Currency: ${
                  country.currencies[Object.keys(country.currencies)[0]].name
                }`}
              />
              <CardMedia
                component="img"
                height="250"
                image={country.flags.png}
                alt={country.flags.alt}
                sx={{
                  padding: '3rem',
                }}
              />
              <CardContent>
                <Typography>
                  <Box component="span" fontWeight="bold">
                    {country.name.common}
                  </Box>
                  , officially known as {country.name.official}, is a sovereign
                  nation situated in the{' '}
                  <Box component="span" fontWeight="bold">
                    {country.subregion}
                  </Box>{' '}
                  subregion of {country.region}. The predominant language spoken
                  in {country.name.common} is{' '}
                  <Box component="span" fontWeight="bold">
                    {country.languages[Object.keys(country.languages)[0]]}
                  </Box>
                  , and the national currency is the{' '}
                  <Box component="span" fontWeight="bold">
                    {
                      country.currencies[Object.keys(country.currencies)[0]]
                        .name
                    }
                  </Box>
                  . The country's capital is{' '}
                  <Box component="span" fontWeight="bold">
                    {country.capital[0]}
                  </Box>
                  . The rich culture and heritage of {country.name.common}
                  can be experienced throughout the nation, making it an
                  enchanting destination for travelers and global citizens
                  alike.
                </Typography>
              </CardContent>
              <CardActions>
                <Link to="/">
                  <IconButton>
                    <ArrowBackIcon />
                  </IconButton>
                </Link>
                <Box ml="auto">
                  {
                    <a
                      href={country.maps.openStreetMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconButton>
                        <LocationOnIcon />
                      </IconButton>
                    </a>
                  }

                  <ExpandMore expand={expanded} onClick={handleExpandClick}>
                    <ExpandMoreIcon />
                  </ExpandMore>
                </Box>
              </CardActions>

              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>
                    <Box component="span" fontWeight="bold">
                      Location:{' '}
                    </Box>
                    {Math.abs(country.latlng[0])}°
                    {country.latlng[0] >= 0 ? 'N' : 'S'} and{' '}
                    {Math.abs(country.latlng[1])}°
                    {country.latlng[1] >= 0 ? 'E' : 'W'}
                  </Typography>
                  <Typography mb={2}>
                    <Box component="span" fontWeight="bold">
                      Has borders with:{' '}
                    </Box>
                    {country.hasOwnProperty('borders') &&
                    country.borders.length > 0
                      ? country.borders.join(', ')
                      : 'No data'}
                  </Typography>
                  <Typography mb={2}>
                    <Box component="span" fontWeight="bold">
                      Time zone:{' '}
                    </Box>{' '}
                    {country.timezones[0]}
                  </Typography>
                  <Typography mb={2}>
                    <Box component="span" fontWeight="bold">
                      Area:{' '}
                    </Box>{' '}
                    {country.area} km²
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Paper>
        );
      })}
    </Box>
  );
};

export default CountryDitails;
