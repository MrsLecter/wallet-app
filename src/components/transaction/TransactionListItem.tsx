import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import {
  DEFAULT_TRANSACTION_ICON,
  TRANSACTION_ICONS,
  type TransactionIconKey,
} from '../../constants'
import {
  formatTransactionAmount,
  formatTransactionListDate,
  getTransactionIconBackground,
} from '../../lib/transactions'
import type {
  AuthorizedUser,
  Transaction,
  TransactionDate,
  TransactionId,
} from '../../types'
import './TransactionListItem.css'

export type TransactionListItemData = {
  id: TransactionId
  type: Transaction['type']
  amount: number
  transactionName: string
  transactionDescription: string
  date: TransactionDate
  pending?: boolean
  authorizedUser?: AuthorizedUser
  icon?: string
}

type TransactionListItemProps = {
  transaction: TransactionListItemData
  rewardsLabel?: string
}

function getTransactionIcon(icon?: string) {
  if (icon && icon in TRANSACTION_ICONS) {
    return TRANSACTION_ICONS[icon as TransactionIconKey]
  }

  return DEFAULT_TRANSACTION_ICON
}

function getTransactionDescription(transaction: TransactionListItemData) {
  if (transaction.pending) {
    return `Pending - ${transaction.transactionDescription}`
  }

  return transaction.transactionDescription
}

function getTransactionMeta(transaction: TransactionListItemData) {
  const formattedDate = formatTransactionListDate(transaction.date)

  if (!transaction.authorizedUser) {
    return formattedDate
  }

  return `${transaction.authorizedUser} - ${formattedDate}`
}

export function TransactionListItem({
  transaction,
  rewardsLabel = '3%',
}: TransactionListItemProps) {
  const icon = getTransactionIcon(transaction.icon)
  const iconBackground = getTransactionIconBackground(transaction.id)
  const amountLabel = formatTransactionAmount(transaction)
  const descriptionLabel = getTransactionDescription(transaction)
  const metaLabel = getTransactionMeta(transaction)

  return (
    <Link
      to={`/transaction/${transaction.id}`}
      className="transaction-list-item"
      aria-label={`Open transaction ${transaction.transactionName}`}
    >
      <span
        className="transaction-list-item__icon-badge"
        style={{ backgroundColor: iconBackground }}
        aria-hidden="true"
      >
        <FontAwesomeIcon icon={icon} />
      </span>

      <span className="transaction-list-item__body">
        <span className="transaction-list-item__title">
          {transaction.transactionName}
        </span>
        <span className="transaction-list-item__description">
          {descriptionLabel}
        </span>
        <span className="transaction-list-item__meta">{metaLabel}</span>
      </span>

      <span className="transaction-list-item__aside">
        <span className="transaction-list-item__amount-wrap">
          <span className="transaction-list-item__amount">{amountLabel}</span>
          <span className="transaction-list-item__badge">{rewardsLabel}</span>
        </span>
        <FontAwesomeIcon
          icon={faChevronRight}
          className="transaction-list-item__chevron"
          aria-hidden="true"
        />
      </span>
    </Link>
  )
}
