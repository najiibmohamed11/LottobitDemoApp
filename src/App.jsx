import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NumberSelector from './components/NumberSelector';
import VotingScreen from './components/VotingScreen';
import { NumberProvider } from './components/NumberProvider';
import ResultsScreen from './components/ResultsScreen';
import ConnectWallet from './components/ConnectWallet';
import { createContext, useEffect } from 'react';
import rabetLogo from "./assets/rabetLogo.png"

function App() {
 const numbers =createContext()
 useEffect(() => {
  document.title = "LOTOBIT GAME";
  const link = document.querySelector("link[rel~='icon']");
  if (link) {
    link.href = rabetLogo;
  }
}, [])

  return (
   <div className="container">

     <Router>
      <NumberProvider>
        <Routes>
          <Route path="/" element={<ConnectWallet />} />
          <Route path="/playing" element={<NumberSelector />} />
          <Route path="/voting" element={<VotingScreen />} />
          <Route path="/result" element={<ResultsScreen />} />
          {/* Results screen route here */}
        </Routes>
      </NumberProvider>
    </Router>
   </div>
  );
}

export default App;
