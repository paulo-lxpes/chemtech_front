import React, { createContext, ReactNode, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import getTheme from './base'
import { CustomThemeContextType, themeMode } from '../@types/contexts/customTheme'

interface Props {
  children: ReactNode
}

// eslint-disable-next-line no-unused-vars
export const CustomThemeContext = createContext({} as CustomThemeContextType)

export const CustomThemeProvider: React.FC<Props> = ({ children }) => {
  // eslint-disable-next-line react/prop-types

  // Read current theme from localStorage or maybe from an api
  const currentTheme = localStorage.getItem('appTheme') || 'normal'

  // State to hold the selected theme name
  const [themeName, _setThemeName] = useState<'normal' | 'dark'>(currentTheme as themeMode)

  // Retrieve the theme object by theme name
  const theme = getTheme(themeName)

  // Wrap _setThemeName to store new theme names in localStorage
  const setThemeName = (name: 'normal' | 'dark') => {
    localStorage.setItem('appTheme', name)
    _setThemeName(name)
  }

  const contextValue = {
    currentTheme: themeName,
    setTheme: setThemeName
  }

  return (
    <CustomThemeContext.Provider
      value={contextValue}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  )
}