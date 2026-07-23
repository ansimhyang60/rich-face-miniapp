import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanFace, AlertCircle } from 'lucide-react';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import { generateFaceAnalysis } from '../utils/faceLogic';
import { useUserStore } from '../store/userStore';

export default function ScanScreen() {
  const navigate = useNavigate();
  const { setFaceData, photoUrl, setPhotoUrl } = useUserStore();
  
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState('AI 모델을 불러오는 중...');
  const [error, setError] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!photoUrl) {
      navigate('/');
      return;
    }

    let isMounted = true;

    const analyzeFace = async () => {
      try {
        setStepText('전문 AI 얼굴 랜드마크 모델 로딩 중...');
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
        );
        setProgress(30);

        const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
            delegate: "GPU"
          },
          outputFaceBlendshapes: false,
          runningMode: "IMAGE",
          numFaces: 1
        });
        
        if (!isMounted) return;
        setProgress(60);
        setStepText('478개 3D 랜드마크 정밀 스캔 중...');

        if (imgRef.current) {
          const results = faceLandmarker.detect(imgRef.current);
          setProgress(90);

          if (results.faceLandmarks.length === 0) {
            setError('사람의 정면 얼굴을 찾을 수 없습니다. 배경이나 사물이 아닌 진짜 얼굴 사진을 올려주세요.');
            return;
          }

          setStepText('관상학 데이터와 교차 분석 중...');
          
          const landmarks = results.faceLandmarks[0];
          // 미디어파이프 핵심 랜드마크 인덱스 (이마, 눈, 코, 입, 턱)
          const POINT_INDICES = {
            forehead: 10,
            eyes: 159, // 왼쪽 눈동자 (기존 168 미간에서 수정)
            nose: 1, // 코끝
            mouth: 13, // 윗입술
            jaw: 152 // 턱끝
          };

          const faceAnalysis = generateFaceAnalysis();
          
          // 기존 랜덤 traits에 실제 x, y 좌표(비율값) 주입
          const mappedTraits = faceAnalysis.traits.map(trait => {
            const partKey = trait.part as keyof typeof POINT_INDICES;
            const idx = POINT_INDICES[partKey] || 1; 
            const lm = landmarks[idx] || landmarks[1];
            return {
              ...trait,
              x: lm.x * 100, // 0~1 값을 %로 변환
              y: lm.y * 100
            };
          });

          setFaceData(faceAnalysis.score, mappedTraits);
          setProgress(100);
          
          setTimeout(() => {
            if (isMounted) navigate('/test');
          }, 600);
        }
      } catch (err) {
        console.error("Face analysis error:", err);
        setError('분석 중 오류가 발생했습니다. 브라우저가 AI 모델을 지원하지 않을 수 있습니다.');
      }
    };

    // 이미지가 완전히 로드된 후 분석 시작
    if (imgRef.current && imgRef.current.complete) {
      analyzeFace();
    } else if (imgRef.current) {
      imgRef.current.onload = analyzeFace;
    }

    return () => { isMounted = false; };
  }, [navigate, photoUrl, setFaceData]);

  if (error) {
    return (
      <div className="content-area" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '24px' }}>
        <AlertCircle size={48} color="var(--toss-red)" style={{ marginBottom: '16px' }} />
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--toss-red)', marginBottom: '12px' }}>분석 실패</h2>
        <p style={{ textAlign: 'center', fontSize: '15px', lineHeight: '1.5', color: 'var(--text-main)', marginBottom: '32px' }}>
          {error}
        </p>
        <button onClick={() => { setPhotoUrl(''); navigate('/'); }} className="btn-primary">
          다른 사진으로 다시 시도하기
        </button>
      </div>
    );
  }

  return (
    <div className="content-area" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', paddingBottom: '0' }}>
      
      {/* 분석용 숨김 이미지 */}
      {photoUrl && (
        <img 
          ref={imgRef} 
          src={photoUrl} 
          crossOrigin="anonymous" 
          alt="hidden-source" 
          style={{ display: 'none' }} 
        />
      )}

      <div style={{ position: 'relative', width: '200px', height: '200px', marginBottom: '40px' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(rgba(49, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(49, 130, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          borderRadius: '20px',
          overflow: 'hidden'
        }}>
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
      
      <div style={{ width: '80%', height: '6px', backgroundColor: '#e5e8eb', borderRadius: '4px', marginTop: '32px', overflow: 'hidden' }}>
        <div style={{ 
          width: progress + '%', 
          height: '100%', 
          backgroundColor: 'var(--toss-blue)',
          transition: 'width 0.3s ease-out'
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
