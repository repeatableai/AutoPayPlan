import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { DashboardStackParamList } from '@types/navigation';
import { DashboardWelcomeScreen, DashboardHomeScreen } from '@screens/dashboard';
import { useUserStore } from '@store/userStore';
import { LearnMoreScreen } from '@screens/dashboard/LearnMoreScreen';
import { FinancialIndicatorsScreen } from '@screens/dashboard/FinancialIndicatorsScreen';
import { GoalSelectionScreen } from '@screens/dashboard/GoalSelectionScreen';
import { GoalDetailsScreen } from '@screens/dashboard/GoalDetailsScreen';

const Stack = createStackNavigator<DashboardStackParamList>();

// Wrapper component that conditionally renders based on onboarding status
const DashboardHomeWrapper = () => {
  const isOnboarded = useUserStore(state => state.isOnboarded);

  // If user has completed onboarding, show the summary dashboard
  // Otherwise, show the welcome screen that starts the onboarding flow
  return isOnboarded ? <DashboardHomeScreen /> : <DashboardWelcomeScreen />;
};

export const DashboardNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardHome" component={DashboardHomeWrapper} />
      <Stack.Screen name="LearnMore" component={LearnMoreScreen} />
      <Stack.Screen name="FinancialIndicators" component={FinancialIndicatorsScreen} />
      <Stack.Screen name="GoalSelection" component={GoalSelectionScreen} />
      <Stack.Screen name="GoalDetails" component={GoalDetailsScreen} />
    </Stack.Navigator>
  );
};
