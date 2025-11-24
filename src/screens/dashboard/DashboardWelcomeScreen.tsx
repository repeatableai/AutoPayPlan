import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { DashboardStackParamList } from '@types/navigation';
import { colors, typography, spacing } from '@theme';
import { useUserStore } from '@store/userStore';
import { Button, Card } from '@components/common';
import { FinancialFitnessIllustration, InsuranceIllustration } from '@components/illustrations';

type DashboardWelcomeScreenNavigationProp = StackNavigationProp<DashboardStackParamList, 'DashboardHome'>;

export const DashboardWelcomeScreen = () => {
  const navigation = useNavigation<DashboardWelcomeScreenNavigationProp>();
  const resetOnboarding = useUserStore(state => state.resetOnboarding);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AutoPayPlan</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Financial Fitness Card */}
        <View style={styles.fitnessCard}>
          <FinancialFitnessIllustration />

          <Text style={styles.fitnessTitle}>
            Your personalized plan to{'\n'}get financially fit!
          </Text>

          <Text style={styles.fitnessDescription}>
            Improve your financial wellness and reach{'\n'}goals faster — using your current income.
          </Text>

          <Button onPress={() => navigation.navigate('LearnMore')} fullWidth>
            Learn more
          </Button>
        </View>

        {/* My Insurance Card */}
        <View style={styles.insuranceCard}>
          <View style={styles.insuranceHeader}>
            <Text style={styles.insuranceTitle}>My Insurance</Text>
          </View>

          <InsuranceIllustration />
        </View>

        {/* Debug: Reset Onboarding */}
        <View style={styles.debugSection}>
          <Button onPress={resetOnboarding} variant="secondary" fullWidth>
            Reset Onboarding (Demo)
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.gray,
  },
  header: {
    backgroundColor: colors.primary.blue,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    color: colors.background.white,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  fitnessCard: {
    padding: 24,
    borderRadius: 12,
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  fitnessTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    color: '#1A1A1A',
    lineHeight: 26,
  },
  fitnessDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666666',
    marginBottom: 20,
    lineHeight: 20,
  },
  // Insurance card
  insuranceCard: {
    borderRadius: 12,
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  insuranceHeader: {
    backgroundColor: colors.primary.blue,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  insuranceTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.background.white,
  },
  debugSection: {
    marginTop: spacing.lg,
  },
});
