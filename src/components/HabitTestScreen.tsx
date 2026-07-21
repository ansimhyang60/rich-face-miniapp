import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { habitQuestions } from '../utils/habitQuestions';
import { useUserStore } from '../store/userStore';

export default function HabitTestScreen() {
  const navigate = useNavigate();
  const setHabitScore = useUserStore((state) => state.setHabitScore);

  const QUESTIONS_PER_PAGE = 5;
  const totalPages = Math.ceil(habitQuestions.length / QUESTIONS_PER_PAGE);
  
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const currentQuestions = habitQuestions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

  const handleSelect = (questionId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const handleNext = () => {
    // 모든 문항을 다 답했는지 검증
    const allAnswered = currentQuestions.every(q => answers[q.id] !== undefined);
    if (!allAnswered) {
      alert("모든 문항에 답변해주세요.");
      return;
    }

    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // 결과 계산
      const totalScore = Object.values(answers).reduce((acc, val) => acc + val, 0);
      // 50문항 * 최대 5점 = 250점 만점. 100점 만점으로 스케일링
      const scaledScore = Math.round((totalScore / 250) * 100);
      setHabitScore(scaledScore);
      navigate('/result');
    }
  };

  const progressPercent = ((currentPage + 1) / totalPages) * 100;

  return (
    <div className="content-area" style={{ backgroundColor: '#f2f4f6', minHeight: '100vh', paddingBottom: '100px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="title" style={{ fontSize: '24px' }}>부자되는 습관 테스트</h1>
        <p className="subtitle">AI가 사진을 분석하는 동안 습관을 체크해주세요.</p>
        
        {/* Progress Bar */}
        <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e8eb', borderRadius: '4px', overflow: 'hidden', marginTop: '16px' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: 'var(--toss-blue)', transition: 'width 0.3s' }} />
        </div>
        <p style={{ textAlign: 'right', fontSize: '12px', color: 'var(--text-sub)', marginTop: '8px' }}>
          {currentPage + 1} / {totalPages} 페이지
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {currentQuestions.map((q, idx) => (
          <div key={q.id} className="card" style={{ padding: '20px', marginBottom: 0 }}>
            <p style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '16px', lineHeight: '1.5' }}>
              <span style={{ color: 'var(--toss-blue)', marginRight: '8px' }}>Q{startIndex + idx + 1}.</span>
              {q.text}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
              {[
                { label: '전혀', score: 1 },
                { label: '아니다', score: 2 },
                { label: '보통', score: 3 },
                { label: '그렇다', score: 4 },
                { label: '매우', score: 5 },
              ].map((opt) => {
                const isSelected = answers[q.id] === opt.score;
                return (
                  <button
                    key={opt.score}
                    onClick={() => handleSelect(q.id, opt.score)}
                    style={{
                      flex: 1,
                      padding: '12px 0',
                      border: isSelected ? '2px solid var(--toss-blue)' : '1px solid #d1d6db',
                      borderRadius: '12px',
                      backgroundColor: isSelected ? 'rgba(49, 130, 246, 0.1)' : '#fff',
                      color: isSelected ? 'var(--toss-blue)' : 'var(--text-main)',
                      fontWeight: isSelected ? 'bold' : 'normal',
                      fontSize: '13px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="bottom-cta" style={{ background: 'linear-gradient(to top, rgba(242,244,246,1) 80%, rgba(242,244,246,0))' }}>
        <button className="btn-primary" onClick={handleNext}>
          {currentPage < totalPages - 1 ? '다음으로' : '결과 확인하기'}
        </button>
      </div>
    </div>
  );
}
