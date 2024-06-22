import React, { createContext, useState, useContext } from 'react';

const NumberContext = createContext();

export const useNumbers = () => useContext(NumberContext);

export const NumberProvider = ({ children }) => {
  const [sortedSelectedNumbers, setSortedSelectedNumbers] = useState([]);
  const [sortedVotedNumbers, setSortedVotedNumbers] = useState([]);
  const [truncateAddress, setTruncateAddress] = useState("");
 const votedListLength= sortedVotedNumbers.length
 const sortedSelectedNumbersLength= sortedSelectedNumbers.length

  return (
    <NumberContext.Provider value={{
      sortedSelectedNumbers,
      setSortedSelectedNumbers,
      sortedVotedNumbers,
      setSortedVotedNumbers,
      votedListLength,
      sortedSelectedNumbersLength,
      setTruncateAddress,
      truncateAddress
    }}>
      {children}
    </NumberContext.Provider>
  );
}
