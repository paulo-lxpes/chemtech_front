export type CustomThemeContextType = {
  currentTheme: string | null
  setTheme: (name: 'normal' | 'dark') => void
}

export type themeMode = 'normal' | 'dark'