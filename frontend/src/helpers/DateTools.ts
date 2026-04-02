export function toLocaleFullString(date: number) {
  return new Date(date).toLocaleString(navigator.language)
}

export function toLocaleDateString(date: number) {
  return new Date(date).toLocaleDateString(navigator.language)
}
