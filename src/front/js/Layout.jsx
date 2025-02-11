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
import { Alert } from "./component/Alert.jsx";
import Signup from "./pages/Signup.jsx";
import { Login }  from "./pages/Login.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { LogoutButton } from "./pages/LogoutButton.jsx";
import { EditUser } from "./pages/EditUser.jsx";

const Layout = () => {
        /* 
        The basename is used when your project is published in a subdirectory and not in the root of the domain
        you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/ 
        */
        const basename = process.env.BASENAME || "";
        if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") {
            return <BackendURL/ >
        };
    return (
        <div className="d-flex flex-column min-vh-100 bg-black">  {/* Contenedor con fondo negro */}
            <BrowserRouter>
                <Navbar />
                <Alert />
                <div className="flex-grow-1"> {/* Contenedor que mantiene el fondo en todas las páginas */}
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
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/logoutbutton" element={<LogoutButton />} />
                        <Route path="/edit-profile" element={<EditUser />} />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default Layout;
