import React, { useState, useEffect } from "react"; // Asegúrate de importar React, useState y useEffect
import getState from "./flux.js";

// Inicialización del contexto
export const Context = React.createContext(null);

// Wrapper para inyectar el contexto en los componentes
const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        // Estado inicial usando `useState`
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updatedStore) =>
                    setState({
                        store: Object.assign(state.store, updatedStore),
                        actions: { ...state.actions },
                    }),
            })
        );

        // Similar a `componentDidMount`
        useEffect(() => {
            state.actions.fetchContacts(); // Asegúrate de que esta acción exista en `flux.js`
        }, []);

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };

    return StoreWrapper;
};

export default injectContext;


