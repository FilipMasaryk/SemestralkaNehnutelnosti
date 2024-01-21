import Navbar from './Navbar.tsx'
import MainImage from './MainImage.tsx'
import { Route, Routes } from 'react-router-dom'
import MainPage from './MainPage.tsx'
import FavoritesPage from './FavoritesPage.tsx'
import RegistrationWindow from './RegistrationWindow.tsx'
import LoginWindow from './LoginWindow.tsx'
import AddProperty from './AddProperty.tsx'
import MemberNehnutelnosti from './MemberNehnutelnosti.tsx'
import { createContext, useState } from 'react';
import ZmenaHesla from './ZmenaHesla.tsx'

export const authContext = createContext({
    authenticated: !!sessionStorage.getItem('token'),
    setAuthenticated: (auth: boolean) => {
    }
});
function App() {
    const [authenticated, setAuthenticated] = useState(!!sessionStorage.getItem('token'));
    return (
        <>
            <authContext.Provider value={{ authenticated, setAuthenticated }}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/oblubene" element={<FavoritesPage />} />
                    <Route path="/vasenehnutelnosti" element={<MemberNehnutelnosti />} />
                    <Route path="/registracia" element={<RegistrationWindow />} />
                    <Route path="/prihlasenie" element={<LoginWindow />} />
                    <Route path="/pridanie" element={<AddProperty />} />
                    <Route path="/zmenahesla" element={<ZmenaHesla />} />
                </Routes>
            </authContext.Provider>
        </>
    )
}

export default App