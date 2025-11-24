import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@components/layout';
import { Button, Card, ProgressBar } from '@components/common';
import { colors, typography, spacing } from '@theme';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '@store/userStore';
import type { OnboardingStackNavigationProp } from '../../types/navigation';

export const GoalsSummaryScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();
  const {
    goals,
    retirementAge,
    emergencyFundTarget,
    financialFears,
    budgetPriorities,
    debtPayoffPreference,
  } = useUserStore();

  const handleContinue = () => {
    navigation.navigate('AccountConnectionConsent');
  };

  return (
    <Screen scrollable={false}>
      <ProgressBar currentStep={8} totalSteps={8} />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Financial Profile</Text>
          <Text style={styles.subtitle}>Let's review what you've told us</Text>
        </View>

        {/* Goals */}
        <Card style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="flag" size={24} color={colors.primary.green} />
            <Text style={styles.sectionTitle}>Goals</Text>
            <TouchableOpacity onPress={() => navigation.navigate('GoalsIntro')}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>
          {goals.length > 0 ? (
            <View style={styles.itemsList}>
              {goals.map((goal) => (
                <View key={goal.id} style={styles.item}>
                  <Text style={styles.itemText}>
                    {goal.name}: ${goal.targetAmount.toLocaleString()}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>No goals added yet</Text>
          )}
        </Card>

        {/* Retirement */}
        <Card style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="time" size={24} color={colors.primary.green} />
            <Text style={styles.sectionTitle}>Retirement</Text>
            <TouchableOpacity onPress={() => navigation.navigate('RetirementAge')}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>
          {retirementAge ? (
            <View>
              <Text style={styles.itemText}>Target age: {retirementAge}</Text>
              <Text style={styles.itemSubtext}>
                Years until retirement: {Math.max(0, retirementAge - 30)}
              </Text>
            </View>
          ) : (
            <Text style={styles.emptyText}>Not set</Text>
          )}
        </Card>

        {/* Emergency Fund */}
        <Card style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="umbrella" size={24} color={colors.primary.green} />
            <Text style={styles.sectionTitle}>Emergency Fund</Text>
            <TouchableOpacity onPress={() => navigation.navigate('EmergencyFund')}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>
          {emergencyFundTarget ? (
            <Text style={styles.itemText}>
              Target: ${emergencyFundTarget.toLocaleString()}
            </Text>
          ) : (
            <Text style={styles.emptyText}>Not set</Text>
          )}
        </Card>

        {/* Top Concerns */}
        {financialFears.length > 0 && (
          <Card style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="alert-circle" size={24} color={colors.primary.green} />
              <Text style={styles.sectionTitle}>Top Concerns</Text>
              <TouchableOpacity onPress={() => navigation.navigate('FinancialFears')}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.itemText}>{financialFears.length} concerns selected</Text>
          </Card>
        )}

        {/* Budget Priority */}
        {budgetPriorities.length > 0 && (
          <Card style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="list" size={24} color={colors.primary.green} />
              <Text style={styles.sectionTitle}>Budget Priority</Text>
              <TouchableOpacity onPress={() => navigation.navigate('BudgetPriorities')}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.itemText}>
              #1: {budgetPriorities[0]}
            </Text>
          </Card>
        )}

        {/* Debt Payoff */}
        {debtPayoffPreference && (
          <Card style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="card" size={24} color={colors.primary.green} />
              <Text style={styles.sectionTitle}>Debt Payoff</Text>
              <TouchableOpacity onPress={() => navigation.navigate('DebtPayoffGoals')}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.itemText}>
              {debtPayoffPreference === 'fast' && 'As fast as possible'}
              {debtPayoffPreference === 'balanced' && 'Balanced approach'}
              {debtPayoffPreference === 'slow' && 'Take my time'}
            </Text>
          </Card>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button onPress={handleContinue} fullWidth>
          Looks Good, Continue
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
  sectionCard: {
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  sectionTitle: {
    ...typography.h4,
    flex: 1,
  },
  editButton: {
    ...typography.body,
    color: colors.primary.green,
    fontWeight: '600',
  },
  itemsList: {
    gap: spacing.sm,
  },
  item: {
    paddingLeft: spacing.md,
  },
  itemText: {
    ...typography.body,
    color: colors.text.primary,
  },
  itemSubtext: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  emptyText: {
    ...typography.body,
    color: colors.text.tertiary,
    fontStyle: 'italic',
  },
  footer: {
    padding: spacing.xl,
    backgroundColor: colors.background.white,
  },
});
