import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '@theme';

interface PaymentScheduleItemProps {
  date: string;
  amount: number;
  status: 'scheduled' | 'completed' | 'failed';
}

export const PaymentScheduleItem: React.FC<PaymentScheduleItemProps> = ({
  date,
  amount,
  status,
}) => {
  const statusColors = {
    completed: colors.status.success,
    failed: colors.status.error,
    scheduled: colors.text.secondary,
  };

  return (
    <View style={styles.item}>
      <View style={[styles.statusIcon, { backgroundColor: statusColors[status] }]}>
        <Text style={styles.iconText}>
          {status === 'completed' ? '✓' : status === 'failed' ? '✗' : '○'}
        </Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.status}>{status}</Text>
      </View>
      <Text style={styles.amount}>${amount.toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  statusIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  iconText: { color: colors.background.white, fontSize: 16, fontWeight: 'bold' },
  details: { flex: 1 },
  date: typography.body,
  status: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: 2,
    textTransform: 'capitalize',
  },
  amount: { ...typography.h4, color: colors.text.primary },
});
