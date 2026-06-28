import { useParams } from "react-router-dom";
import {useEffect,useState} from'react';
import axios from"axios";

function ArtworkDetails({addToCart}) {
  const { id } = useParams();
  const[artwork,setArtwork]=useState(null);
  
  const avail=(artwork)=>{
    return artwork.availability?<h4 style={{color:"green"}}>✅ Available</h4>:<h4 style={{color:"red"}}>❌ Sold</h4>
  }
  useEffect(() => {
    axios
      .get("https://amrutha-arts-backend.onrender.com/artworks")
      .then((response) => {
        const foundArtwork = response.data.find(
          (art) => art.id === Number(id)
        );

        setArtwork(foundArtwork);
      });
  }, [id]);

  if (!artwork) {
    return <h3>Loading...</h3>;
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="img-fluid"
          />
        </div>
        <div className="col-md-6">
          <h1>{artwork.title}</h1>
          <h3>{artwork.medium}</h3>
          <h3>₹{artwork.price}</h3>
          <p>{artwork.description}</p>
          {avail(artwork)}
          <button className="btn btn-primary btn-lg" onClick={()=>addToCart(artwork)}
            >Add To Cart</button>
        </div>
      </div>
    </div>
  );
}
export default ArtworkDetails;
