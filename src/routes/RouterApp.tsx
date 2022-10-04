import React from 'react'
import { Route, Routes } from 'react-router-dom'
/* import Home from '../assets/pages/home/Home' */
import Layout from '../components/layout/Layout'
import routes from './routes'

const RouterApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div></div>}/>
        {routes.map((route, index) => {
          return ((
            <Route
              key={index}
              path={route.path}
              element={<route.element />}
            />
          ))
        })}
      </Route>
    </Routes>

  )
}

export default RouterApp