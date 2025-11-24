import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import { FlinksLogo } from '@components/common';
import type { OnboardingStackNavigationProp } from '../../types/navigation';

export const FlinksConnectionSuccessScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();

  useEffect(() => {
    // Auto-navigate to Review Summary screen after 1.5 seconds
    const timer = setTimeout(() => {
      navigation.navigate('ReviewSummary');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Flinks Logo */}
      <View style={styles.logoContainer}>
        <FlinksLogo width={60} height={60} />
        <Text style={styles.flinksText}>flinks</Text>
      </View>

      {/* Success Icon */}
      <View style={styles.successIconContainer}>
        <View style={styles.successCircle}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
        {/* Confetti decoration */}
        <View style={styles.confettiContainer}>
          <View style={[styles.confetti, styles.confetti1]} />
          <View style={[styles.confetti, styles.confetti2]} />
          <View style={[styles.confetti, styles.confetti3]} />
          <View style={[styles.confetti, styles.confetti4]} />
          <View style={[styles.confetti, styles.confetti5]} />
          <View style={[styles.confetti, styles.confetti6]} />
        </View>
      </View>

      {/* Success Message */}
      <Text style={styles.successTitle}>Success! Your account is now connected!</Text>
      <Text style={styles.successSubtitle}>
        If you have any questions, please contact the application's support team.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 80,
  },
  flinksText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  successIconContainer: {
    position: 'relative',
    marginBottom: 60,
  },
  successCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#A8E6CF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#2D8659',
  },
  confettiContainer: {
    position: 'absolute',
    width: 300,
    height: 300,
    top: -70,
    left: -70,
  },
  confetti: {
    position: 'absolute',
    width: 12,
    height: 20,
    borderRadius: 2,
  },
  confetti1: {
    backgroundColor: '#00A3E0',
    top: 20,
    right: 40,
    transform: [{ rotate: '15deg' }],
  },
  confetti2: {
    backgroundColor: '#FF9F40',
    top: 80,
    right: 20,
    transform: [{ rotate: '-25deg' }],
  },
  confetti3: {
    backgroundColor: '#A8E6CF',
    top: 140,
    right: 60,
    transform: [{ rotate: '35deg' }],
  },
  confetti4: {
    backgroundColor: '#FFD93D',
    top: 60,
    left: 20,
    transform: [{ rotate: '-15deg' }],
  },
  confetti5: {
    backgroundColor: '#6BCF7F',
    top: 120,
    left: 40,
    transform: [{ rotate: '45deg' }],
  },
  confetti6: {
    backgroundColor: '#00A3E0',
    top: 180,
    right: 100,
    transform: [{ rotate: '-35deg' }],
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
});
