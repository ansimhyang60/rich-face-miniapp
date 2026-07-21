import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import './App.css';

// Placeholder Components for Screens
const MainScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="content-area">
      <h1 className="title">내 관상은<br/>얼마짜리일까?</h1>
      <p className="subtitle">AI가 당신의 얼굴에 숨겨진 재물운을 분석합니다.</p>
      
      <div style={{
        width: '100%', aspectRatio: '1', backgroundColor: '#fff', borderRadius: '40px',
        display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px',
        border: '1px solid #ebebeb', boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
      }}>
        <div style={{ color: '#D4A000', fontWeight: 'bold' }}>[ 황금 렌즈 UI 영역 ]</div>
      </div>

      <div className="card">
        <h3 style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '4px'}}>🏆 친구 부자 랭킹 TOP 3</h3>
        <p style={{fontSize: '13px', color: 'var(--text-sub)'}}>내 친구들의 재물운 순위</p>
      </div>

      <div className="bottom-cta">
        <button className="btn-primary" onClick={() => navigate('/scan')}>
          📷 얼굴 스캔 시작하기
        </button>
      </div>
    </div>
  );
};

const ScanScreen = () => {
  const navigate = useNavigate();
  // TODO: Add scanning animation and auto-redirect
  return (
    <div className="content-area" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 className="title" style={{ textAlign: 'center' }}>스캔 중...</h1>
      <p className="subtitle">이마의 명예운을 분석하고 있습니다.</p>
      <button className="btn-primary" onClick={() => navigate('/result')} style={{ marginTop: 'auto' }}>
        임시: 결과보기
      </button>
    </div>
  );
};

const ResultScreen = () => {
  return (
    <div className="content-area">
      <h1 className="title">상위 1% 랭크</h1>
      
      <div className="card" style={{ background: '#191919', color: '#fff' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>천만장자 관상</h2>
        <div style={{ fontSize: '42px', fontWeight: '800', color: 'var(--gold-main)', textAlign: 'center', margin: '20px 0' }}>
          98점
        </div>
      </div>

      <div className="card" style={{ border: '1px solid rgba(227, 50, 57, 0.2)' }}>
        <h3 style={{ color: 'var(--toss-red)', fontWeight: 'bold', marginBottom: '8px' }}>🚨 하지만 지갑 상태는?</h3>
        <p style={{ fontSize: '15px', lineHeight: '1.5' }}>관상은 이건희 회장님인데, 이번 달 토스 소비 내역을 보니...</p>
        <button style={{ 
          width: '100%', padding: '16px', background: 'var(--toss-red-bg)', color: 'var(--toss-red)', 
          border: 'none', borderRadius: '12px', marginTop: '16px', fontWeight: 'bold', cursor: 'pointer' 
        }}>
          현타 리포트 열기 (100원 결제)
        </button>
      </div>
    </div>
  );
};


function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <ChevronLeft size={28} color="var(--text-main)" style={{ cursor: 'pointer' }} onClick={() => window.history.back()} />
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
