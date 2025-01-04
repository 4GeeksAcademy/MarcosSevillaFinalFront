const getState = ({ getStore, getActions, setStore }) => {
    const swapiBaseURL = "https://www.swapi.tech/api/";
    const apiBaseURL = "https://playground.4geeks.com/contact";
    const agendaEndpoint = `${apiBaseURL}/agendas/AgendaMarcosSevilla`;
    const contactsEndpoint = `${agendaEndpoint}/contacts`;
    const charactersEndpoint = `${swapiBaseURL}people`;
    const planetsEndpoint = `${swapiBaseURL}planets`;

    return {
        store: {
            contacts: [],
            favorites: [], // Lista de favoritos
            characters: [], // Lista de personajes
            selectedCharacter: null, // Detalles del personaje seleccionado
            planets: [], // Lista de planetas
            selectedPlanet: null, // Detalles del planeta seleccionado
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

            // Crear contacto
            createContact: async (contact) => {
                try {
                    const response = await fetch(contactsEndpoint, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ ...contact, agenda_slug: "AgendaMarcosSevilla" }),
                    });
                    if (!response.ok) throw new Error(`Error creating contact: ${response.statusText}`);
                    await getActions().fetchContacts();
                } catch (error) {
                    console.error("Error creating contact:", error);
                }
            },

            // Actualizar contacto
            updateContact: async (id, updatedData) => {
                try {
                    const response = await fetch(`${contactsEndpoint}/${id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedData),
                    });
                    if (!response.ok) throw new Error(`Error updating contact: ${response.statusText}`);
                    await getActions().fetchContacts();
                } catch (error) {
                    console.error("Error updating contact:", error);
                }
            },

            // Eliminar contacto
            deleteContact: async (id) => {
                try {
                    const response = await fetch(`${contactsEndpoint}/${id}`, { method: "DELETE" });
                    if (!response.ok) throw new Error(`Error deleting contact: ${response.statusText}`);
                    await getActions().fetchContacts();
                } catch (error) {
                    console.error("Error deleting contact:", error);
                }
            },

            // Obtener todos los personajes
            fetchCharacters: async (page = 1) => {
                const endpoint = `${charactersEndpoint}?page=${page}&limit=10`; // Paginación
                try {
                    const response = await fetch(endpoint);
                    if (!response.ok) throw new Error(`Error fetching characters: ${response.statusText}`);
                    const data = await response.json();

                    setStore({
                        characters: data.results.map((character) => ({
                            ...character,
                            image: `https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`,
                        })),
                    });
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

                    setStore({ selectedCharacter: data.result.properties }); // Guardar detalles del personaje
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

                    setStore({
                        planets: data.results.map((planet) => ({
                            ...planet,
                            image: `https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`,
                        })),
                    });
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

                    setStore({ selectedPlanet: data.result.properties }); // Guardar detalles del planeta
                } catch (error) {
                    console.error("Error fetching planet details:", error);
                }
            },

            // Añadir a favoritos
            addToFavorites: (item) => {
                const store = getStore();

                // Verificar si el elemento ya está en favoritos
                const isFavorite = store.favorites.some((fav) => fav.name === item.name);

                if (!isFavorite) {
                    setStore({
                        favorites: [...store.favorites, item], // Agrega el nuevo favorito al array existente
                    });
                }
            },

            removeFromFavorites: (name) => {
                const store = getStore();

                // Filtrar favoritos para eliminar el seleccionado
                const updatedFavorites = store.favorites.filter((fav) => fav.name !== name);

                setStore({
                    favorites: updatedFavorites, // Actualiza el array de favoritos eliminando el seleccionado
                });
            },
        },
    };
};

export default getState;
























