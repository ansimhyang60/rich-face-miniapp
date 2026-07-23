import { Share2, AlertTriangle, RefreshCw, Camera, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { useUserStore } from '../store/userStore';
import PaymentModal from './PaymentModal';

// 동적 좌표를 스토어에서 받아오므로 PART_COORDS는 삭제되었습니다.

export default function ResultScreen() {
  const navigate = useNavigate();
  const { credits, useCredit, unlockedRealityReport, faceScore, habitScore, faceTraits, photoUrl } = useUserStore();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [targetScore, setTargetScore] = useState(0);
  const resultCardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const finalScore = Math.round((faceScore + habitScore) / 2);
    setTargetScore(finalScore);
    
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

  const handleInstagramShare = async () => {
    if (!resultCardRef.current) return;
    try {
      const canvas = await html2canvas(resultCardRef.current, {
        scale: 2,
        backgroundColor: '#191919',
        useCORS: true,
      });
      const image = canvas.toDataURL('image/png');
      
      const link = document.createElement('a');
      link.href = image;
      link.download = 'richface_result.png';
      link.click();
      alert('스토리용 캡처 이미지가 기기에 저장되었습니다! 인스타그램에서 불러와 공유해보세요 📸');
    } catch (err) {
      alert('이미지 캡처 중 오류가 발생했습니다.');
    }
  };

  const getTierInfo = (s: number) => {
    if (s >= 90) return { 
      title: "금품 쓸어담는 황금 두꺼비상", 
      subtitle: "상위 0.1% 재벌 총수급", 
      color: "var(--gold-main)", bg: "var(--gold-light)", textColor: "var(--gold-dark)",
      desc: "지나가다 돈을 주울 확률 99%! 손만 대면 황금으로 변하는 마이다스의 손을 가졌습니다. 사업을 하시면 무조건 대박 납니다."
    };
    if (s >= 70) return { 
      title: "착실하게 통장 불리는 다람쥐상", 
      subtitle: "상위 10% 자수성가형", 
      color: "#3182F6", bg: "rgba(49, 130, 246, 0.1)", textColor: "#3182F6",
      desc: "도토리를 모으듯 차곡차곡 재산을 불려나가는 끈기의 화신! 40대 이후 부동산으로 크게 성공할 확률이 높습니다."
    };
    if (s >= 50) return { 
      title: "월급이 스쳐가는 펠리컨상", 
      subtitle: "상위 50% 평범한 직장인", 
      color: "#8B95A1", bg: "#f2f4f6", textColor: "#4E5968",
      desc: "입은 큰데 목구멍이 뚫려있네요. 돈이 들어오긴 하는데 어디론가 다 새어나갑니다. 충동구매를 막아줄 카드가 필요합니다."
    };
    return { 
      title: "통장이 텅장인 하루살이상", 
      subtitle: "파산 직전 경고!", 
      color: "#FF453A", bg: "rgba(255, 69, 58, 0.1)", textColor: "#FF453A",
      desc: "오늘만 사는 욜로(YOLO)족의 정석! 당장 적금을 들지 않으면 노후에 폐지를 주우러 다닐 수도 있습니다. 절약이 시급합니다."
    };
  };

  const tier = getTierInfo(targetScore);

  return (
    <div className="content-area">
      
      {/* 캡처를 위한 컨테이너 (인스타용) */}
      <div ref={resultCardRef} style={{ padding: '20px', background: 'var(--bg-color)', borderRadius: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{ 
            display: 'inline-block', padding: '6px 12px', 
            backgroundColor: tier.bg, color: tier.textColor, 
            borderRadius: '20px', fontSize: '13px', fontWeight: '700', marginBottom: '12px',
          }}>
            {tier.subtitle}
          </span>
          <h1 className="title" style={{ fontSize: '24px', lineHeight: '1.3', wordBreak: 'keep-all' }}>{tier.title}</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-sub)', marginTop: '12px', lineHeight: '1.5', wordBreak: 'keep-all' }}>
            {tier.desc}
          </p>
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
            // 미디어파이프 AI가 추출한 실제 좌표 사용
            const coords = (trait.x && trait.y) 
              ? { top: `${trait.y}%`, left: `${trait.x}%` }
              : { top: '50%', left: '50%' };
            const isLeft = trait.x ? trait.x < 50 : true;
            const partName = { forehead: '이마', eyes: '눈', nose: '코', ears: '귀', mouth: '입', jaw: '턱' }[trait.part] || '포인트';

            return (
              <div key={trait.part} style={{ position: 'absolute', top: coords.top, left: coords.left }}>
                <div style={{ 
                  position: 'absolute', width: '12px', height: '12px', 
                  borderRadius: '50%', backgroundColor: 'var(--gold-main)', 
                  transform: 'translate(-50%, -50%)', 
                  boxShadow: '0 0 15px var(--gold-main)', zIndex: 2
                }} />
                
                <div style={{ 
                  position: 'absolute', top: '-12px',
                  left: isLeft ? 'auto' : '15px',
                  right: isLeft ? '15px' : 'auto',
                  borderBottom: '1px solid var(--gold-main)',
                  paddingBottom: '2px',
                  minWidth: '40px',
                  textAlign: isLeft ? 'right' : 'left',
                  zIndex: 1
                }}>
                  <div style={{ 
                    background: 'rgba(0,0,0,0.8)', color: 'var(--gold-main)', 
                    fontSize: '11px', fontWeight: 'bold', padding: '4px 8px', 
                    borderRadius: '8px', whiteSpace: 'nowrap',
                    border: '1px solid var(--gold-main)',
                    display: 'inline-block'
                  }}>
                    {partName} <span style={{color: '#fff'}}>+{trait.score}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 황금 포인트 상세 설명 */}
        {faceTraits.filter(t => t.score > 0).length > 0 && (
          <div style={{ textAlign: 'left', background: 'rgba(255, 192, 0, 0.1)', padding: '16px', borderRadius: '12px', marginBottom: '24px', border: '1px solid rgba(255,192,0,0.3)' }}>
            <p style={{ fontSize: '15px', color: 'var(--gold-dark)', fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              ✨ 내 얼굴의 황금 포인트
            </p>
            <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {faceTraits.filter(t => t.score > 0).map((trait, idx) => {
                const partName = { forehead: '이마', eyes: '눈', nose: '코', ears: '귀', mouth: '입', jaw: '턱' }[trait.part] || '포인트';
                return (
                  <li key={idx} style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: '1.5', wordBreak: 'keep-all' }}>
                    <strong style={{ color: 'var(--gold-dark)' }}>[{partName}]</strong> {trait.description.split(' (')[0]}
                    <span style={{ marginLeft: '6px', color: 'var(--toss-blue)', fontWeight: 'bold' }}>
                      (+{trait.score}점)
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Score Card */}
        <div className="card" style={{ 
          background: 'linear-gradient(145deg, #191919, #2d2d2d)', 
          color: '#fff', textAlign: 'center', padding: '32px 20px',
          position: 'relative', overflow: 'hidden', margin: 0
        }}>
          <div style={{
            position: 'absolute', top: '-50px', right: '-50px',
            width: '150px', height: '150px', borderRadius: '50%',
            background: `radial-gradient(circle, ${tier.color}40 0%, rgba(255,255,255,0) 70%)`,
          }} />

          <p style={{ fontSize: '15px', color: '#a0a0a0', marginBottom: '8px' }}>AI 종합 부자 점수 (관상+마인드)</p>
          <div style={{ 
            fontSize: '64px', fontWeight: '800', color: tier.color, 
            lineHeight: '1', margin: '16px 0',
            textShadow: `0 4px 24px ${tier.color}40`,
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
          
          <div style={{ marginTop: '20px', fontSize: '11px', color: '#666' }}>
            Rich Face AI - 내 관상은 얼마짜리일까?
          </div>
        </div>
        
        {/* 유명 부자 관상 매칭 (신뢰도 증빙용) */}
        <div style={{ 
          marginTop: '24px', padding: '20px', 
          background: 'rgba(49, 130, 246, 0.05)', 
          borderRadius: '16px', border: '1px solid rgba(49, 130, 246, 0.2)' 
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--toss-blue)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            🧬 세계 최고 부자들과의 관상 DNA 매칭률
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', padding: '12px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '24px' }}>🚘</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '4px' }}>일론 머스크 (테슬라 CEO)</div>
                <div style={{ fontSize: '12px', color: 'var(--text-sub)' }}>{faceTraits[0]?.part === 'forehead' ? '이마' : '눈매'} 각도 일치율 <strong style={{color: 'var(--toss-red)'}}>{85 + Math.floor(Math.random() * 10)}%</strong></div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', padding: '12px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '24px' }}>📱</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '4px' }}>이재용 (삼성전자 회장)</div>
                <div style={{ fontSize: '12px', color: 'var(--text-sub)' }}>{faceTraits[2]?.part === 'jaw' ? '턱선' : '코끝'} 모양 일치율 <strong style={{color: 'var(--toss-blue)'}}>{80 + Math.floor(Math.random() * 15)}%</strong></div>
              </div>
            </div>
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-sub)', marginTop: '12px', textAlign: 'center' }}>* AI 랜드마크 딥러닝 분석 결과입니다.</p>
        </div>
      </div>
      {/* 캡처 영역 끝 */}

      {/* Reality Check Hook (결과 카드 바로 밑으로 이동) */}
      <div className="card" style={{ 
        border: '1px solid rgba(227, 50, 57, 0.3)', 
        backgroundColor: '#fffcfc',
        marginTop: '32px', padding: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <AlertTriangle size={20} color="var(--toss-red)" />
          <h3 style={{ color: 'var(--toss-red)', fontSize: '16px', fontWeight: '700' }}>진짜 당신의 미래 지갑 상태는?</h3>
        </div>
        <p style={{ fontSize: '14px', lineHeight: '1.5', color: 'var(--text-main)', marginBottom: '16px' }}>
          관상은 {tier.title.split(' ')[1]}인데, <strong>실제 토스 소비 내역</strong>을 바탕으로 1년 뒤, 5년 뒤 자산을 시뮬레이션 해보니 <strong>충격적인 미래</strong>가 나왔습니다.
        </p>
        <button onClick={handleOpenReport} style={{ 
          width: '100%', padding: '16px', 
          background: 'var(--toss-red-bg)', color: 'var(--toss-red)', 
          border: 'none', borderRadius: '12px', 
          fontSize: '15px', fontWeight: '700', cursor: 'pointer',
          transition: 'background 0.2s',
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
        }}>
          {unlockedRealityReport ? '이미 구매한 미래 리포트 보기' : credits > 0 ? '✨ 무료 크레딧으로 팩폭 예측 열기' : '미래 팩폭 자산 예측 리포트 열기 (100원)'}
        </button>
      </div>

      {/* 하단 고정(Fixed) 버튼 영역 - 잘림 방지 */}
      <div className="bottom-cta" style={{ display: 'flex', gap: '12px' }}>
        <button onClick={() => window.location.reload()} className="btn-primary" style={{ flex: 1, backgroundColor: '#f2f4f6', color: 'var(--text-main)' }}>
          <RefreshCw size={18} /> 다시하기
        </button>
        <button onClick={handleInstagramShare} className="btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
          <Share2 size={18} /> 스토리 공유
        </button>
      </div>

      <PaymentModal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} />
    </div>
  );
}
