export function formatDailyPointsForUi(points: number): string {
  if (points < 1000) {
    return String(points)
  }

  return `${Math.ceil(points / 1000)}K`
}
