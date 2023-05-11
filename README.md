# Country Information App

This application allows users to search and view information about countries. Users can also add countries to their favorites list and view them separately. The app provides a world map view with interactive country borders.

## Table of Contents

- [Features](#features)
- [Components](#components)
- [Redux Store](#redux-store)
- [Services](#services)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Features

- Search countries by name
- View detailed information about a country
- Add and remove countries from favorites list
- Interactive world map
- Dark and light theme

## Components

- `App`: The main application component that wraps the entire application and sets up the theme.
- `Index`: Sets up the routing for different pages in the application.
- `Home`: The home page component.
- `Countries`: Displays a list of countries and a search bar.
- `CountryCard`: Displays a single country card with basic information.
- `CountryDetails`: Displays detailed information about a selected country.
- `Favorite`: Displays the list of favorite countries.
- `WorldMap`: Displays the interactive world map with country borders.
- `Navbar`: The navigation bar component.
- `Footer`: The footer component.
- `Error`: Displays an error message when fetching data fails.

## Redux Store

The Redux store is responsible for managing the application's state. The following slices manage different parts of the application state:

- `countriesSlice`: Manages the state related to the list of countries.
- `countryDetailsSlice`: Manages the state related to the details of a specific country.
- `favoriteCountriesListSlice`: Manages the state related to the user's favorite countries list.
- `themeSelectorSlice`: Manages the state related to the application's theme (dark or light mode).

## Services

The `services` folder contains functions that make API calls to fetch data. These functions are used in the async actions of the Redux slices.

- `api.ts`: Provides functions for fetching countries and country details.

## Installation
