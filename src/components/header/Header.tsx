import React from 'react'
import { CssBaseline } from '@mui/material'
import Box from '@mui/material/Box'
import Sidebar from './Sidebar'
import NavBar from './Navbar'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function Header({ open, setOpen }: Props): JSX.Element {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavBar open={open} setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />
    </Box>
  )
}

export default Header