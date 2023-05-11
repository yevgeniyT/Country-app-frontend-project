//Cnfiguring  application's Redux store, sets up the rootReducer with your individual reducers, and configures the store to use the redux-persist library for persisting data across sessions.

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducers import
import countryReducer from '../reducers/counturies/countriesSlice';
import countryDitails from '../reducers/counturies/countryDitailsSlice';
import favoriteCountries from '../reducers/counturies/favoriteCountriesSlice';
import themeSelector from '../reducers/counturies/themeSlice';

//Create a rootReducer by combining individual reducers. This rootReducer will handle the global state of your application.
const rootReducer = combineReducers({
  countryR: countryReducer,
  countryDitailsR: countryDitails,
  favoriteCountriesListR: favoriteCountries,
  themeSelectorR: themeSelector,
});

const persistConfig = {
  //key under which the persisted state will be saved in the storage.
  key: 'root',
  //storage engine used to store the state. In this case we use the browser's localStorage
  storage,
  //This is an array of reducer keys that will be persist. Only the state slices corresponding to these keys will be persisted
  whitelist: ['favoriteCountriesListR', 'countryDitailsR', 'countryR'],
};

//When use the persistedReducer to create Redux store, the redux-persist library will automatically persist the whitelisted state slices to the storage engine whenever the state changes. When the application loads, redux-persist will also rehydrate the state from the storage back into the Redux store, ensuring that the persisted data is available across sessions.
const persistedReducer = persistReducer(persistConfig, rootReducer);

//Creat the Redux store  will be used throughout your application to provide access to the Redux state and dispatch actions.
export const store = configureStore({
  reducer: persistedReducer,
  //Function that takes getDefaultMiddleware as an argument and returns an array of middleware to be applied to the Redux store.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      //Checks if all actions and state are serializable, which means they can be converted to a JSON string and back without losing any data. This is important for the correct functioning of some Redux features like time-travel debugging and state persistence with redux-persist. Used to handle some errors with performance
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
        ],
      },
    }),
});
//used to control the persisting and rehydrating process.
export const persistor = persistStore(store);
// represents the type of the dispatch function in your store.
export type AppDispatch = typeof store.dispatch;
// represents the type of the global state in your store.
export type RootState = ReturnType<typeof store.getState>;
