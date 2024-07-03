import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NumberSelector from './components/NumberSelector';
import VotingScreen from './components/VotingScreen';
import { NumberProvider } from './components/NumberProvider';
import ResultsScreen from './components/ResultsScreen';
import ConnectWallet from './components/ConnectWallet';
import { useEffect, useState } from 'react';
import rabetLogo from "./assets/rabetLogo.png";
import Login from './components/auth/login/Login';
import { auth } from './firebase';
import WaitResualt from './components/waitResult/WaitResualt';
import { IsVotedBefore } from './components/firebaseFunctions';

function App() {
  const [user, setUser] = useState(null);
  const [isVoted, setIsVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "LOTOBIT GAME";
    const link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = rabetLogo;
    }

    // Firebase auth state listener
    const unsubscribe = auth.onAuthStateChanged(async user => {
      setUser(user);
      if (user) {
        const isvoted = await IsVotedBefore();
        setIsVoted(isvoted);
      }
      setLoading(false); // Loading finished
    });

    // Clean up listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading-screen">Loading...</div>; // You can style this div as you wish
  }

  return (
    <div className="container">
      <Router>
        <NumberProvider>
          <Routes>
            <Route path="/" element={user ? (isVoted ? <WaitResualt /> : <NumberSelector />) : <Login />} />
            <Route path="/playing" element={<NumberSelector />} />
            <Route path="/voting" element={<VotingScreen />} />
            <Route path="/result" element={<ResultsScreen />} />
            <Route path="/finalresult" element={<WaitResualt />} />
          </Routes>
        </NumberProvider>
      </Router>
    </div>
  );
}

export default App;
