import create from 'zustand'
import { Settings } from '@dload/shared'

export const useSettingStore = create<{
  settings: Settings
  setSettings: (settings: Settings) => void
}>((set) => ({
  settings: {
    downloadPaths: [],
    maximumActiveDownloads: 2,
  },
  setSettings: (newSettings) => set(() => ({ settings: newSettings })),
}))
