import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const ContactCard = ({ contact }) => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleEdit = () => {
        // Redirige al formulario de edición con los datos del contacto
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
            className="d-flex justify-content-between align-items-center"
            style={{ padding: "15px 0" }}
        >
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
            <div>
                <button
                    className="btn btn-sm btn-warning me-2"
                    title="Edit Contact"
                    onClick={handleEdit} // Redirige al formulario de edición
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

