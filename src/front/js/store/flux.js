import { element } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
    const swapiBaseURL = "https://www.swapi.tech/api/";
    const apiBaseURL = "https://playground.4geeks.com/contact";
    const agendaEndpoint = `${apiBaseURL}/agendas/AgendaMarcosSevilla`;
    const contactsEndpoint = `${agendaEndpoint}/contacts`;
    const charactersEndpoint = `${swapiBaseURL}people`;
    const planetsEndpoint = `${swapiBaseURL}planets`;
    const starshipsEndpoint = `${swapiBaseURL}starships`;
    const defaultImage = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
    // URL de imagen por defecto
    const getImageOrDefault = async (url) => {
        // Función para verificar si una imagen existe
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
            createContact: async (contact) => {
                // Crear contacto
                try {
                    const response = await fetch(contactsEndpoint, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ ...contact, agenda_slug: "AgendaMarcosSevilla" }), // Incluye agenda_slug
                    });
                    if (!response.ok) {
                        console.error(`Error creating contact: ${response.statusText}`);
                        return false;
                    }
                    await getActions().fetchContacts();
                    // Actualizar la lista de contactos
                    return true;
                } catch (error) {
                    console.error("Error creating contact:", error);
                    return false;
                }
            },
            updateContact: async (id, updatedData) => {
                // Actualizar contacto
                try {
                    const response = await fetch(`${contactsEndpoint}/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedData),
                    });
                    if (!response.ok) {
                        console.error(`Error updating contact: ${response.statusText}`);
                        return false;
                    }
                    await getActions().fetchContacts();
                    // Actualizar la lista de contactos
                    return true;
                } catch (error) {
                    console.error("Error updating contact:", error);
                    return false;
                }
            },
            deleteContact: async (id) => {
                // Eliminar contacto
                try {
                    const response = await fetch(`${contactsEndpoint}/${id}`, {
                        method: "DELETE",
                    });
                    if (!response.ok) throw new Error(`Error deleting contact: ${response.statusText}`);
                    await getActions().fetchContacts();
                    return true;
                } catch (error) {
                    console.error("Error deleting contact:", error);
                    return false;
                }
            },
            fetchCharacters: async (page = 1) => {
                // Obtener todos los personajes
                const endpoint = `${charactersEndpoint}?page=${page}&limit=10`; // Paginación
                try {
                    const response = await fetch(endpoint);
                    if (!response.ok) throw new Error(`Error fetching characters: ${response.statusText}`);
                    const data = await response.json();
                    
                    localStorage.setItem('localCharacters', JSON.stringify(data.results));
                    // Almacenar los datos en localStorage

                    const charactersWithImages = await Promise.all(
                        // Verificar imágenes y agregar predeterminada si es necesario
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
            fetchCharacterDetails: async (uid) => {
                // Obtener detalles de un personaje
                try {
                    const response = await fetch(`${charactersEndpoint}/${uid}`);
                    if (!response.ok) throw new Error(`Error fetching character details: ${response.statusText}`);
                    const data = await response.json();

                    setStore({ selectedCharacter: data.result.properties });
                } catch (error) {
                    console.error("Error fetching character details:", error);
                }
            },
            fetchPlanets: async (page = 1) => {
                // Obtener todos los planetas
                const endpoint = `${planetsEndpoint}?page=${page}&limit=10`; // Paginación
                try {
                    const response = await fetch(endpoint);
                    if (!response.ok) throw new Error(`Error fetching planets: ${response.statusText}`);
                    const data = await response.json();
                    
                    localStorage.setItem('localPlanets', JSON.stringify(data.results));
                    // Almacenar los datos en localStorage

                    const planetsWithImages = await Promise.all(
                        // Verificar imágenes y agregar predeterminada si es necesario
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
            fetchPlanetDetails: async (uid) => {
                // Obtener detalles de un planeta
                try {
                    const response = await fetch(`${planetsEndpoint}/${uid}`);
                    if (!response.ok) throw new Error(`Error fetching planet details: ${response.statusText}`);
                    const data = await response.json();
                    setStore({ selectedPlanet: data.result.properties });
                } catch (error) {
                    console.error("Error fetching planet details:", error);
                }
            },
            fetchStarships: async (page = 1) => {
                // Obtener todas las naves espaciales
                const endpoint = `${starshipsEndpoint}?page=${page}&limit=10`; // Paginación
                try {
                    const response = await fetch(endpoint);
                    if (!response.ok) throw new Error(`Error fetching starships: ${response.statusText}`);
                    const data = await response.json();

                    localStorage.setItem('localStarships', JSON.stringify(data.results));
                    // Almacenar los datos en localStorage
                    
                    const starshipsWithImages = await Promise.all(
                        // Verificar imágenes y agregar predeterminada si es necesario
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
            fetchStarshipDetails: async (uid) => {
                // Obtener detalles de una nave espacial
                try {
                    const response = await fetch(`${starshipsEndpoint}/${uid}`);
                    if (!response.ok) throw new Error(`Error fetching starship details: ${response.statusText}`);
                    const data = await response.json();
                    setStore({ selectedStarship: data.result.properties });
                } catch (error) {
                    console.error("Error fetching starship details:", error);
                }
            },
            addToFavorites: (item) => {
                const exist = getStore().favorites.find(element => element == item);
                if (exist == undefined) {
                    setStore({favorites : [...getStore().favorites, item] });
                };
             
            },
            removeFromFavorites: (name) => {
                // Eliminar de favoritos
                const store = getStore();
                setStore({ favorites: store.favorites.filter((fav) => fav.name !== name) });
            },
        },
    };
};

export default getState;