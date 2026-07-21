import { Camera, CheckCircle2, Flame } from 'lucide-react';

export default function RitualScreen() {
  return (
    <div className="content-area">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Flame color="var(--toss-red)" />
          <span style={{ color: 'var(--toss-red)', fontWeight: 'bold' }}>연속 3일째</span>
        </div>
        <h1 className="title">리치 리추얼</h1>
        <p className="subtitle">부자의 관상을 완성하는 1%의 작은 습관</p>
      </div>

      {/* Hero Quest */}
      <div className="card" style={{ position: 'relative', overflow: 'hidden', padding: '32px 24px', background: 'linear-gradient(135deg, #111 0%, #333 100%)', color: '#fff' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}>오늘의 특급 퀘스트</span>
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginTop: '16px', marginBottom: '8px' }}>미라클 모닝, 찬물 샤워 🧊</h2>
          <p style={{ fontSize: '14px', color: '#a0a0a0', marginBottom: '24px', lineHeight: '1.5' }}>일론 머스크도 한다는 그 샤워! 성공하면 재물운 스탯이 영구적으로 상승합니다.</p>
          
          <button style={{ backgroundColor: '#fff', color: '#111', border: 'none', borderRadius: '12px', padding: '14px 20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'center' }}>
            <Camera size={18} /> 인증샷 찍고 보상받기
          </button>
        </div>
        {/* Background icon */}
        <Camera size={150} color="rgba(255,255,255,0.05)" style={{ position: 'absolute', bottom: '-30px', right: '-30px', transform: 'rotate(-15deg)' }} />
      </div>

      <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '32px 0 16px' }}>데일리 재물운 루틴</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Completed Task */}
        <div className="card" style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: 0.6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <CheckCircle2 size={24} color="var(--toss-blue)" />
            <div>
              <p style={{ fontSize: '15px', fontWeight: 'bold', textDecoration: 'line-through' }}>영수증 버리지 않고 기록하기</p>
              <p style={{ fontSize: '12px', color: 'var(--text-sub)' }}>소비 방어력 +10</p>
            </div>
          </div>
        </div>

        {/* Pending Task */}
        <div className="card" style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '12px', border: '2px solid #d1d6db' }}></div>
            <div>
              <p style={{ fontSize: '15px', fontWeight: 'bold' }}>점심 식사 후 명상 5분</p>
              <p style={{ fontSize: '12px', color: 'var(--text-sub)' }}>집중력 스탯 강화</p>
            </div>
          </div>
          <button style={{ padding: '8px 16px', backgroundColor: '#f2f4f6', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', color: 'var(--toss-blue)', border: 'none' }}>
            시작
          </button>
        </div>
      </div>
    </div>
  );
}
