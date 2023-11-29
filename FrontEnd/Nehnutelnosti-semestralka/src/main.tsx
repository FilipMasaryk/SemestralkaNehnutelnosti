import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './Navbar.tsx'
import MainImage from './MainImage.tsx'
import NehnutelnostContainer from './NehnutelnostContainer.tsx'
import './index.css'
import MainPage from './MainPage.tsx'
import { BrowserRouter } from "react-router-dom"
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
