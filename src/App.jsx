import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
            <Route path="/" element={user ? (isVoted ? <Navigate to="/finalresult" /> : <Navigate to="/playing" />) : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/playing" element={user ? (isVoted ? <Navigate to="/finalresult" /> : <NumberSelector />) : <Navigate to="/login" />} />
            <Route path="/voting" element={user ? <VotingScreen /> : <Navigate to="/login" />} />
            <Route path="/result" element={user ? <ResultsScreen /> : <Navigate to="/login" />} />
            <Route 
  path="/finalresult" 
  element={
    user ? (
      isVoted ? 
        <WaitResualt /> : 
        <Navigate to="/playing" />  // Redirect to a different route if not voted
    ) : 
    <Navigate to="/login" />
  } 
/>
          </Routes>
        </NumberProvider>
      </Router>
    </div>
  );
}

export default App;
