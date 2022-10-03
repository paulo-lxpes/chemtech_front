import React, { useState } from 'react'
import Body from '../body/Body'
import Header from '../header/Header'

function Layout(): JSX.Element {
  const [open, setOpen] = useState(true)

  return (
    <div className="Layout">
      <Header open={open} setOpen={setOpen} />
      <Body open={open} />
    </div>
  )
}
export default Layout