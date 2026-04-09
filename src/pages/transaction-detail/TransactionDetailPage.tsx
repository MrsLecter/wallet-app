import { useParams } from 'react-router-dom'

type TransactionDetailRouteParams = {
  transactionId?: string
}

export function TransactionDetailPage() {
  const { transactionId } = useParams<TransactionDetailRouteParams>()

  return (
    <section className="page-section">
      <h1 className="page-title">Transaction Detail</h1>
      <p className="page-description">Transaction ID: {transactionId}</p>
      <p className="page-description">
        Here will be the detailed transaction information.
      </p>
    </section>
  )
}
