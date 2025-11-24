import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// Root Stack Navigator
export type RootStackParamList = {
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

// Onboarding Stack Navigator
export type OnboardingStackParamList = {
  Welcome: undefined;
  Benefits: undefined;
  FinancialIndicatorsIntro: undefined;
  GoalsIntro: undefined;
  GoalEntry: undefined;
  RetirementAge: undefined;
  EmergencyFund: undefined;
  FinancialFears: undefined;
  GoalsSummary: undefined;
  AccountConnectionConsent: undefined;
  DateOfBirth: undefined;
  IdentityValidation: undefined;
  PasscodeEntry: undefined;
  SecurityQuestions: undefined;
  AccountConnectionSuccess: undefined;
  FlinksInstitutionSelection: undefined;
  FlinksInstitutionLogin: { institutionId: string; institutionName: string };
  FlinksConnectionSuccess: undefined;
  ReviewSummary: undefined;
  EssentialBills: undefined;
  LifestyleExtras: undefined;
  ExpenseReduction: undefined;
};

// Dashboard Stack Navigator
export type DashboardStackParamList = {
  DashboardHome: undefined;
  LearnMore: undefined;
  FinancialIndicators: undefined;
  GoalSelection: undefined;
  GoalDetails: { goalType: 'short-term' | 'long-term'; goalId?: string };
};

// Plan Stack Navigator
export type PlanStackParamList = {
  PlanHome: undefined;
  ReviewPlan: undefined;
  Schedule: undefined;
  Agree: undefined;
  Confirmed: undefined;
};

// More Stack Navigator
export type MoreStackParamList = {
  MoreHome: undefined;
  Profile: undefined;
  AddAccount: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  Dashboard: NavigatorScreenParams<DashboardStackParamList>;
  AutoPayPlan: NavigatorScreenParams<PlanStackParamList>;
  Insurance: undefined;
  Service: undefined;
  More: NavigatorScreenParams<MoreStackParamList>;
};

// Navigation Props
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
export type OnboardingStackNavigationProp = StackNavigationProp<OnboardingStackParamList>;
export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;

// Declare global navigation type
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
