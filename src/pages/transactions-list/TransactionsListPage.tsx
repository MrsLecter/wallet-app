import { TransactionsFeed } from '../../components/transaction/TransactionsFeed'
import { Dashboard } from '../../components/wallet/Dashboard'
import { walletData } from '../../data/contracts'

export function TransactionsListPage() {
  return (
    <section className="transactions-list-page">
      <Dashboard wallet={walletData} />
      <TransactionsFeed />
    </section>
  )
}
