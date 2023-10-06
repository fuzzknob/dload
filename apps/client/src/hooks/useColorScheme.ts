import { useComputedColorScheme } from '@mantine/core'

export const useColorScheme = () => {
  const colorScheme = useComputedColorScheme('dark')
  return colorScheme
}
