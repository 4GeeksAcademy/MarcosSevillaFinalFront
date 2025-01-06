import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const StarshipDetails = () => {
    const { uid } = useParams();
    const { store, actions } = useContext(Context);
    const [imageUrl, setImageUrl] = useState(""); // Estado para manejar la URL de la imagen
    const defaultImage = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";

    useEffect(() => {
        actions.fetchStarshipDetails(uid); // Obtener detalles de la nave espacial

        const imageUrl = `https://starwars-visualguide.com/assets/img/starships/${uid}.jpg`;

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

    const starship = store.selectedStarship;

    return (
        <div
            className="container-fluid d-flex flex-column justify-content-between"
            style={{ minHeight: "100vh" }}
        >
            <div className="container mt-5 mb-5">
                {starship ? (
                    <div
                        className="row justify-content-center align-items-start"
                        style={{
                            backgroundColor: "#343a40", // Fondo oscuro diferente
                            borderRadius: "10px",
                            padding: "20px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        {/* Imagen y nombre de la nave */}
                        <div className="col-12 col-md-4 text-center">
                            <h1
                                className="text-light mb-3 text-start"
                                style={{
                                    fontSize: "2rem",
                                    marginLeft: "10px",
                                }}
                            >
                                {starship.model}
                            </h1>
                            <img
                                src={imageUrl} // Usar la imagen del estado
                                className="img-fluid rounded"
                                alt={starship.model || "Starship"}
                                style={{
                                    maxHeight: "500px",
                                    objectFit: "cover",
                                    border: "2px solid #fff",
                                    borderRadius: "10px",
                                }}
                            />
                        </div>
                        {/* Detalles de la nave */}
                        <div className="col-12 col-md-8 text-light">
                            <ul
                                className="list-unstyled"
                                style={{
                                    marginTop: "40px", // Añade espacio superior
                                    marginLeft: "20px", // Separación entre imagen y detalles
                                }}
                            >
                                <li className="mb-3">
                                    <strong>Model:</strong> {starship.model}
                                </li>
                                <li className="mb-3">
                                    <strong>Starship class:</strong> {starship.starshipClass}
                                </li>
                                <li className="mb-3">
                                    <strong>Manufacturer:</strong> {starship.manufacturer}
                                </li>
                                <li className="mb-3">
                                    <strong>Cost in credits:</strong> {starship.costInCredits}
                                </li>
                                <li className="mb-3">
                                    <strong>Length:</strong> {starship.length} m
                                </li>
                                <li className="mb-3">
                                    <strong>Crew:</strong> {starship.crew}
                                </li>
                                <li className="mb-3">
                                    <strong>Passengers:</strong> {starship.passengers}
                                </li>
                                <li className="mb-3">
                                    <strong>Max atmosphering speed:</strong> {starship.maxAtmospheringSpeed}
                                </li>
                                <li className="mb-3">
                                    <strong>Hyperdrive rating:</strong> {starship.hyperdriveRating}
                                </li>
                                <li className="mb-3">
                                    <strong>MGLT:</strong> {starship.mglt}
                                </li>
                                <li className="mb-3">
                                    <strong>Cargo capacity:</strong> {starship.cargoCapacity}
                                </li>
                                <li className="mb-3">
                                    <strong>Consumables:</strong> {starship.consumables}
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="spinner-border text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="text-light mt-3">Loading starship details...</p>
                    </div>
                )}
            </div>
            <footer className="bg-dark text-center text-light py-3 mt-auto"></footer>
        </div>
    );
};


