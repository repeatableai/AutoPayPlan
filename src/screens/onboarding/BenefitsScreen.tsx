import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@components/layout';
import { Button, Card } from '@components/common';
import { colors, typography, spacing } from '@theme';
import { Ionicons } from '@expo/vector-icons';
import type { OnboardingStackNavigationProp } from '../../types/navigation';

export const BenefitsScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();

  const benefits = [
    {
      icon: 'trending-up',
      title: 'Track Your Spending',
      description: 'Connect accounts and see where your money goes with our 50/30/20 budgeting system',
    },
    {
      icon: 'flag',
      title: 'Reach Your Goals',
      description: 'Set financial goals and track progress with automatic contributions',
    },
    {
      icon: 'card',
      title: 'Manage Your Debt',
      description: 'Our AutoPayPlan accelerates debt payoff and saves you thousands in interest',
    },
    {
      icon: 'fitness',
      title: 'Build Financial Fitness',
      description: 'Personalized plan with milestones to improve your financial health',
    },
  ];

  return (
    <Screen scrollable={false}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>How AutoPayPlan Helps You</Text>
          <Text style={styles.subtitle}>Everything you need for financial wellness</Text>
        </View>

        <View style={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <Card key={index} style={styles.benefitCard}>
              <View style={styles.iconContainer}>
                <Ionicons name={benefit.icon as any} size={32} color={colors.primary.green} />
              </View>
              <Text style={styles.benefitTitle}>{benefit.title}</Text>
              <Text style={styles.benefitDescription}>{benefit.description}</Text>
            </Card>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button onPress={() => navigation.navigate('FinancialIndicatorsIntro')} fullWidth>
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
    ...typography.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  benefitsGrid: {
    gap: spacing.md,
  },
  benefitCard: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: spacing.md,
  },
  benefitTitle: {
    ...typography.h4,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  benefitDescription: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  footer: {
    padding: spacing.xl,
    backgroundColor: colors.background.white,
  },
});
