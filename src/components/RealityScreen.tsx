import { ArrowLeft, TrendingDown, TrendingUp, AlertCircle, ShoppingBag, Coffee, Car, Skull, Landmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RealityScreen() {
  const navigate = useNavigate();

  // 더미 데이터 시뮬레이션
  const currentAsset = 5000000; // 현재 500만원
  const monthlyIncome = 2500000; // 250만원
  const currentMonthlyExpense = 2350000; // 월 235만원 지출 (15만원이 쓸데없는 낭비)
  
  // 낭비하는 금액 15만원 (카페 5만, 쇼핑 7만, 택시 3만)
  
  const savedPerMonth = monthlyIncome - currentMonthlyExpense;
  const projectedAsset1Y = currentAsset + (savedPerMonth * 12);
  const projectedAsset5Y = currentAsset + (savedPerMonth * 60);

  // 리추얼 달성 후 절약 가정 시뮬레이션
  const improvedMonthlyExpense = 1500000; // 월 150만 원 지출로 방어 성공 시
  const improvedSavedPerMonth = monthlyIncome - improvedMonthlyExpense;
  const improvedProjectedAsset1Y = currentAsset + (improvedSavedPerMonth * 12);
  const improvedProjectedAsset5Y = currentAsset + (improvedSavedPerMonth * 60);

  // 거지 vs 부자 칭호
  const getTitle = (asset: number) => {
    if (asset < 20000000) return { title: '탑골공원 장기판 마스터', icon: <Skull size={32} color="var(--toss-red)" />, color: 'var(--toss-red)' };
    if (asset < 50000000) return { title: '원룸 월세 무한굴레러', icon: <TrendingDown size={32} color="var(--toss-red)" />, color: 'var(--toss-red)' };
    if (asset < 100000000) return { title: '평범한 캥거루족 직장인', icon: <AlertCircle size={32} color="#f09433" />, color: '#f09433' };
    return { title: '한강뷰 아파트 요트 오너', icon: <Landmark size={32} color="var(--toss-blue)" />, color: 'var(--toss-blue)' };
  };

  const currentFuture = getTitle(projectedAsset5Y);
  const improvedFuture = getTitle(improvedProjectedAsset5Y);

  return (
    <div className="content-area">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        <ArrowLeft size={28} style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
        <h1 style={{ marginLeft: '16px', fontSize: '20px', fontWeight: 'bold', margin: 0 }}>뼈때리는 현실 리포트</h1>
      </div>

      {/* Hero Section */}
      <div style={{ textAlign: 'center', padding: '32px 20px', background: 'var(--toss-red-bg)', borderRadius: '24px', marginBottom: '24px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '32px', backgroundColor: 'rgba(227, 50, 57, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          {currentFuture.icon}
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: currentFuture.color, marginBottom: '8px' }}>
          "이대로 살면 5년 뒤<br/>[{currentFuture.title}] 확정"
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: '1.5', marginTop: '12px' }}>
          현재 월급 {monthlyIncome.toLocaleString()}원에서 <br/>매달 <strong>{currentMonthlyExpense.toLocaleString()}원</strong>을 쓰고 계시네요.
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
              <span style={{ fontSize: '15px', fontWeight: 'bold' }}>카페/간식 (배달)</span>
              <span style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--toss-red)' }}>월 5만원</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-sub)' }}>티끌 모아 태산입니다. 배달비만 아꼈어도 치킨이 몇 마리인가요.</p>
          </div>
        </div>

        <div className="card" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '20px', backgroundColor: '#f2f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBag size={20} color="var(--text-main)" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '15px', fontWeight: 'bold' }}>옷/쇼핑</span>
              <span style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--toss-red)' }}>월 7만원</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-sub)' }}>옷장에 안 입는 옷이 가득합니다. 당근마켓에 당장 파세요.</p>
          </div>
        </div>

        <div className="card" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '20px', backgroundColor: '#f2f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Car size={20} color="var(--text-main)" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '15px', fontWeight: 'bold' }}>택시비</span>
              <span style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--toss-red)' }}>월 3만원</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-sub)' }}>조금만 일찍 일어나면 지하철 탈 수 있습니다. 뼈저리게 반성하세요.</p>
          </div>
        </div>
      </div>

      {/* Simulation */}
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>AI 자산 시뮬레이션 (1년 뒤)</h3>
      <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f2f4f6' }}>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-sub)', marginBottom: '4px' }}>현재 습관 유지 시</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-main)' }}>{projectedAsset1Y.toLocaleString()}원</div>
          </div>
          <TrendingDown color="var(--toss-red)" />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--toss-blue)', fontWeight: 'bold', marginBottom: '4px' }}>소비 절반으로 줄일 시 (추천)</div>
            <div style={{ fontSize: '22px', fontWeight: '900', color: 'var(--toss-blue)' }}>{improvedProjectedAsset1Y.toLocaleString()}원</div>
          </div>
          <TrendingUp color="var(--toss-blue)" />
        </div>
        
        <div style={{ marginTop: '20px', padding: '12px', backgroundColor: 'var(--toss-blue-light)', borderRadius: '12px', textAlign: 'center' }}>
          <span style={{ fontSize: '13px', color: 'var(--toss-blue)', fontWeight: 'bold' }}>
            소비만 줄여도 5년 뒤엔 <strong>[{improvedFuture.title}]</strong>!
          </span>
        </div>
      </div>

      {/* Solution */}
      <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, #1a2980 0%, #26d0ce 100%)', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <AlertCircle size={20} />
          <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>미래를 바꾸는 AI의 처방전</h3>
        </div>
        <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '20px', color: 'rgba(255,255,255,0.9)' }}>
          지금 당장 불필요한 소비 방어력을 높이는 <strong>결제 전 3초 숨참기</strong> 리추얼을 추가하고 미래를 바꿔보세요. 
        </p>
        <button 
          onClick={() => navigate('/ritual')} 
          style={{ width: '100%', padding: '14px', backgroundColor: '#fff', color: '#1a2980', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '15px' }}
        >
          리추얼 쇼핑하러 가기
        </button>
      </div>
    </div>
  );
}
