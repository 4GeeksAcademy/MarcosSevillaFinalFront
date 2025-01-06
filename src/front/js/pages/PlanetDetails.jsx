import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const PlanetDetails = () => {
    const { uid } = useParams();
    const { store, actions } = useContext(Context);
    const [imageUrl, setImageUrl] = useState(""); // Estado para manejar la URL de la imagen
    const defaultImage = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";

    useEffect(() => {
        actions.fetchPlanetDetails(uid); // Obtener detalles del planeta

        const imageUrl = `https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`;

        // Verificar si la imagen existe
        const checkImage = async () => {
            try {
                const response = await fetch(imageUrl, { method: "HEAD" });
                setImageUrl(response.ok ? imageUrl : defaultImage);
            } catch {
                setImageUrl(defaultImage);
            }
        };

        checkImage();
    }, [uid]);

    const planet = store.selectedPlanet;

    return (
        <div
            className="container-fluid d-flex flex-column justify-content-between"
            style={{ minHeight: "100vh" }}
        >
            <div className="container mt-5 mb-5">
                {planet ? (
                    <div
                        className="row justify-content-center align-items-start"
                        style={{
                            backgroundColor: "#343a40", // Fondo oscuro diferente
                            borderRadius: "10px",
                            padding: "20px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        {/* Imagen y nombre del planeta */}
                        <div className="col-12 col-md-4 text-center">
                            <h1
                                className="text-light mb-3 text-start"
                                style={{
                                    fontSize: "2rem",
                                    marginLeft: "10px",
                                }}
                            >
                                {planet.name}
                            </h1>
                            <img
                                src={imageUrl} // Usar la imagen del estado
                                className="img-fluid rounded"
                                alt={planet.name || "Planet"}
                                style={{
                                    maxHeight: "500px",
                                    objectFit: "cover",
                                    border: "2px solid #fff",
                                    borderRadius: "10px",
                                }}
                            />
                        </div>
                        {/* Detalles del planeta */}
                        <div className="col-12 col-md-8 text-light">
                            <ul
                                className="list-unstyled"
                                style={{
                                    marginTop: "40px",
                                    marginLeft: "20px",
                                }}
                            >
                                <li className="mb-3">
                                    <strong>Climate:</strong> {planet.climate}
                                </li>
                                <li className="mb-3">
                                    <strong>Diameter:</strong> {planet.diameter} km
                                </li>
                                <li className="mb-3">
                                    <strong>Population:</strong> {planet.population}
                                </li>
                                <li className="mb-3">
                                    <strong>Terrain:</strong> {planet.terrain}
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="spinner-border text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="text-light mt-3">Loading planet details...</p>
                    </div>
                )}
            </div>
            <footer className="bg-dark text-center text-light py-3 mt-auto"></footer>
        </div>
    );
};


