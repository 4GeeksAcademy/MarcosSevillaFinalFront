const getState = ({ getStore, getActions, setStore }) => {
    const swapiBaseURL = "https://www.swapi.tech/api/";
    const apiBaseURL = "https://playground.4geeks.com/contact";
    const agendaEndpoint = `${apiBaseURL}/agendas/AgendaMarcosSevilla`;
    const contactsEndpoint = `${agendaEndpoint}/contacts`;

    // Generar URL de imagen aleatoria
    const generateRandomImage = () => {
        const gender = Math.random() > 0.5 ? "men" : "women"; // Alterna entre hombres y mujeres
        const id = Math.floor(Math.random() * 99); // Genera un número aleatorio entre 0 y 99
        return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
    };

    return {
        store: {
            contacts: [],
            favorites: [], // Lista de favoritos
            characters: [],
            planets: [],
            starships: [],
        },
        actions: { 
            deleteContact: async (id) => {
                // Eliminar un contacto (DELETE)
                try {
                    const response = await fetch(`${contactsEndpoint}/${id}`, {
                        method: "DELETE",
                        headers: { Accept: "application/json" },
                    });
                    if (!response.ok) throw new Error(`Error deleting contact: ${response.statusText}`);

                    console.log(`Contact with ID ${id} deleted successfully`);

                    // Actualiza la lista de contactos después de eliminar
                    await getActions().fetchContacts();
                    return true; // Indica que la eliminación fue exitosa
                } catch (error) {
                    console.error("Error deleting contact:", error);
                    return false; // Indica que hubo un error
                }
            },
            fetchContacts: async () => {
                // Obtener la lista de contactos (GET)
                try {
                    const response = await fetch(agendaEndpoint, {
                        method: "GET",
                        headers: { Accept: "application/json" },
                    });
                    if (!response.ok) throw new Error(`Error fetching contacts: ${response.statusText}`);
                    const data = await response.json();

                    // Agregar imágenes aleatorias a cada contacto
                    const contactsWithImages = data.contacts.map((contact) => ({
                        ...contact,
                        image: generateRandomImage(), // Asignar imagen aleatoria
                    }));
                    setStore({ contacts: contactsWithImages });
                } catch (error) {
                    console.error("Error fetching contacts:", error);
                }
            },
            createContact: async (contact) => {
                // Crear un nuevo contacto (POST)
                try {
                    const response = await fetch(contactsEndpoint, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            ...contact,
                            agenda_slug: "AgendaMarcosSevilla",
                        }),
                    });
                    if (!response.ok) throw new Error(`Error creating contact: ${response.statusText}`);
                    console.log("Contact created successfully");
                    await getActions().fetchContacts();
                    return true;
                } catch (error) {
                    console.error("Error creating contact:", error);
                    return false;
                }
            },
            updateContact: async (id, updatedData) => {
                // Actualizar un contacto existente (PUT)
                try {
                    const response = await fetch(`${contactsEndpoint}/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedData),
                    });
                    if (!response.ok) throw new Error(`Error updating contact: ${response.statusText}`);
                    console.log("Contact updated successfully");
                    await getActions().fetchContacts();
                    return true;
                } catch (error) {
                    console.error("Error updating contact:", error);
                    return false;
                }
            },
            fetchCharacters: async () => {
                // Fetch Characters
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



















