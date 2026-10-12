import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { SmoothScrollProvider } from './lib/SmoothScroll.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <SmoothScrollProvider>
        <App />
      </SmoothScrollProvider>
    </LanguageProvider>
  </StrictMode>,
)
