/**
 * Hook for Financial Calculations
 * 
 * Provides easy access to financial calculation functions with loading states
 */

import { useState, useEffect, useCallback } from 'react';
import {
  calculateDebtToIncome,
  calculateCreditUtilization,
  calculateEmergencyFundTarget,
  calculateMonthsToFundEmergency,
  calculateCreditCardMinimum,
} from '@services/supabase';

interface UseFinancialCalculationsOptions {
  profileId: string | null;
  enabled?: boolean;
}

export function useFinancialCalculations({ profileId, enabled = true }: UseFinancialCalculationsOptions) {
  const [dti, setDti] = useState<number | 'Infinity' | null>(null);
  const [utilization, setUtilization] = useState<number | null>(null);
  const [emergencyTarget, setEmergencyTarget] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refreshCalculations = useCallback(async () => {
    if (!profileId || !enabled) return;

    setLoading(true);
    setError(null);

    try {
      // Calculate all metrics in parallel
      const [dtiResult, utilResult, efTarget] = await Promise.all([
        calculateDebtToIncome(profileId, true),
        calculateCreditUtilization(profileId),
        calculateEmergencyFundTarget(profileId),
      ]);

      setDti(dtiResult);
      setUtilization(utilResult);
      setEmergencyTarget(efTarget);
    } catch (err) {
      console.error('Error calculating financial metrics:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [profileId, enabled]);

  useEffect(() => {
    refreshCalculations();
  }, [refreshCalculations]);

  return {
    dti,
    utilization,
    emergencyTarget,
    loading,
    error,
    refreshCalculations,
  };
}

/**
 * Hook for calculating months to fund emergency fund
 */
export function useMonthsToFundEmergency(
  profileId: string | null,
  monthlyAllocation: number | null
) {
  const [months, setMonths] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!profileId || monthlyAllocation === null || monthlyAllocation <= 0) {
      setMonths(null);
      return;
    }

    setLoading(true);
    setError(null);

    calculateMonthsToFundEmergency(profileId, monthlyAllocation)
      .then(setMonths)
      .catch((err) => {
        console.error('Error calculating months to fund emergency:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      })
      .finally(() => setLoading(false));
  }, [profileId, monthlyAllocation]);

  return { months, loading, error };
}

/**
 * Hook for calculating credit card minimum payment
 */
export function useCreditCardMinimum(balance: number, aprPercent: number) {
  const [minPayment, setMinPayment] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (balance <= 0 || aprPercent < 0) {
      setMinPayment(0);
      return;
    }

    setLoading(true);
    setError(null);

    calculateCreditCardMinimum(balance, aprPercent)
      .then(setMinPayment)
      .catch((err) => {
        console.error('Error calculating credit card minimum:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setMinPayment(null);
      })
      .finally(() => setLoading(false));
  }, [balance, aprPercent]);

  return { minPayment, loading, error };
}


