import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LandingPage from './pages/landing/landingPage'
import LoginPage from './pages/login'
import CreateUserPage from './pages/createUser'
import HomePage from './pages/home'
import SubscriptionsPage from './pages/subscriptions'
import AnalyticsPage from './pages/analytics'
import SettingsPage from './pages/settings'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <LandingPage />
          }
        />
        <Route
          path='/login'
          element={
            <LoginPage />
          }
        />
        <Route
          path='/register'
          element={
            <CreateUserPage />
          }
        />
        <Route
          path='/home'
          element={
            <HomePage />
          }
        />
        <Route
          path='/subscriptions'
          element={
            <SubscriptionsPage />
          }
        />
        <Route
          path='/analytics'
          element={
            <AnalyticsPage />
          }
        />
          <Route
          path='/settings'
          element={
            <SettingsPage />
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
