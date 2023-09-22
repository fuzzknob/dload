import React, { useState, useEffect } from 'react'

import { useSettingStore } from './setting-store'
import { fetchSettings } from './setting-service'

interface SettingProviderProps {
  children: React.ReactNode
}

const SettingProvider: React.FC<SettingProviderProps> = ({ children }) => {
  const setSettings = useSettingStore(({ setSettings }) => setSettings)
  const [hasLoaded, setLoaded] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const settigs = await fetchSettings()
      setSettings(settigs)
      setLoaded(true)
    })()
  }, [])

  if (!hasLoaded) return <div />

  return <>{children}</>
}

export default SettingProvider
