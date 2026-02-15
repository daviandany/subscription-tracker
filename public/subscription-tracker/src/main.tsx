import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
console.log('a')
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route 
          path='/'
          element={
            <HomePage />
          }
        />
        <Route 
          path='/login'
          element={
            <LoginPage />
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
  
)
