import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { ContactCard } from "../component/ContactCard.jsx";

export const ContactList = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container mt-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-light">Contacts</h1>
                <button 
                    className="btn btn-secondary"
                    onClick={() => alert("Add Contact")}
                >
                    Add Contact
                </button>
            </div>

            {/* Lista de contactos */}
            <div>
                {store.contacts && store.contacts.length > 0 ? (
                    store.contacts.map((contact, index) => (
                        <div
                            key={index}
                            className="bg-white text-dark p-3 rounded mb-3"
                        >
                            <ContactCard contact={contact} />
                        </div>
                    ))
                ) : (
                    <p className="text-light">No contacts found. Try adding one.</p>
                )}
            </div>
        </div>
    );
};






















