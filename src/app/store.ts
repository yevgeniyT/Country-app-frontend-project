import { configureStore } from '@reduxjs/toolkit'
import countryReducer from '../reducers/counturies/countriesSlice'

export const store = configureStore({
  reducer: {
    countryR:countryReducer

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