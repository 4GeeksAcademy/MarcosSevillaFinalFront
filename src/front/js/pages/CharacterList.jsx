import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const CharacterList = () => {
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
            actions.setAlert({ text: "", background: "primary", visible: false }); // ✅ Limpia alertas al entrar
            actions.fetchCharacters(page);
        }
    }, [page]);

    return (
        <div className="container mt-3">
            <h1 className="text-light text-center mb-4">Characters</h1>

            {store.characters && store.characters.length > 0 ? (
                <div className="row">
                    {store.characters.map((character, index) => (
                        <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div className="card bg-dark text-light h-100">
                                <img
                                    src={character.image || "https://th.bing.com/th?id=OIP.OSH1MmFY_yI9RZ0lVG_lfgHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"}
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
                                        { store.favorites.find((element) => character.name === element.name ) ?
                                            <span
                                                className='btn btn-warning'
                                                onClick={() => actions.removeFromFavorites(character.name)}
                                            >
                                                <i className="fas fa-heart text-dark"></i>
                                            </span>
                                            :
                                            <span
                                                className='btn btn-outline-warning'
                                                onClick={() => actions.addToFavorites(character)}
                                            >
                                                <i className="fas fa-heart"></i>
                                            </span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-light text-center">Loading characters...</p>
            )}

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


