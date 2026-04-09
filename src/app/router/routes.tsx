import { Route, createRoutesFromElements } from 'react-router-dom'

import { AppLayout } from '../../layouts/AppLayout'
import { TransactionDetailPage } from '../../pages/transaction-detail/TransactionDetailPage'
import { TransactionsListPage } from '../../pages/transactions-list/TransactionsListPage'

export const appRoutes = createRoutesFromElements(
  <Route path="/" element={<AppLayout />}>
    <Route index element={<TransactionsListPage />} />
    <Route
      path="transaction/:transactionId"
      element={<TransactionDetailPage />}
    />
  </Route>,
)
