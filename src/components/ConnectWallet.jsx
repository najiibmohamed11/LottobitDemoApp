import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MetaMask from "../assets/metMask.png"

export default function ConnectWallet() {
    const [walletAddress, setWalletAddress] = useState("");
    const navigate = useNavigate();

    const connectWallet = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
          try {
            /* MetaMask is installed */
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            setWalletAddress(accounts[0]);
            console.log(accounts[0]);
          } catch (err) {
            console.error(err.message);
          }
        } else {
          /* MetaMask is not installed */
          alert("Please install MetaMask");
        }
      };

    const truncateAddress = (address) => {
        if (!address) return "";
        const start = address.slice(0, 8);
        const end = address.slice(-4);
        return `${start}...${end}`;
    };

    return (
        <div className='wallet-btn'>
            <button className='button connect-wallet' onClick={connectWallet}>
                <img src={MetaMask} alt="" width={20} />
                {walletAddress ? truncateAddress(walletAddress) : "Connect your wallet to play"}
            </button>
        </div>
    );
}
