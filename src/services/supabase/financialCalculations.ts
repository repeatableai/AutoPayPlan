/**
 * Financial Calculation Service
 * 
 * This service provides functions to call the SQL calculation functions
 * that were migrated from Python. All calculations are performed server-side
 * in Supabase for accuracy and performance.
 */

import { supabase } from './client';

// ============================================================================
// Credit Card Calculations
// ============================================================================

/**
 * Calculate credit card minimum payment
 * @param balance Card balance
 * @param aprPercent APR percentage (e.g., 19.99 for 19.99%)
 * @returns Minimum payment amount
 */
export async function calculateCreditCardMinimum(
  balance: number,
  aprPercent: number
): Promise<number> {
  const { data, error } = await supabase.rpc('calculate_credit_card_minimum', {
    card_balance: balance,
    apr_percent: aprPercent,
  });

  if (error) {
    console.error('Error calculating credit card minimum:', error);
    throw error;
  }

  return parseFloat(data) || 0;
}

// ============================================================================
// Debt-to-Income Calculations
// ============================================================================

/**
 * Calculate debt-to-income ratio for a profile
 * @param profileId User financial profile ID
 * @param includeLoans Whether to include loans in calculation
 * @returns DTI percentage (or Infinity if income is zero)
 */
export async function calculateDebtToIncome(
  profileId: string,
  includeLoans: boolean = true
): Promise<number | 'Infinity'> {
  const { data, error } = await supabase.rpc('calculate_debt_to_income', {
    profile_id: profileId,
    include_loans: includeLoans,
  });

  if (error) {
    console.error('Error calculating DTI:', error);
    throw error;
  }

  // Check if result is infinity
  if (data === 'Infinity' || data === Infinity || !isFinite(data)) {
    return 'Infinity';
  }

  return parseFloat(data) || 0;
}

/**
 * Calculate raw DTI with pre-aggregated values
 * @param monthlyIncome Monthly income
 * @param cardMinimums Sum of credit card minimums
 * @param loanMinimums Sum of loan minimum payments
 * @returns DTI percentage (or Infinity if income is zero)
 */
export async function calculateDebtToIncomeRaw(
  monthlyIncome: number,
  cardMinimums: number,
  loanMinimums: number
): Promise<number | 'Infinity'> {
  const { data, error } = await supabase.rpc('calculate_debt_to_income_raw', {
    monthly_income: monthlyIncome,
    card_minimums: cardMinimums,
    loan_minimums: loanMinimums,
  });

  if (error) {
    console.error('Error calculating DTI raw:', error);
    throw error;
  }

  if (data === 'Infinity' || data === Infinity || !isFinite(data)) {
    return 'Infinity';
  }

  return parseFloat(data) || 0;
}

// ============================================================================
// Credit Utilization Calculations
// ============================================================================

/**
 * Calculate credit utilization percentage for a profile
 * @param profileId User financial profile ID
 * @returns Utilization percentage (0-100+)
 */
export async function calculateCreditUtilization(
  profileId: string
): Promise<number> {
  const { data, error } = await supabase.rpc('calculate_credit_utilization', {
    profile_id: profileId,
  });

  if (error) {
    console.error('Error calculating credit utilization:', error);
    throw error;
  }

  return parseFloat(data) || 0;
}

/**
 * Calculate raw utilization with pre-aggregated values
 * @param totalLimit Total credit limit across all cards
 * @param totalBalance Total balance across all cards
 * @returns Utilization percentage
 */
export async function calculateCreditUtilizationRaw(
  totalLimit: number,
  totalBalance: number
): Promise<number> {
  const { data, error } = await supabase.rpc('calculate_credit_utilization_raw', {
    total_limit: totalLimit,
    total_balance: totalBalance,
  });

  if (error) {
    console.error('Error calculating utilization raw:', error);
    throw error;
  }

  return parseFloat(data) || 0;
}

// ============================================================================
// Emergency Fund Calculations
// ============================================================================

/**
 * Calculate emergency fund target for a profile
 * @param profileId User financial profile ID
 * @param milestoneMap Optional milestone map (JSONB)
 * @returns Emergency fund target amount
 */
export async function calculateEmergencyFundTarget(
  profileId: string,
  milestoneMap?: Record<string, any>
): Promise<number> {
  const { data, error } = await supabase.rpc('calculate_emergency_fund_target', {
    profile_id: profileId,
    milestone_map: milestoneMap || null,
  });

  if (error) {
    console.error('Error calculating emergency fund target:', error);
    throw error;
  }

  return parseFloat(data) || 0;
}

/**
 * Alias for calculateEmergencyFundTarget (matches Python function name)
 */
export async function getEmergencyFundTarget(
  profileId: string,
  milestoneMap?: Record<string, any>
): Promise<number> {
  return calculateEmergencyFundTarget(profileId, milestoneMap);
}

/**
 * Calculate months needed to fund emergency fund
 * @param profileId User financial profile ID
 * @param monthlyAllocation Monthly allocation toward emergency fund
 * @param milestoneMap Optional milestone map
 * @returns Number of months (or null if allocation is zero)
 */
export async function calculateMonthsToFundEmergency(
  profileId: string,
  monthlyAllocation: number,
  milestoneMap?: Record<string, any>
): Promise<number | null> {
  const { data, error } = await supabase.rpc('calculate_months_to_fund_emergency', {
    profile_id: profileId,
    monthly_allocation: monthlyAllocation,
    milestone_map: milestoneMap || null,
  });

  if (error) {
    console.error('Error calculating months to fund emergency:', error);
    throw error;
  }

  return data !== null ? parseInt(data) : null;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get configuration value
 * @param configKey Configuration key
 * @returns Configuration value
 */
export async function getConfigValue(configKey: string): Promise<number> {
  const { data, error } = await supabase.rpc('get_config_value', {
    config_key: configKey,
  });

  if (error) {
    console.error(`Error getting config value for ${configKey}:`, error);
    throw error;
  }

  return parseFloat(data) || 0;
}


