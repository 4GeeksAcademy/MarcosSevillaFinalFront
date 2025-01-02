import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContact = () => {
    const [contact, setContact] = useState({ name: "", email: "", phone: "", address: "" });
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await actions.createContact(contact); // Llama a createContact
        if (success) {
            navigate("/"); // Redirige automáticamente a la lista de contactos
        } else {
            alert("Failed to save the contact. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Add a New Contact</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={contact.name}
                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={contact.phone}
                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={contact.address}
                        onChange={(e) => setContact({ ...contact, address: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Save</button>
            </form>
            <div className="text-start mt-3">
                <a href="/" onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                }}>
                    or get back to Contacts
                </a>
            </div>
        </div>
    );
};










