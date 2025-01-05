import React from "react";

export const HomePage = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-light">
            <div className="text-center mb-5"> {/* Agregamos margen inferior con mb-5 */}
                <img
                    src="https://starwars.chocobar.net/star-wars-back0.jpg"
                    alt="Star Wars"
                    className="img-fluid"
                    style={{
                        maxWidth: "90%", // Limita el ancho máximo al 90% del contenedor
                        height: "auto", // Mantiene la proporción de la imagen
                        margin: "20px 0", // Márgenes arriba y abajo
                    }}
                />
            </div>
        </div>
    );
};


