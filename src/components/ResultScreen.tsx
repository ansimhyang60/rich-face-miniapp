import { Share2, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ResultScreen() {
  const navigate = useNavigate();
  return (
    <div className="content-area">
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span style={{ 
          display: 'inline-block', padding: '6px 12px', 
          backgroundColor: 'var(--gold-light)', color: 'var(--gold-dark)', 
          borderRadius: '20px', fontSize: '13px', fontWeight: '700', marginBottom: '12px' 
        }}>
          상위 1% 재물운
        </span>
        <h1 className="title" style={{ fontSize: '32px' }}>천만장자 관상</h1>
      </div>
      
      {/* Score Card */}
      <div className="card" style={{ 
        background: 'linear-gradient(145deg, #191919, #2d2d2d)', 
        color: '#fff', textAlign: 'center', padding: '32px 20px',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Decorative background circle */}
        <div style={{
          position: 'absolute', top: '-50px', right: '-50px',
          width: '150px', height: '150px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,192,0,0.15) 0%, rgba(255,255,255,0) 70%)',
        }} />

        <p style={{ fontSize: '15px', color: '#a0a0a0', marginBottom: '8px' }}>AI가 분석한 당신의 부자 점수</p>
        <div style={{ 
          fontSize: '64px', fontWeight: '800', color: 'var(--gold-main)', 
          lineHeight: '1', margin: '16px 0',
          textShadow: '0 4px 24px rgba(255, 192, 0, 0.3)'
        }}>
          98<span style={{ fontSize: '32px', color: '#fff' }}>점</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '8px 12px', borderRadius: '8px', fontSize: '12px' }}>
            이마 명예운 <span style={{color: 'var(--gold-main)'}}>최상</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '8px 12px', borderRadius: '8px', fontSize: '12px' }}>
            눈매 재물운 <span style={{color: 'var(--gold-main)'}}>최상</span>
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
          <h3 style={{ color: 'var(--toss-red)', fontSize: '16px', fontWeight: '700' }}>하지만 당신의 지갑 상태는?</h3>
        </div>
        <p style={{ fontSize: '14px', lineHeight: '1.5', color: 'var(--text-main)', marginBottom: '16px' }}>
          관상은 이건희 회장님인데, 이번 달 토스 소비 내역을 분석해보니 <strong>충격적인 결과</strong>가 나왔습니다.
        </p>
        <button onClick={() => navigate('/reality')} style={{ 
          width: '100%', padding: '16px', 
          background: 'var(--toss-red-bg)', color: 'var(--toss-red)', 
          border: 'none', borderRadius: '12px', 
          fontSize: '15px', fontWeight: '700', cursor: 'pointer',
          transition: 'background 0.2s'
        }}>
          팩폭 현타 리포트 열기 (100원 결제)
        </button>
      </div>

      <div className="bottom-cta" style={{ display: 'flex', gap: '12px' }}>
        <button className="btn-primary" style={{ flex: 1, backgroundColor: '#f2f4f6', color: 'var(--text-main)' }}>
          다시하기
        </button>
        <button className="btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Share2 size={18} /> 자랑하기
        </button>
      </div>
    </div>
  );
}
