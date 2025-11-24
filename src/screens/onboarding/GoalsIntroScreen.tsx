import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@components/layout';
import { Button, Card, ProgressBar } from '@components/common';
import { colors, typography, spacing } from '@theme';
import type { OnboardingStackNavigationProp } from '../../types/navigation';

export const GoalsIntroScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();

  const exampleGoals = [
    'Emergency Fund',
    'Buy a Home',
    'Retirement',
    'Pay Off Debt',
    'Vacation',
    'Education',
  ];

  return (
    <Screen scrollable={false}>
      <ProgressBar currentStep={1} totalSteps={8} />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Financial Goals</Text>
          <Text style={styles.subtitle}>What do you want to achieve?</Text>
        </View>

        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationPlaceholder}>
            <Text style={styles.illustrationEmoji}>🎯 ⛰️ 🚩</Text>
            <Text style={styles.illustrationText}>Illustration</Text>
          </View>
        </View>

        <Text style={styles.bodyText}>
          Setting clear goals is the first step to financial success. Let's identify what matters most to you.
        </Text>

        <Text style={styles.examplesTitle}>Common goals:</Text>
        <View style={styles.goalsGrid}>
          {exampleGoals.map((goal, index) => (
            <Card key={index} style={styles.goalCard}>
              <Text style={styles.goalText}>{goal}</Text>
            </Card>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button onPress={() => navigation.navigate('GoalEntry')} fullWidth>
          Add My First Goal
        </Button>
        <Button onPress={() => navigation.navigate('RetirementAge')} variant="text" fullWidth>
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
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  illustrationPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: colors.background.gray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationEmoji: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  illustrationText: {
    ...typography.bodySmall,
    color: colors.text.tertiary,
  },
  bodyText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  examplesTitle: {
    ...typography.h4,
    marginBottom: spacing.md,
  },
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  goalCard: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  goalText: {
    ...typography.body,
    color: colors.text.primary,
  },
  footer: {
    padding: spacing.xl,
    backgroundColor: colors.background.white,
    gap: spacing.md,
  },
});
