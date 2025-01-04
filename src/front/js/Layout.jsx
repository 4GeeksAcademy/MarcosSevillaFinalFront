import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { ContactList } from "./pages/ContactList.jsx";
import { CharacterList } from "./pages/CharacterList.jsx";
import { PlanetList } from "./pages/PlanetList.jsx";
import { StarshipList } from "./pages/StarshipList.jsx";
import { CharacterDetails } from "./pages/CharacterDetails.jsx"; // Importa el componente de detalles de personaje

const Layout = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/contacts" element={<ContactList />} />
                    <Route path="/characters" element={<CharacterList />} />
                    <Route path="/characters/:uid" element={<CharacterDetails />} />
                    <Route path="/planets" element={<PlanetList />} />
                    <Route path="/starships" element={<StarshipList />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default Layout;














