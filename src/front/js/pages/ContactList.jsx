import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { ContactCard } from "../component/ContactCard.jsx";

export const ContactList = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container mt-3">
            <h1 className="">Contacts</h1>
            <div>
                {store.contacts && store.contacts.length > 0 ? (
                    store.contacts.map((contact, index) => (
                        <div key={index}>
                            <ContactCard contact={contact} />
                        </div>
                    ))
                ) : (
                    <p>No contacts found. Try adding one.</p>
                )}
            </div>
        </div>
    );
};



















