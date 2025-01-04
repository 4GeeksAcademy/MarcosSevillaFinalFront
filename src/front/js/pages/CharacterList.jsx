import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const CharacterList = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.fetchCharacters(); // Obtener todos los personajes
    }, []);

    const isFavorite = (name) => {
        return store.favorites.some((fav) => fav.name === name);
    };

    return (
        <div className="container mt-3">
            <h1 className="text-light text-center mb-4">Characters</h1>
            <div className="row">
                {store.characters.map((character, index) => (
                    <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div className="card bg-dark text-light h-100">
                            <img
                                src={
                                    character.image ||
                                    "https://via.placeholder.com/300x200?text=Character+Image"
                                }
                                className="card-img-top"
                                alt={character.name}
                                style={{ height: "300px", objectFit: "cover" }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title mb-3">{character.name}</h5>
                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                    <button
                                        className="btn btn-secondary rounded"
                                        onClick={() => navigate(`/characters/${character.uid}`)}
                                    >
                                        Details
                                    </button>
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() =>
                                            isFavorite(character.name)
                                                ? actions.removeFromFavorites(character.name)
                                                : actions.addToFavorites(character)
                                        }
                                    >
                                        <i
                                            className={`fas fa-heart ${
                                                isFavorite(character.name) ? "text-warning" : ""
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





