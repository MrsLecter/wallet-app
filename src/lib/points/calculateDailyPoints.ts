const MS_IN_DAY = 86_400_000
const DAILY_POINTS_DAY_ONE = 1
const DAILY_POINTS_DAY_TWO = 3
const DAILY_POINTS_GROWTH_FACTOR = 0.6

export function getStartOfLocalDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function getCurrentSeasonStart(currentDate: Date) {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  if (month >= 11) {
    return new Date(year, 11, 1)
  }

  if (month >= 8) {
    return new Date(year, 8, 1)
  }

  if (month >= 5) {
    return new Date(year, 5, 1)
  }

  if (month >= 2) {
    return new Date(year, 2, 1)
  }

  return new Date(year - 1, 11, 1)
}

function getCalculationStartDate(registrationDate: string, currentDate: Date) {
  const normalizedCurrentDate = getStartOfLocalDay(currentDate)
  const normalizedRegistrationDate = getStartOfLocalDay(new Date(registrationDate))

  if (Number.isNaN(normalizedRegistrationDate.getTime())) {
    return null
  }

  const seasonStartDate = getCurrentSeasonStart(normalizedCurrentDate)

  return normalizedRegistrationDate > seasonStartDate
    ? normalizedRegistrationDate
    : seasonStartDate
}

export function calculateDailyPoints(
  registrationDate: string,
  currentDate: Date = new Date(),
): number {
  const calculationStartDate = getCalculationStartDate(
    registrationDate,
    currentDate,
  )

  if (!calculationStartDate) {
    return 0
  }

  const normalizedCurrentDate = getStartOfLocalDay(currentDate)
  const millisecondsDiff =
    normalizedCurrentDate.getTime() - calculationStartDate.getTime()

  if (millisecondsDiff < 0) {
    return 0
  }

  const dayIndex = Math.floor(millisecondsDiff / MS_IN_DAY) + 1

  if (dayIndex === 1) {
    return DAILY_POINTS_DAY_ONE
  }

  if (dayIndex === 2) {
    return DAILY_POINTS_DAY_TWO
  }

  let previousPreviousDayPoints = DAILY_POINTS_DAY_ONE
  let previousDayPoints = DAILY_POINTS_DAY_TWO

  for (let currentDayIndex = 3; currentDayIndex <= dayIndex; currentDayIndex += 1) {
    const currentDayPoints =
      previousPreviousDayPoints +
      DAILY_POINTS_GROWTH_FACTOR * previousDayPoints

    previousPreviousDayPoints = previousDayPoints
    previousDayPoints = currentDayPoints
  }

  return previousDayPoints
}
