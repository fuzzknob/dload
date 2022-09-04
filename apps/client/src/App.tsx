import React from 'react'
import { MantineProvider } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'

import Main from './pages/Main'

const App: React.FC = () => {
  const colorScheme = useColorScheme('dark')

  return (
    <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
      <Main />
    </MantineProvider>
  )
}

export default App
