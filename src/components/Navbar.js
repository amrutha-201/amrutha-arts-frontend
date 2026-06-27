import React from "react";
import { Link } from "react-router-dom";
function Navbar({cartItems}){
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/">
                    Amrutha Arts
                </a>
                <div className="navbar-nav ms-auto">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/gallery">Gallery</Link>
                    <Link className="nav-link" to="/contact">Custom Orders</Link>
                    <Link className="nav-link" to="/cart">🛒Cart({cartItems?.length || 0})</Link>
                    <Link className="nav-link" to="/abouttheartist">About The Artist</Link>
                    <Link className="nav-link" to="/adminlogin">Admin Login</Link>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;