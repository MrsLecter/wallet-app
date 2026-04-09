import {
  calculateDailyPoints,
  getCurrentSeasonStart,
  getStartOfLocalDay,
} from './calculateDailyPoints'
import { formatDailyPointsForUi } from './formatDailyPointsForUi'

describe('points helpers', () => {
  describe('daily points output format', () => {
    it('prints day and points in the expected format', () => {
      const formatter = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
      })

      const registrationDate = '2023-01-15T10:00:00Z'
      const seasonDays = [
        new Date(2026, 8, 1),
        new Date(2026, 8, 2),
        new Date(2026, 8, 3),
      ]
      const septemberDailyPoints = seasonDays.map((date) => ({
        date,
        points: calculateDailyPoints(registrationDate, date),
      }))
      const decemberDailyPoints = [
        new Date(2026, 11, 1),
        new Date(2026, 11, 2),
        new Date(2026, 11, 3),
      ].map((date) => ({
        date,
        points: calculateDailyPoints(registrationDate, date),
      }))
      const marchDailyPoints = [
        new Date(2026, 2, 1),
        new Date(2026, 2, 2),
        new Date(2026, 2, 3),
      ].map((date) => ({
        date,
        points: calculateDailyPoints(registrationDate, date),
      }))
      const juneDailyPoints = [
        new Date(2026, 5, 1),
        new Date(2026, 5, 2),
        new Date(2026, 5, 3),
      ].map((date) => ({
        date,
        points: calculateDailyPoints(registrationDate, date),
      }))

      const formatted = [
        ...septemberDailyPoints,
        ...decemberDailyPoints,
        ...marchDailyPoints,
        ...juneDailyPoints,
      ].map(
        ({ date, points }) =>
          `${formatter.format(date).toLowerCase()} - ${points}`,
      )

      expect(formatted).toEqual([
        'september 1 - 1',
        'september 2 - 3',
        'september 3 - 2.8',
        'december 1 - 1',
        'december 2 - 3',
        'december 3 - 2.8',
        'march 1 - 1',
        'march 2 - 3',
        'march 3 - 2.8',
        'june 1 - 1',
        'june 2 - 3',
        'june 3 - 2.8',
      ])
    })
  })

  describe('getStartOfLocalDay', () => {
    it('normalizes a date to the beginning of the local day', () => {
      expect(getStartOfLocalDay(new Date(2026, 3, 9, 14, 27, 45))).toEqual(
        new Date(2026, 3, 9),
      )
    })
  })

  describe('getCurrentSeasonStart', () => {
    it('returns spring start for spring dates', () => {
      expect(getCurrentSeasonStart(new Date(2026, 3, 9))).toEqual(
        new Date(2026, 2, 1),
      )
    })

    it('returns winter start from the previous year for january dates', () => {
      expect(getCurrentSeasonStart(new Date(2026, 0, 10))).toEqual(
        new Date(2025, 11, 1),
      )
    })
  })

  describe('calculateDailyPoints', () => {
    it('returns 0 when today is earlier than the calculation start date', () => {
      expect(
        calculateDailyPoints('2026-04-12T10:00:00Z', new Date(2026, 3, 9, 12, 0, 0)),
      ).toBe(0)
    })

    it('starts from the current season start when the registration is earlier', () => {
      expect(
        calculateDailyPoints('2023-01-15T10:00:00Z', new Date(2026, 2, 1, 12, 0, 0)),
      ).toBe(1)
      expect(
        calculateDailyPoints('2023-01-15T10:00:00Z', new Date(2026, 2, 2, 12, 0, 0)),
      ).toBe(3)
      expect(
        calculateDailyPoints('2023-01-15T10:00:00Z', new Date(2026, 2, 3, 12, 0, 0)),
      ).toBe(2.8)
      expect(
        calculateDailyPoints('2023-01-15T10:00:00Z', new Date(2026, 2, 4, 12, 0, 0)),
      ).toBe(4.68)
    })

    it('starts from the registration date when the user registered after season start', () => {
      expect(
        calculateDailyPoints('2026-04-07T23:30:00Z', new Date(2026, 3, 8, 8, 0, 0)),
      ).toBe(1)
    })

    it('keeps the current day value in the expected decimal pattern', () => {
      expect(
        calculateDailyPoints('2026-03-01T00:00:00Z', new Date(2026, 2, 5, 12, 0, 0)),
      ).toBe(5.608)
    })

    it('returns 0 for an invalid registration date', () => {
      expect(calculateDailyPoints('not-a-date', new Date(2026, 3, 9, 12, 0, 0))).toBe(0)
    })
  })

  describe('formatDailyPointsForUi', () => {
    it('formats values below 1000 as a plain number string', () => {
      expect(formatDailyPointsForUi(0)).toBe('0')
      expect(formatDailyPointsForUi(456)).toBe('456')
    })

    it('formats values from 1000 and above as rounded-up K strings', () => {
      expect(formatDailyPointsForUi(1000)).toBe('1K')
      expect(formatDailyPointsForUi(28745)).toBe('29K')
      expect(formatDailyPointsForUi(1001)).toBe('2K')
    })
  })
})
