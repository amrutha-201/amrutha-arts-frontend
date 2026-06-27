import React from "react";
import { Link } from "react-router-dom";
function Cart({cartItems,removeFromCart}){
    const Price=cartItems.reduce((accumulator,artwork)=>{
      return accumulator+artwork.price;
    },0);
    const Items=cartItems.length;
    const DeliveryCharge=cartItems.length*100;
    const TotalPrice=Price+DeliveryCharge;
    if (cartItems.length === 0) {
  return (
    <div className="container text-center mt-5">
      <h2>🛒 Your Cart is Empty</h2>
      <p>Add some artworks from the gallery.</p>

      <Link
        to="/gallery"
        className="btn btn-primary"
      >
        Browse Gallery
      </Link>
    </div>
  );
}
    return (
      <div className="row">
    <div className="d-flex flex-wrap col-md-8 ">
      {cartItems.map((artwork) => (
        <div key={artwork.id} className="card m-3">
          <img
            src={artwork.image}
            alt={artwork.title}
            style={{
              height: "300px",
              objectFit: "contain"
            }}
          />
          <h5>{artwork.title}</h5>
          <p>₹{artwork.price}</p>
          <button className="btn btn-danger" onClick={()=>removeFromCart(artwork.id)}>Remove</button>
        </div>
      ))}
    </div>
    <div className="col-md-4 mt-5 ">
      <h5>Cart Summary</h5>
      <h6>----------------------------------------</h6>
      <h5>Price ({Items} Items) = ₹{Price}</h5>
      <h5>Delivery Charge = ₹{DeliveryCharge}</h5>
      <h3>Total Price = ₹{TotalPrice}</h3>
      <Link
      to="/checkout"
      className="btn btn-success"
    >Proceed to checkout</Link>
    </div>
    </div>
    )
}
export default Cart;