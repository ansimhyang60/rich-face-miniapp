import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Coins } from 'lucide-react';
import { useUserStore } from '../store/userStore';

type Entity = {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: 'trash' | 'coin';
  icon: string;
};

const TRASH_ICONS = ['🧾', '🗑️', '🩴', '💸', '💳', '☕', '🛒'];

export default function MiniGameScreen() {
  const navigate = useNavigate();
  const { addActionScore } = useUserStore();
  const [coinsCollected, setCoinsCollected] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Game state refs for requestAnimationFrame
  const entitiesRef = useRef<Entity[]>([]);
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  
  const MAX_COINS = 3;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 100;
    };
    window.addEventListener('resize', resize);
    resize();

    const update = (time: number) => {
      if (gameOver) return;
      
      const dt = time - lastTimeRef.current;
      lastTimeRef.current = time;

      // Add entities (simulate 30 trash per second, which means 1 trash every 33ms)
      if (Math.random() < 0.6) {
        entitiesRef.current.push({
          id: Date.now() + Math.random(),
          x: Math.random() * canvas.width,
          y: -50,
          speed: 100 + Math.random() * 300,
          type: 'trash',
          icon: TRASH_ICONS[Math.floor(Math.random() * TRASH_ICONS.length)]
        });
      }

      // Add coin rarely (e.g. 1% chance per frame)
      if (coinsCollected < MAX_COINS && Math.random() < 0.01) {
        entitiesRef.current.push({
          id: Date.now() + Math.random(),
          x: Math.random() * canvas.width,
          y: -50,
          speed: 150 + Math.random() * 200,
          type: 'coin',
          icon: '💰'
        });
      }

      // Update positions
      entitiesRef.current.forEach(e => {
        e.y += e.speed * (dt / 1000);
      });

      // Remove off-screen entities
      entitiesRef.current = entitiesRef.current.filter(e => e.y < canvas.height + 100);

      // Draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = '32px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      entitiesRef.current.forEach(e => {
        ctx.fillText(e.icon, e.x, e.y);
      });

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame((time) => {
      lastTimeRef.current = time;
      update(time);
    });

    return () => {
      window.removeEventListener('resize', resize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameOver, coinsCollected]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameOver) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    let hitCoin = false;
    entitiesRef.current = entitiesRef.current.filter(entity => {
      const dist = Math.hypot(entity.x - clickX, entity.y - clickY);
      if (dist < 40) { // Hit radius
        if (entity.type === 'coin') {
          hitCoin = true;
          return false; // Remove collected coin
        }
      }
      return true;
    });

    if (hitCoin) {
      setCoinsCollected(prev => {
        const next = prev + 1;
        addActionScore(1); // 전역 상태에 진짜 포인트 합산!
        if (next >= MAX_COINS) setGameOver(true);
        return next;
      });
    }
  };

  return (
    <div className="content-area" style={{ padding: 0, overflow: 'hidden', height: '100vh', backgroundColor: '#111' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '20px', display: 'flex', justifyContent: 'space-between', zIndex: 10, background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)' }}>
        <ArrowLeft size={28} color="#fff" style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
          <Coins color="var(--gold-main)" />
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{coinsCollected} / {MAX_COINS} 원</span>
        </div>
      </div>
      
      {gameOver && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <h2 style={{ color: 'var(--gold-main)', fontSize: '32px', fontWeight: '900', marginBottom: '16px' }}>오늘의 한도 초과!</h2>
          <p style={{ color: '#fff', fontSize: '16px', marginBottom: '24px', textAlign: 'center', padding: '0 20px' }}>
            하루 최대 3원까지 적립 가능합니다.<br/>쓰레기 유혹을 뚫고 돈을 주운 당신의 관상이 조금 좋아졌습니다.
          </p>
          <button className="btn-primary" onClick={() => navigate(-1)} style={{ width: '200px' }}>
            돌아가기
          </button>
        </div>
      )}

      <div style={{ position: 'absolute', top: '70px', width: '100%', textAlign: 'center', color: 'rgba(255,255,255,0.5)', zIndex: 5, pointerEvents: 'none' }}>
        <p>쏟아지는 지출(쓰레기) 속에서<br/>진짜 동전(💰)을 찾아 터치하세요!</p>
      </div>

      <canvas 
        ref={canvasRef} 
        onClick={handleCanvasClick}
        style={{ display: 'block', width: '100%', height: '100%', touchAction: 'none' }}
      />
    </div>
  );
}
