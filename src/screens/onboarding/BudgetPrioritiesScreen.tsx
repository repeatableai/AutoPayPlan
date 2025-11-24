import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@components/layout';
import { Button, ProgressBar } from '@components/common';
import { colors, typography, spacing } from '@theme';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '@store/userStore';
import type { OnboardingStackNavigationProp } from '../../types/navigation';

export const BudgetPrioritiesScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();
  const setBudgetPriorities = useUserStore(state => state.setBudgetPriorities);

  const initialPriorities = [
    'Pay off debt faster',
    'Save for emergency fund',
    'Invest for retirement',
    'Save for a major purchase',
    'Spend on experiences (travel, dining)',
    'Give to charity',
  ];

  const [priorities, setPriorities] = useState(initialPriorities);

  const movePriority = (index: number, direction: 'up' | 'down') => {
    const newPriorities = [...priorities];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < priorities.length) {
      [newPriorities[index], newPriorities[newIndex]] = [newPriorities[newIndex], newPriorities[index]];
      setPriorities(newPriorities);
    }
  };

  const handleContinue = () => {
    setBudgetPriorities(priorities);
    navigation.navigate('DebtPayoffGoals');
  };

  return (
    <Screen scrollable={false}>
      <ProgressBar currentStep={6} totalSteps={8} />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Budget Priorities</Text>
          <Text style={styles.subtitle}>If you had extra money, what would you do with it?</Text>
        </View>

        <Text style={styles.bodyText}>
          Drag to rank your priorities (1 = highest priority)
        </Text>

        <View style={styles.prioritiesContainer}>
          {priorities.map((priority, index) => (
            <View key={priority} style={styles.priorityCard}>
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>{index + 1}</Text>
              </View>
              <Text style={styles.priorityText}>{priority}</Text>
              <View style={styles.controls}>
                <TouchableOpacity
                  onPress={() => movePriority(index, 'up')}
                  disabled={index === 0}
                  style={[styles.controlButton, index === 0 && styles.controlButtonDisabled]}
                >
                  <Ionicons name="chevron-up" size={24} color={index === 0 ? colors.text.disabled : colors.primary.green} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => movePriority(index, 'down')}
                  disabled={index === priorities.length - 1}
                  style={[styles.controlButton, index === priorities.length - 1 && styles.controlButtonDisabled]}
                >
                  <Ionicons name="chevron-down" size={24} color={index === priorities.length - 1 ? colors.text.disabled : colors.primary.green} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button onPress={handleContinue} fullWidth>
          Continue
        </Button>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.xl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  bodyText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  prioritiesContainer: {
    gap: spacing.md,
  },
  priorityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: 8,
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: colors.border.light,
    gap: spacing.md,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    ...typography.h4,
    color: colors.background.white,
  },
  priorityText: {
    ...typography.body,
    flex: 1,
    color: colors.text.primary,
  },
  controls: {
    flexDirection: 'column',
    gap: spacing.xs,
  },
  controlButton: {
    padding: spacing.xs,
  },
  controlButtonDisabled: {
    opacity: 0.3,
  },
  footer: {
    padding: spacing.xl,
    backgroundColor: colors.background.white,
  },
});
