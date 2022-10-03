import React from 'react'
import { NavLink as RouterLink, NavLinkProps } from 'react-router-dom'

const LinkBehavior = React.forwardRef<
  any,
  Omit<NavLinkProps, 'to'> & { href: NavLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />
})

export { LinkBehavior }