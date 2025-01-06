import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
export const AddContact = () => {
    const [contact, setContact] = useState({ name: "", email: "", phone: "", address: "" });
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!contact.name || !contact.email || !contact.phone || !contact.address) {
            // Verificar si todos los campos están completos
            alert("Please complete all required fields above in order to continue.");
            return;
        }
        const success = await actions.createContact(contact); // Llama a createContact
        if (success) {
            navigate("/contacts"); // Redirige automáticamente a la lista de contactos
        } else {
            alert("Failed to save the contact. Please try again.");
        }
    };
    return (
        <div className="container mt-5">
            <h1 className="text-start">Add a New Contact<span className="text-danger">*</span></h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name<span className="text-danger">*</span></label>
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
                    <label htmlFor="email" className="form-label">Email<span className="text-danger">*</span></label>
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
                    <label htmlFor="phone" className="form-label">Phone<span className="text-danger">*</span></label>
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
                    <label htmlFor="address" className="form-label">Address<span className="text-danger">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={contact.address}
                        onChange={(e) => setContact({ ...contact, address: e.target.value })}
                        required
                    />
                </div>
                <div className="d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn btn-secondary me-2"
                        onClick={() => navigate("/contacts")}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-warning">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};













