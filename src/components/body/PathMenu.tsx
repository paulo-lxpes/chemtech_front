import * as React from 'react';
import { useLocation } from 'react-router-dom';

import Link from '@mui/material/Link';
import { Stack } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import routes from '../../routes/routes';
import { LinkBehavior } from '../link/Link';
import { IRoutes } from '../../@types/@contexts/routes';

interface Ibreadcrumbs {
  path: string,
  name: string | undefined,
  active: boolean,
}


export default function PathMenu() {
  const [listbreadcrumbs, setlistbreadcrumbs] = React.useState<Ibreadcrumbs[]>([])

  const currentLocation = useLocation().pathname

  const getRouteName = (pathname: string, routes: IRoutes[]) => {
    const currentRoute = routes.find((route) => route.path.includes(pathname))
    if (currentRoute) {
      return currentRoute.name
    }
  }

  const getBreadcrumbs = () => {
    const breadcrumbs: Ibreadcrumbs[] = []
    currentLocation.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      breadcrumbs.push({
        path: currentPathname,
        name: getRouteName(currentPathname, routes),
        active: index + 1 === array.length ? true : false,
      })
      return currentPathname
    })
    setlistbreadcrumbs(breadcrumbs)
  }

  React.useEffect(() => { getBreadcrumbs() }, [currentLocation])

  return (
    <Stack
      direction="column"
      alignItems="flex-start"
      justifyContent="center"
      sx={{
        height: '50px',
        padding: 3,
        bgcolor: '#FFF',
        borderBottom: '1px solid lightgrey'
      }} >
      <Breadcrumbs>
        <Link underline="hover" color="inherit" component={LinkBehavior} href="/">
          Home
        </Link>
        {listbreadcrumbs.map((breadcrumbs, index: number) => (
          <Link
            key={index}
            underline="hover"
            color="text.primary"
            href={breadcrumbs.path}
          >
            {breadcrumbs.name}
          </Link>
        ))}
      </Breadcrumbs>
    </Stack>
  );
}