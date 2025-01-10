import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
export const StarshipList = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [page, setPage] = useState(1); // Manejo de paginación
    const limit = 10;
    useEffect(() => {
        actions.fetchStarships(page);
    }, [page]);

    const isFavorite = (name) => {
        return store.favorites.some((fav) => fav.name === name);
    };
    return (
        <div className="container mt-3">
            <h1 className="text-light text-center mb-4">Starships</h1>
            <div className="row">
                {store.starships.map((starship, index) => (
                    <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div className="card bg-dark text-light h-100">
                            <img
                                src={starship.image || "https://via.placeholder.com/300x200?text=Starship+Image"}
                                className="card-img-top"
                                alt={starship.name}
                                style={{ height: "300px", objectFit: "cover" }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title mb-3">{starship.name}</h5>
                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                    <button
                                        className="btn btn-secondary rounded"
                                        onClick={() => navigate(`/starships/${starship.uid}`)}
                                    >
                                        Details
                                    </button>
                                    <button
                                        className={`btn ${
                                            isFavorite(starship.name) ? "btn-warning" : "btn-outline-warning"
                                        }`}
                                        onClick={() =>
                                            isFavorite(starship.name)
                                                ? actions.removeFromFavorites(starship.name)
                                                : actions.addToFavorites(starship)
                                        }
                                    >
                                        <i
                                            className={`fas fa-heart ${
                                                isFavorite(starship.name) ? "text-dark" : ""
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
            {/* Paginación */}
            <div className="d-flex justify-content-between mt-4 mb-5">
                <button
                    className="btn btn-warning"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>
                <span className="text-light align-self-center">
                    Page {page} ({(page - 1) * limit + 1} - {page * limit})
                </span>
                <button
                    className="btn btn-warning"
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};




