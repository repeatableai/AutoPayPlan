import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
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
            <Text style={styles.headline}>
              Take Control of Your Financial Future
            </Text>

            <Text style={styles.subheadline}>
              Smart budgeting, goal tracking, and debt management in one app
            </Text>
          </View>

          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            <Image
              source={require('../../../assets/images/welcome-illustration.png')}
              style={styles.illustration}
              resizeMode="contain"
            />
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
  illustration: {
    width: '100%',
    height: '100%',
    maxWidth: 400,
    maxHeight: 400,
  },
  bottomSection: {
    gap: spacing.md,
  },
});
