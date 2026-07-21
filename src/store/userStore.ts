import { create } from 'zustand';

interface UserState {
  credits: number;
  hasMyDataConsent: boolean;
  unlockedRealityReport: boolean;
  addCredits: (amount: number) => void;
  useCredit: () => boolean;
  grantMyDataConsent: () => void;
  unlockRealityReport: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  credits: 0,
  hasMyDataConsent: false,
  unlockedRealityReport: false,
  
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
  
  unlockRealityReport: () => set({ unlockedRealityReport: true })
}));
