import React from 'react'
import {
  IconButton,
  Toolbar,
  Grid,
} from '@mui/material'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { styled, /* useTheme */ } from '@mui/material/styles'
import { ReactComponent as Logo } from '../../assets/images/logos/logo-branca.svg'
/* import Logo from '../../assets/images/logos/logo.png' */

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const Appbar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  // eslint-disable-next-line no-unsafe-optional-chaining
  zIndex: theme.zIndex.drawer + 1,
  background: theme.palette.primary.main,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

function Navbar({ open, setOpen }: Props): JSX.Element {
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleClick = () => {
    if (open === false) {
      handleDrawerOpen()
    } else {
      handleDrawerClose()
    }
  }

  return (
    <>
      <Appbar position="fixed" open={open} elevation={1}>
        <Toolbar>
          <Grid
            component="div"
            sx={{
              width: '230px',
            }}
          >
              <Logo width={195} height={50} />
          </Grid>
          <Grid component="div" alignItems="center" justifyContent="center">
            <IconButton
              onClick={() => {
                handleClick()
              }}
              aria-label="open drawer"
              sx={{
                color: 'white',
                display: { xs: 'none', md: 'flex' },
                '&:hover': {
                  color: 'white'
                }
              }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Grid>
        </Toolbar>
      </Appbar>
    </>
  )
}
export default Navbar