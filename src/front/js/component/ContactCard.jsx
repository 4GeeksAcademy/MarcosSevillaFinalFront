import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const ContactCard = ({ contact }) => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/edit-contact/${contact.id}`, { state: contact });
    };

    const handleDelete = async () => {
        const confirmation = window.confirm("¿Está seguro que desea borrar el contacto?");
        if (confirmation) {
            const success = await actions.deleteContact(contact.id);
            if (!success) {
                alert("Contacto borrado correctamente.");
            }
        }
    };

    return (
        <div
            className="position-relative bg-white rounded p-3"
            style={{
                marginBottom: "20px",
                border: "1px solid #ddd",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
        >
            {/* Información del contacto */}
            <div className="d-flex align-items-center">
                <img
                    src={contact.image || "https://via.placeholder.com/50"}
                    alt="Avatar"
                    className="rounded-circle me-3"
                    width="50"
                    height="50"
                />
                <div>
                    <p className="mb-0 fw-bold">{contact.name}</p>
                    <small>{contact.address}</small>
                    <br />
                    <small>{contact.phone}</small>
                    <br />
                    <small>{contact.email}</small>
                </div>
            </div>

            {/* Botones de acciones (parte superior derecha) */}
            <div
                className="position-absolute"
                style={{
                    top: "10px",
                    right: "10px",
                }}
            >
                <button
                    className="btn btn-sm btn-secondary me-4" // Aumentado el margen a 'me-3'
                    title="Edit Contact"
                    onClick={handleEdit}
                >
                    <i className="fas fa-pencil-alt"></i>
                </button>
                <button
                    className="btn btn-sm btn-danger"
                    title="Delete Contact"
                    onClick={handleDelete}
                >
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    );
};





