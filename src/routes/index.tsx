import React from 'react';

import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../layouts/Footer';
import Navbar from '../layouts/Navbar';

import Favorite from '../pages/Favorite';
import Home from '../pages/Home';
import WorldMap from '../pages/WorldMap';
import Error from '../pages/ErrorFetch';
import CountryDitails from '../features/CountryDitails';

const Index = () => {
  return (
    <div className="main-app">
      <BrowserRouter>
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/map" element={<WorldMap />} />
            <Route path="/country_ditails" element={<CountryDitails />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  );
};

export default Index;
