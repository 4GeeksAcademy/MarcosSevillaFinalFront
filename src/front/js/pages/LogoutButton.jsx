import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useLocation } from "react-router-dom";

export const LogoutButton = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation(); // Obtener la ruta actual

    const handleLogout = () => {
        actions.logout(); // Cierra sesión y limpia el estado
        navigate("/login", { replace: true }); // Redirige inmediatamente
    };

    useEffect(() => {
        // Si isLogged es false y NO estamos en /login, forzar la redirección
        if (!store.isLogged && location.pathname !== "/login") {
            navigate("/login", { replace: true });
        }
    }, [store.isLogged, navigate, location]);

    if (!store.isLogged) return null; // Oculta el botón si no está logueado

    return (
        <button className="btn btn-danger ms-3" onClick={handleLogout}>
            Logout
        </button>
    );
};



