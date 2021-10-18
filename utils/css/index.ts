const isRunningOnServer = typeof window === 'undefined'

export function cssValue(property: string) {
  if (isRunningOnServer) {
    return ''
  }
  return getComputedStyle(document.documentElement).getPropertyValue(property)
}
