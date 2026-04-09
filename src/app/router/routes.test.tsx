import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import { appRoutes } from './routes'

describe('appRoutes', () => {
  it('renders the transactions list page for the root route', () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/'],
    })

    render(<RouterProvider router={router} />)

    expect(
      screen.getByRole('heading', { name: 'Transactions List' }),
    ).toBeInTheDocument()
  })

  it('renders transaction details for the transaction route', () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/transaction/test-transaction-id'],
    })

    render(<RouterProvider router={router} />)

    expect(
      screen.getByRole('heading', { name: 'Transaction Detail' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Transaction ID: test-transaction-id'),
    ).toBeInTheDocument()
  })
})
