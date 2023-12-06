import Navbar from './Navbar.tsx'
import MainImage from './MainImage.tsx'
import NehnutelnostContainer from './NehnutelnostContainer.tsx'
import { Route, Routes } from 'react-router-dom'
import MainPage from './MainPage.tsx'
import FavoritesPage from './FavoritesPage.tsx'
import RegistrationWindow from './RegistrationWindow.tsx'
import LoginWindow from './LoginWindow.tsx'
import AddProperty from './AddProperty.tsx'

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/oblubene" element={<FavoritesPage />} />
                <Route path="/registracia" element={<RegistrationWindow />} />
                <Route path="/prihlasenie" element={<LoginWindow />} />
                <Route path="/pridanie" element={<AddProperty />} />
            </Routes>
        </>
    )
}

export default App