import { ArrowLeft, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RankingScreen() {
  const navigate = useNavigate();
  const mockRanking = [
    { rank: 1, name: '김토스', score: 98, title: '천만장자' },
    { rank: 2, name: '이마크', score: 92, title: '스타트업 대표' },
    { rank: 3, name: '나 (User)', score: 85, title: '영앤리치' },
    { rank: 4, name: '박테슬라', score: 77, title: '월급루팡' },
    { rank: 5, name: '최머스크', score: 45, title: '탕후루 중독자' },
  ];

  return (
    <div className="content-area">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
        <ArrowLeft size={28} style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
        <h1 style={{ marginLeft: '16px', fontSize: '20px', fontWeight: 'bold', margin: 0 }}>전체 랭킹</h1>
      </div>

      <div style={{ backgroundColor: 'var(--gold-light)', padding: '24px', borderRadius: '20px', marginBottom: '24px', textAlign: 'center' }}>
        <Crown size={48} color="var(--gold-dark)" style={{ marginBottom: '12px' }} />
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--gold-dark)' }}>내 관상은 상위 15%</h2>
        <p style={{ fontSize: '14px', color: '#a07a00', marginTop: '8px' }}>친구들을 초대해서 순위를 뒤집어보세요!</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {mockRanking.map((user) => (
          <div key={user.rank} style={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
            padding: '16px', backgroundColor: user.name.includes('나') ? 'rgba(49, 130, 246, 0.1)' : '#fff',
            borderRadius: '16px', border: user.name.includes('나') ? '1px solid var(--toss-blue)' : '1px solid #f0f0f0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                width: '32px', height: '32px', borderRadius: '16px', 
                backgroundColor: user.rank <= 3 ? 'var(--gold-dark)' : '#f2f4f6', 
                color: user.rank <= 3 ? '#fff' : 'var(--text-sub)',
                display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold'
              }}>
                {user.rank}
              </div>
              <div>
                <p style={{ fontSize: '15px', fontWeight: 'bold' }}>{user.name}</p>
                <p style={{ fontSize: '12px', color: 'var(--text-sub)' }}>{user.title} 관상</p>
              </div>
            </div>
            <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--toss-blue)' }}>
              {user.score}점
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
