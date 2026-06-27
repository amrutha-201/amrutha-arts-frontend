import axios from "axios";
import ArtworkCard from "../components/ArtworkCard";
import React,{useState,useEffect} from "react";
function Gallery(){
  const[searchTerm,setSearchTerm]=useState("");
  const[artworks,setArtworks]=useState([]);
  const filteredArtworks=artworks.filter((artwork)=>
    artwork.title.toLowerCase().includes(searchTerm.toLowerCase())||artwork.medium.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(()=>{
    axios
    .get("http://localhost:5000/artworks")
    .then((response)=>{
      setArtworks(response.data);
    })
    .catch((error)=>{
      console.log(error);
    });
  },[]);
    return(
        <div className="container">
            <div className="container my-4">
              <input
                type="text"
                
                placeholder="Search artworks"
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
              />
            </div>
            <h1 className="text-center my-4">My Art Gallery</h1>
            <div className='d-flex flex-wrap justify-content-center'>
            {filteredArtworks.length===0?(
              <h4>No artworks found</h4>
            ):(
              filteredArtworks.map((artwork)=>(
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  
                />
              ))
            )}

        </div>
        </div>
    );
}
export default Gallery