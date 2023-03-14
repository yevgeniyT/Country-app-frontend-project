import { configureStore } from '@reduxjs/toolkit'
import countryReducer from '../reducers/counturies/countriesSlice'
import countryDitails from '../reducers/counturies/countryDitailsSlice'

export const store = configureStore({
  reducer: {
    countryR:countryReducer,
    countryDitailsR: countryDitails
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >