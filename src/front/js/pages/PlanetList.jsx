import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const PlanetList = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.fetchPlanets();
    }, []);

    const isFavorite = (name) => {
        return store.favorites.some((fav) => fav.name === name);
    };

    return (
        <div className="container mt-3">
            <h1 className="text-light">Planets</h1>
            <div className="row">
                {store.planets.map((planet, index) => (
                    <div key={index} className="col-12 col-md-4 mb-3">
                        <div className="card bg-dark text-light">
                            <div className="card-body">
                                <h5 className="card-title">{planet.name}</h5>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button
                                        className="btn btn-secondary rounded"
                                        onClick={() => navigate(`/planets/${index}`)} // Puedes ajustar esta ruta
                                    >
                                        Details
                                    </button>
                                    <button
                                        className={`btn ${
                                            isFavorite(planet.name)
                                                ? "btn-danger"
                                                : "btn-outline-danger"
                                        }`}
                                        onClick={() =>
                                            isFavorite(planet.name)
                                                ? actions.removeFromFavorites(planet.name)
                                                : actions.addToFavorites(planet)
                                        }
                                    >
                                        <i className="fas fa-heart"></i> {/* Ícono de corazón */}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


