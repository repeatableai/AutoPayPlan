/**
 * Supabase Database Types
 * 
 * This file should be generated from your Supabase schema.
 * For now, we'll define the minimal types needed for the financial calculations.
 */

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_financial_profiles: {
        Row: {
          id: string;
          user_id: string;
          income: number;
          needs: number;
          wants: number;
          remaining: number;
          current_savings: number;
          current_retirement_savings: number;
          credit_score: number | null;
          current_age: number;
          retirement_age: number;
          primary_fear: string;
          biweekly_payments: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          income: number;
          needs?: number;
          wants?: number;
          remaining?: number;
          current_savings?: number;
          current_retirement_savings?: number;
          credit_score?: number | null;
          current_age: number;
          retirement_age: number;
          primary_fear?: string;
          biweekly_payments?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          income?: number;
          needs?: number;
          wants?: number;
          remaining?: number;
          current_savings?: number;
          current_retirement_savings?: number;
          credit_score?: number | null;
          current_age?: number;
          retirement_age?: number;
          primary_fear?: string;
          biweekly_payments?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      credit_cards: {
        Row: {
          id: string;
          profile_id: string;
          name: string;
          balance: number;
          credit_limit: number;
          interest_rate: number;
          min_payment: number | null;
          initial_min_payment: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          name: string;
          balance?: number;
          credit_limit: number;
          interest_rate?: number;
          min_payment?: number | null;
          initial_min_payment?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          name?: string;
          balance?: number;
          credit_limit?: number;
          interest_rate?: number;
          min_payment?: number | null;
          initial_min_payment?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      loans: {
        Row: {
          id: string;
          profile_id: string;
          loan_type: string;
          balance: number;
          interest_rate: number;
          min_payment: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          loan_type: string;
          balance?: number;
          interest_rate?: number;
          min_payment: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          loan_type?: string;
          balance?: number;
          interest_rate?: number;
          min_payment?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Functions: {
      calculate_credit_card_minimum: {
        Args: {
          card_balance: number;
          apr_percent: number;
        };
        Returns: number;
      };
      calculate_debt_to_income: {
        Args: {
          profile_id: string;
          include_loans?: boolean;
        };
        Returns: number;
      };
      calculate_debt_to_income_raw: {
        Args: {
          monthly_income: number;
          card_minimums: number;
          loan_minimums: number;
        };
        Returns: number;
      };
      calculate_credit_utilization: {
        Args: {
          profile_id: string;
        };
        Returns: number;
      };
      calculate_credit_utilization_raw: {
        Args: {
          total_limit: number;
          total_balance: number;
        };
        Returns: number;
      };
      calculate_emergency_fund_target: {
        Args: {
          profile_id: string;
          milestone_map?: Record<string, any> | null;
        };
        Returns: number;
      };
      get_emergency_fund_target: {
        Args: {
          profile_id: string;
          milestone_map?: Record<string, any> | null;
        };
        Returns: number;
      };
      calculate_months_to_fund_emergency: {
        Args: {
          profile_id: string;
          monthly_allocation: number;
          milestone_map?: Record<string, any> | null;
        };
        Returns: number | null;
      };
      get_config_value: {
        Args: {
          config_key: string;
        };
        Returns: number;
      };
    };
  };
}


