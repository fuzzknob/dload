import { io } from '@/libs/socket'
import { SOCKET_EVENTS } from '@dload/shared'

type Notification = {
  code: string
  message: string
  type?: 'SUCCESS' | 'ERROR'
}

export function notify(notification: Notification) {
  io.emit(SOCKET_EVENTS.NOTIFY, notification)
}
