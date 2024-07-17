import React, { useEffect, useState } from 'react';
import './NumberSelection.css';
import { useNumbers } from './NumberProvider';

const PyramidGrid = ({ onNumbersChange, Page }) => {
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [digitLimit, setDigitLimit] = useState(false);
    const { sortedSelectedNumbers } = useNumbers();

    const handleBtnClicked = (number) => {
        if (selectedNumbers.length < 2 || selectedNumbers.includes(number)) {
            setDigitLimit(false);
            setSelectedNumbers(oldList => {
                if (oldList.includes(number)) {
                    return oldList.filter(n => n !== number);  // Toggle off if already selected
                } else {
                    return [...oldList, number];              // Toggle on if not selected
                }
            });
        } else {
            setDigitLimit(true);
        }
    };

    useEffect(() => {
        const sortedList = [...selectedNumbers].sort((a, b) => a - b);
        onNumbersChange(sortedList);
    }, [selectedNumbers, onNumbersChange]);

    const rows = [
        [1],
        [2, 3],
        [4, 5]
    ];
    return (
        <div className='pyramid'>
            {digitLimit && <span>YOU CAN'T SELECT MORE THAN 2 DIGITS</span>}
            {rows.map((row, index) => (
                <div key={index} className="pyramid-row">
                    {row.map(number => (
                        <button
                            key={number}
                            data-number={number}
                            onClick={() => handleBtnClicked(number)}
                            className={`button ${selectedNumbers.includes(number) ? 'selected' : ''} ${Page === "vote" && sortedSelectedNumbers.includes(number) ? 'disabled' : ''}`}
                            disabled={Page === "vote" && sortedSelectedNumbers.includes(number)}
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
