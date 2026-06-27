import { useState,useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import ArtworkDetails from './pages/ArtworkDetails';
import AboutTheArtist from './pages/AboutMe';
import AdminOrders from './pages/AdminOrders';
import AdminLogin from './pages/AdminLogin';
import Checkout from './pages/Checkout';
function App() {
  useEffect(()=>{
    const savedCart=localStorage.getItem("cartItems");
    if(savedCart){
      setCartItems(JSON.parse(savedCart));
    }
  },[])
  const [cartItems,setCartItems]=useState([]);
  console.log(cartItems);
  const addTocart=(artwork)=>{
    if(artwork.availability===false){
      alert("This artwork is sold and cannot be added to the cart.");
      return;
    }
    const existingItem=cartItems.find(
      (item)=>item.id===artwork.id
    );
    if(!existingItem){
      const updatedCart=[...cartItems,artwork];
      setCartItems(updatedCart);
      localStorage.setItem(
        "cartItems",
        JSON.stringify(updatedCart)
      )
      alert("Item added successfully")
    }
    else{
      alert("Item already added to Cart")
    }
  }
  const removeFromCart=(id)=>{
    const updatedCart=cartItems.filter(
      (item)=>item.id!==id
    );
    setCartItems(updatedCart);
    localStorage.setItem(
      "cartItems",
      JSON.stringify(updatedCart)
    )
  };
  return (
    
    <div className="App">
      
      <BrowserRouter>
      <div className='d-flex flex-column min-vh-100'>
      <Navbar cartItems={cartItems}/>
      <main className='flex-grow-1'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/gallery" element={<Gallery/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/artwork/:id" element={<ArtworkDetails addToCart={addTocart}/>}/>
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart}/>}/>
        <Route path="/abouttheartist" element={<AboutTheArtist/>}/>
        <Route path="/adminorders" element={<AdminOrders/>}/>
        <Route path="/adminlogin" element={<AdminLogin/>}/>
        <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems}/>}/>
      </Routes>
      </main> 
      <Footer/>
      </div>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
