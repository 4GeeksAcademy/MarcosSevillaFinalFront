import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Dashboard = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.isLogged) {
            navigate("/login");  // ✅ Redirigir al login si no está autenticado
        }
    }, [store.isLogged, navigate]);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 position-relative">
            <div className="card shadow-lg p-5 bg-secondary" style={{ width: "500px", zIndex: "1", borderRadius: "15px" }}>

                {/* Logo Star Wars y Foto de Yoda */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <img
                        src="https://starwars.chocobar.net/star-wars-logo.png"
                        alt="Star Wars Logo"
                        style={{ width: "80px", height: "auto" }}
                    />
                    <img
                        src="https://th.bing.com/th?id=OIP.AP0B7KAC_CoOKxbXnfvetAHaFw&w=283&h=220&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                        alt="Profile Yoda"
                        className="rounded-circle"
                        style={{ width: "80px", height: "80px", border: "3px solid white" }}
                    />
                </div>

                <h2 className="text-center mb-4 text-light">Perfil de usuario</h2>

                {store.user && store.user.first_name ? (
                    <div className="text-center">
                        <p><strong>First Name:</strong> {store.user.first_name}</p>
                        <p><strong>Last Name:</strong> {store.user.last_name}</p>
                        <p><strong>Email:</strong> {store.user.email}</p>
                        <p><strong>Phone:</strong> {store.user.phone || "No phone available"}</p>
                    </div>
                ) : (
                    <p className="text-center">Loading user data...</p>
                )}

                {/* Botones alineados en la misma línea */}
                <div className="d-flex justify-content-between mt-4">
                    <button
                        className="btn btn-danger d-flex align-items-center"
                        onClick={() => {
                            actions.logout();
                            navigate("/login");
                        }}
                    >
                        <i className="fas fa-power-off me-2"></i> Cerrar sesión
                    </button>

                    <button
                        className="btn btn-warning d-flex align-items-center"
                        onClick={() => navigate("/edit-profile")}
                    >
                        <i className="fas fa-user-edit me-2"></i> Modificar datos
                    </button>
                </div>

            </div>
        </div>
    );
};





