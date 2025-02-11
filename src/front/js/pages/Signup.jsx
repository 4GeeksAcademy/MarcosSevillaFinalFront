import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // ✅ Importar los iconos

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // ✅ Estado para mostrar/ocultar contraseña

    const handleSubmitAdd = (event) => {
        event.preventDefault();
        const dataToSend = {
            first_name: firstName,
            last_name: lastName,
            phone,
            email,
            password
        };
        actions.signup(dataToSend);
        navigate("/login");
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

                    <h2 className="text-center mb-1 text-light">Crea tu cuenta</h2>

                    {store.alert.visible && (
                        <div className={`alert alert-${store.alert.background}`} role="alert">
                            {store.alert.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmitAdd}>
                        <div className="mb-3">
                            <label className="form-label text-light">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                onChange={(event) => setFirstName(event.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-light">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                onChange={(event) => setLastName(event.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-light">Email (Usuario)</label>
                            <input
                                type="email"
                                name="email"
                                onChange={(event) => setEmail(event.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3 position-relative">
                            <label className="form-label text-light">Password</label>
                            <input
                                type={showPassword ? "text" : "password"} // ✅ Mostrar u ocultar contraseña
                                name="password"
                                onChange={(event) => setPassword(event.target.value)}
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
                        <button type="submit" className="btn btn-primary w-100">Registrate</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;












