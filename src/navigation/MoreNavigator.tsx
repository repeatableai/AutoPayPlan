import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { MoreStackParamList } from '../types/navigation';
import { MoreScreen } from '@screens/more/MoreScreen';
import { ProfileScreen } from '@screens/more/ProfileScreen';
import { AddAccountScreen } from '@screens/more/AddAccountScreen';

const Stack = createStackNavigator<MoreStackParamList>();

export const MoreNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MoreHome" component={MoreScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="AddAccount" component={AddAccountScreen} />
    </Stack.Navigator>
  );
};
