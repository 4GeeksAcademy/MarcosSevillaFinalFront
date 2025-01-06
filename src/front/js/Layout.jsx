import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { ContactList } from "./pages/ContactList.jsx";
import { EditContact } from "./pages/EditContact.jsx";
import { AddContact } from "./pages/AddContact.jsx";
import { CharacterList } from "./pages/CharacterList.jsx";
import { PlanetList } from "./pages/PlanetList.jsx";
import { StarshipList } from "./pages/StarshipList.jsx";
import { CharacterDetails } from "./pages/CharacterDetails.jsx";
import { PlanetDetails } from "./pages/PlanetDetails.jsx";
import { StarshipDetails } from "./pages/StarshipDetails.jsx";

const Layout = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/contacts" element={<ContactList />} />
                    <Route path="/edit-contact/:id" element={<EditContact />} />
                    <Route path="/add-contact" element={<AddContact />} />
                    <Route path="/characters" element={<CharacterList />} />
                    <Route path="/characters/:uid" element={<CharacterDetails />} />
                    <Route path="/planets" element={<PlanetList />} />
                    <Route path="/planets/:uid" element={<PlanetDetails />} />
                    <Route path="/starships" element={<StarshipList />} />
                    <Route path="/starships/:uid" element={<StarshipDetails />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default Layout;
















