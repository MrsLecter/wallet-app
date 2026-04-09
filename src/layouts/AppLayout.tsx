import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="app-shell">
      <div className="app-shell__viewport">
        <main className="app-shell__main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
