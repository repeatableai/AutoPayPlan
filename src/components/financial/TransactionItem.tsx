import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '@theme';

interface TransactionItemProps {
  merchant: string;
  category: string;
  amount: number;
  date: string;
  onPress?: () => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  merchant,
  category,
  amount,
  date,
  onPress,
}) => {
  const isDebit = amount < 0;
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component style={styles.item} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>💳</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.merchant}>{merchant}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <View style={styles.right}>
        <Text style={[styles.amount, isDebit && styles.debitAmount]}>
          {isDebit ? '-' : '+'}${Math.abs(amount).toLocaleString('en-US', {
            minimumFractionDigits: 2,
          })}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </Component>
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
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.gray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  icon: { fontSize: 20 },
  details: { flex: 1 },
  merchant: typography.body,
  category: { ...typography.caption, color: colors.text.secondary, marginTop: 2 },
  right: { alignItems: 'flex-end' },
  amount: { ...typography.h4, color: colors.status.success },
  debitAmount: { color: colors.text.primary },
  date: { ...typography.caption, color: colors.text.secondary, marginTop: 2 },
});
