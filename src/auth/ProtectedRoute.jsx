import { Outlet } from 'react-router-dom'

function ProtectedRoute() {
  // TODO: re-enable auth check in Phase 4
  return <Outlet />
}

export default ProtectedRoute
