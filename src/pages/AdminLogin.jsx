import React,{useState} from'react';
import {useNavigate} from "react-router-dom";
function AdminLogin(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const handleLogin=(e)=>{
        e.preventDefault();
        if(username==='admin'&&password==='admin123'){
                localStorage.setItem("isAdmin","true");
                navigate("/adminorders");
        }
        else{
            alert("Invalid Credentials");
        }
    };
    return(
        <div className='container mt-5'>
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div className='mb-3'>
                    <input
                        type="text"
                        className='form-control'
                        placeholder='username'
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <input
                    type="password"
                        className='form-control'
                        placeholder='password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <button
                    className='btn btn-primary'
                    type="submit"
                >Login</button>
            </form>
        </div>
    )
}
export default AdminLogin;