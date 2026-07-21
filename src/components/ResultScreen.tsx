import { Share2, AlertTriangle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import PaymentModal from './PaymentModal';

export default function ResultScreen() {
  const navigate = useNavigate();
  const { credits, useCredit, unlockedRealityReport } = useUserStore();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [targetScore, setTargetScore] = useState(0);
  
  // 랜덤 점수 및 티어 데이터
  useEffect(() => {
    // 30 ~ 99 사이의 랜덤 점수
    const randomScore = Math.floor(Math.random() * 70) + 30;
    setTargetScore(randomScore);
    
    // 점수 카운팅 애니메이션
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= randomScore) {
        setScore(randomScore);
        clearInterval(interval);
      } else {
        setScore(current);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

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

        <p style={{ fontSize: '15px', color: '#a0a0a0', marginBottom: '8px' }}>AI가 분석한 당신의 부자 점수</p>
        <div style={{ 
          fontSize: '64px', fontWeight: '800', color: tier.color, 
          lineHeight: '1', margin: '16px 0',
          textShadow: `0 4px 24px ${tier.color}40`,
          transition: 'color 0.5s'
        }}>
          {score}<span style={{ fontSize: '32px', color: '#fff' }}>점</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '8px 12px', borderRadius: '8px', fontSize: '12px' }}>
            재물운 <span style={{color: tier.color, fontWeight: 'bold'}}>{targetScore >= 70 ? '최상' : targetScore >= 50 ? '보통' : '위험'}</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '8px 12px', borderRadius: '8px', fontSize: '12px' }}>
            소비 방어력 <span style={{color: tier.color, fontWeight: 'bold'}}>{targetScore >= 90 ? '최상' : '최하'}</span>
          </div>
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
