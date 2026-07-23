import { ArrowLeft, Download, Upload, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

const DEFAULT_WALLPAPERS = [
  'https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=600&auto=format&fit=crop', // Gold
  'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=600&auto=format&fit=crop', // Money
  'https://images.unsplash.com/photo-1517409088656-6a5c13eeb6d7?q=80&w=600&auto=format&fit=crop', // Yacht
  'https://images.unsplash.com/photo-1614165936126-2ed18e471b3b?q=80&w=600&auto=format&fit=crop', // Ferrari
];

export default function TalismanScreen() {
  const navigate = useNavigate();
  const [selectedBg, setSelectedBg] = useState(DEFAULT_WALLPAPERS[0]);
  const [duration, setDuration] = useState('1주일');
  const talismanRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedBg(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!talismanRef.current) return;
    try {
      const canvas = await html2canvas(talismanRef.current, { scale: 3, useCORS: true });
      const image = canvas.toDataURL('image/jpeg', 0.9);
      const link = document.createElement('a');
      link.href = image;
      link.download = `richface_talisman_${duration}.jpg`;
      link.click();
      alert(`${duration} 동안 유지할 부적이 갤러리에 저장되었습니다! 배경화면으로 설정하세요.`);
    } catch (err) {
      alert('부적 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="content-area">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        <ArrowLeft size={28} style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
        <h1 style={{ marginLeft: '16px', fontSize: '20px', fontWeight: 'bold', margin: 0 }}>결제 방어 부적 생성기</h1>
      </div>

      <p style={{ fontSize: '14px', color: 'var(--text-sub)', marginBottom: '24px', lineHeight: '1.5' }}>
        핀터레스트에서 다운받은 나만의 부자 사진을 업로드하거나 기본 이미지를 선택해 잠금화면 부적을 만드세요!
      </p>

      {/* 부적 캔버스 */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <div ref={talismanRef} style={{ 
          width: '280px', height: '560px', 
          borderRadius: '24px', overflow: 'hidden', 
          position: 'relative', boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
        }}>
          <img src={selectedBg} alt="background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
          
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)' }} />
          
          <div style={{ position: 'absolute', bottom: '40px', left: '20px', right: '20px', textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛑</div>
            <h2 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '8px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>결제 멈춰!</h2>
            <p style={{ fontSize: '14px', lineHeight: '1.4', opacity: 0.9 }}>
              관상은 훌륭한데 행동이 엉망입니다.<br/>이 결제를 참아야 부자가 됩니다.
            </p>
            <div style={{ marginTop: '16px', fontSize: '11px', opacity: 0.6 }}>유지 목표: {duration}</div>
          </div>
        </div>
      </div>

      {/* 컨트롤 패널 */}
      <div className="card" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '12px' }}>배경 이미지 선택</h3>
        
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '16px' }}>
          <label style={{ 
            width: '60px', height: '60px', borderRadius: '12px', flexShrink: 0,
            border: '2px dashed var(--toss-blue)', display: 'flex', flexDirection: 'column', 
            alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            backgroundColor: 'var(--toss-blue-light)', color: 'var(--toss-blue)'
          }}>
            <Upload size={20} />
            <span style={{ fontSize: '10px', fontWeight: 'bold', marginTop: '4px' }}>내 앨범</span>
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
          </label>
          
          {DEFAULT_WALLPAPERS.map((bg, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedBg(bg)}
              style={{ 
                width: '60px', height: '60px', borderRadius: '12px', flexShrink: 0,
                backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center',
                border: selectedBg === bg ? '2px solid var(--toss-blue)' : '2px solid transparent',
                cursor: 'pointer'
              }} 
            />
          ))}
        </div>

        <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '12px' }}>유지 기간 목표</h3>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {['1주일', '한 달', '1년'].map(term => (
            <button 
              key={term}
              onClick={() => setDuration(term)}
              style={{
                flex: 1, padding: '12px', borderRadius: '12px',
                border: duration === term ? '2px solid var(--toss-blue)' : '1px solid #d1d6db',
                backgroundColor: duration === term ? 'var(--toss-blue-light)' : '#fff',
                color: duration === term ? 'var(--toss-blue)' : 'var(--text-main)',
                fontWeight: 'bold', fontSize: '14px'
              }}
            >
              {term}
            </button>
          ))}
        </div>

        <button className="btn-primary" onClick={handleDownload} style={{ width: '100%' }}>
          <Download size={18} style={{ marginRight: '8px' }} />
          고화질 부적 다운로드
        </button>
      </div>
    </div>
  );
}
