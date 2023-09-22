import { Router } from 'express'
import { API_ROUTES, Settings } from '@dload/shared'

import * as settingStore from './setting-store'

const router = Router()

router.get(API_ROUTES.GET_SETTINGS, (req, res) => {
  res.json(settingStore.getSettings())
})

router.post(API_ROUTES.UPDATE_SETTINGS, (req, res) => {
  const settings = req.body as Settings
  settingStore.setSettings(settings)
  res.json(settingStore.getSettings())
})

export default router
