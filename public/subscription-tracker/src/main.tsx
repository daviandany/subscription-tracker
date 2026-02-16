import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LandingPage from './pages/landingPage'
import LoginPage from './pages/login'
import CreateUserPage from './pages/createUser'
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
      </Routes>
    </BrowserRouter>
  </StrictMode>,

)
