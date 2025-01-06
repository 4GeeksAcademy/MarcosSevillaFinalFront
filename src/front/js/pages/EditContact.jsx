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
            navigate("/contacts"); // Si no hay datos, redirige a la lista de contactos
        }
    }, [contact, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await actions.updateContact(updatedContact.id, updatedContact); // Llama al método en flux.js
        if (success) {
            navigate("/contacts"); // Redirige a la lista de contactos
        } else {
            alert("No se pudo actualizar el contacto. Por favor, inténtelo de nuevo.");
        }
    };

    const handleCancel = () => {
        navigate("/contacts"); // Redirige a la lista de contactos
    };

    return (
        <div className="container mt-5">
            <h1 className="text-start mb-4">Edit Contact</h1>
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
                    <label htmlFor="email" className="form-label">Email Address</label>
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
            </form>
            {/* Botones debajo del formulario */}
            <div
                className="d-flex justify-content-end mt-4"
                style={{ marginBottom: "50px" }} // Separación con el footer
            >
                <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-warning"
                    onClick={handleSubmit}
                >
                    Save
                </button>
            </div>
        </div>
    );
};





