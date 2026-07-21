import { useState } from 'react';
import { useUserStore } from '../store/userStore';

export function useTossBridge() {
  const grantMyDataConsent = useUserStore(state => state.grantMyDataConsent);
  const [isRequesting, setIsRequesting] = useState(false);

  // 토스 마이데이터(소비 내역) 연동 동의 브릿지 호출 모의(Mock) 함수
  const requestMyDataConsent = async () => {
    setIsRequesting(true);
    
    // 실제 환경에서는 window.Toss.requestPermission(...) 등을 호출
    return new Promise<{ success: boolean }>((resolve) => {
      setTimeout(() => {
        const agreed = window.confirm("리치 페이스가 토스 소비 내역(마이데이터)에 접근하려고 합니다. 동의하시겠습니까?\n\n(동의 시 무료 분석 1회 제공!)");
        if (agreed) {
          grantMyDataConsent();
          alert("연동 완료! 무료 분석권(크레딧) 1개가 지급되었습니다.");
          resolve({ success: true });
        } else {
          resolve({ success: false });
        }
        setIsRequesting(false);
      }, 500);
    });
  };

  return { requestMyDataConsent, isRequesting };
}
