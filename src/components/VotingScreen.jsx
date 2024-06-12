import React from 'react';
import PyramidGrid from './PyramidGrid';
import { useNumbers } from './NumberProvider';
import { useNavigate } from 'react-router-dom';
// import { useNumbers } from '../NumberContext';

const VotingScreen = () => {
  const { setSortedVotedNumbers,votedListLength } = useNumbers();
  const navigate=useNavigate()  
    return (
      <div className="screen" id="vote-numbers">
        <h2>Vote for Numbers</h2>
        <span>{votedListLength}</span>
        <PyramidGrid onNumbersChange={setSortedVotedNumbers} />
        <button className="button green" onClick={() => navigate('/result')}>Mine My Vote</button>
      </div>
    );
  }
  
export default VotingScreen;
