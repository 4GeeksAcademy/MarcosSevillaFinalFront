import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Inicialización del contexto
export const Context = React.createContext(null);

// Wrapper para inyectar el contexto en los componentes
const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        // Inicialización del estado usando `getState`
        const [state, setState] = useState(() => {
            const initialState = getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updatedStore) =>
                    setState((prevState) => ({
                        store: { ...prevState.store, ...updatedStore },
                        actions: { ...prevState.actions },
                    })),
            });
            return initialState;
        });

        // Llama a `fetchContacts` al montar el componente
        useEffect(() => {
            if (state.actions && typeof state.actions.fetchContacts === "function") {
                state.actions.fetchContacts();
            } else {
                console.error("fetchContacts is not defined or not a function in actions");
            }
        }, [state.actions]);

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };

    return StoreWrapper;
};

export default injectContext;




