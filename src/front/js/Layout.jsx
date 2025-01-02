import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { ContactList } from "./pages/ContactList.jsx";
import { AddContact } from "./pages/AddContact.jsx";
import { EditContact } from "./pages/EditContact.jsx"; // Importa el componente de edición

const Layout = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<ContactList />} />
                    <Route path="/add-contact" element={<AddContact />} />
                    <Route path="/edit-contact/:id" element={<EditContact />} /> {/* Nueva ruta */}
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default Layout;










