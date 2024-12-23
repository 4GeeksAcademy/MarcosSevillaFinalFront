import React from "react";
import ReactDOM from "react-dom";
import "../styles/index.css";
import injectContext from "./store/appContext"; // Importa injectContext
import Layout from "./Layout.jsx";

const LayoutWithContext = injectContext(Layout); // Envuelve Layout con el contexto

ReactDOM.render(<LayoutWithContext />, document.querySelector("#app"));


