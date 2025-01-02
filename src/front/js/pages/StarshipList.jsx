import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const StarshipList = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.fetchStarships();
    }, []);

    const isFavorite = (name) => {
        return store.favorites.some((fav) => fav.name === name);
    };

    return (
        <div className="container mt-3">
            <h1 className="text-light">Starships</h1>
            <div className="row">
                {store.starships.map((starship, index) => (
                    <div key={index} className="col-12 col-md-4 mb-3">
                        <div className="card bg-dark text-light">
                            <div className="card-body">
                                <h5 className="card-title">{starship.name}</h5>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button
                                        className="btn btn-secondary rounded"
                                        onClick={() => navigate(`/starships/${index}`)} // Ajusta la ruta si es necesario
                                    >
                                        Details
                                    </button>
                                    <button
                                        className={`btn ${
                                            isFavorite(starship.name)
                                                ? "btn-danger"
                                                : "btn-outline-danger"
                                        }`}
                                        onClick={() =>
                                            isFavorite(starship.name)
                                                ? actions.removeFromFavorites(starship.name)
                                                : actions.addToFavorites(starship)
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


