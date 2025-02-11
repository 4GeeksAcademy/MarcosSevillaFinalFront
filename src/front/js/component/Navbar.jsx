import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-dark bg-dark px-3">
            <div className="container d-flex justify-content-between align-items-center">
                
                {/* Logo de Star Wars */}
                <div className="d-flex align-items-center">
                    <Link to="/" className="navbar-brand">
                        <img
                            src="https://starwars.chocobar.net/star-wars-logo.png"
                            alt="Star Wars"
                            style={{ height: "50px", width: "auto" }}
                        />
                    </Link>

                    {/* Mostrar Sign Up / Login solo si el usuario NO está autenticado */}
                    {!store.isLogged ? (
                        <>
                            <Link to="/signup" className="btn btn-outline-light ms-3">Registrate</Link>
                            <Link to="/login" className="btn btn-outline-warning ms-2">Iniciar sesión</Link>
                        </>
                    ) : (
                        // Botón de Logout con ícono de apagado
                        <button className="btn btn-danger ms-3 d-flex align-items-center" onClick={actions.logout}>
                            <i className="fas fa-power-off me-2"></i> Cerrar sesión
                        </button>
                    )}
                </div>

                {/* Menú de navegación principal (alineado más a la derecha) */}
                <div className="d-flex ms-auto align-items-center">
                    <Link to="/characters" className="nav-link text-light me-3" style={{ fontSize: "0.9rem" }}>
                        Characters
                    </Link>
                    <Link to="/planets" className="nav-link text-light me-3" style={{ fontSize: "0.9rem" }}>
                        Planets
                    </Link>
                    <Link to="/starships" className="nav-link text-light me-3" style={{ fontSize: "0.9rem" }}>
                        Starships
                    </Link>
                    <Link to="/contacts" className="nav-link text-light me-3" style={{ fontSize: "0.9rem" }}>
                        Contacts
                    </Link>

                    {/* Favoritos desplegable */}
                    <div className="dropdown position-relative">
                        <button
                            className="btn dropdown-toggle"
                            id="dropdownFavorites"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{
                                fontSize: "0.9rem",
                                backgroundColor: "#6c757d",
                                color: "white",
                                border: "none",
                            }}
                        >
                            Favorites
                        </button>
                        <span
                            className="position-absolute"
                            style={{
                                top: "-10px",
                                right: "-10px",
                                backgroundColor: "yellow",
                                color: "black",
                                fontSize: "0.8rem",
                                fontWeight: "bold",
                                width: "25px",
                                height: "25px",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {store.favorites.length}
                        </span>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownFavorites">
                            {store.favorites.length > 0 ? (
                                store.favorites.map((fav, index) => (
                                    <li
                                        key={index}
                                        className="dropdown-item d-flex justify-content-between align-items-center"
                                    >
                                        <span className="text-dark">{fav.name}</span>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => actions.removeFromFavorites(fav.name)}
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li className="dropdown-item text-center">No favorites selected</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};





