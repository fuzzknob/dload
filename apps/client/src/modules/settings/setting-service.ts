import { API_ROUTES, Settings } from '@dload/shared'

import request from '@/libs/request'

export const fetchSettings = async () => {
  const { data: settings } = await request.get<Settings>(
    API_ROUTES.GET_SETTINGS,
  )
  return settings
}

export const updateSettings = (settings: Settings) =>
  request.post(API_ROUTES.UPDATE_SETTINGS, settings)
