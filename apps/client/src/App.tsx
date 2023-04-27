import React from 'react'
import { MantineProvider } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'

import TaskProvider from '@/modules/tasks/TaskProvider'
import NotificationProvider from '@/modules/notification/NotificationProvider'

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
        <NotificationProvider>
          <Main />
        </NotificationProvider>
      </MantineProvider>
    </TaskProvider>
  )
}

export default App
