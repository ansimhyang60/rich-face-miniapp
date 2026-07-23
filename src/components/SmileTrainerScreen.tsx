import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Sparkles, Smile } from 'lucide-react';
import { useUserStore } from '../store/userStore';

export default function SmileTrainerScreen() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { addActionScore } = useUserStore();
  const [phase, setPhase] = useState<'camera' | 'training' | 'success'>('camera');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setPhase('training');
      } catch (err) {
        console.error("Camera access denied", err);
        // Fallback if camera is not available
        setPhase('training');
      }
    };
    
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (phase === 'training') {
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            handleSuccess();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const handleSuccess = () => {
    setPhase('success');
    // 스탯 상승 로직 (코어 루프 연결)
    addActionScore(10);
  };

  return (
    <div className="content-area" style={{ padding: 0, backgroundColor: '#111', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', zIndex: 10, position: 'absolute', top: 0, left: 0, right: 0 }}>
        <ArrowLeft size={28} style={{ cursor: 'pointer', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }} onClick={() => navigate(-1)} />
        <h1 style={{ marginLeft: '16px', fontSize: '18px', fontWeight: 'bold', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>실시간 관상 성형 (미소 교정)</h1>
      </div>

      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: phase === 'success' ? 0.3 : 1, transition: 'opacity 0.5s' }} 
        />
        
        {/* 가이드 오버레이 */}
        {phase === 'training' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
            <div style={{ width: '250px', height: '350px', border: '4px dashed var(--gold-main)', borderRadius: '150px', marginBottom: '32px', position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: '80px', left: '20%', right: '20%', height: '20px', borderBottom: '4px solid var(--toss-blue)', borderRadius: '50%', opacity: 0.8, animation: 'pulse 1s infinite' }} />
            </div>
            
            <div style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: '16px 24px', borderRadius: '32px', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'var(--gold-main)', marginBottom: '8px' }}>입꼬리를 쫙 올리세요! 😁</h2>
              <p style={{ fontSize: '15px', color: '#fff' }}>자본주의 미소를 {countdown}초간 유지하세요...</p>
            </div>
          </div>
        )}

        {phase === 'success' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
            <Sparkles size={80} color="var(--gold-main)" style={{ marginBottom: '24px' }} />
            <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--gold-main)', marginBottom: '16px', textAlign: 'center', textShadow: '0 4px 12px rgba(255,192,0,0.5)' }}>
              관상 성형 대성공!
            </h2>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '24px', borderRadius: '24px', backdropFilter: 'blur(10px)', textAlign: 'center' }}>
              <Smile size={48} color="#fff" style={{ margin: '0 auto 12px' }} />
              <p style={{ fontSize: '18px', color: '#fff', fontWeight: 'bold' }}>입꼬리 관상이 교정되었습니다.</p>
              <div style={{ fontSize: '32px', fontWeight: '900', color: 'var(--toss-blue)', marginTop: '12px' }}>스탯 +50점 획득!</div>
            </div>
            
            <button className="btn-primary" onClick={() => navigate('/')} style={{ marginTop: '32px', width: '200px', backgroundColor: 'var(--gold-main)', color: '#111' }}>
              대시보드로 돌아가기
            </button>
          </div>
        )}
      </div>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 0.5; }
        }
        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
