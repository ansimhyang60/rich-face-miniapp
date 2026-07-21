// 첨부된 관상학 기준(만수르/이건희/김구라/거지 관상)을 바탕으로 한 1500+ 조합의 채점 로직

interface Trait {
  description: string;
  score: number; // 양수는 가산점(부자), 음수는 감점(거지)
}

export const faceTraitsDB = {
  eyes: [
    { description: '눈동자가 작고 공공이 진하며 뚜렷함 (만수르 관상)', score: 15 },
    { description: '눈이 3cm 이상 길고 수려함', score: 10 },
    { description: '눈보다 눈썹이 길어 재물운이 흐름', score: 12 },
    { description: '쌍꺼풀이 짙고 눈망울이 둥글어 귀인상', score: 8 },
    { description: '초점이 없고 흐릿한 눈빛 (재물 손실)', score: -10 },
    { description: '붕어눈처럼 튀어나와 금전운이 새는 상', score: -15 },
    { description: '눈썹 사이에 손가락 두 개 정도가 들어가는 넓은 미간', score: 5 },
  ],
  mouth: [
    { description: '입꼬리가 자연스럽게 위로 올라간 상 (복이 들어옴)', score: 12 },
    { description: '입술이 두툼하고 커서 재물을 담는 그릇이 큼', score: 10 },
    { description: '상하 입술이 다물어질 때 갈매기 날개 모양 (만수르 관상)', score: 15 },
    { description: '항상 벌어져 있어 금전이 새어나가는 입', score: -12 },
    { description: '입술 밖이 쭈글하여 말년운이 고됨', score: -10 },
    { description: '인중 법령선이 곧바르고 적당한 길이라 재물운이 샘솟음', score: 8 },
  ],
  forehead: [
    { description: '이마 가장자리 뼈가 꽉 차있음 (조상의 음덕)', score: 15 },
    { description: '이마가 적당히 튀어나와 부와 명예를 거머쥘 상', score: 12 },
    { description: '인당이 넓직하고 평평한 모습', score: 10 },
    { description: '좁고 찌그러진 이마로 초년운이 불안함', score: -10 },
    { description: '미간에 좁고 사나운 주름이 있어 재물이 막힘', score: -15 },
  ],
  ears: [
    { description: '귓불이 두툼하여 금전운이 풍부함', score: 10 },
    { description: '귓불이 아래로 길게 늘어진 부처님 귀', score: 15 },
    { description: '귀가 전체적으로 크고 또렷하여 명예가 따름', score: 8 },
    { description: '귓불이 얇고 작아 재물이 흩어짐', score: -10 },
    { description: '귀 폭이 좁고 뾰족하여 인덕이 부족함', score: -8 },
  ],
  nose: [
    { description: '코가 도툼하고 넙쩍하여 둥금 (김구라 관상)', score: 12 },
    { description: '정면에서 콧구멍이 보이지 않아 돈이 새지 않음', score: 15 },
    { description: '코등이 볼록하고 바깥쪽으로 굽어 둥그스름함', score: 10 },
    { description: '코가 삐쩍 말라 재물창고가 빈약함', score: -12 },
    { description: '정면에서 콧구멍이 훤히 보여 금전 누수가 심함', score: -15 },
  ],
  jaw: [
    { description: '양 옆의 턱 균형이 완벽하게 맞음', score: 10 },
    { description: '턱이 강하고 단단해 보여 말년 부귀영화가 보장됨', score: 12 },
    { description: '살짝 네모지고 앞턱이 뾰족한 재벌 총수형 턱', score: 15 },
    { description: '무턱이라 추진력과 재물이 부족함', score: -10 },
    { description: '턱이 짧아 끈기가 부족하고 재물운이 단절됨', score: -12 },
  ]
};

// 7 * 6 * 5 * 5 * 5 * 5 = 26,250 가지의 조합 가능 (1500개 이상 조건 충족)

export function generateFaceAnalysis() {
  const selectedTraits: Trait[] = [];
  
  // 각 부위별로 랜덤하게 하나씩 특징을 추출
  const keys = Object.keys(faceTraitsDB) as Array<keyof typeof faceTraitsDB>;
  let totalScore = 50; // 기본 점수 50점 시작 (최소 0, 최대 100 조정을 위함)
  
  keys.forEach(key => {
    const traits = faceTraitsDB[key];
    const randomTrait = traits[Math.floor(Math.random() * traits.length)];
    selectedTraits.push(randomTrait);
    totalScore += randomTrait.score;
  });

  // 점수를 0 ~ 100 사이로 보정
  const normalizedScore = Math.min(Math.max(totalScore, 0), 100);

  return {
    score: normalizedScore,
    traits: selectedTraits
  };
}
