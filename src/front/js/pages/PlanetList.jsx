import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const PlanetList = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const limit = 10;

    useEffect(() => {
        if (!store.isLogged) {
            actions.setAlert({
                text: "Debes iniciar sesión para acceder al contenido.",
                background: "danger",
                visible: true
            });
            navigate("/login"); // ❌ Evita que acceda a la página
        } else {
            actions.setAlert({ text: "", background: "primary", visible: false });
            actions.fetchPlanets(page);
        }
    //}, [page, store.isLogged, actions, navigate]);
    }, [page]);

    //if (!store.isLogged) return null; // ❌ No renderiza la página si no está logueado

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
                            <img
                                src={planet.image || "https://th.bing.com/th?id=OIP.OSH1MmFY_yI9RZ0lVG_lfgHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"}
                                className="card-img-top"
                                alt={planet.name}
                                style={{ height: "300px", objectFit: "cover" }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title mb-3">{planet.name}</h5>
                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                    <button
                                        className="btn btn-secondary rounded"
                                        onClick={() => navigate(`/planets/${planet.uid}`)}
                                    >
                                        Details
                                    </button>
                                    <button
                                        className={`btn ${isFavorite(planet.name) ? "btn-warning" : "btn-outline-warning"}`}
                                        onClick={() =>
                                            isFavorite(planet.name)
                                                ? actions.removeFromFavorites(planet.name)
                                                : actions.addToFavorites(planet)
                                        }
                                    >
                                        <i
                                            className={`fas fa-heart ${isFavorite(planet.name) ? "text-dark" : ""}`}
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





