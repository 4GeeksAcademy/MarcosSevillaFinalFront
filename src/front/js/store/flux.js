const getState = ({ getStore, getActions, setStore }) => {
    const swapiBaseURL = "https://www.swapi.tech/api/";

    return {
        store: {
            contacts: [],
            favorites: [], // Lista de favoritos
            characters: [],
            planets: [],
            starships: [],
        },
        actions: {
            // Fetch Characters
            fetchCharacters: async () => {
                try {
                    const response = await fetch(`${swapiBaseURL}people/`);
                    const data = await response.json();
                    setStore({ characters: data.results });
                } catch (error) {
                    console.error("Error fetching characters:", error);
                }
            },

            // Fetch Planets
            fetchPlanets: async () => {
                try {
                    const response = await fetch(`${swapiBaseURL}planets/`);
                    const data = await response.json();
                    setStore({ planets: data.results });
                } catch (error) {
                    console.error("Error fetching planets:", error);
                }
            },

            // Fetch Starships
            fetchStarships: async () => {
                try {
                    const response = await fetch(`${swapiBaseURL}starships/`);
                    const data = await response.json();
                    setStore({ starships: data.results });
                } catch (error) {
                    console.error("Error fetching starships:", error);
                }
            },

            // Add to Favorites
            addToFavorites: (item) => {
                const store = getStore();
                const favorites = store.favorites; // Obtener la lista actual de favoritos

                // Verificar si el elemento ya está en favoritos
                const isFavorite = favorites.some((fav) => fav.name === item.name);
                if (!isFavorite) {
                    setStore({
                        favorites: [...favorites, item], // Añadir el nuevo favorito sin sobrescribir
                    });
                }
            },

            // Remove from Favorites
            removeFromFavorites: (name) => {
                const store = getStore();
                const updatedFavorites = store.favorites.filter((fav) => fav.name !== name);
                setStore({
                    favorites: updatedFavorites, // Actualizar favoritos eliminando el seleccionado
                });
            },
        },
    };
};

export default getState;



















