import React from 'react';
import { useNavigate } from 'react-router-dom';
import PyramidGrid from './PyramidGrid';
import { useNumbers } from './NumberProvider';
// import { useNumbers } from '../NumberContext';

const NumberSelector = () => {
  const { setSortedSelectedNumbers,sortedSelectedNumbersLength } = useNumbers();
  const navigate = useNavigate();

  return (
    <div className="screen" id="select-numbers">
      <h2>Select your 7 game numbers</h2>
      <span>{sortedSelectedNumbersLength}</span>
      <PyramidGrid onNumbersChange={setSortedSelectedNumbers} />  
      <button className="button blue" onClick={() => navigate('/voting')}>Next</button>
    </div>
  );
}




// Screen 2: Voting Screen


// // Screen 3: Results Screen


// Component to generate the grid of buttons


export default NumberSelector;
