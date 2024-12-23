import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container d-flex justify-content-between">
                <div className="navbar-brand"></div>
                <div className="ml-auto">
                    {location.pathname === "/" && (
                        <Link to="/add-contact">
                            <button className="btn btn-success">Add New Contact</button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};





