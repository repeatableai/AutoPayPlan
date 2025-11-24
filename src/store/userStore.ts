import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Goal } from '../types/models';

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

      completeOnboarding: () => set({ isOnboarded: true }),

      resetOnboarding: () => set({
        isOnboarded: false,
        isPlanEnrolled: false,
        goals: [],
        retirementAge: null,
        emergencyFundTarget: null,
        financialFears: [],
        budgetPriorities: [],
        debtPayoffPreference: null,
        dateOfBirth: null,
      }),

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
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
