import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom'

import type { TransactionId } from '../../types'
import { transactionsData } from '../../data/contracts'
import {
  formatTransactionAmount,
  formatTransactionDetailDate,
  getTransactionStatusLabel,
} from '../../lib/transactions'

type TransactionDetailRouteParams = {
  transactionId?: TransactionId
}

export function TransactionDetailPage() {
  const { transactionId } = useParams<TransactionDetailRouteParams>()
  const transaction = transactionsData
    .flat()
    .find((item) => item.id === transactionId)

  if (!transaction) {
    return (
      <section className="transaction-detail-page">
        <Link
          to="/"
          className="transaction-detail-page__back"
          aria-label="Back to transactions"
        >
          <FontAwesomeIcon icon={faAngleLeft} aria-hidden="true" />
        </Link>

        <div className="transaction-detail-page__empty">
          <h1 className="transaction-detail-page__heading">
            Transaction not found
          </h1>
        </div>
      </section>
    )
  }

  const amountLabel = formatTransactionAmount(transaction)
  const detailDateLabel = formatTransactionDetailDate(transaction.date)
  const statusLabel = getTransactionStatusLabel(transaction.pending)

  return (
    <section className="transaction-detail-page">
      <Link
        to="/"
        className="transaction-detail-page__back"
        aria-label="Back to transactions"
      >
        <FontAwesomeIcon icon={faAngleLeft} aria-hidden="true" />
      </Link>

      <header className="transaction-detail-page__hero">
        <p className="transaction-detail-page__amount">{amountLabel}</p>
        <h1 className="transaction-detail-page__heading">
          {transaction.transactionName}
        </h1>
        <p className="transaction-detail-page__date">{detailDateLabel}</p>
      </header>

      <section
        className="transaction-detail-card"
        aria-label="Transaction details"
      >
        <p className="transaction-detail-card__status">
          <span className="transaction-detail-card__status-label">Status:</span>{' '}
          <span className="transaction-detail-card__status-value">
            {statusLabel}
          </span>
        </p>

        <p className="transaction-detail-card__description">
          {transaction.transactionDescription}
        </p>

        <div className="transaction-detail-card__row">
          <span className="transaction-detail-card__label">Total</span>
          <span className="transaction-detail-card__total">{amountLabel}</span>
        </div>
      </section>
    </section>
  )
}
