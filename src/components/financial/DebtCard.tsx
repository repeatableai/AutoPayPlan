import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '@theme';

interface DebtCardProps {
  creditorName: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
  payoffMonthsWithoutPlan: number;
  payoffMonthsWithPlan: number;
}

export const DebtCard: React.FC<DebtCardProps> = ({
  creditorName,
  balance,
  interestRate,
  minimumPayment,
  payoffMonthsWithoutPlan,
  payoffMonthsWithPlan,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.creditor}>{creditorName}</Text>
      <Text style={styles.balance}>${balance.toLocaleString()}</Text>
      <Text style={styles.details}>
        {interestRate}% APR • ${minimumPayment}/mo minimum
      </Text>
      <View style={styles.comparison}>
        <View>
          <Text style={styles.label}>Without Plan:</Text>
          <Text style={styles.value}>{payoffMonthsWithoutPlan} months</Text>
        </View>
        <View>
          <Text style={[styles.label, styles.withPlan]}>With Plan:</Text>
          <Text style={[styles.value, styles.withPlan]}>
            {payoffMonthsWithPlan} months
          </Text>
        </View>
      </View>
    </View>
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
  creditor: { ...typography.h4, marginBottom: spacing.xs },
  balance: { ...typography.h2, marginBottom: spacing.sm },
  details: { ...typography.bodySmall, color: colors.text.secondary, marginBottom: spacing.md },
  comparison: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: { ...typography.caption, color: colors.text.secondary },
  value: { ...typography.body, fontWeight: '600' },
  withPlan: { color: colors.primary.green },
});
