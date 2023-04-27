import {
  wait,
  removeFile,
  bytesToSize,
  suppressError,
  formatRemainingTime,
} from '@/libs/utils'
import aria2, { AriaAdapter } from '@/libs/aria2'
import { io } from '@/libs/socket'
import { SOCKET_EVENTS } from '@dload/shared'

import * as taskStore from './task-store'

export function updateClientTasks() {
  const tasks = taskStore.allTasks()
  io.emit(SOCKET_EVENTS.TASK_UPDATE, Object.values(tasks))
}

export function formatDownloadSpeed(downloadSpeed: bigint) {
  return downloadSpeed ? `${bytesToSize(downloadSpeed)}/s` : ''
}

export async function cleanDownload(path: string) {
  await removeFile(path)
  await removeFile(`${path}.aria2`)
}

export function calculateRemainingTime(
  total: bigint,
  completed: bigint,
  downloadSpeed: bigint,
) {
  if (!total || !downloadSpeed) return ''
  const remaining = total - completed
  const seconds = Math.ceil(Number(remaining / downloadSpeed))
  return formatRemainingTime(seconds)
}

export async function stopDownload(gid: string) {
  await suppressError(aria2.remove(gid))
  await suppressError(aria2.removeDownloadResult(gid))
}

export async function getDetails(url: string) {
  const gid = await aria2.addUri(url)
  let tries = 20
  let item = null
  while (tries > 0) {
    await wait(100)
    item = await aria2.tellStatus(gid)
    if (item.totalLength) break
    tries -= 1
  }
  await stopDownload(gid)
  if (item && item.totalLength) {
    const { path } = item.files[0]
    const name = path.substring(path.lastIndexOf('/') + 1)
    await cleanDownload(path)
    return {
      name,
      extension:
        name.lastIndexOf('.') > 0
          ? name.substring(name.lastIndexOf('.') + 1)
          : '',
    }
  }
  return { name: 'file', extension: '' }
}

export function getTaskStatus(status: AriaAdapter.EAria2DownloadState) {
  switch (status) {
    case AriaAdapter.EAria2DownloadState.Active:
      return 'IN_PROGRESS'
    case AriaAdapter.EAria2DownloadState.Paused:
      return 'PAUSED'
    case AriaAdapter.EAria2DownloadState.Waiting:
      return 'STALLED'
    case AriaAdapter.EAria2DownloadState.Complete:
      return 'COMPLETED'
    default:
      return 'ERROR'
  }
}
