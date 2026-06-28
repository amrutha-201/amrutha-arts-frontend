import React,{useState,useEffect} from'react';
import {Navigate} from "react-router-dom";
import axios from'axios';
function AdminOrders(){
    const[orders,setOrders]=useState([]);
    const[paintingOrders,setPaintingOrders]=useState([]);
    const [artworks, setArtworks] = useState([]);
    const deleteOrder=async(id)=>{
        try{
        await axios.delete(`http://localhost:5000/customorders/${id}`)
        setOrders(
            orders.filter((order)=>order._id!==id)
        );
        alert("Order deleted successfully")
    }
    catch(error){
        console.log(error)
        alert("Failed to delete order");
    }
    }
    const deletePaintingOrder = async (id) => {
    try {
    await axios.delete(
      `http://localhost:5000/paintingorders/${id}`
    );
    setPaintingOrders(
      paintingOrders.filter(
        (order) => order._id !== id
      )
    );
    alert("Painting order deleted successfully");
    } catch (error) {
    console.log(error);
    alert("Failed to delete painting order");
    }
    };
    const UpdateStatus=async(id,status)=>{
        try{
            const response=await axios.put(
                `http://localhost:5000/customorders/${id}`,
                {status}
            );
            setOrders(
                orders.map((order)=>
                    order._id===id?response.data:order
            )
        );
        }
        catch(error){
            console.log(error);
            alert("failed to update status")
        }
    };
    const updatePaintingStatus = async (id, status) => {
    try {
    const response = await axios.put(
      `http://localhost:5000/paintingorders/${id}`,
      { status }
    );
    setPaintingOrders(
      paintingOrders.map((order) =>
        order._id === id ? response.data : order
      )
    );
    } catch (error) {
    console.log(error);
    alert("Failed to update painting order");
    }
    };
    const updateAvailability = async (id, availability) => {
    try {
    const response = await axios.put(
      `http://localhost:5000/artworks/${id}`,
      { availability }
    );
    setArtworks(
      artworks.map((artwork) =>
        artwork._id === id
          ? response.data
          : artwork
      )
    );
    } catch (error) {
    console.log(error);
    }
    };
    useEffect(()=>{
        axios
        .get('http://localhost:5000/customorders')
        .then((response)=>{
            setOrders(response.data)
        })
        .catch((error)=>{
            console.log(error);
        });
        axios
        .get("http://localhost:5000/paintingorders")
        .then((response)=>{
            setPaintingOrders(response.data);
        })
        .catch((error)=>{
            console.log(error);
        });
        axios.get("http://localhost:5000/artworks")
        .then((response) => {
        setArtworks(response.data);
        });
    },[]);
    if(localStorage.getItem("isAdmin")!=="true"){
        return <Navigate to="/adminlogin"/>;
    }
    const handleLogout=()=>{
        localStorage.removeItem("isAdmin");
        window.location.href="/";
    };
    return(
        <div className='container mt-4'>
            <h2>Custom Orders</h2>
            {orders.length===0?(
                <h4>No orders Found</h4>
            ):(
                orders.map((order,index)=>(
                    <div
                        key={index}
                        className='card p-3 my-3'
                    >
                    <h5>{order.name}</h5>
                    <p>Email:{order.mail}</p>
                    <p>Phone:{order.phoneNumber}</p>
                    <p>Medium:{order.medium}</p>
                    <p>Size:{order.size}</p>
                    <p>Frame:{order.frame}</p>
                    <p>
                        Specifications:{order.specifications}
                    </p>
                    <img
                        src={`http://localhost:5000/uploads/${order.photo}`}
                        alt="Reference"
                        style={{
                            width:"250px",
                            height:"250px",
                            objectFit:"cover"
                        }}
                    />
                    <p><strong>Status:</strong>{order.status}</p>
                    <button className='btn btn-warning me-2'
                    onClick={()=>UpdateStatus(order._id,"In Progress")}>In Progress</button>
                    <button
                        className="btn btn-success me-2"
                        onClick={() =>
                            UpdateStatus(order._id, "Completed")
                        }>Completed</button>
                    <button
                        className='btn btn-danger me-2'
                        onClick={()=>deleteOrder(order._id)}
                    >Delete Order</button>
                    </div>
                ))
            )}
            <h2 className='mt-5'>Painting Orders</h2>
            {paintingOrders.length===0?
                (<p>No Painting orders found</p>):
                (paintingOrders.map((order,index)=>(
                    <div key={order.id} className='card p-3 mb-3'>
                        <h5>Name:{order.customerName}</h5>
                        <p>Email:{order.email}</p>
                        <p>Phone: {order.phoneNumber}</p>
                        <p>Address: {order.address}</p>
                        <p><strong>Status:</strong>{" "}
                        {order.status}</p>
                        <h6>Items Ordered:</h6>
                        <ul>
                            {order.items.map((item, i) => (
                            <li key={i}>
                            {item.title || item.name}
                            </li>         
                        ))}
                        </ul>
                        <button
                            className="btn btn-success me-2"
                            onClick={() =>
                            updatePaintingStatus(order._id, "Completed")
                            }
                        >
                        Completed
                        </button>
                        <button
                            className="btn btn-danger mt-2"
                            onClick={() => deletePaintingOrder(order._id)}
                        >
                        Delete Order
                        </button>
                    </div>
                )))

            }
            <div>
                <h2>Artworks</h2>
                {artworks.map((artwork) => (
                <div key={artwork._id} className="mb-3 border p-2">
                <h5>{artwork.title}</h5>
                <p>
                Status:
                {artwork.availability ? " Available" : " Sold"}
                </p>
                <button
                    className="btn btn-success me-2"
                    onClick={() =>
                    updateAvailability(artwork._id, true)
                }
                >
                Available
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() =>
                    updateAvailability(artwork._id, false)
                }
                >
                Sold
                </button>
            </div>
            ))}
            </div>
            <button
                className="btn btn-danger mb-3"
                onClick={handleLogout}>Logout</button>
        </div>
    )
}
export default AdminOrders
