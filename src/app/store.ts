import { combineReducers, configureStore } from '@reduxjs/toolkit'
import countryReducer from '../reducers/counturies/countriesSlice'
import countryDitails from '../reducers/counturies/countryDitailsSlice'
import favoriteCountries from '../reducers/counturies/favoriteCountriesSlice'
import themeSelector from '../reducers/counturies/themeSlice'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

const rootReducer = combineReducers({
  countryR:countryReducer,
  countryDitailsR: countryDitails,
  favoriteCountriesListR: favoriteCountries,
  themeSelectorR: themeSelector,

})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favoriteCountriesListR', 'countryDitailsR'] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER' ],
      },
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
