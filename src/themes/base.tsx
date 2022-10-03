import light from './light'
import dark from './dark'
import { Theme } from '@mui/material'
import { themeMode } from '../@types/contexts/customTheme'

const themes = {
  normal: light,
  dark: dark
}

export default function getTheme(theme: themeMode): Theme {
  return themes[theme]
}