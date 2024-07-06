// Login.js
import React from "react";
import { useNavigate } from "react-router-dom";
import google from '../../../assets/google.png'
import { signInWithGoogle } from "../firebase/firebaseAuth";
const Login = () => {
    const navigate= useNavigate()


  return (
    <div>
      <button onClick={ 
        async()=>{
       await signInWithGoogle()
       navigate("/")
      }} style={{border:"none",backgroundColor:"#646cffaa",color:"white",display:"flex",justifyContent:"center",alignItems:"center"}}> <img src={google} width={30} ></img> Sign in with Google</button>
    </div>
  );
};

export default Login;
