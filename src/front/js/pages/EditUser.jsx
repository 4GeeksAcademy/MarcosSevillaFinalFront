import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditUser = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: ""
    });

    useEffect(() => {
        if (!store.isLogged) {
            navigate("/login"); // Si no está logueado, redirigir a login
        } else {
            setFormData({
                first_name: store.user.first_name || "",
                last_name: store.user.last_name || "",
                email: store.user.email || "",
                phone: store.user.phone || ""
            });
        }
    }, [store.isLogged, store.user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const success = await actions.updateUser(formData);
        if (success) {
            actions.setAlert({ 
                text: "Edición de usuario realizada correctamente.", 
                background: "success", 
                visible: true 
            });
            navigate("/dashboard");
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100 bg-dark text-light justify-content-center align-items-center">
            <div className="card shadow-lg p-5 bg-secondary" style={{ width: "500px", borderRadius: "15px" }}>
                <h2 className="text-center mb-4 text-light">Editar Perfil</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-light">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-light">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-light">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-light">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <button type="submit" className="btn btn-warning w-100">Guardar Cambios</button>
                </form>
            </div>
        </div>
    );
};
