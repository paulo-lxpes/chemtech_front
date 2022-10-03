import React from 'react'
import { NotificationProvider } from '../context/NotificationContext'
import RouterApp from './RouterApp';


export default function Index() {
  return (
      <NotificationProvider>
          <RouterApp />
      </NotificationProvider>
  )
}