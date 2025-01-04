import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container d-flex justify-content-between align-items-center">
                {/* Logo de Star Wars */}
                <Link
                    to="/"
                    className="navbar-brand d-flex align-items-center"
                    style={{
                        marginLeft: "-20px",
                        padding: "5px 10px",
                        borderRadius: "5px",
                    }}
                >
                    <img
                        src="https://starwars-visualguide.com/assets/img/logo.png"
                        alt="Star Wars"
                        style={{
                            height: "60px",
                            width: "auto",
                        }}
                    />
                </Link>
                {/* Menús */}
                <div className="d-flex align-items-center" style={{ gap: "15px" }}>
                    <Link to="/characters" className="nav-link text-light" style={{ fontSize: "0.9rem" }}>
                        Characters
                    </Link>
                    <Link to="/planets" className="nav-link text-light" style={{ fontSize: "0.9rem" }}>
                        Planets
                    </Link>
                    <Link to="/starships" className="nav-link text-light" style={{ fontSize: "0.9rem" }}>
                        Starships
                    </Link>
                    <Link to="/contacts" className="nav-link text-light" style={{ fontSize: "0.9rem" }}>
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
                                backgroundColor: "#6c757d", // Fondo gris para el botón
                                color: "white",
                                border: "none",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Pequeña sombra
                            }}
                        >
                            Favorites
                        </button>
                        {/* Círculo amarillo con número de favoritos */}
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
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)", // Sombra
                            }}
                        >
                            {store.favorites.length}
                        </span>
                        {/* Desplegable con los favoritos */}
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownFavorites">
                            {store.favorites.length > 0 ? (
                                store.favorites.map((fav, index) => (
                                    <li
                                        key={index}
                                        className="dropdown-item d-flex justify-content-between align-items-center"
                                    >
                                        <span>{fav.name}</span>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            title="Remove Favorite"
                                            onClick={() => actions.removeFromFavorites(fav.name)}
                                        >
                                            <i className="fas fa-trash-alt"></i> {/* Ícono de papelera */}
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

















