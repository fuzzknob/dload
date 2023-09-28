import React from 'react'
import '@mantine/core/styles.css'
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
          <ModalsProvider
            labels={{ confirm: 'Confirm', cancel: 'Cancel' }}
            modalProps={{ centered: true }}
          >
            <NotificationProvider>
              <Main />
            </NotificationProvider>
          </ModalsProvider>
        </MantineProvider>
      </TaskProvider>
    </SettingProvider>
  )
}

export default App
