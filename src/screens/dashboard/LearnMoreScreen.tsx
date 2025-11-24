import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { DashboardStackParamList } from '@types/navigation';
import { colors, spacing } from '@theme';
import { Button } from '@components/common';

type LearnMoreScreenNavigationProp = StackNavigationProp<DashboardStackParamList, 'LearnMore'>;

export const LearnMoreScreen = () => {
  const navigation = useNavigation<LearnMoreScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AutoPayPlan</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Title */}
        <Text style={styles.title}>
          Other apps watch.{'\n'}AutoPayPlan acts.{'\n'}Here's how:
        </Text>

        {/* Feature Cards */}
        <View style={styles.featureCard}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>📅</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Automated Payments</Text>
            <Text style={styles.featureDescription}>
              Automated biweekly payments help to reduce interest, accelerate payoff, avoid late fees, and protect your credit score.
            </Text>
          </View>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🎯</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>
              <Text style={styles.aiText}>AI</Text>ntelligent Allocation
            </Text>
            <Text style={styles.featureDescription}>
              AutoPayPlan uses AI to create a personalized plan based on your income, spending, goals – and even your financial fears.
            </Text>
          </View>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>📢</Text>
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Listens to Financial Fears</Text>
            <Text style={styles.featureDescription}>
              Whether you're worried about debt, retirement, or just making it to the next paycheck, AutoPayPlan builds a plan that addresses your concerns and gives you peace of mind.
            </Text>
          </View>
        </View>

        {/* Get Started Button */}
        <Button onPress={() => navigation.navigate('FinancialIndicators')} fullWidth style={styles.getStartedButton}>
          Get started
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 32,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 28,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  aiText: {
    color: colors.primary.blue,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  getStartedButton: {
    marginTop: 16,
    backgroundColor: '#388307',
  },
});
