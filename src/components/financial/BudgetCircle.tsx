import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { colors, typography } from '@theme';

interface BudgetCircleProps {
  needs: number;
  needsBudget: number;
  wants: number;
  wantsBudget: number;
  savings: number;
  savingsBudget: number;
  size?: number;
}

export const BudgetCircle: React.FC<BudgetCircleProps> = ({
  needs,
  needsBudget,
  wants,
  wantsBudget,
  savings,
  savingsBudget,
  size = 200,
}) => {
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate stroke dash offsets for 50/30/20 segments
  const needsLength = (circumference * 50) / 100;
  const wantsLength = (circumference * 30) / 100;
  const savingsLength = (circumference * 20) / 100;

  const totalSpent = needs + wants + savings;
  const totalBudget = needsBudget + wantsBudget + savingsBudget;
  const remaining = totalBudget - totalSpent;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          {/* Needs segment (50%) - Green */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.categories.needs}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${needsLength} ${circumference - needsLength}`}
            strokeLinecap="round"
          />
          {/* Wants segment (30%) - Purple */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.categories.wants}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${wantsLength} ${circumference - wantsLength}`}
            strokeDashoffset={-needsLength}
            strokeLinecap="round"
          />
          {/* Savings segment (20%) - Teal */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.categories.savings}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${savingsLength} ${circumference - savingsLength}`}
            strokeDashoffset={-(needsLength + wantsLength)}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <View style={styles.centerText}>
        <Text style={styles.remainingLabel}>Remaining</Text>
        <Text style={styles.remainingAmount}>
          ${remaining.toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    position: 'absolute',
    alignItems: 'center',
  },
  remainingLabel: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  remainingAmount: {
    ...typography.h2,
    color: colors.text.primary,
  },
});
