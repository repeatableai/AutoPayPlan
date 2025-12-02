import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { OnboardingStackParamList } from '../types/navigation';
import {
  WelcomeScreen,
  SignInScreen,
  AuthenticationScreen,
  BenefitsScreen,
  FinancialIndicatorsIntroScreen,
  GoalsIntroScreen,
  GoalEntryScreen,
  NonNegotiableGoalScreen,
  RetirementAgeScreen,
  EmergencyFundScreen,
  FinancialFearsScreen,
  GoalsSummaryScreen,
  AccountConnectionConsentScreen,
  DateOfBirthScreen,
  IdentityValidationScreen,
  PasscodeEntryScreen,
  SecurityQuestionsScreen,
  AccountConnectionSuccessScreen,
  FlinksInstitutionSelectionScreen,
  FlinksInstitutionLoginScreen,
  FlinksConnectionSuccessScreen,
  ReviewSummaryScreen,
  EssentialBillsScreen,
  LifestyleExtrasScreen,
  ExpenseReductionScreen,
} from '@screens/onboarding';

const Stack = createStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Authentication" component={AuthenticationScreen} />
      <Stack.Screen name="Benefits" component={BenefitsScreen} />
      <Stack.Screen name="FinancialIndicatorsIntro" component={FinancialIndicatorsIntroScreen} />
      <Stack.Screen name="GoalsIntro" component={GoalsIntroScreen} />
      <Stack.Screen name="GoalEntry" component={GoalEntryScreen} />
      <Stack.Screen name="NonNegotiableGoal" component={NonNegotiableGoalScreen} />
      <Stack.Screen name="RetirementAge" component={RetirementAgeScreen} />
      <Stack.Screen name="EmergencyFund" component={EmergencyFundScreen} />
      <Stack.Screen name="FinancialFears" component={FinancialFearsScreen} />
      <Stack.Screen name="GoalsSummary" component={GoalsSummaryScreen} />
      <Stack.Screen name="AccountConnectionConsent" component={AccountConnectionConsentScreen} />
      <Stack.Screen name="DateOfBirth" component={DateOfBirthScreen} />
      <Stack.Screen name="IdentityValidation" component={IdentityValidationScreen} />
      <Stack.Screen name="PasscodeEntry" component={PasscodeEntryScreen} />
      <Stack.Screen name="SecurityQuestions" component={SecurityQuestionsScreen} />
      <Stack.Screen name="AccountConnectionSuccess" component={AccountConnectionSuccessScreen} />
      <Stack.Screen name="FlinksInstitutionSelection" component={FlinksInstitutionSelectionScreen} />
      <Stack.Screen name="FlinksInstitutionLogin" component={FlinksInstitutionLoginScreen} />
      <Stack.Screen name="FlinksConnectionSuccess" component={FlinksConnectionSuccessScreen} />
      <Stack.Screen name="ReviewSummary" component={ReviewSummaryScreen} />
      <Stack.Screen name="EssentialBills" component={EssentialBillsScreen} />
      <Stack.Screen name="LifestyleExtras" component={LifestyleExtrasScreen} />
      <Stack.Screen name="ExpenseReduction" component={ExpenseReductionScreen} />
    </Stack.Navigator>
  );
};
