import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Inicialización del contexto
export const Context = React.createContext(null);

// Wrapper para inyectar el contexto en los componentes
const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {        
        const [state, setState] = useState(
                getState({
                  getStore: () => state.store,
                  getActions: () => state.actions,
                  setStore: updatedStore => setState({
                    store: Object.assign(state.store, updatedStore),
                    actions: { ...state.actions }
                  })              
                })

        );

        useEffect(() => {
            // Llama a `fetchContacts` al montar el componente
                state.actions.fetchContacts();
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




