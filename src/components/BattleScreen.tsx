import { Users, Search } from 'lucide-react';

export default function BattleScreen() {
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

      <div className="card" style={{ background: 'linear-gradient(135deg, #1a2980 0%, #26d0ce 100%)', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>👑</div>
            <p style={{ fontWeight: 'bold' }}>나 (98점)</p>
          </div>
          <div style={{ flex: 0.5, textAlign: 'center', fontSize: '24px', fontWeight: '900', fontStyle: 'italic', color: '#FFD700' }}>VS</div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>😎</div>
            <p style={{ fontWeight: 'bold' }}>김토스 (72점)</p>
          </div>
        </div>

        <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px' }}>
          <h4 style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '12px', textAlign: 'center' }}>상세 전력 비교</h4>
          
          <div style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
              <span>관상 점수</span>
              <span>나 승리!</span>
            </div>
            <div style={{ display: 'flex', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ flex: 0.7, backgroundColor: '#FFD700' }}></div>
              <div style={{ flex: 0.3, backgroundColor: '#fff' }}></div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
              <span>소비 방어력 (실제 자산)</span>
              <span>김토스 승리!</span>
            </div>
            <div style={{ display: 'flex', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ flex: 0.4, backgroundColor: '#FFD700' }}></div>
              <div style={{ flex: 0.6, backgroundColor: '#fff' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>배틀 기록</h3>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '20px', backgroundColor: '#f2f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={20} color="var(--text-sub)" />
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 'bold' }}>이아무개</p>
                <p style={{ fontSize: '12px', color: 'var(--text-sub)' }}>어제</p>
              </div>
            </div>
            <span style={{ color: 'var(--toss-blue)', fontWeight: 'bold', fontSize: '14px' }}>승리 +10p</span>
          </div>
        ))}
      </div>
    </div>
  );
}
