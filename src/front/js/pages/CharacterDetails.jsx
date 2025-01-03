import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CharacterDetails = () => {
    const { uid } = useParams(); // Obtener el ID del personaje desde la URL
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchCharacterDetails(uid); // Obtener los detalles del personaje
    }, [uid]);

    const character = store.selectedCharacter;

    return (
        <div
            className="container-fluid d-flex flex-column justify-content-between"
            style={{ minHeight: "100vh" }}
        >
            <div className="container mt-5 mb-5">
                {character ? (
                    <div
                        className="row justify-content-center align-items-start"
                        style={{
                            backgroundColor: "#343a40", // Fondo oscuro diferente
                            borderRadius: "10px",
                            padding: "20px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        {/* Imagen y nombre del personaje */}
                        <div className="col-12 col-md-4 text-center">
                            <h1
                                className="text-light mb-3 text-start"
                                style={{
                                    fontSize: "2rem",
                                    marginLeft: "10px", // Mover el texto más a la izquierda
                                }}
                            >
                                {character.name}
                            </h1>
                            <img
                                src={`https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`}
                                className="img-fluid rounded"
                                alt={character.name || "Character"}
                                style={{
                                    maxHeight: "500px",
                                    objectFit: "cover",
                                    border: "2px solid #fff",
                                    borderRadius: "10px",
                                }}
                            />
                        </div>
                        {/* Detalles del personaje */}
                        <div className="col-12 col-md-8 text-light">
                            <ul
                                className="list-unstyled"
                                style={{
                                    marginTop: "40px", // Añade espacio superior para que los detalles estén más abajo
                                    marginLeft: "20px", // Más separación entre foto y detalles
                                }}
                            >
                                <li className="mb-3">
                                    <strong>Height:</strong> {character.height} cm
                                </li>
                                <li className="mb-3">
                                    <strong>Mass:</strong> {character.mass} kg
                                </li>
                                <li className="mb-3">
                                    <strong>Hair color:</strong> {character.hair_color}
                                </li>
                                <li className="mb-3">
                                    <strong>Skin color:</strong> {character.skin_color}
                                </li>
                                <li className="mb-3">
                                    <strong>Eye color:</strong> {character.eye_color}
                                </li>
                                <li className="mb-3">
                                    <strong>Birth year:</strong> {character.birth_year}
                                </li>
                                <li className="mb-3">
                                    <strong>Gender:</strong> {character.gender}
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="spinner-border text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="text-light mt-3">Loading character details...</p>
                    </div>
                )}
            </div>
            <footer className="bg-dark text-center text-light py-3 mt-auto">
                <p className="mb-0">Star Wars API - Powered by SWAPI</p>
            </footer>
        </div>
    );
};





