/**
 * Onboarding Service
 * 
 * Handles syncing onboarding data to Supabase
 */

import { supabase } from './client';
import { createFinancialProfile } from './profileService';
import { useUserStore } from '@store/userStore';

interface OnboardingData {
  // Income & Budget
  monthlyIncome: number;
  needs: number;
  wants: number;
  currentSavings: number;
  
  // Demographics
  currentAge: number;
  retirementAge: number;
  dateOfBirth: string | null;
  
  // Financial Profile
  creditScore?: number;
  primaryFear: string;
  financialFears: string[];
  budgetPriorities: string[];
  debtPayoffPreference: 'fast' | 'balanced' | 'slow' | null;
  
  // Goals
  goals: Array<{
    name: string;
    targetAmount: number;
    deadlineMonths?: number;
    priority: 'must_have' | 'want';
  }>;
}

/**
 * Create or get Supabase user
 */
export async function createOrGetUser(email: string, firstName: string, lastName: string): Promise<string> {
  // Check if user exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (existingUser) {
    return existingUser.id;
  }

  // Create new user
  const { data: newUser, error } = await supabase
    .from('users')
    .insert({ email })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating user:', error);
    throw error;
  }

  return newUser.id;
}

/**
 * Sync onboarding data to Supabase
 */
export async function syncOnboardingToSupabase(data: OnboardingData): Promise<string> {
  const store = useUserStore.getState();
  
  // Get or create user
  const userProfile = store.userProfile;
  if (!userProfile) {
    throw new Error('User profile not found. Please complete authentication first.');
  }

  const userId = await createOrGetUser(
    userProfile.email,
    userProfile.firstName,
    userProfile.lastName
  );

  // Store user ID
  store.setUserId(userId);

  // Calculate remaining
  const remaining = Math.max(0, data.monthlyIncome - data.needs - data.wants);

  // Create financial profile
  const profile = await createFinancialProfile(userId, {
    income: data.monthlyIncome,
    needs: data.needs,
    wants: data.wants,
    remaining: remaining,
    current_savings: data.currentSavings,
    current_age: data.currentAge,
    retirement_age: data.retirementAge,
    primary_fear: data.primaryFear || 'none',
    credit_score: data.creditScore || null,
    biweekly_payments: false, // TODO: Get from onboarding
  });

  // Store profile ID
  store.setProfileId(profile.id);

  // Create credit cards if we have debt data
  // TODO: Extract from onboarding data when available

  // Create loans if we have loan data
  // TODO: Extract from onboarding data when available

  // Create goals
  if (data.goals.length > 0) {
    const goalsToInsert = data.goals.map(goal => ({
      profile_id: profile.id,
      name: goal.name,
      target_amount: goal.targetAmount,
      deadline_months: goal.deadlineMonths || null,
      priority: goal.priority,
      saved_amount: 0,
    }));

    const { error: goalsError } = await supabase
      .from('goals')
      .insert(goalsToInsert);

    if (goalsError) {
      console.error('Error creating goals:', goalsError);
      // Don't throw - profile creation succeeded
    }
  }

  return profile.id;
}

/**
 * Calculate age from date of birth
 */
export function calculateAge(dateOfBirth: string | null): number {
  if (!dateOfBirth) return 0;
  
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}


