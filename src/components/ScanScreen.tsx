import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanFace } from 'lucide-react';

export default function ScanScreen() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState('얼굴 윤곽을 추출하는 중...');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        const next = p + 2;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => navigate('/result'), 500);
          return 100;
        }
        
        if (next === 30) setStepText('이마의 명예운을 분석하는 중...');
        if (next === 60) setStepText('눈매의 재물운을 계산하는 중...');
        if (next === 85) setStepText('토스 금융 데이터와 결합하는 중...');
        
        return next;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="content-area" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', paddingBottom: '0' }}>
      
      <div style={{ position: 'relative', width: '200px', height: '200px', marginBottom: '40px' }}>
        {/* Scanning grid background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(rgba(49, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(49, 130, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          borderRadius: '20px',
          overflow: 'hidden'
        }}>
          {/* Scanning line animation */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
            background: 'var(--toss-blue)',
            boxShadow: '0 4px 20px var(--toss-blue)',
            animation: 'scan 2s infinite linear'
          }} />
        </div>
        
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          color: 'var(--toss-blue)'
        }}>
          <ScanFace size={80} strokeWidth={1} />
        </div>
      </div>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>
        {progress}%
      </h2>
      <p style={{ fontSize: '15px', color: 'var(--text-sub)', textAlign: 'center', fontWeight: '500' }}>
        {stepText}
      </p>
      
      {/* Progress Bar */}
      <div style={{ width: '80%', height: '6px', backgroundColor: '#e5e8eb', borderRadius: '4px', marginTop: '32px', overflow: 'hidden' }}>
        <div style={{ 
          width: progress + '%', 
          height: '100%', 
          backgroundColor: 'var(--toss-blue)',
          transition: 'width 0.1s linear'
        }} />
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
