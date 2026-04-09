import { useEffect, useMemo, useRef, useState } from 'react'

import { sortedTransactionsData } from '../../data/contracts'
import { TransactionListItem } from './TransactionListItem'
import './TransactionsFeed.css'

const INITIAL_VISIBLE_COUNT = 10
const LOAD_MORE_COUNT = 10

export function TransactionsFeed() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const visibleTransactions = useMemo(() => {
    return sortedTransactionsData.slice(0, visibleCount)
  }, [visibleCount])

  const hasTransactions = sortedTransactionsData.length > 0
  const hasMoreTransactions = visibleCount < sortedTransactionsData.length

  useEffect(() => {
    if (!hasMoreTransactions) {
      return
    }

    const scrollContainer = scrollContainerRef.current
    const sentinel = sentinelRef.current

    if (!scrollContainer || !sentinel) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries

        if (!entry?.isIntersecting) {
          return
        }

        setVisibleCount((currentCount) => {
          return Math.min(
            currentCount + LOAD_MORE_COUNT,
            sortedTransactionsData.length,
          )
        })
      },
      {
        root: scrollContainer,
        rootMargin: '0px 0px 96px 0px',
      },
    )

    observer.observe(sentinel)

    return () => {
      observer.disconnect()
    }
  }, [hasMoreTransactions])

  if (!hasTransactions) {
    return (
      <section
        className="transactions-feed transactions-feed--empty"
        aria-label="Transactions feed"
      >
        <p className="transactions-feed__empty">No transactions yet</p>
      </section>
    )
  }

  return (
    <section className="transactions-feed" aria-label="Transactions feed">
      <div
        ref={scrollContainerRef}
        className="transactions-feed__scroll"
        aria-live="polite"
      >
        <ul className="transactions-feed__list">
          {visibleTransactions.map((transaction) => (
            <li key={transaction.id} className="transactions-feed__item">
              <TransactionListItem transaction={transaction} />
            </li>
          ))}
        </ul>

        {hasMoreTransactions ? (
          <div
            ref={sentinelRef}
            className="transactions-feed__sentinel"
            aria-hidden="true"
          />
        ) : null}
      </div>
    </section>
  )
}
