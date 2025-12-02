# Frontend Integration Guide

## Overview

This guide explains how to integrate the SQL financial calculation backend with your React Native frontend app.

## ✅ What's Been Done

1. **SQL Functions Deployed**: All financial calculation functions are deployed to Supabase
2. **Service Layer Created**: TypeScript service functions to call SQL functions
3. **Type Definitions**: TypeScript types for database schema

## 🔧 Setup Required

### 1. Install Supabase Client

```bash
npm install @supabase/supabase-js
# or
yarn add @supabase/supabase-js
```

### 2. Configure Environment Variables

Create a `.env` file in your project root:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

To get these values:
1. Go to your Supabase project dashboard
2. Settings → API
3. Copy the "Project URL" and "anon public" key

### 3. Update Your Store to Sync with Supabase

The `userStore.ts` currently uses local storage. You'll need to:

1. **Create/Update Profile in Supabase** when onboarding completes
2. **Sync financial data** to Supabase tables
3. **Call calculation functions** instead of using mock data

## 📝 Integration Steps

### Step 1: Create Profile Service

Create `src/services/supabase/profileService.ts`:

```typescript
import { supabase } from './client';
import { Database } from './types';

type Profile = Database['public']['Tables']['user_financial_profiles']['Row'];

export async function createFinancialProfile(
  userId: string,
  profileData: {
    income: number;
    needs: number;
    wants: number;
    current_savings: number;
    current_age: number;
    retirement_age: number;
    primary_fear: string;
    credit_score?: number;
  }
): Promise<Profile> {
  const { data, error } = await supabase
    .from('user_financial_profiles')
    .insert({
      user_id: userId,
      ...profileData,
      remaining: profileData.income - profileData.needs - profileData.wants,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getFinancialProfile(profileId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('user_financial_profiles')
    .select('*')
    .eq('id', profileId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }
  return data;
}
```

### Step 2: Update Dashboard to Use Real Calculations

Update `src/screens/dashboard/DashboardHomeScreen.tsx`:

```typescript
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import { useUserStore } from '@store/userStore';
import { 
  calculateDebtToIncome, 
  calculateCreditUtilization,
  calculateEmergencyFundTarget 
} from '@services/supabase';
import { getFinancialProfile } from '@services/supabase/profileService';

export const DashboardHomeScreen = () => {
  const navigation = useNavigation();
  const resetOnboarding = useUserStore(state => state.resetOnboarding);
  
  const [profileId, setProfileId] = useState<string | null>(null);
  const [dti, setDti] = useState<number | 'Infinity' | null>(null);
  const [utilization, setUtilization] = useState<number | null>(null);
  const [emergencyTarget, setEmergencyTarget] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFinancialData();
  }, []);

  const loadFinancialData = async () => {
    try {
      // TODO: Get profileId from your store/auth
      // For now, get the first profile (you'll need to implement proper auth)
      const profile = await getFinancialProfile('your-profile-id');
      
      if (profile) {
        setProfileId(profile.id);
        
        // Calculate DTI
        const dtiResult = await calculateDebtToIncome(profile.id);
        setDti(dtiResult);
        
        // Calculate utilization
        const utilResult = await calculateCreditUtilization(profile.id);
        setUtilization(utilResult);
        
        // Calculate emergency fund target
        const efTarget = await calculateEmergencyFundTarget(profile.id);
        setEmergencyTarget(efTarget);
      }
    } catch (error) {
      console.error('Error loading financial data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Use real data from profile instead of mock data
  // const monthlyIncome = profile?.income || 0;
  // const needs = profile?.needs || 0;
  // etc.

  // ... rest of component
};
```

### Step 3: Update DebtCard to Use Real Calculations

Update `src/components/financial/DebtCard.tsx` to calculate minimum payment:

```typescript
import { calculateCreditCardMinimum } from '@services/supabase';
import { useEffect, useState } from 'react';

// In your component:
const [calculatedMinPayment, setCalculatedMinPayment] = useState(minimumPayment);

useEffect(() => {
  calculateCreditCardMinimum(balance, interestRate)
    .then(setCalculatedMinPayment)
    .catch(console.error);
}, [balance, interestRate]);
```

### Step 4: Sync Onboarding Data to Supabase

When onboarding completes, create the profile:

```typescript
// In your onboarding completion handler
import { createFinancialProfile } from '@services/supabase/profileService';

const completeOnboarding = async () => {
  // Get user ID (you'll need to implement auth)
  const userId = await getCurrentUserId();
  
  // Create financial profile
  const profile = await createFinancialProfile(userId, {
    income: monthlyIncome,
    needs: totalNeeds,
    wants: totalWants,
    current_savings: currentSavings,
    current_age: currentAge,
    retirement_age: retirementAge,
    primary_fear: primaryFear,
    credit_score: creditScore,
  });
  
  // Store profile ID in your store
  useUserStore.getState().setProfileId(profile.id);
  
  // Complete onboarding
  useUserStore.getState().completeOnboarding();
};
```

## 🎯 Key Integration Points

### 1. Credit Card Minimum Payments
- **Before**: Hardcoded or client-side calculation
- **After**: Call `calculateCreditCardMinimum(balance, aprPercent)`
- **Where**: DebtCard component, payment calculations

### 2. Debt-to-Income Ratio
- **Before**: Not calculated
- **After**: Call `calculateDebtToIncome(profileId, includeLoans)`
- **Where**: Financial indicators screen, dashboard

### 3. Credit Utilization
- **Before**: Not calculated
- **After**: Call `calculateCreditUtilization(profileId)`
- **Where**: Financial indicators screen, credit health

### 4. Emergency Fund Target
- **Before**: User input or hardcoded
- **After**: Call `calculateEmergencyFundTarget(profileId, milestoneMap)`
- **Where**: Emergency fund screen, dashboard

### 5. Months to Fund Emergency
- **Before**: Not calculated
- **After**: Call `calculateMonthsToFundEmergency(profileId, monthlyAllocation)`
- **Where**: Emergency fund planning, goal timelines

## 📊 Data Flow

```
Frontend Component
    ↓
Service Function (financialCalculations.ts)
    ↓
Supabase RPC Call
    ↓
SQL Function (in Supabase)
    ↓
Database Tables (user_financial_profiles, credit_cards, loans)
    ↓
Return Calculated Result
    ↓
Update UI
```

## 🔐 Authentication Setup

You'll need to implement Supabase authentication:

```typescript
import { supabase } from '@services/supabase';

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password',
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
});

// Get current user
const { data: { user } } = await supabase.auth.getUser();
```

## 🧪 Testing

Test the integration:

```typescript
import { 
  calculateCreditCardMinimum,
  calculateDebtToIncome,
  calculateCreditUtilization 
} from '@services/supabase';

// Test credit card minimum
const minPayment = await calculateCreditCardMinimum(5000, 19.99);
console.log('Min payment:', minPayment); // Should be ~134

// Test DTI (requires profile with cards/loans)
const dti = await calculateDebtToIncome('profile-id', true);
console.log('DTI:', dti);

// Test utilization
const util = await calculateCreditUtilization('profile-id');
console.log('Utilization:', util);
```

## ⚠️ Important Notes

1. **Profile ID Required**: Most functions need a `profile_id`. Make sure you:
   - Create a profile when onboarding completes
   - Store the profile ID in your store
   - Pass it to calculation functions

2. **Error Handling**: All service functions throw errors. Wrap calls in try/catch:

```typescript
try {
  const dti = await calculateDebtToIncome(profileId);
  // Use dti
} catch (error) {
  console.error('Failed to calculate DTI:', error);
  // Show error to user or use fallback
}
```

3. **Loading States**: Calculations are async. Show loading indicators:

```typescript
const [loading, setLoading] = useState(true);
const [dti, setDti] = useState<number | null>(null);

useEffect(() => {
  setLoading(true);
  calculateDebtToIncome(profileId)
    .then(setDti)
    .finally(() => setLoading(false));
}, [profileId]);
```

4. **Caching**: Consider caching calculation results to avoid repeated calls:

```typescript
// Simple cache example
const calculationCache = new Map<string, { value: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getCachedDTI(profileId: string) {
  const cacheKey = `dti-${profileId}`;
  const cached = calculationCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.value;
  }
  
  const dti = await calculateDebtToIncome(profileId);
  calculationCache.set(cacheKey, { value: dti, timestamp: Date.now() });
  return dti;
}
```

## 🚀 Next Steps

1. ✅ Install Supabase client
2. ✅ Set up environment variables
3. ✅ Implement authentication
4. ✅ Create profile service
5. ✅ Update components to use real calculations
6. ✅ Sync onboarding data to Supabase
7. ✅ Test all calculations
8. ✅ Add error handling and loading states

## 📚 Resources

- [Supabase JS Client Docs](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase RPC Functions](https://supabase.com/docs/guides/api/rpc)
- SQL Functions Documentation: `Financial-Brain/sql/docs/`


