import React from "react";
import { useNumbers } from "./NumberProvider"; // Ensure the path is correct
import { useNavigate } from "react-router-dom";
import ConnectWallet from "./ConnectWallet";
const ResultsScreen = () => {
  const { sortedSelectedNumbers, sortedVotedNumbers } = useNumbers();
      const navigate=  useNavigate()
  return (
    <div className="screen resualt" id="display-results">
      <h1>Game Result</h1>
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
      <ConnectWallet/>
    </div>
  );
}

export default ResultsScreen;
