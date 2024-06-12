import React, { useState } from 'react';
import PyramidGrid from './PyramidGrid';
import { useNumbers } from './NumberProvider';
import { useNavigate } from 'react-router-dom';
// import { useNumbers } from '../NumberContext';

const VotingScreen = () => {
  const { setSortedVotedNumbers,votedListLength } = useNumbers();
  const [insuvicent,setInsuvicent] = useState(false)

  const handleClick=()=>{
    if(votedListLength==7){
      navigate('/result')

    }else{
      setInsuvicent(true);

    }

  }
  const navigate=useNavigate()  
    return (
      <div className="screen" id="vote-numbers">
        <h2>Vote for Numbers</h2>
        {insuvicent&&<p className='more-number-error'>PLEAS SELECT MORE NUMBERS</p>}

        <span>{votedListLength}</span>
        <PyramidGrid onNumbersChange={setSortedVotedNumbers} />
        <button className="button green" onClick={handleClick}>Mine My Vote</button>
      </div>
    );
  }
  
export default VotingScreen;
