import aria2 from '@/libs/aria2'
import {
  bytesToSize,
  calculatePercentage,
  wait,
  generateUuid,
} from '@/libs/utils'
import {
  getDetails,
  cleanDownload,
  stopDownload,
  formatDownloadSpeed,
  updateClientTasks,
  calculateRemainingTime,
  getTaskStatus,
} from './task-utils'
import { waitToInitialize } from '@/libs/waitToInitialize'
import { notify } from '@/modules/notifications/notification-service'
import { Task, TaskType } from '@dload/shared'
import * as logger from '@/libs/logger'

import * as taskStore from './task-store'
import * as settingStore from '@/modules/settings/setting-store'

export function initialize() {
  // aria2.addListener('aria2.onDownloadStart')
  aria2.addListener('aria2.onDownloadComplete', (event) =>
    onDownloadComplete(event.gid),
  )
  aria2.addListener('aria2.onDownloadError', (event) =>
    onDownloadError(event.gid),
  )
  watcher().catch((e) => logger.error('task watcher error', e))
}

interface TaskPayload {
  url: string
  name: string
  type: TaskType
  downloadPath: string
  directDownload: boolean
}

export async function addTask(payload: TaskPayload) {
  const detail = await getDetails(payload.url)
  const task: Task = {
    id: generateUuid(),
    name: payload.name ? `${payload.name}.${detail.extension}` : detail.name,
    fileExtension: detail.extension,
    url: payload.url,
    type: payload.type,
    downloadPath: payload.downloadPath,
    directDownload: payload.directDownload,
    progress: 0,
    status: 'STALLED',
  }
  taskStore.upsertTask(task)
  if (payload.type === 'QUEUE') return
  return startDownload(task)
}

export async function startDownload(task: Task) {
  const gid = await aria2.addUri(task.url, {
    dir: task.downloadPath,
    out: task.name,
    split: 64,
  })
  taskStore.upsertTask({
    ...task,
    gid,
  })
}

export async function removeDownload(task: Task) {
  if (!task.gid) return
  await stopDownload(task.gid)
  await cleanDownload(`${task.downloadPath}/${task.name}`)
  taskStore.deleteTask(task.id)
}

async function onDownloadError(gid: string) {
  const task = taskStore.getTaskByGID(gid)
  if (!task) return
  notify({
    code: 'DOWNLOAD_ERROR',
    message: `There was an error while downloading ${task.name}`,
  })
  await removeDownload(task) // todo: work on a retry code
}

export async function togglePause(task: Task) {
  if (!task.gid) return
  if (task.status === 'IN_PROGRESS') {
    await aria2.pause(task.gid)
    taskStore.upsertTask({
      ...task,
      status: 'PAUSED',
    })
  } else {
    await aria2.unpause(task.gid)
    taskStore.upsertTask({
      ...task,
      status: 'IN_PROGRESS',
    })
  }
}

function onDownloadComplete(gid: string) {
  const task = taskStore.getTaskByGID(gid)
  notify({
    code: 'DOWNLOAD_SUCCESSFUL',
    message: `${task ? task.name : 'File'} is downloaded`,
  })
  if (task) taskStore.deleteTask(task.id)
  logger.log('TASK COMPLETED', gid)
}

async function fetchAndUpdateAriaTasks() {
  const active = await aria2.tellActive()
  const waiting = await aria2.tellWaiting(0, 20)
  const items = [...active, ...waiting]
  items.forEach((item) => {
    const task = taskStore.getTaskByGID(item.gid)
    if (!task) return
    taskStore.upsertTask({
      ...task,
      status: getTaskStatus(item.status),
      progress: calculatePercentage(item.completedLength, item.totalLength),
      downloadSpeed: formatDownloadSpeed(item.downloadSpeed),
      remainingTime: calculateRemainingTime(
        item.totalLength,
        item.completedLength,
        item.downloadSpeed,
      ),
      downloaded: bytesToSize(item.completedLength),
      totalSize: bytesToSize(item.totalLength),
    })
  })
}

function processQueue() {
  const allTasks = Object.values(taskStore.allTasks())
  const activeTasks = allTasks.filter((task) => task.type === 'DOWNLOAD')
  const maximumActiveDownloads =
    settingStore.getSettings().maximumActiveDownloads
  if (activeTasks.length >= maximumActiveDownloads) {
    return
  }
  const nextInQueue = allTasks.find((task) => task.type === 'QUEUE')
  if (!nextInQueue) return
  const task: Task = {
    ...nextInQueue,
    type: 'DOWNLOAD',
  }
  taskStore.upsertTask(task)
  startDownload(task)
}

async function watcher() {
  while (true) {
    await fetchAndUpdateAriaTasks()
    updateClientTasks()
    processQueue()
    await wait(500)
  }
}

waitToInitialize(initialize)
