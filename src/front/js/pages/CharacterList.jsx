import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const CharacterList = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.fetchCharacters();
    }, []);

    const isFavorite = (name) => {
        return store.favorites.some((fav) => fav.name === name);
    };

    return (
        <div className="container mt-3">
            <h1 className="text-light">Characters</h1>
            <div className="row">
                {store.characters.map((character, index) => (
                    <div key={index} className="col-12 col-md-4 mb-3">
                        <div className="card bg-dark text-light">
                            <div className="card-body">
                                <h5 className="card-title">{character.name}</h5>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button
                                        className="btn btn-secondary rounded"
                                        onClick={() => navigate(`/characters/${index}`)} // Puedes ajustar esta ruta
                                    >
                                        Details
                                    </button>
                                    <button
                                        className={`btn ${
                                            isFavorite(character.name)
                                                ? "btn-danger"
                                                : "btn-outline-danger"
                                        }`}
                                        onClick={() =>
                                            isFavorite(character.name)
                                                ? actions.removeFromFavorites(character.name)
                                                : actions.addToFavorites(character)
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


