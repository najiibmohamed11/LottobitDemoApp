import React, { useEffect, useState } from 'react'
import { IswinerOrnot, get7MostVoted, getSelectedNumbers, getTotalAmount, isLequiditypolfull } from '../firebaseFunctions'
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function WaitResualt() {
  const [winners, setWinners] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const [isFull, setIsFull] = useState(false);
  const [iswINER, setIswiner] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const full = await isLequiditypolfull();
      setIsFull(full);

      if (full) {
        const winners = await get7MostVoted();
        setWinners(winners);
        const isWinerOr= await IswinerOrnot()
        setIswiner(isWinerOr);
      } else {
        const amount = await getTotalAmount();
        setTotalAmount(amount);
      }
      const selected = await getSelectedNumbers();
      setSelectedNumbers(selected);
        };

    fetchData();
  }, []);

  const maxAmount = 400;
  const percentage = totalAmount ? (totalAmount / maxAmount) * 100 : 0;
  return (
    <div className="screen">
         <h1>Resualt</h1>
      {isFull ? (
        <>
        <p style={{color:"red"}}>{iswINER?"You Are The Winner":"You Are Not The Winner"}</p>

        <h2>Most voted Numbers or winers</h2>

        <div className="resalt-row">
          {winners.map((winner) => (
            <button key={winner.key} className="btn-resalt">
              {winner.key}
              <span  style={{color:"#FF6666" , fontSize:"8px", margin:"0px"}}>{winner.value}</span>
            </button>
          ))}
        </div>
        </>
      ) : (<div style={{width:"100%" ,display:"flex",flexDirection:"column" ,alignItems:"center"}}>
      <h1>Game pool</h1>
        <div style={{ width: 150, height: 200 ,}}>
               <CircularProgressbarWithChildren value={percentage}>
        {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
        {/* <img
          style={{ width: 40, marginTop: -5 }}
          src="https://i.imgur.com/b9NyUGm.png"
          alt="doge"
        /> */}
        <div style={{ fontSize: 20, marginTop: -5 }}>
          <strong>{percentage}%</strong> 
        </div>
      </CircularProgressbarWithChildren>
      <p>wait antil the pool become full</p>

        </div>
        </div>
)}

       <>
       <h2 className="">your selected Numbers </h2>

       <div className="resalt-row" style={{}}>

{selectedNumbers.map((number)=>{
  return(
    <button className="btn-resalt" style={{borderRadius: "10px", backgroundColor:"#FF6666"}}>{number}</button>

  )
})}
</div>
       
       </>

    </div>
  );
}

export default WaitResualt;