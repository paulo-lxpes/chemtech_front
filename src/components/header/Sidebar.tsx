import React, { useState } from 'react'
import { styled, Theme, CSSObject, useTheme } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Collapse, ListItemButton } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { LinkBehavior } from '../link/Link'
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const drawerWidth = 250
const openedMixin = (theme: Theme): CSSObject => ({
  background: theme.palette.primary.main,
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});


const closedMixin = (theme: Theme): CSSObject => ({
  background: theme.palette.primary.main,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open'})(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Menus = [
  {
    name: 'Cliente',
    icon: <GroupRoundedIcon />,
    subMenus: [
      {
        name: 'Listar Clientes',
        link: '/clientes/'
      },
    ]
  },
  {
    name: 'Cidade',
    icon: <LocationCityRoundedIcon />,
    subMenus: [
      {
        name: 'Listar Cidades',
        link: '/cidades/'
      },
    ],
  },
]

interface SubMenu {
  name: string
  link: string
}

function Sidebar({ open, setOpen }: Props): JSX.Element {
  const [expanded, setExpanded] = useState('');
  const theme = useTheme();

  const handleExpand = (index: string, op: boolean )=> {
    if (expanded === index) {
      setExpanded("")
    } else {
      setExpanded(index)
    }
  }

  const renderItem = (item: SubMenu) => (
    <ListItemButton 
      key={item.name} 
      component={LinkBehavior} 
      href={item.link}
      sx={{ pl: 4, color: '#FFF','&:hover': { backgroundColor: theme.palette.primary.dark }}}>
      <ListItemText 
        primaryTypographyProps={{fontSize: '14px'}} 
        primary={item.name} />
    </ListItemButton>
  )

  const renderItens = (itens: SubMenu[]) => (
    <List component={'div'} disablePadding>
      {itens.map((item) => renderItem(item))}
    </List>
  )

  return (
    <Drawer
      sx={{
        py: 10,
        display: { xs: 'none', md: 'flex' }
      }}
      variant="permanent"
      open={open}
    >
      <DrawerHeader />
      <List>
        {Menus.map((obj, index) => (
          <div key={obj.name}>
            <ListItemButton
              key={index}
              sx={{
                width: '100%',
                color: '#FFF',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark
                }
              }}
              onClick={() => handleExpand(obj.name, open)}
            >
              <ListItemIcon sx={{ color: '#FFF' }}>
                {obj.icon}
              </ListItemIcon>
              <ListItemText primary={obj.name} />
              {expanded === obj.name ? <ExpandMore /> : <ChevronLeftIcon/>}
            </ListItemButton>
            <Collapse in={obj.name === expanded && open} timeout="auto" unmountOnExit>
              {renderItens(obj.subMenus)}
            </Collapse>
          </div>
        ))}
      </List>
      <Divider />
    </Drawer>
  )
}

export default Sidebar