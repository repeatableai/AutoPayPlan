import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import { useUserStore } from '@store/userStore';
import { FlinksLogo, TransUnionLogo } from '@components/common';
import type { OnboardingStackNavigationProp } from '../../types/navigation';

export const AccountConnectionConsentScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();
  const completeOnboarding = useUserStore(state => state.completeOnboarding);

  const handleConsent = () => {
    navigation.navigate('DateOfBirth');
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>

        {/* Title */}
        <Text style={styles.title}>Let's connect your{'\n'}accounts</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Consent required</Text>

        {/* Description */}
        <Text style={styles.description}>
          AutoPayPlus® needs your permission to access your bank account information with (on average this takes 2 minutes):
        </Text>

        {/* Service Providers */}
        <View style={styles.providersContainer}>
          {/* Flinks */}
          <View style={styles.providerRow}>
            <View style={styles.checkmarkCircle}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
            <View style={styles.flinksLogoRow}>
              <FlinksLogo width={40} height={40} />
              <Text style={styles.providerName}>flinks</Text>
            </View>
          </View>

          {/* TransUnion */}
          <View style={styles.providerRow}>
            <View style={styles.checkmarkCircle}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
            <View style={styles.transUnionLogoWrapper}>
              <TransUnionLogo width={200} height={50} />
            </View>
          </View>
        </View>

        {/* Footer Text */}
        <Text style={styles.footerText}>
          By clicking the button, you allow AutoPayPlus® to use Flinks' Services and TransUnion to access your data.
        </Text>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          onPress={handleConsent}
          style={styles.continueButton}
        >
          <Text style={styles.continueButtonText}>Agree and Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: '#1A1A1A',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingTop: 100,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#D9D9D9',
    borderRadius: 2,
    marginBottom: 32,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '50%', // Approximately 50% based on design
    backgroundColor: colors.primary.blue,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  providersContainer: {
    marginBottom: 40,
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  checkmarkCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#9E9E9E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  checkmark: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  providerName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
  },
  flinksLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  transUnionLogoWrapper: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  bottomButtonContainer: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: '#F5F5F5',
  },
  continueButton: {
    backgroundColor: '#388307',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
