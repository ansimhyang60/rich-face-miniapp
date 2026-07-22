import { create } from 'zustand';

interface UserState {
  credits: number;
  hasMyDataConsent: boolean;
  unlockedRealityReport: boolean;
  photoUrl: string | null;
  faceScore: number;
  faceTraits: any[];
  habitScore: number;
  addCredits: (amount: number) => void;
  useCredit: () => boolean;
  grantMyDataConsent: () => void;
  unlockRealityReport: () => void;
  setPhotoUrl: (url: string) => void;
  setFaceData: (score: number, traits: any[]) => void;
  setHabitScore: (score: number) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  credits: 0,
  hasMyDataConsent: false,
  unlockedRealityReport: false,
  photoUrl: null,
  faceScore: 0,
  faceTraits: [],
  habitScore: 0,
  
  addCredits: (amount) => set((state) => ({ credits: state.credits + amount })),
  
  useCredit: () => {
    const { credits } = get();
    if (credits > 0) {
      set({ credits: credits - 1 });
      return true;
    }
    return false;
  },

  grantMyDataConsent: () => set({ hasMyDataConsent: true, credits: get().credits + 1 }), // 1 free credit on consent
  
  unlockRealityReport: () => set({ unlockedRealityReport: true }),

  setPhotoUrl: (url) => set({ photoUrl: url }),

  setFaceData: (score, traits) => set({ faceScore: score, faceTraits: traits }),
  
  setHabitScore: (score) => set({ habitScore: score })
}));
