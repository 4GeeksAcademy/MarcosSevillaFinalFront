import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // ✅ Definir correctamente `dataToSend`
        const dataToSend = {
            email: formData.email,
            password: formData.password
        };
        await actions.login(dataToSend);
        if (store.isLogged) {
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100 bg-dark text-light">
            <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                <div className="card shadow p-4 bg-secondary" style={{ width: "400px" }}>
                    
                    {/* ✅ Agregar el logo de Star Wars encima del título */}
                    <div className="text-center mb-3">
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg" 
                            alt="Star Wars Logo"
                            style={{ width: "150px" }} 
                        />
                    </div>

                    <h2 className="text-center mb-1 text-light">Bienvenido!</h2>
                    
                    {/* ✅ Agregar el subtítulo "Accede a tu cuenta" */}
                    <h5 className="text-center text-light mb-3">Accede a tu cuenta</h5>

                    {/* ✅ Alerta global usando `actions.setAlert` */}
                    {store.alert.visible && (
                        <div className={`alert alert-${store.alert.background}`} role="alert">
                            {store.alert.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label text-light">Introduce tu Usuario</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="mb-3 position-relative">
                            <label className="form-label text-light">Introduce tu Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-light position-absolute end-0 top-50 translate-middle-y me-2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Iniciar sesion</button>
                    </form>
                </div>
            </div>
        </div>
    );
};








