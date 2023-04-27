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

import * as taskStore from './task-store'

export function initialize() {
  // aria2.addListener('aria2.onDownloadStart')
  aria2.addListener('aria2.onDownloadComplete', (event) =>
    onDownloadComplete(event.gid),
  )
  aria2.addListener('aria2.onDownloadError', (event) =>
    onDownloadError(event.gid),
  )
  watcher().catch((e) => console.error('task watcher error', e))
}

interface TaskPayload {
  url: string
  name: string
  type: taskStore.TaskType
  downloadPath: string
  directDownload: boolean
}

export async function addTask(payload: TaskPayload) {
  const detail = await getDetails(payload.url)
  const task: taskStore.Task = {
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

export async function startDownload(task: taskStore.Task) {
  const gid = await aria2.addUri(task.url, {
    dir: task.downloadPath,
    out: task.name,
  })
  taskStore.upsertTask({
    ...task,
    gid,
  })
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

function onDownloadComplete(gid: string) {
  const task = taskStore.getTaskByGID(gid)
  notify({
    code: 'DOWNLOAD_SUCCESSFUL',
    message: `${task ? task.name : 'File'} is downloaded`,
  })
  if (task) taskStore.deleteTask(task.id)
  console.log('TASK COMPLETED', gid)
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

async function removeDownload(task: taskStore.Task) {
  if (!task.gid) return
  await stopDownload(task.gid)
  await cleanDownload(`${task.downloadPath}/${task.name}`)
  taskStore.deleteTask(task.id)
}

async function watcher() {
  while (true) {
    await fetchAndUpdateAriaTasks()
    updateClientTasks()
    // queue code here
    await wait(500)
  }
}

waitToInitialize(initialize)
