import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '@theme';

interface GoalCardProps {
  name: string;
  currentAmount: number;
  targetAmount: number;
  onPress?: () => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  name,
  currentAmount,
  targetAmount,
  onPress,
}) => {
  const percentage = (currentAmount / targetAmount) * 100;
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.percentage}>{percentage.toFixed(0)}%</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${Math.min(percentage, 100)}%` }]} />
      </View>
      <Text style={styles.amount}>
        ${currentAmount.toLocaleString()} of ${targetAmount.toLocaleString()}
      </Text>
    </Component>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  name: typography.h4,
  percentage: { ...typography.h4, color: colors.primary.green },
  progressBar: {
    height: 8,
    backgroundColor: colors.background.gray,
    borderRadius: 4,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary.green,
    borderRadius: 4,
  },
  amount: { ...typography.bodySmall, color: colors.text.secondary },
});
