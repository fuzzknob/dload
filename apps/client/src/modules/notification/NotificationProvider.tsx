import React, { useEffect } from 'react'
import { Notifications, notifications } from '@mantine/notifications'
import { onNotification } from './notification-service'

type NotificationProviderProps = {
  children: React.ReactNode
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  useEffect(() => {
    onNotification((notification) => {
      const isError = notification.type === 'ERROR'
      notifications.show({
        title: isError ? 'Failure' : 'Success',
        message: notification.message,
        color: isError ? 'red' : 'green',
      })
    })
  }, [])

  return (
    <>
      <Notifications position="top-right" />
      {children}
    </>
  )
}

export default NotificationProvider
