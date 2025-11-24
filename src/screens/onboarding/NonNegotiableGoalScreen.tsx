import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@components/layout';
import { Button, Card, ProgressBar } from '@components/common';
import { colors, typography, spacing } from '@theme';
import { useUserStore } from '@store/userStore';
import type { OnboardingStackNavigationProp } from '../../types/navigation';

export const NonNegotiableGoalScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();
  const goals = useUserStore(state => state.goals);
  const [selectedGoalId, setSelectedGoalId] = useState<string>('');

  const handleContinue = () => {
    // Store the non-negotiable goal if selected
    if (selectedGoalId) {
      // TODO: Add a method to mark goal as non-negotiable in the store
      // For now, just navigate to next screen
    }
    navigation.navigate('RetirementAge');
  };

  const handleSkip = () => {
    navigation.navigate('RetirementAge');
  };

  return (
    <Screen scrollable={false}>
      <ProgressBar currentStep={3} totalSteps={8} />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Which Goal is Non-Negotiable?</Text>
          <Text style={styles.subtitle}>
            Select the goal that matters most to you right now
          </Text>
        </View>

        <View style={styles.goalsContainer}>
          {goals.length > 0 ? (
            goals.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.goalCard,
                  selectedGoalId === goal.id && styles.goalCardSelected,
                ]}
                onPress={() => setSelectedGoalId(goal.id)}
              >
                <View style={styles.goalHeader}>
                  <Text style={[
                    styles.goalName,
                    selectedGoalId === goal.id && styles.goalNameSelected
                  ]}>
                    {goal.name}
                  </Text>
                  <View style={[
                    styles.radioButton,
                    selectedGoalId === goal.id && styles.radioButtonSelected
                  ]} />
                </View>
                <Text style={styles.goalAmount}>
                  ${goal.targetAmount.toLocaleString()}
                </Text>
                {goal.targetDate && (
                  <Text style={styles.goalDate}>
                    Target: {new Date(goal.targetDate).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric'
                    })}
                  </Text>
                )}
              </TouchableOpacity>
            ))
          ) : (
            <Card style={styles.emptyCard}>
              <Text style={styles.emptyText}>
                No goals added yet. Skip this step or go back to add a goal.
              </Text>
            </Card>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          onPress={handleContinue}
          fullWidth
          disabled={!selectedGoalId && goals.length > 0}
        >
          Continue
        </Button>
        <Button onPress={handleSkip} variant="text" fullWidth>
          Skip for now
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
  goalsContainer: {
    gap: spacing.md,
  },
  goalCard: {
    padding: spacing.lg,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border.light,
    backgroundColor: colors.background.white,
  },
  goalCardSelected: {
    borderColor: colors.primary.green,
    backgroundColor: colors.background.lightGreen,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  goalName: {
    ...typography.h4,
    color: colors.text.primary,
    flex: 1,
  },
  goalNameSelected: {
    color: colors.primary.green,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border.light,
    backgroundColor: colors.background.white,
  },
  radioButtonSelected: {
    borderColor: colors.primary.green,
    backgroundColor: colors.primary.green,
  },
  goalAmount: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  goalDate: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  emptyCard: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.text.tertiary,
    textAlign: 'center',
  },
  footer: {
    padding: spacing.xl,
    backgroundColor: colors.background.white,
    gap: spacing.md,
  },
});
