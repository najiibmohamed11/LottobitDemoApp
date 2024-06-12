import React, { useEffect, useState } from 'react';
import PyramidGrid from './PyramidGrid';
import { useNumbers } from './NumberProvider';
import { useNavigate } from 'react-router-dom';

const VotingScreen = () => {
  const { setSortedVotedNumbers, votedListLength, sortedSelectedNumbers, sortedVotedNumbers } = useNumbers();
  const [insufficient, setInsufficient] = useState(false);
  const [isSameNumber, setIsSameNumber] = useState(false);
  const navigate = useNavigate();

  const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  // useEffect(()=>{
  //    if (arraysAreEqual(sortedSelectedNumbers, sortedVotedNumbers)&&votedListLength!=0) {
  //     setIsSameNumber(true);
  //     setInsufficient(false); // Clear the other state to avoid multiple error messages
  //   } else if(votedListLength<7 && votedListLength!=0) {
  //     setInsufficient(true);
  //     setIsSameNumber(false); // Clear the other state to avoid multiple error messages
  //   }else{
  //     setInsufficient(false);
  //     setIsSameNumber(false);

  //   }

  // },[sortedSelectedNumbers,sortedVotedNumbers])

  const handleClick = () => {
    if (votedListLength === 7 && !arraysAreEqual(sortedSelectedNumbers, sortedVotedNumbers)) {
      navigate('/result');
    } else if (arraysAreEqual(sortedSelectedNumbers, sortedVotedNumbers)) {
      setIsSameNumber(true);
      setInsufficient(false); // Clear the other state to avoid multiple error messages
    } else {
      setInsufficient(true);
      setIsSameNumber(false); // Clear the other state to avoid multiple error messages
    }
  };

  return (
    <div className="screen" id="vote-numbers">
      <h2>VOTE FOR NUMBER TO BE WINNER</h2>
      {insufficient && <p className='more-number-error'>PLEASE SELECT MORE NUMBERS</p>}
      {isSameNumber && <p className='more-number-error'>YOU CAN'T VOTE YOUR NUMBERS</p>}
      <span>{votedListLength}</span>
      <PyramidGrid onNumbersChange={setSortedVotedNumbers} />
      <button className="button green" onClick={handleClick}>Mine My Vote</button>
    </div>
  );
};

export default VotingScreen;
