import { createTheme } from '@mui/material/styles'
import * as locales from '@mui/material/locale';
import { breakpoints } from '@mui/system'


const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00446b',
      light: '#0091e6',
      dark: '#004166',
      contrastText: '#fff'
    },
    background: {
      paper: '#1A2035',
      default: '#1A2035'
    },
    text: {
      primary: '#fff'
    }
  },
  breakpoints: { ...breakpoints },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#fafafa',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: '0.4em',
            height: '0.4em'
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.1)'
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            backgroundColor: '#cacaca',
            borderRadius: 8,
            minHeight: 24,
            WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.1)'
          }
        }
      }
    }
  }
}, locales['ptBR'])

export default theme