import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const PlanetList = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.fetchPlanets(1, 10); // Cargar la primera página de planetas
    }, []);

    const isFavorite = (name) => {
        return store.favorites.some((fav) => fav.name === name);
    };

    return (
        <div className="container mt-3">
            <h1 className="text-light text-center mb-4">Planets</h1>
            <div className="row">
                {store.planets.map((planet, index) => (
                    <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div className="card bg-dark text-light h-100">
                            {/* Imagen */}
                            <img
                                src={
                                    planet.image ||
                                    "https://via.placeholder.com/300x200?text=Planet+Image"
                                }
                                className="card-img-top"
                                alt={planet.name}
                                style={{ height: "300px", objectFit: "cover" }}
                            />
                            {/* Contenido */}
                            <div className="card-body d-flex flex-column">
                                {/* Nombre */}
                                <h5 className="card-title mb-3">{planet.name}</h5>
                                {/* Botones */}
                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                    {/* Botón Details */}
                                    <button
                                        className="btn btn-secondary rounded"
                                        onClick={() => navigate(`/planets/${planet.uid}`)}
                                    >
                                        Details
                                    </button>
                                    {/* Ícono de corazón */}
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() =>
                                            isFavorite(planet.name)
                                                ? actions.removeFromFavorites(planet.name)
                                                : actions.addToFavorites(planet)
                                        }
                                    >
                                        <i
                                            className={`fas fa-heart ${
                                                isFavorite(planet.name) ? "text-warning" : ""
                                            }`}
                                            style={{ fontSize: "1.2rem" }}
                                        ></i>
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


