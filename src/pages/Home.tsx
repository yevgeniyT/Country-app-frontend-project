import React from 'react';

import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <div className="welcome-section">
        <div className="welcome-content">
          <div className="welcome-description">
            <h1 className="welcome-heading">Welcome to World Whiz App</h1>
            <p className="welcome-text">
              App provides essential information on 250 countries around the
              world. You can view a list of countries with key data such as
              name, flag, population, and languages. You can also add countries
              to their favorites, explore detailed information about each
              country, and use an interactive map to navigate the world.
            </p>
          </div>
          <div className="welcome-navigation">
            <NavLink to="/countries">
              <Button variant="contained">Go to countries</Button>
            </NavLink>
            <NavLink to="/map">
              <Button variant="contained">Go to map</Button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
