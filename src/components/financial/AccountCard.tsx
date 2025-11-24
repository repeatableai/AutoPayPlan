import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '@theme';

interface AccountCardProps {
  accountName: string;
  accountType: string;
  balance: number;
  lastFour: string;
  onPress?: () => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  accountName,
  accountType,
  balance,
  lastFour,
  onPress,
}) => {
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.accountName}>{accountName}</Text>
      <Text style={styles.accountType}>
        {accountType} •••• {lastFour}
      </Text>
      <Text style={styles.balance}>
        ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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
  accountName: typography.h4,
  accountType: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginTop: 4,
    marginBottom: spacing.sm,
  },
  balance: { ...typography.h2, color: colors.text.primary },
});
