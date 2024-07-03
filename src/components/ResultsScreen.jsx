import React, { useEffect, useState } from "react";
import { useNumbers } from "./NumberProvider"; // Ensure the path is correct
import { useNavigate } from "react-router-dom";
import ConnectWallet from "./ConnectWallet";
import { submitPlayerData } from "./firebaseFunctions";
import Spinner from "./spinner/Spinner";
import { auth } from "../firebase";
const ResultsScreen = () => {
  const { sortedSelectedNumbers, sortedVotedNumbers } = useNumbers();
  const[isloading,setIsloading]= useState(false);
  const navigate=  useNavigate()
  useEffect(() => {
    if (!sortedSelectedNumbers || !sortedVotedNumbers) {
      navigate('/');
    }
  }, [sortedSelectedNumbers, sortedVotedNumbers, navigate]);

 const  HandleProceed = async ()=> {
  const user =auth.currentUser;
  if (!user) {
    alert("Please sign in first");
    return;
  }
  try{
    setIsloading(true)
    await submitPlayerData(sortedSelectedNumbers,sortedVotedNumbers,100,false)
  }catch(e){
    setIsloading(false)
    console.log(e)
    


  }
  setIsloading(false)
  navigate('/finalresult');

  
  }


      
  return (
    
    <div className="screen resualt" id="display-results">
    {isloading?<Spinner/>:
    <>
      <h1>conferm</h1>
      <h2>Your Selected Numbers</h2>
      <div className="resalt-row">
        {
          sortedSelectedNumbers.map((number)=>{
            return         <button key={number} className="btn-resalt">{number}</button>

          })
        }
      </div>
      <h2 className="">your Voted Numbers </h2>
      <div className="resalt-row">
        {
          sortedVotedNumbers.map((number)=>{
            return         <button key={number} className="btn-resalt vote">{number}</button>

          })
        }
      </div>
      <div className="money-to-play">
        <p>money to play</p>
        <span style={{color:"green"}}>100 LBT</span>
      </div>
      
    
      {/* Additional result display logic goes here */}
      {/* <ConnectWallet/> */}
      <button className="button purple" onClick={HandleProceed}> proceed</button>
    
    </>
    } 
    </div>

  );
}

export default ResultsScreen;
