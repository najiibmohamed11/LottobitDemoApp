import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NumberSelector from './components/NumberSelector';
import VotingScreen from './components/VotingScreen';
import { NumberProvider } from './components/NumberProvider';
import ResultsScreen from './components/ResultsScreen';
// import { NumberProvider } from './NumberContext';

function App() {
  return (
   <div className="container">
     <Router>
      <NumberProvider>
        <Routes>
          <Route path="/" element={<NumberSelector />} />
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
