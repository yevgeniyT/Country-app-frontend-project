import React from 'react';

import { Button } from '@mui/material';
import countryFlags from '../data/pic/country_flags.jpg';
import eachCountry from '../data/pic/eachCountry.png';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <div className="welcome-section">
        <div className="welcome-content">
          <h1>Welcome to the React App</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero
            aspernatur sunt pariatur velit? Ipsam fugit harum excepturi omnis
            velit natus commodi doloribus accusamus possimus, quisquam
            exercitationem quia dolore aliquid praesentium.
          </p>
        </div>
      </div>
      <div className="navigation">
        <div className="go-countries nav-item">
          <div className="img-container">
            <img className="nav-image" src={countryFlags} alt="globus" />
          </div>
          <div className="nav-text">
            <h2> Explore counties</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
              voluptatibus perspiciatis ea autem dolorem eos aspernatur harum
              saepe
            </p>
            <NavLink to="/countries">
              <Button variant="contained">Go to countries</Button>
            </NavLink>
          </div>
        </div>
        <div className="go-map nav-item">
          <div className="nav-text">
            <h2> Explore Map</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
              voluptatibus perspiciatis ea autem dolorem eos aspernatur harum
              saepe
            </p>
            <NavLink to="/map">
              <Button variant="contained">Go to map</Button>
            </NavLink>
          </div>
          <div className="img-container">
            <img className="nav-image" src={eachCountry} alt="globus" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
