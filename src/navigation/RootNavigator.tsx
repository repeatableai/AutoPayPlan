import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { RootStackParamList } from '../types/navigation';
import { useUserStore } from '@store/userStore';
import { OnboardingNavigator } from './OnboardingNavigator';
import { MainNavigator } from './MainNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const isOnboarded = useUserStore((state) => state.isOnboarded);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated());

  // If user is authenticated (has userProfile), go directly to Main
  // Otherwise, if user is onboarded, still go to Main (they completed setup before auth was added)
  // Otherwise, go to Onboarding
  const initialRoute = isAuthenticated || isOnboarded ? 'Main' : 'Onboarding';

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={initialRoute}
      >
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        <Stack.Screen name="Main" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
