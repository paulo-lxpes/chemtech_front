
import React, { useEffect, useState } from 'react'
import { styled, Theme, CSSObject, useTheme } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { Collapse, IconButton, ListItemButton, MenuList } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { LinkBehavior } from '../link/Link'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import HeaderService from './service/HeaderService'

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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
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

interface SubMenu {
  name: string
  link: string
}

interface IMenuList {
  grupodeacesso: string
  menuSuperior: string
  nome: string
  path: string
}

interface IMenu {
  subMenus: Array<{ name: string, link: string }>
  name: string
  icon: any
}

function Sidebar({ open, setOpen }: Props): JSX.Element {
  const [expanded, setExpanded] = useState('');

  const [listmenu, setLisMenu] = useState<IMenuList[]>([])
  const [menu, setMenu] = useState<IMenu[]>([])
  const theme = useTheme();

  const handleExpand = (index: string, op: boolean) => {
    if (expanded === index) {
      setExpanded("")
    } else {
      setExpanded(index)
    }
  }

  const getMenu = async () => {
    try {
      const { data } = await HeaderService.getMenu()
      setLisMenu(data)
    } catch { }
  }




  useEffect(() => { getMenu() }, [])
  
  useEffect(() => {
    if (listmenu.length > 0) {
      let data: Array<IMenu> = [
        {
          name: 'Administração',
          icon: <SettingsRoundedIcon />,
          subMenus: listmenu.filter(menuFilter => menuFilter.menuSuperior === 'Administração').map(menu => (
            {
              name: menu.nome,
              link: menu.path
            }
          )),
        },
        {
          name: 'Comitê',
          icon: <AssignmentRoundedIcon />,
          subMenus: listmenu.filter(menuFilter => menuFilter.menuSuperior === 'Comitê').map(menu => (
            {
              name: menu.nome,
              link: menu.path
            }
          )),
        },
        {
          name: 'Calibragem',
          icon: <HowToRegRoundedIcon />,
          subMenus: listmenu.filter(menuFilter => menuFilter.menuSuperior === 'Calibragem').map(menu => (
            {
              name: menu.nome,
              link: menu.path
            }
          )),
        },
        {
          name: 'Minha Avaliação',
          icon: <SettingsRoundedIcon />,
          subMenus: listmenu.filter(menuFilter => menuFilter.menuSuperior === 'Minha Avaliação').map(menu => (
            {
              name: menu.nome,
              link: menu.path
            }
          )),
        },
        {
          name: 'Gestor',
          icon: <AssignmentRoundedIcon />,
          subMenus: listmenu.filter(menuFilter => menuFilter.menuSuperior === 'Gestor').map(menu => (
            {
              name: menu.nome,
              link: menu.path
            }
          )),
        },
      ]
      setMenu(data)

    }

  }, [listmenu])

  const renderItem = (item: SubMenu) => (
    <ListItemButton
      key={item.name}
      component={LinkBehavior}
      href={item.link}
      sx={{ pl: 4, color: '#FFF', '&:hover': { backgroundColor: '#165032' } }}>
      <ListItemText
        primaryTypographyProps={{ fontSize: '14px' }}
        primary={" - " + item.name} />
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
        py: 4,
        display: { xs: 'none', md: 'flex' }
      }}
      variant="permanent"
      open={open}
    >
      <DrawerHeader />
      <List>
        {menu.map((obj: IMenu, index: number) => (
          <div key={obj.name}>
            <ListItemButton
              key={index}
              sx={{
                width: '100%',
                color: '#FFF',
                '&:hover': {
                  backgroundColor: '#165032'
                }
              }}
              onClick={() => handleExpand(obj.name, open)}
            >
              <ListItemIcon sx={{ color: '#FFF' }}>
                {obj.icon}
              </ListItemIcon>
              <ListItemText primary={obj.name} />
              {expanded === obj.name ? <ExpandMore /> : <ChevronLeftIcon />}
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