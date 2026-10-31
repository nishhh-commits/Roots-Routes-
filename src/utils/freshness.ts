export function freshnessLabel(minutesAgo: number) {
  if (minutesAgo <= 30) {
    return 'Fresh'
  }
  if (minutesAgo <= 120) {
    return 'Recent'
  }
  return 'Stale'
}

export function timeAgo(minutesAgo: number) {
  if (minutesAgo < 60) {
    return `${minutesAgo} min ago`
  }
  return `${Math.round(minutesAgo / 60)} h ago`
}