import Navbar from './Navbar.tsx'
import MainImage from './MainImage.tsx'
import NehnutelnostContainer from './NehnutelnostContainer.tsx'
import { Route, Routes } from 'react-router-dom'

function MainPage() {
    return (
        <>
                <MainImage />
                <div className="containerCard">
                    <NehnutelnostContainer />
                    <NehnutelnostContainer />
                    <NehnutelnostContainer />
                    <NehnutelnostContainer />
                    <NehnutelnostContainer />
                    <NehnutelnostContainer />
                </div>
        </>
    )
}

export default MainPage
