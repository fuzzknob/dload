import aria2, { AriaAdapter } from '@/libs/aria2'
import {
  formatRemainingTime,
  bytesToSize,
  calculatePercentage,
  wait,
  generateUuid,
  suppressError,
  removeFile,
} from '@/libs/utils'
import { waitToInitialize } from '@/libs/waitToInitialize'
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
  if (payload.type === 'QUEUE') {
    return taskStore.upsertTask(task)
  }
  return startDownload(task)
}

export async function startDownload(task: taskStore.Task) {
  const gid = await aria2.addUri(task.url, {
    dir: task.downloadPath,
    out: task.name,
  })
  return taskStore.upsertTask({
    ...task,
    gid,
  })
}

async function onDownloadError(gid: string) {
  const task = taskStore.getTaskByGID(gid)
  if (!task) return
  // notification code
  await removeDownload(task) // todo: work on a retry code
}

function onDownloadComplete(gid: string) {
  const task = taskStore.getTaskByGID(gid)
  if (task) taskStore.deleteTask(task.id)
  // notification code
}

async function removeDownload(task: taskStore.Task) {
  if (!task.gid) return
  await stopDownload(task.gid)
  await cleanDownload(`${task.downloadPath}/${task.name}`)
  taskStore.deleteTask(task.id)
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

async function getDetails(url: string) {
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

async function stopDownload(gid: string) {
  await suppressError(aria2.remove(gid))
  await suppressError(aria2.removeDownloadResult(gid))
}

async function cleanDownload(path: string) {
  await removeFile(path)
  await removeFile(`${path}.aria2`)
}

function getTaskStatus(status: AriaAdapter.EAria2DownloadState) {
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

function formatDownloadSpeed(downloadSpeed: bigint) {
  return downloadSpeed ? `${bytesToSize(downloadSpeed)}/s` : ''
}

function calculateRemainingTime(
  total: bigint,
  completed: bigint,
  downloadSpeed: bigint,
) {
  if (!total || !downloadSpeed) return ''
  const remaining = total - completed
  const seconds = Math.ceil(Number(remaining / downloadSpeed))
  return formatRemainingTime(seconds)
}

async function watcher() {
  while (true) {
    await fetchAndUpdateAriaTasks()
    // queue code here
    await wait(100)
  }
}

waitToInitialize(initialize)
