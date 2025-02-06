import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? "Logging in..." : "Signing up...", formData);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-light">
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="card shadow p-4 bg-secondary" style={{ width: "400px" }}>
          <h2 className="text-center mb-3 text-light">{isLogin ? "Login" : "Sign Up"}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="mb-3">
                  <label className="form-label text-light">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-light">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </>
            )}
            <div className="mb-3">
              <label className="form-label text-light">Email</label>
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
              <label className="form-label text-light">Password</label>
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
            <button type="submit" className="btn btn-primary w-100">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <p className="mt-3 text-center text-light">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              className="btn btn-link p-0 text-light"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
      {/* Footer fijo en la parte inferior */}
      <footer className="bg-black text-center text-light py-3">
        © 2024 Star Wars Project - All Rights Reserved
      </footer>
    </div>
  );
};

export default Signup;




