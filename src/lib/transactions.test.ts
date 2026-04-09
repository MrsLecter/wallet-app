import type { Transaction } from '../types'

import {
  formatTransactionAmount,
  formatTransactionDetailDate,
  getTransactionStatusLabel,
} from './transactions'

describe('transactions helpers', () => {
  function createLocalIsoString(
    year: number,
    monthIndex: number,
    day: number,
    hours: number,
    minutes: number,
  ) {
    const date = new Date(year, monthIndex, day, hours, minutes)

    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:00`
  }

  describe('formatTransactionAmount', () => {
    it('adds a plus sign for payment transactions', () => {
      const transaction: Transaction = {
        id: 'payment-001',
        type: 'payment',
        amount: 174,
        transactionName: 'Payment',
        transactionDescription: 'Bank payment',
        date: createLocalIsoString(2026, 3, 7, 8, 15),
        icon: 'bank',
      }

      expect(formatTransactionAmount(transaction)).toBe('+$174.00')
    })

    it('formats credit transactions without a minus sign', () => {
      const transaction: Transaction = {
        id: 'credit-001',
        type: 'credit',
        amount: 14.06,
        transactionName: 'Apple',
        transactionDescription: 'Card Number Used',
        date: createLocalIsoString(2026, 3, 8, 10, 24),
        icon: 'apple',
      }

      expect(formatTransactionAmount(transaction)).toBe('$14.06')
    })
  })

  describe('getTransactionStatusLabel', () => {
    it('returns Pending when pending is true', () => {
      expect(getTransactionStatusLabel(true)).toBe('Pending')
    })

    it('returns Approved when pending is false or missing', () => {
      expect(getTransactionStatusLabel(false)).toBe('Approved')
      expect(getTransactionStatusLabel()).toBe('Approved')
    })
  })

  describe('formatTransactionDetailDate', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2026, 3, 9, 12, 0, 0))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('formats today dates with the time', () => {
      expect(formatTransactionDetailDate(createLocalIsoString(2026, 3, 9, 7, 55))).toBe(
        'Today, 07:55',
      )
    })

    it('formats yesterday dates with the time', () => {
      expect(formatTransactionDetailDate(createLocalIsoString(2026, 3, 8, 10, 24))).toBe(
        'Yesterday, 10:24',
      )
    })

    it('formats dates from the last 7 days as weekday plus time', () => {
      expect(formatTransactionDetailDate(createLocalIsoString(2026, 3, 7, 8, 15))).toBe(
        'Tuesday, 08:15',
      )
    })

    it('formats older dates as a short local date and time', () => {
      expect(formatTransactionDetailDate(createLocalIsoString(2026, 3, 1, 8, 15))).toBe(
        '04/01/26, 08:15',
      )
    })

    it('returns an empty string for invalid dates', () => {
      expect(formatTransactionDetailDate('not-a-date')).toBe('')
    })
  })
})
