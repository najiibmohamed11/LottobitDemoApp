import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PyramidGrid from './PyramidGrid';
import { useNumbers } from './NumberProvider';
// import { useNumbers } from '../NumberContext';

const NumberSelector = () => {
  const { setSortedSelectedNumbers,sortedSelectedNumbersLength  } = useNumbers();
  const [insuvicent,setInsuvicent] = useState(false)
  const navigate = useNavigate();
  const handleClick=()=>{
    if(sortedSelectedNumbersLength==7){
      navigate('/voting')

    }else{
      setInsuvicent(true);

    }

  }

  return (
    <div className="screen" id="select-numbers">
      <h2>Select your 7 game numbers</h2>
      {insuvicent&&<p className='more-number-error'>PLEAS SELECT MORE NUMBERS</p>}
      <span>{sortedSelectedNumbersLength}</span>
      <PyramidGrid onNumbersChange={setSortedSelectedNumbers} />  
      <button className="button blue" onClick={handleClick}>Next</button>
    </div>
  );
}




// Screen 2: Voting Screen


// // Screen 3: Results Screen


// Component to generate the grid of buttons


export default NumberSelector;
