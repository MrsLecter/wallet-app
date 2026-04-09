export function formatDailyPointsForUi(points: number): string {
  if (points < 1000) {
    return String(points)
  }

  return `${Math.round(points / 1000)}K`
}
