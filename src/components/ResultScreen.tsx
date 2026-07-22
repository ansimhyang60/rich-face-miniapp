import { Share2, AlertTriangle, RefreshCw, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import PaymentModal from './PaymentModal';

const PART_COORDS: Record<string, { top: string; left: string }> = {
  forehead: { top: '25%', left: '50%' },
  eyes: { top: '42%', left: '35%' },
  nose: { top: '58%', left: '50%' },
  ears: { top: '50%', left: '75%' },
  mouth: { top: '72%', left: '50%' },
  jaw: { top: '88%', left: '50%' },
};

export default function ResultScreen() {
  const navigate = useNavigate();
  const { credits, useCredit, unlockedRealityReport, faceScore, habitScore, faceTraits, photoUrl } = useUserStore();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [targetScore, setTargetScore] = useState(0);
  
  useEffect(() => {
    // 최종 점수 = (관상 점수 + 습관 점수) / 2
    const finalScore = Math.round((faceScore + habitScore) / 2);
    setTargetScore(finalScore);
    
    // 점수 카운팅 애니메이션
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= finalScore) {
        setScore(finalScore);
        clearInterval(interval);
      } else {
        setScore(current);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [faceScore, habitScore]);

  const handleOpenReport = () => {
    if (unlockedRealityReport) {
      navigate('/reality');
      return;
    }
    
    if (credits > 0) {
      const wantToUse = window.confirm(`무료 재검사 혜택(크레딧)이 ${credits}개 있습니다! 1개를 차감하고 리포트를 보시겠습니까?`);
      if (wantToUse) {
        useCredit();
        navigate('/reality');
      }
    } else {
      setIsPaymentOpen(true);
    }
  };

  const getTierInfo = (s: number) => {
    if (s >= 90) return { title: "천만장자 관상", subtitle: "상위 1% 재물운", color: "var(--gold-main)", bg: "var(--gold-light)", textColor: "var(--gold-dark)" };
    if (s >= 70) return { title: "스타트업 대표 관상", subtitle: "자수성가 재물운", color: "#3182F6", bg: "rgba(49, 130, 246, 0.1)", textColor: "#3182F6" };
    if (s >= 50) return { title: "월급루팡 직장인 관상", subtitle: "소소한 월급운", color: "#8B95A1", bg: "#f2f4f6", textColor: "#4E5968" };
    return { title: "탕후루 중독자 관상", subtitle: "파산 직전의 지갑", color: "#FF453A", bg: "rgba(255, 69, 58, 0.1)", textColor: "#FF453A" };
  };

  const tier = getTierInfo(targetScore);

  return (
    <div className="content-area" style={{ paddingBottom: '32px' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span style={{ 
          display: 'inline-block', padding: '6px 12px', 
          backgroundColor: tier.bg, color: tier.textColor, 
          borderRadius: '20px', fontSize: '13px', fontWeight: '700', marginBottom: '12px',
          transition: 'all 0.3s'
        }}>
          {tier.subtitle}
        </span>
        <h1 className="title" style={{ fontSize: '28px', transition: 'all 0.3s' }}>{tier.title}</h1>
      </div>
      
      {/* Face Visual Overlay */}
      <div style={{ 
        position: 'relative', width: '100%', height: '320px', 
        backgroundColor: '#191919', borderRadius: '16px', 
        overflow: 'hidden', marginBottom: '24px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
      }}>
        {photoUrl ? (
          <img src={photoUrl} alt="Scanned Face" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Camera size={48} color="#444" />
          </div>
        )}

        {/* Positive Traits Overlays */}
        {faceTraits.filter(t => t.score > 0).map(trait => {
          const coords = PART_COORDS[trait.part] || { top: '50%', left: '50%' };
          const isLeft = parseInt(coords.left) < 50;
          return (
            <div key={trait.part} style={{ position: 'absolute', top: coords.top, left: coords.left }}>
              {/* Point Dot */}
              <div style={{ 
                position: 'absolute', width: '10px', height: '10px', 
                borderRadius: '50%', backgroundColor: 'var(--gold-main)', 
                transform: 'translate(-50%, -50%)', 
                boxShadow: '0 0 10px var(--gold-main)', zIndex: 2
              }} />
              
              {/* Connecting Line & Text Bubble */}
              <div style={{ 
                position: 'absolute', top: '-10px',
                left: isLeft ? 'auto' : '15px',
                right: isLeft ? '15px' : 'auto',
                borderBottom: '1px solid var(--gold-main)',
                paddingBottom: '4px',
                minWidth: '100px',
                textAlign: isLeft ? 'right' : 'left',
                zIndex: 1
              }}>
                <div style={{ 
                  background: 'rgba(0,0,0,0.7)', color: 'var(--gold-main)', 
                  fontSize: '11px', fontWeight: 'bold', padding: '6px 10px', 
                  borderRadius: '8px', whiteSpace: 'nowrap',
                  border: '1px solid var(--gold-main)',
                  display: 'inline-block'
                }}>
                  {trait.description.split(' (')[0]}
                  <span style={{color: '#fff', marginLeft: '4px'}}>+{trait.score}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Score Card */}
      <div className="card" style={{ 
        background: 'linear-gradient(145deg, #191919, #2d2d2d)', 
        color: '#fff', textAlign: 'center', padding: '32px 20px',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '-50px', right: '-50px',
          width: '150px', height: '150px', borderRadius: '50%',
          background: `radial-gradient(circle, ${tier.color}40 0%, rgba(255,255,255,0) 70%)`,
        }} />

        <p style={{ fontSize: '15px', color: '#a0a0a0', marginBottom: '8px' }}>AI 종합 부자 점수 (관상+습관)</p>
        <div style={{ 
          fontSize: '64px', fontWeight: '800', color: tier.color, 
          lineHeight: '1', margin: '16px 0',
          textShadow: `0 4px 24px ${tier.color}40`,
          transition: 'color 0.5s'
        }}>
          {score}<span style={{ fontSize: '32px', color: '#fff' }}>점</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px', marginBottom: '24px' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 10px', borderRadius: '8px', fontSize: '12px' }}>
            관상 점수 <span style={{color: tier.color, fontWeight: 'bold'}}>{faceScore}점</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 10px', borderRadius: '8px', fontSize: '12px' }}>
            마인드 점수 <span style={{color: tier.color, fontWeight: 'bold'}}>{habitScore}점</span>
          </div>
        </div>

        {/* AI 관상 분석 상세 리포트 (Negative Traits primarily) */}
        <div style={{ textAlign: 'left', background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px' }}>
          <p style={{ fontSize: '13px', color: '#ff453a', fontWeight: 'bold', marginBottom: '12px' }}>⚠️ 팩폭 주의: 개선이 필요한 거지상 특징</p>
          <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {faceTraits.filter(t => t.score <= 0).length > 0 ? (
              faceTraits.filter(t => t.score <= 0).map((trait, idx) => (
                <li key={idx} style={{ fontSize: '13px', color: '#ff453a', lineHeight: '1.4' }}>
                  {trait.description}
                  <span style={{ marginLeft: '4px', color: '#ff453a' }}>
                    ({trait.score}점)
                  </span>
                </li>
              ))
            ) : (
              <li style={{ fontSize: '13px', color: '#d1d6db' }}>감점 요인이 없습니다! 완벽한 부자상입니다.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Reality Check Hook (The Twist) */}
      <div className="card" style={{ 
        border: '1px solid rgba(227, 50, 57, 0.3)', 
        backgroundColor: '#fffcfc',
        marginTop: '32px', padding: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <AlertTriangle size={20} color="var(--toss-red)" />
          <h3 style={{ color: 'var(--toss-red)', fontSize: '16px', fontWeight: '700' }}>진짜 당신의 지갑 상태는?</h3>
        </div>
        <p style={{ fontSize: '14px', lineHeight: '1.5', color: 'var(--text-main)', marginBottom: '16px' }}>
          관상은 {tier.title.split(' ')[0]}인데, 실제 토스 소비 내역을 분석해보니 <strong>충격적인 결과</strong>가 나왔습니다.
        </p>
        <button onClick={handleOpenReport} style={{ 
          width: '100%', padding: '16px', 
          background: 'var(--toss-red-bg)', color: 'var(--toss-red)', 
          border: 'none', borderRadius: '12px', 
          fontSize: '15px', fontWeight: '700', cursor: 'pointer',
          transition: 'background 0.2s',
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
        }}>
          {unlockedRealityReport ? '이미 구매한 리포트 바로 보기' : credits > 0 ? '✨ 무료 크레딧으로 리포트 열기' : '팩폭 현타 리포트 열기 (100원 결제)'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
        <button onClick={() => window.location.reload()} className="btn-primary" style={{ flex: 1, backgroundColor: '#f2f4f6', color: 'var(--text-main)' }}>
          <RefreshCw size={18} /> 다시하기
        </button>
        <button className="btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Share2 size={18} /> 자랑하기
        </button>
      </div>

      <PaymentModal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} />
    </div>
  );
}
