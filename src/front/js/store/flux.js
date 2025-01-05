const getState = ({ getStore, getActions, setStore }) => {
    const swapiBaseURL = "https://www.swapi.tech/api/";
    const apiBaseURL = "https://playground.4geeks.com/contact";
    const agendaEndpoint = `${apiBaseURL}/agendas/AgendaMarcosSevilla`;
    const contactsEndpoint = `${agendaEndpoint}/contacts`;
    const charactersEndpoint = `${swapiBaseURL}people`;
    const planetsEndpoint = `${swapiBaseURL}planets`;
    const starshipsEndpoint = `${swapiBaseURL}starships`;

    // URL de imagen por defecto
    const defaultImage = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";

    // Función para verificar si una imagen existe
    const getImageOrDefault = async (url) => {
        try {
            const response = await fetch(url, { method: "HEAD" });
            return response.ok ? url : defaultImage;
        } catch {
            return defaultImage;
        }
    };

    return {
        store: {
            contacts: [],
            favorites: [], // Lista de favoritos
            characters: [], // Lista de personajes
            selectedCharacter: null, // Detalles del personaje seleccionado
            planets: [], // Lista de planetas
            selectedPlanet: null, // Detalles del planeta seleccionado
            starships: [], // Lista de naves espaciales
            selectedStarship: null, // Detalles de la nave seleccionada
        },
        actions: {
            // Obtener contactos
            fetchContacts: async () => {
                try {
                    const response = await fetch(contactsEndpoint);
                    if (!response.ok) throw new Error(`Error fetching contacts: ${response.statusText}`);
                    const data = await response.json();

                    setStore({
                        contacts: data.contacts.map((contact) => ({
                            ...contact,
                            image: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 99)}.jpg`,
                        })),
                    });
                } catch (error) {
                    console.error("Error fetching contacts:", error);
                }
            },

            // Obtener todos los personajes
            fetchCharacters: async (page = 1) => {
                const endpoint = `${charactersEndpoint}?page=${page}&limit=10`; // Paginación
                try {
                    const response = await fetch(endpoint);
                    if (!response.ok) throw new Error(`Error fetching characters: ${response.statusText}`);
                    const data = await response.json();

                    // Verificar imágenes y agregar predeterminada si es necesario
                    const charactersWithImages = await Promise.all(
                        data.results.map(async (character) => ({
                            ...character,
                            image: await getImageOrDefault(
                                `https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`
                            ),
                        }))
                    );

                    setStore({ characters: charactersWithImages });
                } catch (error) {
                    console.error("Error fetching characters:", error);
                }
            },

            // Obtener detalles de un personaje
            fetchCharacterDetails: async (uid) => {
                try {
                    const response = await fetch(`${charactersEndpoint}/${uid}`);
                    if (!response.ok) throw new Error(`Error fetching character details: ${response.statusText}`);
                    const data = await response.json();

                    setStore({ selectedCharacter: data.result.properties });
                } catch (error) {
                    console.error("Error fetching character details:", error);
                }
            },

            // Obtener todos los planetas
            fetchPlanets: async (page = 1) => {
                const endpoint = `${planetsEndpoint}?page=${page}&limit=10`; // Paginación
                try {
                    const response = await fetch(endpoint);
                    if (!response.ok) throw new Error(`Error fetching planets: ${response.statusText}`);
                    const data = await response.json();

                    // Verificar imágenes y agregar predeterminada si es necesario
                    const planetsWithImages = await Promise.all(
                        data.results.map(async (planet) => ({
                            ...planet,
                            image: await getImageOrDefault(
                                `https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`
                            ),
                        }))
                    );

                    setStore({ planets: planetsWithImages });
                } catch (error) {
                    console.error("Error fetching planets:", error);
                }
            },

            // Obtener detalles de un planeta
            fetchPlanetDetails: async (uid) => {
                try {
                    const response = await fetch(`${planetsEndpoint}/${uid}`);
                    if (!response.ok) throw new Error(`Error fetching planet details: ${response.statusText}`);
                    const data = await response.json();

                    setStore({ selectedPlanet: data.result.properties });
                } catch (error) {
                    console.error("Error fetching planet details:", error);
                }
            },

            // Obtener todas las naves espaciales
            fetchStarships: async (page = 1) => {
                const endpoint = `${starshipsEndpoint}?page=${page}&limit=10`; // Paginación
                try {
                    const response = await fetch(endpoint);
                    if (!response.ok) throw new Error(`Error fetching starships: ${response.statusText}`);
                    const data = await response.json();

                    // Verificar imágenes y agregar predeterminada si es necesario
                    const starshipsWithImages = await Promise.all(
                        data.results.map(async (starship) => ({
                            ...starship,
                            image: await getImageOrDefault(
                                `https://starwars-visualguide.com/assets/img/starships/${starship.uid}.jpg`
                            ),
                        }))
                    );

                    setStore({ starships: starshipsWithImages });
                } catch (error) {
                    console.error("Error fetching starships:", error);
                }
            },

            // Obtener detalles de una nave espacial
            fetchStarshipDetails: async (uid) => {
                try {
                    const response = await fetch(`${starshipsEndpoint}/${uid}`);
                    if (!response.ok) throw new Error(`Error fetching starship details: ${response.statusText}`);
                    const data = await response.json();

                    setStore({ selectedStarship: data.result.properties });
                } catch (error) {
                    console.error("Error fetching starship details:", error);
                }
            },

            // Añadir a favoritos
            addToFavorites: (item) => {
                const store = getStore();
                if (!store.favorites.some((fav) => fav.name === item.name)) {
                    setStore({ favorites: [...store.favorites, item] });
                }
            },

            // Eliminar de favoritos
            removeFromFavorites: (name) => {
                const store = getStore();
                setStore({ favorites: store.favorites.filter((fav) => fav.name !== name) });
            },
        },
    };
};

export default getState;


