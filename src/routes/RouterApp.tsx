import React from 'react'
import { Route, Routes } from 'react-router-dom'
/* import Home from '../assets/pages/home/Home' */
import Layout from '../components/layout/Layout'

const RouterApp = () => {
  return (
    <Routes>
      <Route path="*" element={<Layout />}>
      </Route>
    </Routes>

  )
}

export default RouterApp