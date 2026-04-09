import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { calculateDailyPoints } from '../../lib/points/calculateDailyPoints'
import type { Wallet } from '../../types'
import './Dashboard.css'

type DashboardProps = {
  wallet: Wallet
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function formatCurrencyAmount(value: number) {
  return currencyFormatter.format(value)
}

export function Dashboard({ wallet }: DashboardProps) {
  const availableAmount = wallet.limit - wallet.balance
  const dailyPoints = calculateDailyPoints()

  return (
    <section className="dashboard" aria-label="Wallet dashboard">
      <article className="dashboard-card dashboard-card--balance">
        <p className="dashboard-card__title">Card Balance</p>
        <p className="dashboard-card__amount">
          {formatCurrencyAmount(wallet.balance)}
        </p>
        <p className="dashboard-card__meta">
          {formatCurrencyAmount(availableAmount)} Available
        </p>
      </article>

      <article className="dashboard-card dashboard-card--status">
        <div className="dashboard-card__content">
          <p className="dashboard-card__title">No Payment Due</p>
          <p className="dashboard-card__text">
            You&apos;ve paid your September balance.
          </p>
        </div>
        <div className="dashboard-card__icon" aria-hidden="true">
          <FontAwesomeIcon icon={faCheck} />
        </div>
      </article>

      <article className="dashboard-card dashboard-card--points">
        <p className="dashboard-card__title">Daily Points</p>
        <p className="dashboard-card__points dashboard-card__points--secondary">
          {dailyPoints}
        </p>
      </article>
    </section>
  )
}
