import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const StarshipDetails = () => {
    const { uid } = useParams();
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchStarshipDetails(uid);
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
                            backgroundColor: "#343a40",
                            borderRadius: "10px",
                            padding: "20px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <div className="col-12 col-md-4 text-center">
                            <h1
                                className="text-light mb-3 text-start"
                                style={{
                                    fontSize: "2rem",
                                    marginLeft: "10px",
                                }}
                            >
                                {starship.name}
                            </h1>
                            <img
                                src={`https://starwars-visualguide.com/assets/img/starships/${uid}.jpg`}
                                className="img-fluid rounded"
                                alt={starship.name || "Starship"}
                                style={{
                                    maxHeight: "500px",
                                    objectFit: "cover",
                                    border: "2px solid #fff",
                                    borderRadius: "10px",
                                }}
                            />
                        </div>
                        <div className="col-12 col-md-8 text-light">
                            <ul
                                className="list-unstyled"
                                style={{
                                    marginTop: "40px",
                                    marginLeft: "20px",
                                }}
                            >
                                <li className="mb-3">
                                    <strong>Model:</strong> {starship.model}
                                </li>
                                <li className="mb-3">
                                    <strong>Manufacturer:</strong> {starship.manufacturer}
                                </li>
                                <li className="mb-3">
                                    <strong>Cost:</strong> {starship.cost_in_credits} credits
                                </li>
                                <li className="mb-3">
                                    <strong>Passengers:</strong> {starship.passengers}
                                </li>
                                <li className="mb-3">
                                    <strong>Cargo Capacity:</strong> {starship.cargo_capacity}
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
