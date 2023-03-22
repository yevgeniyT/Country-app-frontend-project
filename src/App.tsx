import './App.css';
import Index from './routes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { useAppSelector } from './app/hooks';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './app/store';
import '@fontsource/nunito-sans';

function App() {
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
    typography: {
      fontFamily: 'Nunito Sans, sans-serif',
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          color: 'primary',
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: '#3f51b5',
            color: '#ffffff',
          },
        },
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    typography: {
      fontFamily: 'Nunito Sans, sans-serif',
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          color: 'primary',
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: '#303f9f',
            color: '#ffffff',
          },
        },
      },
    },
  });

  const darkMode = useAppSelector(state => state.themeSelectorR.darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="centered">
          <Paper className="app">
            <Index />
          </Paper>
        </div>
      </PersistGate>
    </ThemeProvider>
  );
}

export default App;
