import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import './App.css';

import MainScreen from './components/MainScreen';
import ScanScreen from './components/ScanScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <ChevronLeft 
            size={28} 
            color="var(--text-main)" 
            style={{ cursor: 'pointer' }} 
            onClick={() => window.history.back()} 
          />
        </header>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/scan" element={<ScanScreen />} />
          <Route path="/result" element={<ResultScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
