import React from "react";
import { Link } from "react-router-dom";
function Hero(){
    return(
        <div className="container text-center my-5">
            <h1>Amrutha Arts</h1>
            <p className="lead">
                Handmade Pencil Sketches & Poster Color Paintings
            </p>
            <Link to="/gallery" className="btn btn-primary bt-lg">Explore Gallery</Link>
        </div>
    );
}
export default Hero;