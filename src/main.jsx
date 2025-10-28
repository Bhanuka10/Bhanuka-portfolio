import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/reset.css' // Critical CSS reset first
import './styles/production-fixes.css' // Production-specific fixes
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
