import transactionsJson from '../../data/transactions.json'
import walletJson from '../../data/wallet.json'

import type { Transaction, TransactionsCollection, Wallet } from '../types'

export const walletData = walletJson satisfies Wallet
export const transactionsData = transactionsJson satisfies TransactionsCollection

export const sortedTransactionsData: Transaction[] = transactionsData
  .flat()
  .toSorted((left, right) => {
    return new Date(right.date).getTime() - new Date(left.date).getTime()
  })
