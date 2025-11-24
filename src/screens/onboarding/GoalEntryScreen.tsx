import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Screen } from '@components/layout';
import { Button, ProgressBar } from '@components/common';
import { colors, typography, spacing } from '@theme';
import { useUserStore } from '@store/userStore';
import type { OnboardingStackNavigationProp, OnboardingStackParamList } from '../../types/navigation';

type GoalEntryScreenRouteProp = RouteProp<OnboardingStackParamList, 'GoalEntry'>;

export const GoalEntryScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();
  const route = useRoute<GoalEntryScreenRouteProp>();
  const addGoal = useUserStore(state => state.addGoal);

  const goalType = route.params?.goalType || 'short-term';

  const [selectedGoalOption, setSelectedGoalOption] = useState<string>('');
  const [customGoalName, setCustomGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');

  // Format date input to MM/YYYY
  const formatTargetDate = (text: string) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, '');

    // Limit to 6 digits (MMYYYY)
    const limited = cleaned.slice(0, 6);

    // Add slash after month
    if (limited.length >= 2) {
      setTargetDate(`${limited.slice(0, 2)}/${limited.slice(2)}`);
    } else {
      setTargetDate(limited);
    }
  };

  const goalOptions = ['Large purchase', 'Vacation', 'Wedding', 'Education', 'Down payment', 'Other'];

  console.log('GoalEntryScreen ALL 6 OPTIONS - goalType:', goalType, 'goalOptions:', goalOptions);

  const getGoalName = () => {
    if (selectedGoalOption === 'Other') {
      return customGoalName;
    }
    return selectedGoalOption;
  };

  const isValid = selectedGoalOption.length > 0 &&
                  (selectedGoalOption !== 'Other' || customGoalName.trim().length > 0) &&
                  parseFloat(goalAmount) > 0;

  const handleSaveGoal = () => {
    if (!isValid) return;

    const now = new Date();
    const goal = {
      id: Date.now().toString(),
      userId: 'temp-user-id', // Will be set when user is created
      name: getGoalName(),
      targetAmount: parseFloat(goalAmount),
      currentAmount: 0,
      monthlyContribution: parseFloat(monthlyContribution) || 0,
      targetDate: targetDate ? new Date(targetDate) : undefined,
      projectedCompletionDate: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()),
      startDate: now,
      category: selectedGoalOption.toLowerCase() as any,
      priority: 'medium' as const,
      status: 'active' as const,
      isOnTrack: true,
      goalType: goalType,
      createdAt: now,
      updatedAt: now,
    };

    addGoal(goal);

    // Navigate to non-negotiable goal selection
    navigation.navigate('NonNegotiableGoal');
  };

  const handleSkip = () => {
    navigation.navigate('RetirementAge');
  };

  return (
    <Screen scrollable={false}>
      <ProgressBar currentStep={2} totalSteps={8} />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {goalType === 'short-term' ? 'Short-term Goal' : 'Long-term Goal'}
          </Text>
          <Text style={styles.subtitle}>What are you saving for?</Text>
        </View>

        <View style={styles.form}>
          {/* Goal Options */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Select your goal (ALL 6 OPTIONS)</Text>
            <View style={styles.categoriesContainer}>
              {goalOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.categoryButton,
                    selectedGoalOption === option && styles.categoryButtonSelected,
                  ]}
                  onPress={() => setSelectedGoalOption(option)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedGoalOption === option && styles.categoryTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Custom Goal Name (if Other is selected) */}
          {selectedGoalOption === 'Other' && (
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Goal Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your goal name"
                value={customGoalName}
                onChangeText={setCustomGoalName}
                maxLength={50}
              />
            </View>
          )}

          {/* Goal Amount */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>How much do you need?</Text>
            <View style={styles.currencyInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={[styles.input, styles.currencyInput]}
                placeholder="0"
                value={goalAmount}
                onChangeText={setGoalAmount}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Target Date */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>When do you want to reach this goal? (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/YYYY"
              value={targetDate}
              onChangeText={formatTargetDate}
              keyboardType="numeric"
              maxLength={7}
            />
          </View>

          {/* Monthly Contribution */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>How much can you save each month?</Text>
            <View style={styles.currencyInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={[styles.input, styles.currencyInput]}
                placeholder="0"
                value={monthlyContribution}
                onChangeText={setMonthlyContribution}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button onPress={handleSaveGoal} fullWidth disabled={!isValid}>
          Save Goal
        </Button>
        <Button onPress={handleSkip} variant="text" fullWidth>
          I'll add goals later
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
  form: {
    gap: spacing.lg,
  },
  fieldContainer: {
    gap: spacing.sm,
  },
  label: {
    ...typography.h4,
    color: colors.text.primary,
  },
  input: {
    ...typography.body,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 8,
    padding: spacing.md,
    backgroundColor: colors.background.white,
  },
  currencyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 8,
    backgroundColor: colors.background.white,
  },
  currencySymbol: {
    ...typography.body,
    paddingLeft: spacing.md,
    color: colors.text.secondary,
  },
  currencyInput: {
    flex: 1,
    borderWidth: 0,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border.light,
    backgroundColor: colors.background.white,
  },
  categoryButtonSelected: {
    backgroundColor: colors.primary.green,
    borderColor: colors.primary.green,
  },
  categoryText: {
    ...typography.body,
    color: colors.text.primary,
  },
  categoryTextSelected: {
    color: colors.background.white,
  },
  footer: {
    padding: spacing.xl,
    backgroundColor: colors.background.white,
    gap: spacing.md,
  },
});
