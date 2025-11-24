import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../../types/navigation';
import { colors } from '@theme';
import { useUserStore } from '@store/userStore';

type ConfirmedScreenNavigationProp = BottomTabNavigationProp<MainTabParamList>;

// Mock milestone data
interface Milestone {
  id: string;
  title: string;
  amount: string;
  date: string;
  description: string;
}

const mockMilestones: Milestone[] = [
  {
    id: '1',
    title: 'Emergency Fund',
    amount: '$1,052.00',
    date: 'January 15, 2026',
    description: 'Build your safety net',
  },
  {
    id: '2',
    title: 'Debt Payoff',
    amount: '$5,240.00',
    date: 'May 20, 2026',
    description: 'Become debt-free',
  },
  {
    id: '3',
    title: 'Vacation Fund',
    amount: '$2,500.00',
    date: 'August 10, 2026',
    description: 'Plan your dream trip',
  },
  {
    id: '4',
    title: 'Home Down Payment',
    amount: '$15,000.00',
    date: 'December 31, 2026',
    description: 'Save for your future home',
  },
];

export const ConfirmedScreen = () => {
  const navigation = useNavigation<ConfirmedScreenNavigationProp>();
  const enrollInPlan = useUserStore((state) => state.enrollInPlan);
  const [currentMilestoneIndex, setCurrentMilestoneIndex] = useState(0);

  const handleGoToDashboard = () => {
    // Enroll the user in the plan
    enrollInPlan();
    // Navigate to the Plan tab and specifically to PlanHome screen to trigger re-render
    navigation.navigate('AutoPayPlan', { screen: 'PlanHome' });
  };

  const currentMilestone = mockMilestones[currentMilestoneIndex];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Confirmed!</Text>
      </View>

      {/* Stepper */}
      <View style={styles.stepper}>
        <View style={styles.stepCompleted}>
          <View style={styles.stepCircleCompleted}>
            <Text style={styles.stepCheckmark}>✓</Text>
          </View>
          <Text style={styles.stepLabelCompleted}>Review Plan</Text>
        </View>
        <View style={styles.stepLine} />
        <View style={styles.stepCompleted}>
          <View style={styles.stepCircleCompleted}>
            <Text style={styles.stepCheckmark}>✓</Text>
          </View>
          <Text style={styles.stepLabelCompleted}>Schedule</Text>
        </View>
        <View style={styles.stepLine} />
        <View style={styles.stepCompleted}>
          <View style={styles.stepCircleCompleted}>
            <Text style={styles.stepCheckmark}>✓</Text>
          </View>
          <Text style={styles.stepLabelCompleted}>Agree</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Success Card */}
        <View style={styles.card}>
          <Text style={styles.successTitle}>All set! Your financial wellness starts now!</Text>

          {/* Illustration Placeholder */}
          <View style={styles.illustrationContainer}>
            <View style={styles.illustrationPlaceholder}>
              <Text style={styles.illustrationEmoji}>🎉</Text>
              <Text style={styles.illustrationText}>Person celebrating</Text>
            </View>
          </View>

          {/* Debit Information */}
          <Text style={styles.debitInfo}>
            Your biweekly debits of $392.50 will start on{' '}
            <Text style={styles.underlineText}>November 29, 2025</Text>. You're one step closer to
            financial freedom!
          </Text>
        </View>

        {/* Milestones Section */}
        <View style={styles.milestonesSection}>
          <Text style={styles.milestonesHeader}>PREVIEW YOUR MILESTONES</Text>

          {/* Milestone Card */}
          <View style={styles.milestoneCard}>
            <View style={styles.milestoneIconContainer}>
              <View style={styles.milestoneIcon}>
                <Text style={styles.milestoneIconText}>💰</Text>
              </View>
            </View>

            <Text style={styles.milestoneTitle}>{currentMilestone.title}</Text>
            <Text style={styles.milestoneAmount}>{currentMilestone.amount}</Text>
            <Text style={styles.milestoneDate}>{currentMilestone.date}</Text>
            <Text style={styles.milestoneDescription}>{currentMilestone.description}</Text>
          </View>

          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {mockMilestones.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentMilestoneIndex && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Go to Dashboard Button */}
        <TouchableOpacity style={styles.dashboardButton} onPress={handleGoToDashboard}>
          <Text style={styles.dashboardButtonText}>Go to my dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.gray || '#F5F5F5',
  },
  header: {
    backgroundColor: colors.background.white,
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  stepper: {
    backgroundColor: colors.background.white,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepCompleted: {
    alignItems: 'center',
  },
  stepCircleCompleted: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF9500',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepCheckmark: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.background.white,
  },
  stepLabelCompleted: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 8,
    marginBottom: 24,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 28,
  },
  illustrationContainer: {
    marginBottom: 24,
  },
  illustrationPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationEmoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  illustrationText: {
    fontSize: 14,
    color: '#949494',
  },
  debitInfo: {
    fontSize: 14,
    color: '#1E1E1E',
    textAlign: 'center',
    lineHeight: 20,
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  milestonesSection: {
    marginBottom: 24,
  },
  milestonesHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#949494',
    letterSpacing: 1,
    marginBottom: 16,
  },
  milestoneCard: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  milestoneIconContainer: {
    marginBottom: 16,
  },
  milestoneIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  milestoneIconText: {
    fontSize: 32,
  },
  milestoneTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  milestoneAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary.green,
    marginBottom: 4,
  },
  milestoneDate: {
    fontSize: 14,
    color: '#949494',
    marginBottom: 8,
  },
  milestoneDescription: {
    fontSize: 14,
    color: '#636566',
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
  },
  paginationDotActive: {
    backgroundColor: '#0066FF',
  },
  dashboardButton: {
    backgroundColor: colors.primary.green,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  dashboardButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.background.white,
  },
});
