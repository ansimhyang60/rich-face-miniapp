import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Swords, Upload, RefreshCw } from 'lucide-react';
import { useUserStore } from '../store/userStore';

const PENALTIES = [
  "승자에게 오늘 커피 쏘기 ☕",
  "승자의 한 달 넷플릭스 결제해주기 🎬",
  "오늘 저녁은 승자에게 소고기 사기 🥩",
  "내일 승자 대신 출근/등교해주기 (마음만) 🏢",
  "승자에게 1만원 토스 송금하기 💸",
  "승자 인스타 게시물에 주접 댓글 3개 달기 📱",
  "승자에게 90도 폴더 인사하기 🙇",
  "오늘 하루 승자를 '회장님'이라 부르기 👑",
  "승자 차 세차해주기 (또는 방 청소) 🧽",
  "승자에게 치킨 기프티콘 쏘기 🍗",
  "승자의 모든 말에 무조건 '예쓰' 하기 👍",
  "승자에게 오늘 하루 업히기 🏃",
  "카톡 프사 3일 동안 승자 사진으로 해놓기 📸",
  "승자 앞에서 30초 동안 애교 부리기 🥰",
  "승자가 지정하는 편의점 간식 사오기 🍪"
];

export default function BattleFriendScreen() {
  const navigate = useNavigate();
  const myScore = useUserStore(state => Math.round((state.faceScore + state.habitScore) / 2));
  
  const [friendPhoto, setFriendPhoto] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [battleResult, setBattleResult] = useState<{ friendScore: number; winner: 'me' | 'friend' | 'draw'; penalty: string } | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFriendPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startBattle = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const friendRandomScore = 30 + Math.floor(Math.random() * 60); // 30 ~ 90
      const winner = myScore > friendRandomScore ? 'me' : myScore < friendRandomScore ? 'friend' : 'draw';
      const randomPenalty = PENALTIES[Math.floor(Math.random() * PENALTIES.length)];
      
      setBattleResult({ friendScore: friendRandomScore, winner, penalty: randomPenalty });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="content-area">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        <ArrowLeft size={28} style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
        <h1 style={{ marginLeft: '16px', fontSize: '20px', fontWeight: 'bold', margin: 0 }}>친구랑 관상 맞짱</h1>
      </div>

      {!battleResult ? (
        <>
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <Swords size={48} color="var(--toss-red)" style={{ marginBottom: '16px' }} />
            <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '8px' }}>누가 더 거지상일까?</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-sub)' }}>친구 사진을 업로드하고 실시간 배틀을 시작하세요.<br/>패배자에게는 끔찍한 벌칙이 주어집니다.</p>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            {/* 내 프로필 */}
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--toss-blue-light)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid var(--toss-blue)' }}>
                <span style={{ fontSize: '32px' }}>😎</span>
              </div>
              <div style={{ fontWeight: 'bold' }}>나</div>
              <div style={{ color: 'var(--toss-blue)', fontWeight: '900', fontSize: '18px' }}>{myScore}점</div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px', fontWeight: '900', color: '#d1d6db' }}>VS</div>

            {/* 친구 프로필 */}
            <div style={{ flex: 1, textAlign: 'center' }}>
              <label style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#f2f4f6', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px dashed #d1d6db', cursor: 'pointer', overflow: 'hidden' }}>
                {friendPhoto ? (
                  <img src={friendPhoto} alt="Friend" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Upload size={24} color="#a0a0a0" />
                )}
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoUpload} />
              </label>
              <div style={{ fontWeight: 'bold' }}>친구</div>
              <div style={{ color: '#a0a0a0', fontSize: '14px' }}>사진 등록 대기</div>
            </div>
          </div>

          <button 
            className="btn-primary" 
            onClick={startBattle} 
            disabled={!friendPhoto || isAnalyzing}
            style={{ width: '100%', backgroundColor: friendPhoto ? 'var(--toss-red)' : '#d1d6db' }}
          >
            {isAnalyzing ? '관상 AI가 전투력을 측정 중입니다...' : '맞짱 시작하기 🥊'}
          </button>
        </>
      ) : (
        <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease-out' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: battleResult.winner === 'me' ? 'var(--toss-blue)' : 'var(--toss-red)', marginBottom: '8px' }}>
            {battleResult.winner === 'me' ? '🎉 나의 완승!' : battleResult.winner === 'friend' ? '💀 패배... (내가 더 거지상)' : '🤝 무승부!'}
          </h2>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', margin: '32px 0' }}>
            <div>
              <div style={{ fontSize: '48px', fontWeight: '900', color: battleResult.winner === 'me' ? 'var(--toss-blue)' : '#111' }}>{myScore}</div>
              <div style={{ fontWeight: 'bold' }}>나</div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#d1d6db' }}>VS</div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: '900', color: battleResult.winner === 'friend' ? 'var(--toss-red)' : '#111' }}>{battleResult.friendScore}</div>
              <div style={{ fontWeight: 'bold' }}>친구</div>
            </div>
          </div>

          <div className="card" style={{ backgroundColor: 'var(--toss-red-bg)', border: '2px solid var(--toss-red)', padding: '24px' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--toss-red)', fontWeight: 'bold', marginBottom: '12px' }}>🚨 패배자 랜덤 벌칙</h3>
            <p style={{ fontSize: '20px', fontWeight: '800', color: '#111', wordBreak: 'keep-all' }}>
              {battleResult.penalty}
            </p>
          </div>

          <button className="btn-primary" onClick={() => setBattleResult(null)} style={{ width: '100%', marginTop: '24px', backgroundColor: '#111' }}>
            <RefreshCw size={18} style={{ marginRight: '8px' }} />
            다른 친구랑 다시 맞짱뜨기
          </button>
        </div>
      )}
    </div>
  );
}
