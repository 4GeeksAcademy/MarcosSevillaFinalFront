import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-3">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
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
            <label className="form-label">Password</label>
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
        <p className="mt-3 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="btn btn-link p-0"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
