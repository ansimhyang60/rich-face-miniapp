import { ArrowLeft, TrendingDown, TrendingUp, AlertCircle, ShoppingBag, Coffee, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RealityScreen() {
  const navigate = useNavigate();

  // 더미 데이터로 분석한 미래 자산 상태 시뮬레이션
  const currentAsset = 15000000;
  const monthlyExpense = 2800000;
  const projectedAsset5Y = currentAsset - (monthlyExpense * 60) + (3000000 * 60); // 대충 월급 300, 지출 280 가정

  return (
    <div className="content-area">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        <ArrowLeft size={28} style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
        <h1 style={{ marginLeft: '16px', fontSize: '20px', fontWeight: 'bold', margin: 0 }}>뼈때리는 현실 리포트</h1>
      </div>

      {/* Hero Section */}
      <div style={{ textAlign: 'center', padding: '32px 20px', background: 'var(--toss-red-bg)', borderRadius: '24px', marginBottom: '24px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '32px', backgroundColor: 'rgba(227, 50, 57, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <TrendingDown size={32} color="var(--toss-red)" />
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--toss-red)', marginBottom: '8px' }}>
          "이대로 가면 5년 뒤<br/>전재산 {projectedAsset5Y.toLocaleString()}원"
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: '1.5' }}>
          관상은 천만장자인데 소비는 억만장자처럼 하시네요.<br/>최근 3개월 토스 결제 내역을 분석한 결과입니다.
        </p>
      </div>

      {/* Consumption Analysis */}
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>가장 치명적인 소비 TOP 3</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
        <div className="card" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '20px', backgroundColor: '#f2f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Coffee size={20} color="var(--text-main)" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '15px', fontWeight: 'bold' }}>카페/간식</span>
              <span style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--toss-red)' }}>월 45만원</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-sub)' }}>커피값만 아꼈어도 이미 중고차 한 대 뽑았습니다.</p>
          </div>
        </div>

        <div className="card" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '20px', backgroundColor: '#f2f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBag size={20} color="var(--text-main)" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '15px', fontWeight: 'bold' }}>옷/쇼핑</span>
              <span style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--toss-red)' }}>월 82만원</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-sub)' }}>옷장에 안 입는 옷이 70%입니다. 당근마켓에 당장 파세요.</p>
          </div>
        </div>

        <div className="card" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '20px', backgroundColor: '#f2f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Car size={20} color="var(--text-main)" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '15px', fontWeight: 'bold' }}>택시비</span>
              <span style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--toss-red)' }}>월 31만원</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-sub)' }}>길에 뿌린 택시비만 모아도 부자 관상이 진짜가 됐을 겁니다.</p>
          </div>
        </div>
      </div>

      {/* Solution */}
      <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, #1a2980 0%, #26d0ce 100%)', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <AlertCircle size={20} />
          <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>AI의 강력 처방전</h3>
        </div>
        <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '20px', color: 'rgba(255,255,255,0.9)' }}>
          관상은 최고 수준이나 지갑에 구멍이 뚫려있습니다. 지금 당장 불필요한 소비 방어력을 높이는 <strong>리치 리추얼</strong>을 시작하고 루틴을 지켜보세요. 
        </p>
        <button 
          onClick={() => navigate('/ritual')} 
          style={{ width: '100%', padding: '14px', backgroundColor: '#fff', color: '#1a2980', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '15px' }}
        >
          리추얼 설정하러 가기
        </button>
      </div>
    </div>
  );
}
