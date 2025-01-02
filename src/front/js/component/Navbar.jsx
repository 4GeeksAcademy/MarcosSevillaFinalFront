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
                        src="https://starwars.chocobar.net/star-wars-logo.png"
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

                    {/* Dropdown Favorites */}
                    <div className="dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="favoritesDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{ fontSize: "0.9rem" }}
                        >
                            Favorites ({store.favorites.length})
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favoritesDropdown">
                            {store.favorites.length === 0 ? (
                                <li className="dropdown-item text-muted">No favorites selected</li>
                            ) : (
                                store.favorites.map((fav, index) => (
                                    <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                                        {fav.name}
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => actions.removeFromFavorites(fav.name)}
                                            style={{ padding: "2px 5px" }}
                                        >
                                            <i className="fas fa-trash" style={{ fontSize: "0.8rem" }}></i>
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};













