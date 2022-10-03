import { createTheme } from '@mui/material/styles'
import * as locales from '@mui/material/locale';
import { breakpoints } from '@mui/system'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00446b',
      light: '#0091e6',
      dark: '#004166',
    },
    background: {
      default: '#F4F5F7',
      paper: '#fff'
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
        },
        '& .MuiInputBase-root.Mui-disabled': {
          backgroundColor: '#e7e7e7',
        },
      }
    }
  }
}, locales['ptBR'])

export default theme