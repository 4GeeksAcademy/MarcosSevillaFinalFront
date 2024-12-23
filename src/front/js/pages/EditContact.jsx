import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext } from "react";

export const EditContact = () => {
    const { state: contact } = useLocation(); // Obtén los datos del contacto desde la navegación
    const [updatedContact, setUpdatedContact] = useState(contact);
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!contact) {
            navigate("/"); // Si no hay datos, redirige a la lista de contactos
        }
    }, [contact, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await actions.updateContact(updatedContact.id, updatedContact); // Llama al método en flux.js
        if (success) {
            navigate("/"); // Redirige a la lista de contactos
        } else {
            alert("No se pudo actualizar el contacto. Por favor, inténtelo de nuevo.");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Edit Contact</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={updatedContact?.name || ""}
                        onChange={(e) => setUpdatedContact({ ...updatedContact, name: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={updatedContact?.email || ""}
                        onChange={(e) => setUpdatedContact({ ...updatedContact, email: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={updatedContact?.phone || ""}
                        onChange={(e) => setUpdatedContact({ ...updatedContact, phone: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={updatedContact?.address || ""}
                        onChange={(e) => setUpdatedContact({ ...updatedContact, address: e.target.value })}
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


