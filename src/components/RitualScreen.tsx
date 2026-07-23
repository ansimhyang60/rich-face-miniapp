import { CheckCircle2, Circle, Flame, Plus, Settings } from 'lucide-react';
import { useState } from 'react';

type Routine = {
  id: number;
  title: string;
  frequency: string;
  completed: boolean;
  reward: number;
};

const TEMPLATES: Record<string, Routine[]> = {
  '아침': [
    { id: 101, title: '기상 직후 이불 개기', frequency: '매일', completed: false, reward: 5 },
    { id: 102, title: '찬물 샤워로 마인드셋', frequency: '매일', completed: false, reward: 15 },
    { id: 103, title: '경제 뉴스 헤드라인 3개 읽기', frequency: '매일', completed: false, reward: 10 },
  ],
  '결제직전': [
    { id: 201, title: '장바구니 담고 24시간 뒤 결제', frequency: '소비시', completed: false, reward: 20 },
    { id: 202, title: '결제 버튼 누르기 전 3초 숨참기', frequency: '소비시', completed: false, reward: 10 },
  ],
  '업무중': [
    { id: 301, title: '점심 식사 후 가벼운 산책', frequency: '매일', completed: false, reward: 5 },
    { id: 302, title: '커피는 하루 1잔만 (나머진 물)', frequency: '매일', completed: false, reward: 10 },
  ],
  '저녁': [
    { id: 401, title: '오늘 쓴 영수증/지출 내역 확인', frequency: '매일', completed: false, reward: 15 },
    { id: 402, title: '내일 입을 옷 미리 꺼내두기', frequency: '매일', completed: false, reward: 5 },
  ]
};

export default function RitualScreen() {
  const [routines, setRoutines] = useState<Routine[]>([
    { id: 1, title: '영수증 버리지 않고 기록하기', frequency: '매일', completed: true, reward: 10 },
    { id: 2, title: '점심 식사 후 명상 5분', frequency: '매일', completed: false, reward: 5 },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('아침');
  
  // 커스텀 루틴 추가 상태
  const [customTitle, setCustomTitle] = useState('');
  const [customFrequency, setCustomFrequency] = useState('매일');
  
  const toggleRoutine = (id: number) => {
    setRoutines(prev => prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
  };

  const handleAddTemplate = (template: Routine) => {
    if (routines.some(r => r.title === template.title)) {
      alert('이미 추가된 루틴입니다.');
      return;
    }
    setRoutines(prev => [
      ...prev,
      { ...template, id: Date.now() }
    ]);
    setIsAdding(false);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;
    
    const newRoutine: Routine = {
      id: Date.now(),
      title: customTitle,
      frequency: customFrequency,
      completed: false,
      reward: 10
    };
    
    setRoutines([...routines, newRoutine]);
    setCustomTitle('');
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
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>오늘의 달성률 {Math.round((completedCount / routines.length) * 100) || 0}%</h2>
        <div style={{ width: '100%', height: '12px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ width: `${(completedCount / routines.length) * 100}%`, height: '100%', backgroundColor: 'var(--gold-main)', transition: 'width 0.5s ease-out' }} />
        </div>
        <p style={{ fontSize: '13px', color: '#a0a0a0', marginTop: '12px' }}>루틴을 완료할 때마다 관상 점수가 쑥쑥 오릅니다.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '32px 0 16px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>내 체크리스트</h3>
        <button onClick={() => setIsAdding(!isAdding)} style={{ background: 'none', border: 'none', color: 'var(--toss-blue)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          <Plus size={18} /> 추가하기
        </button>
      </div>

      {isAdding && (
        <div className="card" style={{ padding: '0', border: '2px solid var(--toss-blue)', marginBottom: '24px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', background: '#f2f4f6', overflowX: 'auto' }}>
            {Object.keys(TEMPLATES).map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{ 
                  flex: 1, padding: '12px 16px', border: 'none', background: 'none', 
                  fontSize: '14px', fontWeight: 'bold', whiteSpace: 'nowrap',
                  color: activeTab === tab ? 'var(--toss-blue)' : 'var(--text-sub)',
                  borderBottom: activeTab === tab ? '2px solid var(--toss-blue)' : '2px solid transparent'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div style={{ padding: '16px' }}>
            {TEMPLATES[activeTab].map(template => (
              <div key={template.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f2f4f6' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '4px' }}>{template.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--gold-dark)', fontWeight: 'bold' }}>스탯 +{template.reward}</div>
                </div>
                <button onClick={() => handleAddTemplate(template)} style={{ padding: '6px 12px', background: 'var(--toss-blue-light)', color: 'var(--toss-blue)', border: 'none', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold' }}>
                  담기
                </button>
              </div>
            ))}
            
            <div style={{ marginTop: '24px', borderTop: '1px solid #e5e8eb', paddingTop: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '12px' }}>직접 나만의 루틴 만들기</div>
              <form onSubmit={handleAddCustom} style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  value={customTitle} 
                  onChange={(e) => setCustomTitle(e.target.value)} 
                  placeholder="예: 영수증 모으기" 
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #d1d6db', fontSize: '14px' }}
                />
                <select 
                  value={customFrequency} 
                  onChange={(e) => setCustomFrequency(e.target.value)}
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d6db', fontSize: '14px', backgroundColor: '#fff' }}
                >
                  <option value="매일">매일</option>
                  <option value="월/수/금">월/수/금</option>
                  <option value="매주 월요일">매주 월요일</option>
                  <option value="소비시">소비시</option>
                </select>
                <button type="submit" style={{ padding: '10px 16px', backgroundColor: 'var(--toss-blue)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
                  추가
                </button>
              </form>
            </div>

            <button onClick={() => setIsAdding(false)} style={{ width: '100%', padding: '12px', marginTop: '16px', borderRadius: '8px', border: 'none', backgroundColor: '#f2f4f6', fontWeight: 'bold', color: 'var(--text-sub)' }}>
              닫기
            </button>
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
