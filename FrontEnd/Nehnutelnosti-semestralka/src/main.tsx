import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './Navbar.tsx'
import MainImage from './MainImage.tsx'
import './index.css'
import MainPage from './MainPage.tsx'
import { BrowserRouter } from "react-router-dom"
import App from './App.tsx'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>,
)
