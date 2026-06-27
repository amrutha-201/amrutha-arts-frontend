import React,{useState} from 'react';
import axios from "axios";
function Checkout({cartItems,setCartItems}){
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[phoneNumber,setPhoneNumber]=useState("");
    const[address,setAddress]=useState("");
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:5000/paintingorders",
            {
                customerName:name,
                email,
                phoneNumber,
                address,
                items:cartItems
            }
        );
        alert("Order placed Successfully");
        setCartItems([]);
        localStorage.removeItem("cartItems");
        }
        catch(error){
            console.log(error);
            alert("Failed to place order");
        }
    };
    return(
        <div className='container mt-4'>
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <input
                className='form-control mb-3'
                placeholder='Name'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                 <input
                className='form-control mb-3'
                placeholder='Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                className='form-control mb-3'
                placeholder='Phone Number'
                value={phoneNumber}
                onChange={(e)=>setPhoneNumber(e.target.value)}
                />
                <textarea
                    className='form-control mb-3'
                    placeholder='Address'
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                />
                <button
                    type="submit"
                    className='btn btn-primary'
                >Place order</button>
            </form>
        </div>
    )
}
export default Checkout;