import React from "react";
import { Link } from "react-router-dom";
function ArtworkCard({artwork,onSelect}){
    return(
    <div className="card m-3" style={{width:"18rem"}}>
        <Link to={`/artwork/${artwork.id}`}>
        <img 
            src={artwork.image}
            className="card-img-top"
            alt={artwork.title}
            style={{
                height:"400px",
                objectFit:"contain",
                justifyContent:"center"
            } 
            }  
        />
        </Link>
        <div className="card-body">
            <h5 className="card-title">{artwork.title}</h5>
            
        </div>
    </div>
    );
}
export default ArtworkCard;
