import { socket } from '@/libs/socket'
import { SOCKET_EVENTS } from '@dload/shared'

type Notification = {
  code: string
  message: string
  type?: 'SUCCESS' | 'ERROR'
}

export const onNotification = (cb: (notification: Notification) => void) =>
  socket.on(SOCKET_EVENTS.NOTIFY, cb)
