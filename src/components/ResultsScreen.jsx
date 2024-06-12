import React from "react";
import { useNumbers } from "./NumberProvider"; // Ensure the path is correct
import { useNavigate } from "react-router-dom";
const ResultsScreen = () => {
  const { sortedSelectedNumbers, sortedVotedNumbers } = useNumbers();
      const navigate=  useNavigate()
  return (
    <div className="screen" id="display-results">
      <h2>your numbers: {sortedSelectedNumbers.join(', ')}</h2>
      <h2 className="">your vote: {sortedVotedNumbers.join(', ')}</h2>
      {/* Additional result display logic goes here */}
      <button className="button purple" onClick={()=>navigate("/")}>Play Game</button>
    </div>
  );
}

export default ResultsScreen;
