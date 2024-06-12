import React, { useEffect, useState } from 'react';
import './NumberSelection.css'; // Make sure to create a styles.css file in the same directory
const PyramidGrid = ({ onNumbersChange }) => {
    // existing logic here
    
    const [selectedNumbers, setselectedNumbers] = useState([]);
    const [diditlimit,setDiditlimit] =useState(false);
    
 // Ensure to include onNumbersChange in the dependency array
    const handleBtnClicked = (number) => {
        if(selectedNumbers.length<7 || selectedNumbers.includes(number)){
        setDiditlimit(false)
  
  
        setselectedNumbers(oldList => {
          if (oldList.includes(number)) {
            return oldList.filter(n => n !== number);  // Toggle off if already selected
          } else {
            return [...oldList, number];              // Toggle on if not selected
          }
        });
      }else{
        setDiditlimit(true)
        
      }
    }
  
    useEffect(() => {
        const sortedList = [...selectedNumbers].sort((a, b) => a - b);
        onNumbersChange(sortedList);
    }, [selectedNumbers, onNumbersChange]); 
  
    const rows = [[1,2], [3,4,5], [6,7,8], [9,10,11,12], [13,14,15,16], [17,18,19,20,21]];
    return (
      <div className='pyramid'>
       {
  
  diditlimit&&  <span>YOU CAN'T SELECT MORE THAN 7 DIGITS </span>
       }
        {rows.map((row, index) => (
          <div key={index} className="pyramid-row">
            {row.map(number => (
              <button
                key={number}
                data-number={number}
                onClick={() => handleBtnClicked(number)}
                className={`button ${selectedNumbers.includes(number) ? 'selected' : ''}`}
              >
                {number}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }
  
export default PyramidGrid;
