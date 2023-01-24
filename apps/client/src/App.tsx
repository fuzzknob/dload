import React from 'react'
import { MantineProvider } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'

import TaskProvider from '@/modules/tasks/TaskProvider'

import Main from './pages/Main'

const App: React.FC = () => {
  const colorScheme = useColorScheme('dark')
  return (
    <TaskProvider>
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Main />
      </MantineProvider>
    </TaskProvider>
  )
}

export default App
