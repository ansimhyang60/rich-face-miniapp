import { AlertOctagon, Coffee, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RealityScreen() {
  const navigate = useNavigate();
  return (
    <div className="content-area" style={{ backgroundColor: '#111', color: '#fff', minHeight: '100vh' }}>
      <header className="header" style={{ backgroundColor: '#111', color: '#fff', marginBottom: '24px' }}>
        <ArrowLeft size={28} color="#fff" style={{ cursor: 'pointer' }} onClick={() => window.history.back()} />
      </header>

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#FF453A', marginBottom: '16px', animation: 'glitch 2s infinite' }}>
          <AlertOctagon size={24} />
          <span style={{ fontWeight: '800', letterSpacing: '2px' }}>SYSTEM WARNING</span>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#fff', lineHeight: '1.4' }}>
          이건희 관상인데,<br/>지갑은 텅장입니다.
        </h1>
      </div>

      <div className="card" style={{ background: 'rgba(255, 69, 58, 0.1)', border: '1px solid rgba(255, 69, 58, 0.3)' }}>
        <h3 style={{ color: '#FF453A', fontSize: '15px', fontWeight: 'bold', marginBottom: '16px' }}>소비 방어력 최하 등급 📉</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
                <Coffee size={20} color="#fff" />
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#a0a0a0' }}>카페인 수혈 비용</p>
                <p style={{ fontWeight: 'bold' }}>상위 5% 호갱님</p>
              </div>
            </div>
            <div style={{ color: '#FF453A', fontWeight: 'bold' }}>- 125,000원</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
                <ShoppingBag size={20} color="#fff" />
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#a0a0a0' }}>충동 구매</p>
                <p style={{ fontWeight: 'bold' }}>명예훈장 획득</p>
              </div>
            </div>
            <div style={{ color: '#FF453A', fontWeight: 'bold' }}>- 340,000원</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ background: '#1C1C1E', marginTop: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>AI의 뼈 때리는 조언</h3>
        <p style={{ fontSize: '14px', color: '#a0a0a0', lineHeight: '1.6' }}>
          "당신의 관상에는 엄청난 재물운이 흐르지만, 매일 마시는 6천원짜리 프라푸치노가 그 맥을 끊고 있습니다. 지금 당장 불필요한 구독 서비스부터 해지하세요."
        </p>
      </div>

      <div className="bottom-cta" style={{ background: 'linear-gradient(to top, rgba(17,17,17,1) 70%, rgba(17,17,17,0))' }}>
        <button onClick={() => navigate('/ritual')} className="btn-primary" style={{ backgroundColor: '#FF453A', color: '#fff', boxShadow: '0 8px 24px rgba(255, 69, 58, 0.4)' }}>
          리치 리추얼 시작하고 액땜하기
        </button>
      </div>

      <style>{`
        @keyframes glitch {
          0% { transform: translate(0) }
          20% { transform: translate(-2px, 2px) }
          40% { transform: translate(-2px, -2px) }
          60% { transform: translate(2px, 2px) }
          80% { transform: translate(2px, -2px) }
          100% { transform: translate(0) }
        }
      `}</style>
    </div>
  );
}
