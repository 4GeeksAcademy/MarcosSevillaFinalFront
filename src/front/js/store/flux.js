const getState = ({ getStore, getActions, setStore }) => {
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
        },
        actions: {
            // Eliminar un contacto (DELETE)
            deleteContact: async (id) => {
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

            // Obtener la lista de contactos (GET)
            fetchContacts: async () => {
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

            // Crear un nuevo contacto (POST)
            createContact: async (contact) => {
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

            // Actualizar un contacto existente (PUT)
            updateContact: async (id, updatedData) => {
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
        },
    };
};

export default getState;













