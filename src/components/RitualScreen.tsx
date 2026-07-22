import { CheckCircle2, Circle, Flame, Plus, Settings } from 'lucide-react';
import { useState } from 'react';

type Routine = {
  id: number;
  title: string;
  frequency: string;
  completed: boolean;
  reward: number;
};

export default function RitualScreen() {
  const [routines, setRoutines] = useState<Routine[]>([
    { id: 1, title: '영수증 버리지 않고 기록하기', frequency: '매일', completed: true, reward: 10 },
    { id: 2, title: '점심 식사 후 명상 5분', frequency: '매일', completed: false, reward: 5 },
    { id: 3, title: '매월 1일 수입의 20% 적금', frequency: '매월 1일', completed: false, reward: 50 },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newFreq, setNewFreq] = useState('매일');
  
  const toggleRoutine = (id: number) => {
    setRoutines(prev => prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
  };

  const handleAddRoutine = () => {
    if (!newTitle.trim()) return;
    setRoutines(prev => [
      ...prev,
      {
        id: Date.now(),
        title: newTitle,
        frequency: newFreq,
        completed: false,
        reward: 5
      }
    ]);
    setNewTitle('');
    setIsAdding(false);
  };

  const completedCount = routines.filter(r => r.completed).length;

  return (
    <div className="content-area">
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Flame color="var(--toss-red)" />
          <span style={{ color: 'var(--toss-red)', fontWeight: 'bold' }}>연속 3일째 달성 중!</span>
        </div>
        <h1 className="title">데일리 재물운 루틴</h1>
        <p className="subtitle">사소한 습관이 모여 천만장자의 관상을 만듭니다.</p>
      </div>

      {/* Progress */}
      <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, #111 0%, #333 100%)', color: '#fff' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>오늘의 달성률 {Math.round((completedCount / routines.length) * 100)}%</h2>
        <div style={{ width: '100%', height: '12px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ width: `${(completedCount / routines.length) * 100}%`, height: '100%', backgroundColor: 'var(--gold-main)', transition: 'width 0.5s ease-out' }} />
        </div>
        <p style={{ fontSize: '13px', color: '#a0a0a0', marginTop: '12px' }}>루틴을 완료할 때마다 재물운 스탯이 상승합니다.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '32px 0 16px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>내 루틴 체크리스트</h3>
        <button onClick={() => setIsAdding(!isAdding)} style={{ background: 'none', border: 'none', color: 'var(--toss-blue)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          <Plus size={18} /> 추가하기
        </button>
      </div>

      {isAdding && (
        <div className="card" style={{ padding: '20px', border: '2px solid var(--toss-blue)', marginBottom: '16px' }}>
          <input 
            type="text" 
            placeholder="예: 매일 아침 경제 기사 1개 읽기" 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e8eb', marginBottom: '12px', fontSize: '14px' }}
          />
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {['매일', '매주 월요일', '매월 1일', '주말만'].map(f => (
              <button 
                key={f} 
                onClick={() => setNewFreq(f)}
                style={{ 
                  padding: '8px 12px', borderRadius: '20px', fontSize: '12px', border: 'none',
                  backgroundColor: newFreq === f ? 'var(--toss-blue)' : '#f2f4f6',
                  color: newFreq === f ? '#fff' : 'var(--text-sub)'
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setIsAdding(false)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#f2f4f6', fontWeight: 'bold' }}>취소</button>
            <button onClick={handleAddRoutine} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--toss-blue)', color: '#fff', fontWeight: 'bold' }}>저장</button>
          </div>
        </div>
      )}
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {routines.map((routine) => (
          <div 
            key={routine.id} 
            className="card" 
            onClick={() => toggleRoutine(routine.id)}
            style={{ 
              margin: 0, padding: '16px 20px', 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
              opacity: routine.completed ? 0.6 : 1, cursor: 'pointer',
              transition: 'all 0.2s', border: routine.completed ? '1px solid transparent' : '1px solid #f0f0f0'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {routine.completed ? (
                <CheckCircle2 size={24} color="var(--toss-blue)" />
              ) : (
                <Circle size={24} color="#d1d6db" />
              )}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', backgroundColor: '#f2f4f6', color: 'var(--text-sub)', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                    {routine.frequency}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--gold-dark)', fontWeight: 'bold' }}>
                    운 스탯 +{routine.reward}
                  </span>
                </div>
                <p style={{ fontSize: '15px', fontWeight: 'bold', textDecoration: routine.completed ? 'line-through' : 'none', color: routine.completed ? 'var(--text-sub)' : 'var(--text-main)' }}>
                  {routine.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
