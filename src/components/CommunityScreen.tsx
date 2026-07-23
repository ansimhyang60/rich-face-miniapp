import { ArrowLeft, MessageCircle, Crown, Search, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { useState } from 'react';

export default function CommunityScreen() {
  const navigate = useNavigate();
  const { faceScore, habitScore } = useUserStore();
  const totalScore = Math.round((faceScore + habitScore) / 2);
  
  // 50점 미만은 거지방, 50점 이상은 부자방으로 분기
  const isBeggar = totalScore < 50;

  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: isBeggar ? '마이너스통장' : '한강뷰오너', text: isBeggar ? '오늘도 택시탔다... 파산각' : '이번에 산 롤렉스 자랑합니다 ㅋㅋ', time: '방금' },
    { id: 2, user: isBeggar ? '오늘만산다' : '건물주님', text: isBeggar ? '배달비 아까워서 편의점 라면 먹음' : '요트 청소 귀찮네요', time: '1분 전' },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages(prev => [{ id: Date.now(), user: '나', text: chatInput, time: '방금' }, ...prev]);
    setChatInput('');
  };

  return (
    <div className="content-area" style={{ padding: 0, backgroundColor: isBeggar ? '#f2f4f6' : '#191919', color: isBeggar ? '#111' : '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <div style={{ padding: '20px', borderBottom: `1px solid ${isBeggar ? '#d1d6db' : '#333'}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: isBeggar ? '#fff' : '#222' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ArrowLeft size={28} style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
              {isBeggar ? '탑골공원 거지방 ⛺' : '시그니엘 플렉스방 👑'}
            </h1>
            <span style={{ fontSize: '12px', color: isBeggar ? 'var(--toss-red)' : 'var(--gold-main)' }}>
              {isBeggar ? '잔고 0원들의 생존기' : '상위 1% 부자들의 여유'}
            </span>
          </div>
        </div>
        {!isBeggar && <Crown color="var(--gold-main)" />}
      </div>

      {/* Main Feature Area */}
      <div style={{ padding: '20px' }}>
        {isBeggar ? (
          <div className="card" style={{ backgroundColor: '#fff', border: '1px solid var(--toss-red)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '8px' }}>구걸해서 1원 벌기</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-sub)', marginBottom: '16px' }}>부자방 유저들에게 구걸하고 1원을 주워보세요.</p>
            <button className="btn-primary" onClick={() => alert('광고 영상을 시청하고 1원을 받았습니다!')} style={{ width: '100%', backgroundColor: 'var(--toss-red)' }}>
              📺 광고 보고 1원 줍기
            </button>
            <button className="btn-primary" onClick={() => navigate('/minigame')} style={{ width: '100%', backgroundColor: '#f2f4f6', color: '#111', marginTop: '12px' }}>
              🎮 쓰레기 줍기 알바하러 가기
            </button>
          </div>
        ) : (
          <div className="card" style={{ backgroundColor: '#333', border: '1px solid var(--gold-main)', color: '#fff' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--gold-main)' }}>거지방에 훈수두기</h3>
            <p style={{ fontSize: '13px', color: '#a0a0a0', marginBottom: '16px' }}>가엾은 거지방 유저들에게 따끔한 충고를 던지세요.</p>
            <button className="btn-primary" onClick={() => alert('거지방에 확성기로 팩폭을 날렸습니다! 카타르시스 +10')} style={{ width: '100%', backgroundColor: 'var(--gold-main)', color: '#111' }}>
              📢 거지방에 잔소리 확성기 쓰기
            </button>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '20px', backgroundColor: isBeggar ? '#d1d6db' : '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
              {msg.user[0]}
            </div>
            <div>
              <div style={{ fontSize: '12px', color: isBeggar ? 'var(--text-sub)' : '#a0a0a0', marginBottom: '4px' }}>
                {msg.user} • {msg.time}
              </div>
              <div style={{ 
                padding: '12px', 
                backgroundColor: isBeggar ? '#fff' : '#2d2d2d', 
                borderRadius: '0 12px 12px 12px',
                fontSize: '14px',
                boxShadow: isBeggar ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
              }}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} style={{ padding: '16px', backgroundColor: isBeggar ? '#fff' : '#222', borderTop: `1px solid ${isBeggar ? '#d1d6db' : '#333'}`, display: 'flex', gap: '12px' }}>
        <input 
          type="text" 
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          placeholder={isBeggar ? '비참한 일상을 공유해보세요...' : '럭셔리한 플렉스를 자랑해보세요...'}
          style={{ flex: 1, padding: '12px 16px', borderRadius: '24px', border: 'none', backgroundColor: isBeggar ? '#f2f4f6' : '#333', color: isBeggar ? '#111' : '#fff', fontSize: '14px' }}
        />
        <button type="submit" style={{ width: '44px', height: '44px', borderRadius: '22px', backgroundColor: isBeggar ? 'var(--toss-blue)' : 'var(--gold-main)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isBeggar ? '#fff' : '#111' }}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
