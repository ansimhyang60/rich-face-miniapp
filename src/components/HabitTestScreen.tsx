import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { habitQuestions } from '../utils/habitQuestions';
import { useUserStore } from '../store/userStore';

const OPTIONS = [
  { label: '전혀 아니다', score: 1 },
  { label: '아니다', score: 2 },
  { label: '보통이다', score: 3 },
  { label: '그렇다', score: 4 },
  { label: '매우 그렇다', score: 5 },
];

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
    const allAnswered = currentQuestions.every(q => answers[q.id] !== undefined);
    if (!allAnswered) {
      alert("모든 문항에 답변해주세요.");
      return;
    }

    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      const totalScore = Object.values(answers).reduce((acc, val) => acc + val, 0);
      const scaledScore = Math.round((totalScore / 50) * 100);
      setHabitScore(scaledScore);
      navigate('/result');
    }
  };

  const progressPercent = ((currentPage + 1) / totalPages) * 100;

  return (
    <div className="content-area" style={{ backgroundColor: '#111', minHeight: '100vh', paddingBottom: '120px' }}>
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        <h1 className="title" style={{ fontSize: '24px', color: '#fff' }}>부자되는 습관 테스트</h1>
        <p className="subtitle" style={{ color: '#8b95a1' }}>AI가 안면 구조를 분석하는 동안 습관을 체크해주세요.</p>
        
        {/* Progress Bar */}
        <div style={{ width: '100%', height: '8px', backgroundColor: '#333', borderRadius: '4px', overflow: 'hidden', marginTop: '16px' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: 'var(--gold-main)', transition: 'width 0.3s' }} />
        </div>
        <p style={{ textAlign: 'right', fontSize: '12px', color: '#888', marginTop: '8px' }}>
          {currentPage + 1} / {totalPages} 페이지
        </p>
      </div>

      <div style={{ padding: '0 20px' }}>
        {currentQuestions.map((q, idx) => (
          <div key={q.id} style={{ 
            marginBottom: '24px', 
            background: 'rgba(0,0,0,0.2)', 
            padding: '20px', 
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <p style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '16px', lineHeight: '1.5', color: '#fff' }}>
              <span style={{ color: 'var(--gold-main)', marginRight: '8px' }}>Q{startIndex + idx + 1}.</span>
              {q.text}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {OPTIONS.map((opt, optIdx) => {
                const isSelected = answers[q.id] === opt.score;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelect(q.id, opt.score)}
                    style={{
                      padding: '14px',
                      borderRadius: '12px',
                      border: `1px solid ${isSelected ? 'var(--gold-main)' : 'rgba(255,255,255,0.1)'}`,
                      backgroundColor: isSelected ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                      color: isSelected ? 'var(--gold-main)' : '#d1d6db',
                      textAlign: 'left',
                      fontSize: '14px',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    {opt.label}
                    {isSelected && <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--gold-main)' }} />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        position: 'fixed', 
        bottom: 0, 
        left: '50%', 
        transform: 'translateX(-50%)', 
        width: '100%', 
        maxWidth: '480px', 
        padding: '16px 20px', 
        background: 'linear-gradient(to top, #111 50%, transparent)',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 10
      }}>
        <button 
          className="btn-primary" 
          onClick={handleNext}
          style={{ 
            width: '100%', 
            padding: '16px', 
            fontSize: '16px', 
            fontWeight: 'bold',
            boxShadow: '0 4px 20px rgba(212, 175, 55, 0.4)'
          }}
        >
          {currentPage === totalPages - 1 ? '결과 분석하기 ✨' : `다음 문항으로 (${currentPage + 1}/${totalPages})`}
        </button>
      </div>
    </div>
  );
}
