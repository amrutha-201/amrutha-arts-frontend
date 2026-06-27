/*import React,{useState} from 'react';
function Contact(){
    const [name,setName]=useState('');
    const [email,setEmail]=useState("");
    const [message,setMessage]=useState("");
    const [PhoneNumber,setPhoneNumber]=useState("");
    const handlesubmit=(event)=>{
        event.preventDefault();
        if(!name||!email||!message){
            alert("Please fill out all fields");
            return;
        }
        alert(
            `Name:${name}\nEmail:${email}\nMessage:${message}`
        );
        setName("");
        setEmail("");
        setMessage("");
    };
    return(
        <div className='container mt-5'>
            <h1 className='text-center mb-4'>Contact Me</h1>
            <form onSubmit={handlesubmit}>
                <div className='mb-3'>
                    <label className='form-label'>
                        Name   &nbsp;
                    </label>
                    <input
                        type="text"
                        
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>
                        Email  &nbsp;
                    </label>
                    <input
                        type="email"  
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>
                        PhoneNumber  &nbsp;
                    </label>
                    <input
                        type="tel"  
                        value={PhoneNumber}
                        maxLength={10}
                        onChange={(e)=>setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>
                        Select medium&nbsp;&nbsp;
                    </label>
                    <select >
                        <option>Pencil Sketch</option>
                        <option>Poster Colors</option>
                        <option>pastels</option>
                        <option>Acrylics</option>
                    </select>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>
                        Select size&nbsp;&nbsp; 
                    </label>
                    <select >
                        <option>A4</option>
                        <option>A3</option>
                        <option>A5</option>
                    </select>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>
                        Frame&nbsp;
                    </label>
                    <input 
                        type="radio"
                        name="withFrame"
                        value="withframe"
                    />
                    &nbsp;With Frame&nbsp;
                    <input 
                        type="radio"
                        name="withOutFrame"
                        value="withOutframe"
                    />
                    &nbsp;WithOut Frame
                </div>
                <div className='mb-3'>
                    <label className='form-label'>
                       Specifications  &nbsp;
                    </label>
                    <textarea
                        rows="4"
                        colums="15"
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>
                       Upload Your Photo  &nbsp;
                    </label>
                    <input
                        type="file"
                        accept='image/*'
                    />
                </div>
                <button
                    type='submit'
                    className='btn btn-primary'
                >
                    Submit
                </button>

            </form>

        </div>
    )
}
export default Contact;*/


import React, { useState } from "react";
import axios from "axios";
function Contact() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
const [message, setMessage] = useState("");
const [photo, setPhoto] = useState(null);
const [preview, setPreview] = useState(null);
const [errors, setErrors] = useState({});
const [medium,setMedium]=useState("Pencil Sketch");
const [size,setSize]=useState("A4");
const [frame,setFrame]=useState("")
const handleFileChange = (e) => {
const file = e.target.files[0];
if (!file) return;
const allowedTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png"
];
if (!allowedTypes.includes(file.type)) {
  setErrors({
    ...errors,
    photo: "Only JPG and PNG files are allowed"
  });
  e.target.value = "";
  return;
}
setPhoto(file);
setPreview(URL.createObjectURL(file));
setErrors({
  ...errors,
  photo: ""
});
};
const validate = () => {
const newErrors = {};
if (!name.trim()) {
  newErrors.name = "Name is required";
}
if (!email.trim()) {
  newErrors.email = "Email is required";
} else if (!/\S+@\S+\.\S+/.test(email)) {
  newErrors.email = "Enter a valid email address";
}
if (!phoneNumber.trim()) {
  newErrors.phoneNumber = "Phone Number is required";
} else if (!/^\d{10}$/.test(phoneNumber)) {
  newErrors.phoneNumber =
    "Phone Number must contain exactly 10 digits";
}
if (!message.trim()) {
  newErrors.message = "Please enter specifications";
}
if (!photo) {
  newErrors.photo = "Please upload a reference image";
}
setErrors(newErrors);
return Object.keys(newErrors).length === 0;
};
const handleSubmit = async(event) => {
event.preventDefault();
if (!validate()) return;
try{
  const formData=new FormData();
  formData.append("name",name);
  formData.append("mail",email);
  formData.append("phoneNumber",phoneNumber);
  formData.append("medium",medium);
  formData.append("size",size);
  formData.append("frame",frame);
  formData.append("specifications",message);
  formData.append("photo",photo);
  await axios.post(
    "http://localhost:5000/customorders",
    formData
  );

alert("Custom Order Submitted Successfully!");
setName("");
setEmail("");
setPhoneNumber("");
setMessage("");
setPhoto(null);
setPreview(null);
setErrors({});
}
catch(error){
  console.log(error);
  alert("Failed to submit order");
}
};
return ( <div className="container mt-5"> <h2 className="mb-4">Custom Artwork Order</h2>
  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label className="form-label">Name</label>
      <input
        type="text"
        className="form-control"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {errors.name && (
        <div className="text-danger">
          {errors.name}
        </div>
      )}
    </div>
    <div className="mb-3">
      <label className="form-label">Email</label>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && (
        <div className="text-danger">
          {errors.email}
        </div>
      )}
    </div>
    <div className="mb-3">
      <label className="form-label">Phone Number</label>
      <input
        type="tel"
        className="form-control"
        maxLength="10"
        value={phoneNumber}
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d*$/.test(value)) {
            setPhoneNumber(value);
          }
        }}
      />
      {errors.phoneNumber && (
        <div className="text-danger">
          {errors.phoneNumber}
        </div>
      )}
    </div>
    <div className="mb-3">
      <label className="form-label">
        Select Medium
      </label>
      <select className="form-select" value={medium} onChange={(e)=>setMedium(e.target.value)}>
        <option>Pencil Sketch</option>
        <option>Poster Colors</option>
        <option>Pastels</option>
        <option>Acrylics</option>
      </select>
    </div>
    <div className="mb-3">
      <label className="form-label">
        Select Size
      </label>
      <select className="form-select" value={size} onChange={(e)=>setSize(e.target.value)}>
        <option>A5</option>
        <option>A4</option>
        <option>A3</option>
      </select>
    </div>
    <div className="mb-3">
      <label className="form-label">
        Frame Option
      </label>
      <br />
      <input
        type="radio"
        name="frame"
        value={frame}
        onChange={(e)=>setFrame(e.target.value)}
      />
      &nbsp;With Frame
      &nbsp;&nbsp;&nbsp;
      <input
        type="radio"
        name="frame"
        value={frame}
        onChange={(e)=>setFrame(e.target.value)}
      />
      &nbsp;Without Frame
    </div>
    <div className="mb-3">
      <label className="form-label">
        Specifications
      </label>
      <textarea
        rows="4"
        className="form-control"
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
      />
      {errors.message && (
        <div className="text-danger">
          {errors.message}
        </div>
      )}
    </div>
    <div className="mb-3">
      <label className="form-label">
        Upload Reference Photo
      </label>
      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        className="form-control"
        onChange={handleFileChange}
      />
      {errors.photo && (
        <div className="text-danger">
          {errors.photo}
        </div>
      )}
    </div>
    {preview && (
      <div className="mb-3">
        <img
          src={preview}
          alt="Preview"
          className="img-fluid"
          style={{
            maxHeight: "300px",
            objectFit: "contain"
          }}
        />
      </div>
    )}
    <button
      type="submit"
      className="btn btn-primary"
    >
      Submit Order
    </button>

  </form>
</div>
);
}
export default Contact;
