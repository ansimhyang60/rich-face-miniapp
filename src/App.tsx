import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ChevronLeft, Home, Swords, CheckSquare } from 'lucide-react';
import './App.css';

import MainScreen from './components/MainScreen';
import ScanScreen from './components/ScanScreen';
import ResultScreen from './components/ResultScreen';
import RealityScreen from './components/RealityScreen';
import BattleScreen from './components/BattleScreen';
import RitualScreen from './components/RitualScreen';
import RankingScreen from './components/RankingScreen';
import HabitTestScreen from './components/HabitTestScreen';

function BottomNav() {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, width: '100%',
      backgroundColor: '#fff', borderTop: '1px solid #f0f0f0',
      display: 'flex', justifyContent: 'space-around', padding: '12px 0 20px',
      zIndex: 100
    }}>
      <Link to="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-sub)', textDecoration: 'none', gap: '4px' }}>
        <Home size={24} />
        <span style={{ fontSize: '11px' }}>홈</span>
      </Link>
      <Link to="/battle" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-sub)', textDecoration: 'none', gap: '4px' }}>
        <Swords size={24} />
        <span style={{ fontSize: '11px' }}>배틀</span>
      </Link>
      <Link to="/ritual" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-sub)', textDecoration: 'none', gap: '4px' }}>
        <CheckSquare size={24} />
        <span style={{ fontSize: '11px' }}>리추얼</span>
      </Link>
    </div>
  );
}

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
          <span style={{ marginLeft: 'auto', fontWeight: 'bold', fontSize: '14px', color: 'var(--toss-blue)' }}>Rich Face</span>
        </header>
        
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/scan" element={<ScanScreen />} />
          <Route path="/result" element={<ResultScreen />} />
          <Route path="/reality" element={<RealityScreen />} />
          <Route path="/battle" element={<BattleScreen />} />
          <Route path="/ritual" element={<RitualScreen />} />
          <Route path="/ranking" element={<RankingScreen />} />
          <Route path="/test" element={<HabitTestScreen />} />
        </Routes>
        
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
