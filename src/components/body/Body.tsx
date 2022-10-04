import React, { useContext } from 'react'
import { styled } from '@mui/material/styles'
import { Outlet } from 'react-router-dom'
import Notification from '../notification/Notification'
import { NotificationContext } from '../../context/NotificationContext'
import { Grid } from '@mui/material'
interface Props {
  open: boolean
}

const drawerWidth = 250

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('padding', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    /*   paddingLeft: drawerWidth, */
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create('padding', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    [theme.breakpoints.up('lg')]: {
      paddingLeft: drawerWidth
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: 70
    }
  }),
  ...(!open && {
    transition: theme.transitions.create('padding', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 65
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: 70
    }
  })
}))

/* const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
})); */

const Body =({ open }: Props): JSX.Element => {

  const { activeNotify, setActiveNotify, msn, cor } =
    useContext(NotificationContext)
  return (
    <Main
      open={open}
      sx={{
        height: '100%',
        width: '100%',
      }}>

      <Grid
        container
        direction='row'
        alignItems="center"
        justifyContent="center"
        paddingX={5}
        paddingTop={5}
      >
        <Outlet />
        <Notification
          notifyActive={activeNotify}
          setNotify={setActiveNotify}
          msn={msn}
          cor={cor || 'warning'}
        />
      </Grid>
    </Main>
  )
}

export default Body