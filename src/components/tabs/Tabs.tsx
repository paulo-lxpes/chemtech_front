import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { NavLink } from 'react-router-dom';
import { Box, styled } from '@mui/material';

interface LinkTabProps {
  label?: string;
  to: string;
}

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string;
  index: number
  value: number
}

const CustomTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    display: 'none'
  },
})

const CustomTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: '10px 10px 0 0',
  borderBottom: 'none',
  zIndex: 10,
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  marginRight: theme.spacing(1),
  fontWeight: theme.typography.fontWeightBold,
  color: '#00734a',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    opacity: 1,
  },
   '&.Mui-selected': {
    color: '#a1a1a1',
    backgroundColor: '#e8e8e8',
    fontWeight: theme.typography.fontWeightMedium,
    borderTop: '1px solid #e8e8e8',
    borderLeft: '1px solid #e8e8e8',
    borderRight: '1px solid #e8e8e8',
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}))

function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props
  return (
    <Box component={'div'}
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{paddingY: 2}}>{children}</Box>}
    </Box>
  )
}

export { CustomTabs, CustomTab, TabPanel } 