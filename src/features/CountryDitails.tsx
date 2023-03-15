import React, {useState} from 'react'
import { useAppSelector } from '../app/hooks';

//*MUI imports
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography, IconButtonProps } from '@mui/material';
import { Box } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled } from '@mui/system';
// import { Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

type ExpandMoreProps = {
  expand: boolean;
} & IconButtonProps;

// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })<{ theme: Theme; expand: boolean }>(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//   duration: theme.transitions.duration.shortest,
//   }),
// }));

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
  const countryDitailsData = useAppSelector(state => state.countryDitailsR.countryDitails);

  const [expanded, setExpanded] = useState(false);
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box>
      {countryDitailsData.map(country => {
        return (
          <Card sx={{ maxWidth: 500 }}>
              <CardHeader
                avatar = {
                  <Avatar>
                    IMG
                  </Avatar>
                }
                title = {country.name.official}
                subheader={`TimeZone: ${country.timezones[0]} | Language: ${country.languages[Object.keys(country.languages)[0]]} | Currency: ${country.currencies[Object.keys(country.currencies)[0]].name}`}
              />
              <CardMedia
                  component="img"
                  height="250"
                  image={country.flags.png}
                  alt={country.flags.alt}
              />
              <CardContent>
                <Typography>{country.name.common}, officially known as {country.name.official}, is a sovereign nation situated in the {country.subregion} subregion of {country.region}. The predominant language spoken in {country.name.common} is {country.languages[Object.keys(country.languages)[0]]}, and the national currency is the {country.currencies[Object.keys(country.currencies)[0]].name}. The country's capital is {country.capital[0]}, and as a member of the United Nations, it plays an active role in international affairs. With a population of {country.population}, {country.name.common} shares its borders with {country.borders.join(', ')}. The rich culture and heritage of {country.name.common} can be experienced throughout the nation, making it an enchanting destination for travelers and global citizens alike.
                </Typography>
              </CardContent>
              <CardActions>

                <IconButton>
                  <FavoriteIcon/>
                </IconButton>

                <IconButton>
                  <LocationOnIcon/>
                </IconButton>
                
                <ExpandMore
                  expand ={expanded}  
                  onClick={handleExpandClick}
                >
                  <ExpandMoreIcon/>
                </ExpandMore>
              </CardActions>

              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>
                    {country.name.common}, officially known as the {country.name.official}  is a captivating country situated in {country.subregion}. The nation boasts a rich history, stunning architecture, and picturesque landscapes. With a diverse population of around {country.population.toLocaleString()} people, {country.name.common} embraces a vibrant mix of cultures and traditions.
                  </Typography>    

                  <Typography paragraph>
                    The official language of the country is {country.languages[Object.keys(country.languages)[0]]}, which is spoken by the majority of its inhabitants. {country.name.common}'s currency is the {country.currencies[Object.keys(country.currencies)[0]].name}, symbolized by "{country.currencies[Object.keys(country.currencies)[0]].symbol}", which plays a vital role in the nation's thriving economy. The capital city of {country.name.common} is {country.capital[0]}.
                  </Typography>

                  <Typography paragraph>
                    {country.name.common} is not landlocked and shares its borders with several countries, including {country.borders.join(', ')}. Its location at the heart of Europe has significantly influenced its history and culture, with the nation often serving as a bridge between Eastern and Western Europe.
                  </Typography>

                  <Typography paragraph>
                    {/* The country spans an area of {country.area.toLocaleString()} square kilometers and features a relatively low Gini coefficient of {country.gini['2018']}, indicating relatively low levels of income inequality. {country.name.common} is a proud member of the United Nations, contributing to global peace, security, and development initiatives. */}
                  </Typography>

                  <Typography paragraph>
                    {/* Travelers visiting {country.name.common} can expect to encounter a time zone of {country.timezones[0]}. Driving is on the {country.car.side} side of the road, and the international vehicle registration code for {country.name.common} is "{country.car.signs[0]}". The postal code format for the country is "{country.postalCode.format}", which is essential for sending and receiving mail. */}
                  </Typography>

                  <Typography paragraph>
                    {/* In summary, {country.name.common} is a country steeped in history, culture, and natural beauty. Its central location in Europe, strong economy, and commitment to international collaboration make it an essential player on the global stage. */}
                  </Typography>
                </CardContent>
              </Collapse>
          </Card>
        )
      })}
    </Box>
  )
}

export default CountryDitails

