import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@components/layout';
import { Button } from '@components/common';
import { colors, typography, spacing } from '@theme';
import type { RootStackNavigationProp } from '../../types/navigation';

export const WelcomeScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleGetStarted = () => {
    // Navigate to Main app, which will show DashboardWelcomeScreen (with piggy bank/car)
    navigation.navigate('Main', { screen: 'Dashboard' });
  };

  const handleSignIn = () => {
    console.log('Sign in pressed - future feature');
  };

  return (
    <Screen scrollable={false}>
      <LinearGradient
        colors={['#E3F2FD', '#FFFFFF']}
        style={styles.gradient}
      >
        <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>AutoPayPlan</Text>
            </View>

            <Text style={styles.headline}>
              Take Control of Your Financial Future
            </Text>

            <Text style={styles.subheadline}>
              Smart budgeting, goal tracking, and debt management in one app
            </Text>
          </View>

          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            <View style={styles.illustrationPlaceholder}>
              <Text style={styles.placeholderText}>📱 💰</Text>
              <Text style={styles.placeholderSubtext}>Illustration</Text>
            </View>
          </View>

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            <Button onPress={handleGetStarted} fullWidth>
              Get Started
            </Button>

            <Button onPress={handleSignIn} variant="text" fullWidth>
              Already have an account? Sign In
            </Button>
          </View>
        </View>
      </LinearGradient>
    </Screen>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoText: {
    ...typography.h4,
    color: colors.background.white,
    textAlign: 'center',
    fontSize: 14,
  },
  headline: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: spacing.md,
    color: colors.text.primary,
  },
  subheadline: {
    ...typography.body,
    textAlign: 'center',
    color: colors.text.secondary,
    paddingHorizontal: spacing.md,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  illustrationPlaceholder: {
    width: '80%',
    aspectRatio: 1,
    backgroundColor: colors.background.gray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 60,
    marginBottom: spacing.sm,
  },
  placeholderSubtext: {
    ...typography.bodySmall,
    color: colors.text.tertiary,
  },
  bottomSection: {
    gap: spacing.md,
  },
});
