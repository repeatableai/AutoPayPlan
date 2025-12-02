import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Goal } from '../types/models';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

interface UserState {
  isOnboarded: boolean;
  isPlanEnrolled: boolean;
  goals: Goal[];
  retirementAge: number | null;
  emergencyFundTarget: number | null;
  financialFears: string[];
  budgetPriorities: string[];
  debtPayoffPreference: 'fast' | 'balanced' | 'slow' | null;
  dateOfBirth: string | null;
  userProfile: UserProfile | null;
  profileId: string | null;
  userId: string | null;

  completeOnboarding: () => void;
  resetOnboarding: () => void;
  enrollInPlan: () => void;
  unenrollFromPlan: () => void;
  addGoal: (goal: Goal) => void;
  removeGoal: (goalId: string) => void;
  updateGoal: (goalId: string, updates: Partial<Goal>) => void;
  setRetirementAge: (age: number | null) => void;
  setEmergencyFundTarget: (amount: number | null) => void;
  setFinancialFears: (fears: string[]) => void;
  setBudgetPriorities: (priorities: string[]) => void;
  setDebtPayoffPreference: (preference: 'fast' | 'balanced' | 'slow' | null) => void;
  setDateOfBirth: (date: string) => void;
  setUserProfile: (profile: UserProfile) => void;
  setProfileId: (profileId: string | null) => void;
  setUserId: (userId: string | null) => void;
  signIn: (firstName: string, lastName: string, phoneNumber: string, password: string) => boolean;
  signOut: () => void;
  isAuthenticated: () => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isOnboarded: false,
      isPlanEnrolled: false,
      goals: [],
      retirementAge: null,
      emergencyFundTarget: null,
      financialFears: [],
      budgetPriorities: [],
      debtPayoffPreference: null,
      dateOfBirth: null,
      userProfile: null,
      profileId: null,
      userId: null,

      completeOnboarding: () => set({ isOnboarded: true }),

      resetOnboarding: () => {
        console.log('🔄 RESETTING ALL ONBOARDING DATA');
        set({
          isOnboarded: false,
          isPlanEnrolled: false,
          goals: [],
          retirementAge: null,
          emergencyFundTarget: null,
          financialFears: [],
          budgetPriorities: [],
          debtPayoffPreference: null,
          dateOfBirth: null,
          userProfile: null,
          profileId: null,
          userId: null,
        });
      },

      setProfileId: (profileId) => set({ profileId }),
      setUserId: (userId) => set({ userId }),

      enrollInPlan: () => set({ isPlanEnrolled: true }),

      unenrollFromPlan: () => set({ isPlanEnrolled: false }),

      addGoal: (goal) => set((state) => ({
        goals: [...state.goals, goal]
      })),

      removeGoal: (goalId) => set((state) => ({
        goals: state.goals.filter(g => g.id !== goalId)
      })),

      updateGoal: (goalId, updates) => set((state) => ({
        goals: state.goals.map(g => g.id === goalId ? { ...g, ...updates } : g)
      })),

      setRetirementAge: (age) => set({ retirementAge: age }),

      setEmergencyFundTarget: (amount) => set({ emergencyFundTarget: amount }),

      setFinancialFears: (fears) => set({ financialFears: fears }),

      setBudgetPriorities: (priorities) => set({ budgetPriorities: priorities }),

      setDebtPayoffPreference: (preference) => set({ debtPayoffPreference: preference }),

      setDateOfBirth: (date) => set({ dateOfBirth: date }),

      setUserProfile: (profile) => set({ userProfile: profile }),

      signIn: (firstName, lastName, phoneNumber, password) => {
        const state = useUserStore.getState();
        const profile = state.userProfile;

        if (!profile) {
          return false;
        }

        // Check if credentials match
        const isValid =
          profile.firstName.toLowerCase() === firstName.toLowerCase() &&
          profile.lastName.toLowerCase() === lastName.toLowerCase() &&
          profile.phoneNumber === phoneNumber &&
          profile.password === password;

        return isValid;
      },

      signOut: () => {
        // Don't clear user profile, just navigate away
        // The user data persists for future sign-ins
      },

      isAuthenticated: () => {
        const state = useUserStore.getState();
        return state.userProfile !== null;
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
