import React from 'react'
import { Grid, GridProps } from '@mui/material'
import { styled } from '@mui/material/styles'

const GridContainer = styled(Grid)<GridProps>(({ theme }) => ({
  boxShadow: '0 0 1em #c1c1c1',
  justifySelf: 'center',
  borderRadius: '5px',
  width: '100%',
  [theme.breakpoints.between('xs', 'md')]: {
    padding: 10,
  },
  [theme.breakpoints.between('md', 'lg')]: {
    padding: 20,
  },
  [theme.breakpoints.between('lg', 'xl')]: {
    padding: 20,
  },
  [theme.breakpoints.up('xl')]: {
    padding: 20,
  },
  backgroundColor: 'rgba(255, 255, 255, 1)',
  zIndex: 1
}))

export default GridContainer