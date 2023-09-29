import React from 'react'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'

import TaskProvider from '@/modules/tasks/TaskProvider'
import SettingProvider from '@/modules/settings/SettingProvider'
import NotificationProvider from '@/modules/notification/NotificationProvider'

import Main from './pages/Main'

const App: React.FC = () => {
  return (
    <SettingProvider>
      <TaskProvider>
        <MantineProvider>
          <NotificationProvider>
            <ModalsProvider
              labels={{ confirm: 'Confirm', cancel: 'Cancel' }}
              modalProps={{ centered: true }}
            >
              <Main />
            </ModalsProvider>
          </NotificationProvider>
        </MantineProvider>
      </TaskProvider>
    </SettingProvider>
  )
}

export default App
