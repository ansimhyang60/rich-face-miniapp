import { useNavigate } from 'react-router-dom';
import { Camera, Trophy, ChevronRight, ShieldCheck, PlaySquare, Sparkles, CheckCircle2, Gamepad2, Smile } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useTossBridge } from '../hooks/useTossBridge';
import { useAds } from '../hooks/useAds';
import { useUserStore } from '../store/userStore';

export default function MainScreen() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { credits, hasMyDataConsent, faceScore, habitScore, actionScore, setPhotoUrl } = useUserStore();
  
  // 종합 부자 점수 계산 (관상 + 습관 + 미니게임/스마일 노력 점수)
  const totalScore = Math.min(100, Math.round((faceScore + habitScore) / 2) + actionScore);
  const isBeggar = totalScore < 50;
  
  // 오늘의 운세 뽑기 상태
  const [fortuneRevealed, setFortuneRevealed] = useState(false);
  const fortunes = [
    "오늘은 커피값을 아끼면 생각지도 못한 꽁돈이 생길 관상입니다.",
    "동쪽에서 귀인이 나타납니다! 점심 식사 자리를 유심히 살펴보세요.",
    "오늘은 지름신이 강림하는 날. 장바구니를 비우고 내일 다시 고민하세요.",
    "소액이라도 투자를 시작하기 좋은 날입니다. 작은 씨앗이 크게 자랄 운세!"
  ];
  const [todayFortune] = useState(fortunes[Math.floor(Math.random() * fortunes.length)]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
      navigate('/scan');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const { requestMyDataConsent, isRequesting } = useTossBridge();
  const { showRewardedAd, isPlayingAd } = useAds();

  return (
    <div className="content-area">
      {/* 글로벌 스코어 대시보드 */}
      <div style={{ marginBottom: '24px', marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="title" style={{ marginBottom: '8px' }}>
            {faceScore === 0 ? '내 관상은\n얼마짜리일까?' : '나의 부자력\n대시보드'}
          </h1>
          {faceScore > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: 'var(--text-sub)' }}>종합 스탯:</span>
              <strong style={{ fontSize: '24px', color: isBeggar ? 'var(--toss-red)' : 'var(--gold-main)', fontWeight: '900' }}>
                {totalScore}점
              </strong>
            </div>
          ) : (
            <p className="subtitle">AI가 당신의 얼굴에 숨겨진 재물운을 분석합니다.</p>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <div style={{ background: 'var(--gold-light)', color: 'var(--gold-dark)', padding: '6px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: 'bold' }}>
            보유 크레딧: {credits}개
          </div>
        </div>
      </div>

      {faceScore > 0 && (
        <div className="card" style={{ padding: '20px', backgroundColor: isBeggar ? '#f2f4f6' : '#191919', color: isBeggar ? '#111' : '#fff', marginBottom: '24px', border: `1px solid ${isBeggar ? 'var(--toss-red)' : 'var(--gold-main)'}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>현재 소속: {isBeggar ? '탑골공원 거지방 ⛺' : '시그니엘 플렉스방 👑'}</span>
            <span style={{ fontSize: '12px', color: isBeggar ? 'var(--toss-red)' : 'var(--gold-main)' }}>
              {isBeggar ? '탈출까지 ' + (50 - totalScore) + '점 남음' : '상위 1% 달성!'}
            </span>
          </div>
          <div style={{ width: '100%', height: '8px', backgroundColor: isBeggar ? '#d1d6db' : '#333', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(100, totalScore)}%`, height: '100%', backgroundColor: isBeggar ? 'var(--toss-red)' : 'var(--gold-main)', transition: 'width 0.5s ease-out' }} />
          </div>
        </div>
      )}

      {/* 데일리 퀘스트 (코어 루프 연결) */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🎯 스탯업 데일리 퀘스트
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div onClick={() => navigate('/minigame')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'var(--toss-blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--toss-blue)' }}>
                <Gamepad2 size={24} />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '4px' }}>쓰레기 비 뚫고 1원 줍기</div>
                <div style={{ fontSize: '12px', color: 'var(--text-sub)' }}>토스 감성 알바 미니게임</div>
              </div>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--toss-blue)' }}>+3점</div>
          </div>

          <div onClick={() => navigate('/smile-trainer')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(255,192,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-main)' }}>
                <Smile size={24} />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '4px' }}>실시간 자본주의 미소 교정</div>
                <div style={{ fontSize: '12px', color: 'var(--text-sub)' }}>카메라로 미소 5초 유지하기</div>
              </div>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--gold-dark)' }}>+10점</div>
          </div>

          <div onClick={() => navigate('/ritual')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f0f0f0', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#f2f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}>
                <CheckCircle2 size={24} />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '4px' }}>오늘의 부자 리추얼 달성</div>
                <div style={{ fontSize: '12px', color: 'var(--text-sub)' }}>생활 습관 체크리스트</div>
              </div>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-main)' }}>+5점</div>
          </div>

        </div>
      </div>
      
      {/* 오늘의 재물운세 포춘쿠키 */}
      <div 
        onClick={() => setFortuneRevealed(true)}
        className="card" 
        style={{ 
          background: fortuneRevealed ? '#fff' : 'linear-gradient(135deg, #111 0%, #333 100%)', 
          color: fortuneRevealed ? 'var(--text-main)' : '#fff',
          padding: '24px', textAlign: 'center', cursor: fortuneRevealed ? 'default' : 'pointer',
          border: fortuneRevealed ? '1px solid var(--gold-main)' : 'none',
          transition: 'all 0.3s',
          marginBottom: '24px'
        }}
      >
        {!fortuneRevealed ? (
          <>
            <Sparkles size={32} color="var(--gold-main)" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>오늘의 재물운 포춘쿠키 🥠</h3>
            <p style={{ fontSize: '13px', color: '#a0a0a0' }}>터치하여 오늘의 재물운을 확인해보세요</p>
          </>
        ) : (
          <div style={{ animation: 'fadeIn 0.5s' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--gold-dark)', marginBottom: '12px' }}>✨ 오늘의 운세 도착 ✨</h3>
            <p style={{ fontSize: '16px', fontWeight: 'bold', lineHeight: '1.5', wordBreak: 'keep-all' }}>
              {todayFortune}
            </p>
          </div>
        )}
      </div>

      {/* Golden Camera Area (관상 분석 재시도) */}
      <div 
        onClick={triggerFileInput}
        style={{
        width: '100%',
        maxWidth: '320px',
        aspectRatio: '1', 
        margin: '0 auto 40px auto',
        backgroundColor: '#fff', 
        borderRadius: '32px',
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        border: '1px solid #f0f0f0', 
        boxShadow: '0 20px 40px rgba(212, 160, 0, 0.08)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer'
      }}>
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          onChange={handlePhotoUpload} 
          style={{ display: 'none' }} 
        />
        
        <div style={{
          position: 'absolute', width: '150%', height: '150%',
          background: 'radial-gradient(circle, rgba(255,192,0,0.1) 0%, rgba(255,255,255,0) 70%)',
          animation: 'pulse 3s infinite'
        }} />
        
        <div style={{
          width: '120px', height: '120px', 
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--gold-light), #fff)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          boxShadow: 'inset 0 4px 12px rgba(255, 192, 0, 0.2), 0 8px 24px rgba(0,0,0,0.05)',
          marginBottom: '24px',
          zIndex: 1
        }}>
          <Camera size={48} color="var(--gold-dark)" strokeWidth={1.5} />
        </div>
        <p style={{ color: 'var(--gold-dark)', fontWeight: '700', fontSize: '18px', zIndex: 1, letterSpacing: '-0.5px' }}>
          {faceScore > 0 ? '관상 다시 스캔하기' : '정면 사진 업로드'}
        </p>
        <p style={{ color: 'var(--text-sub)', fontSize: '13px', marginTop: '8px', zIndex: 1 }}>
          * 데이터는 분석 즉시 파기됩니다
        </p>
      </div>

      {/* Credit Earnings */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button 
          onClick={requestMyDataConsent} 
          disabled={hasMyDataConsent || isRequesting}
          style={{ 
            flex: 1, padding: '16px', borderRadius: '16px', border: 'none',
            background: hasMyDataConsent ? '#f2f4f6' : 'rgba(49, 130, 246, 0.1)', 
            color: hasMyDataConsent ? 'var(--text-sub)' : 'var(--toss-blue)', 
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            cursor: hasMyDataConsent ? 'default' : 'pointer'
          }}
        >
          <ShieldCheck size={24} />
          <div style={{ fontSize: '13px', fontWeight: 'bold' }}>
            {hasMyDataConsent ? '마이데이터 연동 완료' : '마이데이터 연동하고\n1회 무료 받기'}
          </div>
        </button>
        <button 
          onClick={showRewardedAd}
          disabled={isPlayingAd}
          style={{ 
            flex: 1, padding: '16px', borderRadius: '16px', border: 'none',
            background: 'rgba(255, 192, 0, 0.1)', color: 'var(--gold-dark)', 
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            cursor: isPlayingAd ? 'wait' : 'pointer'
          }}
        >
          <PlaySquare size={24} />
          <div style={{ fontSize: '13px', fontWeight: 'bold' }}>
            광고 보고<br/>분석 크레딧 받기
          </div>
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
