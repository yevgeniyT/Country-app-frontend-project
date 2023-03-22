import { createSlice } from '@reduxjs/toolkit';

import { ThemeState } from '../../types/types';

const initialState: ThemeState = {
  darkMode: false,
};

export const themeSelector = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    toggleDarkMode: state => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = themeSelector.actions;
export default themeSelector.reducer;
