import { Users, Search, Swords, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

export default function BattleScreen() {
  const [isBattling, setIsBattling] = useState(false);
  const [battleResult, setBattleResult] = useState<null | 'win' | 'lose'>(null);

  const handleBattle = () => {
    setIsBattling(true);
    setBattleResult(null);
    setTimeout(() => {
      setIsBattling(false);
      setBattleResult(Math.random() > 0.5 ? 'win' : 'lose');
    }, 1500);
  };

  return (
    <div className="content-area">
      <div style={{ marginBottom: '24px' }}>
        <h1 className="title">리치 배틀</h1>
        <p className="subtitle">내 관상과 지갑 상태로 친구와 한판 승부!</p>
      </div>

      <div className="card" style={{ padding: '4px', backgroundColor: '#f2f4f6', display: 'flex', borderRadius: '16px', marginBottom: '24px' }}>
        <input 
          type="text" 
          placeholder="친구의 토스 ID나 연락처 검색" 
          style={{ flex: 1, padding: '12px 16px', border: 'none', background: 'transparent', fontSize: '15px', outline: 'none' }}
        />
        <button style={{ backgroundColor: 'var(--toss-blue)', color: '#fff', border: 'none', borderRadius: '12px', padding: '0 20px', display: 'flex', alignItems: 'center' }}>
          <Search size={18} />
        </button>
      </div>

      <div className="card" style={{ background: 'linear-gradient(135deg, #1a2980 0%, #26d0ce 100%)', color: '#fff', padding: '24px', transition: 'all 0.3s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', position: 'relative' }}>
              👑
              {isBattling && <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '2px solid #FFD700', animation: 'spin 1s linear infinite', borderTopColor: 'transparent' }} />}
            </div>
            <p style={{ fontWeight: 'bold' }}>나 (98점)</p>
          </div>
          
          <div style={{ flex: 0.5, textAlign: 'center', fontSize: '24px', fontWeight: '900', fontStyle: 'italic', color: '#FFD700', animation: isBattling ? 'pulse 0.5s infinite' : 'none' }}>
            VS
          </div>
          
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', position: 'relative' }}>
              😎
              {isBattling && <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '2px solid #FFD700', animation: 'spin 1s linear infinite', borderTopColor: 'transparent' }} />}
            </div>
            <p style={{ fontWeight: 'bold' }}>김토스 (72점)</p>
          </div>
        </div>

        {battleResult ? (
          <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', animation: 'fadeIn 0.5s' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: battleResult === 'win' ? '#FFD700' : '#ff453a', marginBottom: '8px' }}>
              {battleResult === 'win' ? '승리! 랭킹이 상승했습니다 🎉' : '패배... 리추얼을 더 수행하세요 😢'}
            </h2>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
              {battleResult === 'win' ? '내 관상의 승리입니다. 친구의 지갑이 얇네요.' : '소비 방어력에서 크게 밀렸습니다.'}
            </p>
            <button onClick={() => setBattleResult(null)} style={{ marginTop: '16px', padding: '8px 16px', borderRadius: '20px', border: 'none', background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '13px', fontWeight: 'bold' }}>
              다시 붙기
            </button>
          </div>
        ) : (
          <button 
            onClick={handleBattle}
            disabled={isBattling}
            style={{ width: '100%', padding: '14px', background: '#FFD700', color: '#1a2980', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '900', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: isBattling ? 'wait' : 'pointer' }}
          >
            <Swords size={20} /> {isBattling ? '치열한 배틀 중...' : '배틀 시작하기!'}
          </button>
        )}
      </div>

      <div style={{ marginTop: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={18} color="var(--toss-red)" /> 배틀 기록
        </h3>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '20px', backgroundColor: '#f2f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={20} color="var(--text-sub)" />
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 'bold' }}>이현타</p>
                <p style={{ fontSize: '12px', color: 'var(--text-sub)' }}>어제</p>
              </div>
            </div>
            <span style={{ color: i === 3 ? 'var(--toss-red)' : 'var(--toss-blue)', fontWeight: 'bold', fontSize: '14px' }}>
              {i === 3 ? '패배 -5p' : '승리 +10p'}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
