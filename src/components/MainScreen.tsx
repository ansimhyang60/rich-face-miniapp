import { useNavigate } from 'react-router-dom';
import { Camera, Trophy, ChevronRight, Crown, ShieldCheck, PlaySquare } from 'lucide-react';
import { useRef } from 'react';
import { useTossBridge } from '../hooks/useTossBridge';
import { useAds } from '../hooks/useAds';
import { useUserStore } from '../store/userStore';

export default function MainScreen() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // 사진이 선택되면 스캔 화면으로 넘어갑니다.
      navigate('/scan');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  const { requestMyDataConsent, isRequesting } = useTossBridge();
  const { showRewardedAd, isPlayingAd } = useAds();
  const { credits, hasMyDataConsent } = useUserStore();

  return (
    <div className="content-area">
      <div style={{ marginBottom: '24px', marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="title">내 관상은<br />얼마짜리일까?</h1>
          <p className="subtitle">AI가 당신의 얼굴에 숨겨진 재물운을 분석합니다.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <div style={{ background: 'var(--gold-light)', color: 'var(--gold-dark)', padding: '6px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: 'bold' }}>
            보유 크레딧: {credits}개
          </div>
        </div>
      </div>
      
      {/* Golden Camera Area */}
      <div 
        onClick={triggerFileInput}
        style={{
        width: '100%', 
        aspectRatio: '1', 
        backgroundColor: '#fff', 
        borderRadius: '32px',
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: '40px',
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
        
        {/* Glow effect */}
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
          정면 사진 업로드
        </p>
        <p style={{ color: 'var(--text-sub)', fontSize: '13px', marginTop: '8px', zIndex: 1 }}>
          * 데이터는 분석 즉시 삭제됩니다
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
            광고 보고<br/>분석 로켓 받기
          </div>
        </button>
      </div>

      {/* Friend Ranking */}
      <div className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Trophy size={18} color="var(--text-main)" />
            <h3 style={{fontSize: '16px', fontWeight: 'bold'}}>친구 재력 랭킹</h3>
          </div>
          <ChevronRight size={16} color="var(--text-sub)" />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { rank: 1, name: '김토스', score: '99점', face: '천만장자 상' },
            { rank: 2, name: '이현타', score: '82점', face: '자수성가 상' },
            { rank: 3, name: '박욜로', score: '41점', face: '탕진잼 상' },
          ].map((friend) => (
            <div key={friend.rank} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '28px', height: '28px', borderRadius: '50%', 
                  backgroundColor: friend.rank === 1 ? 'var(--gold-main)' : '#e5e8eb',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  color: friend.rank === 1 ? '#fff' : 'var(--text-sub)',
                  fontWeight: 'bold', fontSize: '13px'
                }}>
                  {friend.rank === 1 ? <Crown size={14} /> : friend.rank}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>{friend.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-sub)', marginTop: '2px' }}>{friend.face}</div>
                </div>
              </div>
              <div style={{ fontWeight: 'bold', color: friend.rank === 1 ? 'var(--gold-dark)' : 'var(--text-main)' }}>
                {friend.score}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bottom-cta">
        <button className="btn-primary" onClick={triggerFileInput}>
          분석 시작하기
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
