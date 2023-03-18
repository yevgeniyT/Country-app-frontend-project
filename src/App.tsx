import './App.css'
import Index from './routes'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { useAppSelector } from './app/hooks';

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
    <ThemeProvider theme = {darkMode? darkTheme: lightTheme}>
      <Paper>
        <Index />
      </Paper>
    </ThemeProvider>
  )
}

export default App
