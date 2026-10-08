import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
//import App from './App.jsx'
//import App from './ProjectCards/ProjectCards.jsx'
//import App from './TaskEstimator/TaskEstimator.jsx'
//import App from './ProjectList/ProjectList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)