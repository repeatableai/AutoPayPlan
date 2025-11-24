import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import type { PlanStackParamList } from '../types/navigation';
import { PlanScreen } from '@screens/plan/PlanScreen';
import { ReviewPlanScreen } from '@screens/plan/ReviewPlanScreen';
import { SchedulePaymentScreen } from '@screens/plan/SchedulePaymentScreen';
import { AgreeScreen } from '@screens/plan/AgreeScreen';
import { ConfirmedScreen } from '@screens/plan/ConfirmedScreen';

const Stack = createStackNavigator<PlanStackParamList>();

export const PlanNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PlanHome" component={PlanScreen} />
      <Stack.Screen name="ReviewPlan" component={ReviewPlanScreen} />
      <Stack.Screen name="Schedule" component={SchedulePaymentScreen} />
      <Stack.Screen name="Agree" component={AgreeScreen} />
      <Stack.Screen name="Confirmed" component={ConfirmedScreen} />
    </Stack.Navigator>
  );
};
