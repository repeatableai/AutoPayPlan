import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@components/layout';
import { Button, Card, ProgressBar } from '@components/common';
import { colors, typography, spacing } from '@theme';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '@store/userStore';
import type { OnboardingStackNavigationProp } from '../../types/navigation';

export const DebtPayoffGoalsScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();
  const setDebtPayoffPreference = useUserStore(state => state.setDebtPayoffPreference);

  const [selectedOption, setSelectedOption] = useState<'fast' | 'balanced' | 'slow' | null>(null);

  const options = [
    {
      id: 'fast' as const,
      icon: 'flash',
      title: 'As fast as possible',
      description: 'I want to be debt-free ASAP, even if it means tight budgets',
    },
    {
      id: 'balanced' as const,
      icon: 'scale',
      title: 'Balanced approach',
      description: 'Pay off debt while maintaining my lifestyle',
      recommended: true,
    },
    {
      id: 'slow' as const,
      icon: 'time',
      title: 'Take my time',
      description: 'Minimum payments for now, focus on other goals',
    },
  ];

  const handleContinue = () => {
    if (selectedOption) {
      setDebtPayoffPreference(selectedOption);
      navigation.navigate('GoalsSummary');
    }
  };

  return (
    <Screen scrollable={false}>
      <ProgressBar currentStep={7} totalSteps={8} />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Debt Payoff Timeline</Text>
          <Text style={styles.subtitle}>How quickly do you want to be debt-free?</Text>
        </View>

        <Text style={styles.bodyText}>
          We'll help you create a personalized plan
        </Text>

        <View style={styles.optionsContainer}>
          {options.map((option) => {
            const isSelected = selectedOption === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected,
                ]}
                onPress={() => setSelectedOption(option.id)}
              >
                <View style={styles.optionHeader}>
                  <View style={[
                    styles.iconContainer,
                    isSelected && styles.iconContainerSelected,
                  ]}>
                    <Ionicons
                      name={option.icon as any}
                      size={32}
                      color={isSelected ? colors.background.white : colors.primary.green}
                    />
                  </View>
                  {option.recommended && (
                    <View style={styles.recommendedBadge}>
                      <Text style={styles.recommendedText}>Recommended</Text>
                    </View>
                  )}
                </View>
                <Text style={[
                  styles.optionTitle,
                  isSelected && styles.optionTitleSelected,
                ]}>
                  {option.title}
                </Text>
                <Text style={[
                  styles.optionDescription,
                  isSelected && styles.optionDescriptionSelected,
                ]}>
                  {option.description}
                </Text>
                {isSelected && (
                  <View style={styles.checkmark}>
                    <Ionicons name="checkmark-circle" size={24} color={colors.primary.green} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <Card style={styles.infoCard}>
          <Text style={styles.infoText}>
            💡 We'll assess your debt when you connect your accounts
          </Text>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button onPress={handleContinue} fullWidth disabled={!selectedOption}>
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
  optionsContainer: {
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  optionCard: {
    padding: spacing.xl,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border.light,
    backgroundColor: colors.background.white,
  },
  optionCardSelected: {
    borderColor: colors.primary.green,
    backgroundColor: colors.background.lightGreen,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.background.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerSelected: {
    backgroundColor: colors.primary.green,
  },
  recommendedBadge: {
    backgroundColor: colors.accent.orange,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  recommendedText: {
    ...typography.bodySmall,
    color: colors.background.white,
    fontWeight: '600',
  },
  optionTitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
    color: colors.text.primary,
  },
  optionTitleSelected: {
    color: colors.primary.green,
  },
  optionDescription: {
    ...typography.body,
    color: colors.text.secondary,
  },
  optionDescriptionSelected: {
    color: colors.text.primary,
  },
  checkmark: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
  },
  infoCard: {
    backgroundColor: colors.background.lightBlue,
    padding: spacing.lg,
  },
  infoText: {
    ...typography.body,
    color: colors.text.primary,
    textAlign: 'center',
  },
  footer: {
    padding: spacing.xl,
    backgroundColor: colors.background.white,
  },
});
