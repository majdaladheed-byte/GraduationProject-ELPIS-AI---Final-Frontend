import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../auth/ProtectedRoute'
import { ROUTES } from '../utils/constants'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import PredictPage from '../pages/PredictPage'
import HistoryPage from '../pages/HistoryPage'
import AnalysisDetailsPage from '../pages/AnalysisDetailsPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.login} replace />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.register} element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.predict} element={<PredictPage />} />
        <Route path={ROUTES.history} element={<HistoryPage />} />
        <Route
          path={ROUTES.analysisDetail(':id')}
          element={<AnalysisDetailsPage />}
        />
      </Route>
    </Routes>
  )
}
