import { useState } from 'react';
import { useUserStore } from '../store/userStore';

export function useAds() {
  const addCredits = useUserStore(state => state.addCredits);
  const [isPlayingAd, setIsPlayingAd] = useState(false);

  // 보상형 광고 시청 로직 모의(Mock) 함수
  const showRewardedAd = () => {
    if (isPlayingAd) return;
    setIsPlayingAd(true);
    
    // 실제 환경에서는 AdMob SDK 또는 토스 미니앱 광고 브릿지 호출
    // window.Toss.showAd({ type: 'rewarded' }) ...
    
    alert("[광고] 15초짜리 동영상 광고가 재생됩니다... (테스트 환경에서는 즉시 스킵됩니다)");
    
    setTimeout(() => {
      setIsPlayingAd(false);
      addCredits(1); // 광고 시청 보상
      alert("광고 시청 완료! 분석 로켓(크레딧) 1개가 지급되었습니다.");
    }, 1500);
  };

  return { showRewardedAd, isPlayingAd };
}
