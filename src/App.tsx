import './App.css'
import Index from './routes'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { useAppSelector } from './app/hooks';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './app/store';


function App() {
  const lightTheme = createTheme ({
    palette:{
      mode:'light'
    }
  })

  const darkTheme = createTheme ({
    palette:{
      mode:'dark'
    }
  })

  const darkMode = useAppSelector ((state)=>state.themeSelectorR.darkMode)

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <PersistGate loading={null} persistor={persistor}>
        <div className='main-container'>
          <Paper className='app'>
            <Index />
          </Paper>
        </div>
      </PersistGate>
    </ThemeProvider>
  );
}

export default App
