// ============================================================================
// USER & PROFILE
// ============================================================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: Date;
  createdAt: Date;
  onboardingComplete: boolean;

  // Financial profile
  retirementAge?: number;
  emergencyFundTarget?: number;
  financialFears?: string[];
  budgetPriorities?: string[];
  debtPayoffPreference?: 'fast' | 'balanced' | 'slow';
  expenseReductionPrefs?: Record<string, number>; // category: percentage
}

// ============================================================================
// ACCOUNTS & CONNECTIONS
// ============================================================================

export interface Account {
  id: string;
  userId: string;
  institutionId: string;
  institutionName: string;
  institutionLogo?: string;

  // Account details
  accountType: 'checking' | 'savings' | 'credit_card' | 'loan' | 'investment';
  accountName: string;
  accountNumber: string; // last 4 digits

  // Balances
  currentBalance: number;
  availableBalance?: number;
  creditLimit?: number; // for credit cards

  // Loan specific
  interestRate?: number;
  minimumPayment?: number;
  dueDate?: number; // day of month
  payoffDate?: Date;

  // Metadata
  currency: string;
  isActive: boolean;
  lastSynced: Date;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  accountId: string;
  userId: string;

  // Transaction details
  date: Date;
  description: string;
  merchant?: string;
  amount: number; // negative for debits, positive for credits
  category: string;
  subcategory?: string;

  // Classification
  budgetCategory: 'needs' | 'wants' | 'savings';
  isRecurring: boolean;
  recurringFrequency?: 'weekly' | 'biweekly' | 'monthly' | 'annual';

  // Status
  pending: boolean;
  createdAt: Date;
}

export interface InstitutionConnection {
  id: string;
  userId: string;
  institutionId: string;
  institutionName: string;

  // Flinks data
  loginId: string;
  requestId: string;

  // Status
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  lastSynced: Date;
  createdAt: Date;
}

// ============================================================================
// BUDGET
// ============================================================================

export interface Budget {
  id: string;
  userId: string;
  month: number; // 1-12
  year: number;

  // Income
  monthlyIncome: number;
  incomeSource: IncomeSource[];

  // 50/30/20 Allocation
  needsBudget: number; // 50%
  wantsBudget: number; // 30%
  savingsBudget: number; // 20%

  // Actual Spending
  needsSpent: number;
  wantsSpent: number;
  savingsContributed: number;

  // Categories
  needsCategories: CategoryBudget[];
  wantsCategories: CategoryBudget[];

  createdAt: Date;
  updatedAt: Date;
}

export interface IncomeSource {
  id: string;
  name: string;
  amount: number;
  frequency: 'weekly' | 'biweekly' | 'monthly';
  isActive: boolean;
}

export interface CategoryBudget {
  category: string;
  budgeted: number;
  spent: number;
  transactions: number; // count
}

// ============================================================================
// GOALS
// ============================================================================

export interface Goal {
  id: string;
  userId: string;

  // Goal details
  name: string;
  targetAmount: number;
  currentAmount: number;
  monthlyContribution: number;

  // Timeline
  targetDate?: Date;
  projectedCompletionDate: Date;
  startDate: Date;
  completedDate?: Date;

  // Classification
  category: 'emergency' | 'home' | 'retirement' | 'vacation' | 'education' | 'other';
  priority: 'low' | 'medium' | 'high';
  icon?: string;

  // Status
  status: 'active' | 'completed' | 'paused';
  isOnTrack: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface GoalContribution {
  id: string;
  goalId: string;
  amount: number;
  date: Date;
  source?: string;
  notes?: string;
}

// ============================================================================
// AUTOPAYPLAN
// ============================================================================

export interface AutoPayPlan {
  id: string;
  userId: string;

  // Plan details
  status: 'active' | 'paused' | 'cancelled' | 'completed';
  startDate: Date;
  projectedEndDate: Date;
  actualEndDate?: Date;

  // Payment schedule
  paymentFrequency: 'weekly' | 'biweekly';
  paymentAmount: number;
  paymentDay: number; // day of week (0-6) or day of month
  nextPaymentDate: Date;
  lastPaymentDate?: Date;
  lastPaycheckDate: Date;

  // Enrolled debts
  enrolledDebts: EnrolledDebt[];

  // Projections
  totalDebtAtStart: number;
  totalDebtCurrent: number;
  totalInterestWithoutPlan: number;
  totalInterestWithPlan: number;
  totalSavings: number;
  monthsToPayoffWithoutPlan: number;
  monthsToPayoffWithPlan: number;

  // Subscription
  subscriptionFee: number; // $0 for first 6 months
  subscriptionWaivedUntil: Date;

  createdAt: Date;
  updatedAt: Date;
}

export interface EnrolledDebt {
  id: string;
  planId: string;
  accountId: string;

  // Debt details
  creditorName: string;
  accountNumber: string; // last 4
  debtType: 'credit_card' | 'personal_loan' | 'auto_loan' | 'student_loan';

  // Balances
  originalBalance: number;
  currentBalance: number;
  interestRate: number;
  minimumPayment: number;

  // Plan allocation
  paymentPriority: number; // 1 = highest
  extraPayment: number;
  totalMonthlyPayment: number;

  // Projections
  projectedPayoffDate: Date;
  projectedTotalInterest: number;

  // Status
  isActive: boolean;
  paidOffDate?: Date;
}

export interface PlanPayment {
  id: string;
  planId: string;

  // Payment details
  date: Date;
  amount: number;
  status: 'scheduled' | 'processing' | 'completed' | 'failed';

  // Distribution
  distributions: PaymentDistribution[];

  createdAt: Date;
}

export interface PaymentDistribution {
  debtId: string;
  creditorName: string;
  amount: number;
  status: 'scheduled' | 'processing' | 'completed' | 'failed';
}

// ============================================================================
// FINANCIAL FITNESS
// ============================================================================

export interface FinancialFitnessPlan {
  id: string;
  userId: string;

  // Score
  currentScore: number; // 0-100
  previousScore?: number;
  scoreChange?: number;
  scoreDate: Date;

  // Score breakdown
  budgetManagementScore: number; // /25
  debtManagementScore: number; // /25
  savingsProgressScore: number; // /25
  financialHabitsScore: number; // /25

  // Milestones
  milestones: FitnessMilestone[];

  // History
  scoreHistory: ScoreHistoryPoint[];

  createdAt: Date;
  updatedAt: Date;
}

export interface FitnessMilestone {
  id: string;
  planId: string;

  // Milestone details
  name: string;
  description: string;
  category: 'budget' | 'debt' | 'savings' | 'habits';
  targetValue: number;
  currentValue: number;
  unit: string;

  // Steps
  steps: MilestoneStep[];

  // Timeline
  estimatedCompletion: Date;
  completedDate?: Date;

  // Status
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number; // 0-100

  createdAt: Date;
}

export interface MilestoneStep {
  id: string;
  description: string;
  isCompleted: boolean;
  completedDate?: Date;
  tips?: string[];
}

export interface ScoreHistoryPoint {
  date: Date;
  score: number;
  budgetScore: number;
  debtScore: number;
  savingsScore: number;
  habitsScore: number;
}

// ============================================================================
// CREDIT REPORT (TransUnion)
// ============================================================================

export interface CreditReport {
  id: string;
  userId: string;

  // Credit score
  creditScore: number;
  scoreRange: 'poor' | 'fair' | 'good' | 'very_good' | 'excellent';
  reportDate: Date;

  // Credit accounts
  creditCards: CreditAccount[];
  loans: LoanAccount[];

  // Summary
  totalAccounts: number;
  openAccounts: number;
  closedAccounts: number;
  totalCreditLimit: number;
  totalBalance: number;
  creditUtilization: number; // percentage

  // Payment history
  onTimePayments: number;
  latePayments: number;
  missedPayments: number;

  createdAt: Date;
}

export interface CreditAccount {
  creditor: string;
  accountNumber: string; // last 4
  accountType: string;
  balance: number;
  creditLimit: number;
  utilization: number;
  interestRate: number;
  minimumPayment: number;
  dueDate: number; // day of month
  openDate: Date;
  status: 'open' | 'closed';
}

export interface LoanAccount {
  lender: string;
  accountNumber: string; // last 4
  loanType: 'auto' | 'personal' | 'student' | 'mortgage';
  originalAmount: number;
  currentBalance: number;
  interestRate: number;
  monthlyPayment: number;
  dueDate: number; // day of month
  originationDate: Date;
  maturityDate: Date;
  status: 'open' | 'closed' | 'default';
}
