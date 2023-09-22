import { Settings } from '@dload/shared'

import Store from '@/libs/store'
import db from '@/services/database'
import { waitToInitialize } from '@/libs/waitToInitialize'

const DEFAULT_SETTINGS: Settings = {
  downloadPaths: ['/downloads'],
}

const store = new Store<Settings>({
  name: 'settings',
  database: db,
})

export function getSettings() {
  return store.get()
}

export function setSettings(update: Partial<Settings>) {
  return store.safeSet((settings) => ({
    settings,
    ...update,
  }))
}

waitToInitialize(() => {
  if (!store.get()) {
    store.set(DEFAULT_SETTINGS)
  }
})
