import { v4 as uuidv4 } from 'uuid'
import fs from 'fs-extra'
import * as logger from './logger'

export function formatRemainingTime(seconds: number) {
  const time = { hours: '', minutes: '', seconds: '' }
  let remaining = seconds || 0

  if (remaining <= 0) return ''

  if (remaining > 86400) return 'More than 1 day Remaining'

  if (remaining > 3600) {
    time.hours = `${Math.floor(remaining / 3600)}h `
    remaining %= 3600
  }

  if (remaining > 60) {
    time.minutes = `${Math.floor(remaining / 60)}m `
    remaining %= 60
  }

  if (remaining > 0) {
    time.seconds = `${remaining}s`
  }

  const timeRemaining = time.hours + time.minutes + time.seconds
  return timeRemaining ? `${timeRemaining} Remaining` : ''
}

export function bytesToSize(bytes: bigint, precision = 1) {
  const b = parseInt(bytes.toString(), 10)
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  if (b === 0) {
    return '0 KB'
  }
  const i = parseInt(Math.floor(Math.log(b) / Math.log(1024)).toString(), 10)
  if (i === 0) {
    return `${b} ${sizes[i]}`
  }
  return `${(b / 1024 ** i).toFixed(precision)} ${sizes[i]}`
}

export function calculatePercentage(
  completedBytes: bigint,
  totalBytes: bigint,
) {
  const completed = parseInt(completedBytes.toString(), 10)
  const total = parseInt(totalBytes.toString(), 10)
  const percentage = (completed / total) * 100
  return parseFloat(percentage.toFixed(2))
}

export async function removeFile(path: string) {
  try {
    await fs.ensureFile(path)
    await fs.remove(path)
  } catch (e) {
    return
  }
}

export function wait(time: number) {
  return new Promise((res) => {
    setTimeout(() => {
      res(true)
    }, time)
  })
}

export async function suppressError<S>(promise: Promise<S>) {
  try {
    const result = await promise
    return result
  } catch (e) {
    return null
    // suppressed
  }
}

export function getEnvValue(
  key: string,
  options = { isOptional: false },
): string {
  const value = process.env[key]
  if (!value && !options.isOptional) {
    throw new Error(`${key} is required`)
  }
  return value || ''
}

export function generateUuid() {
  return uuidv4()
}

export function getFileExtension(name: string) {
  return name.lastIndexOf('.') > 0
    ? name.substring(name.lastIndexOf('.') + 1)
    : ''
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logErrorAndRethrow(e: any) {
  logger.error(e)
  throw e
}
