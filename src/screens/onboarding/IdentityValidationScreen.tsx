import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import type { OnboardingStackNavigationProp } from '../../types/navigation';
import { TransUnionLogo } from '@components/common';

type VerificationMethod = 'sms' | 'voice' | 'security';

export const IdentityValidationScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();
  const [selectedMethod, setSelectedMethod] = useState<VerificationMethod | null>(null);

  const handleContinue = () => {
    if (selectedMethod === 'security') {
      navigation.navigate('SecurityQuestions');
    } else {
      navigation.navigate('PasscodeEntry');
    }
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
        <Text style={styles.title}>Validate your identity</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          We need to authenticate your identity to connect your credit and loan information with TransUnion.
        </Text>

        {/* TransUnion Card */}
        <View style={styles.transUnionCard}>
          <View style={styles.logoWrapper}>
            <TransUnionLogo width={403} height={101} />
          </View>

          {/* Selection Title */}
          <Text style={styles.selectionTitle}>
            Select one preferred method to{'\n'}send a passcode:
          </Text>

          {/* Subtitle for rates */}
          <Text style={styles.ratesText}>
            Standard text message and voice rates apply.
          </Text>

          {/* Verification Methods */}
          <View style={styles.methodsContainer}>
            {/* SMS Option */}
            <TouchableOpacity
              style={styles.methodRow}
              onPress={() => setSelectedMethod('sms')}
            >
              <View style={[
                styles.radioCircle,
                selectedMethod === 'sms' && styles.radioCircleSelected
              ]}>
                {selectedMethod === 'sms' && <View style={styles.radioDot} />}
              </View>
              <View style={styles.methodTextContainer}>
                <Text style={styles.methodText}>SMS to phone number ending in</Text>
                <Text style={styles.phoneNumber}>***7895</Text>
              </View>
            </TouchableOpacity>

            {/* Voice Call Option */}
            <TouchableOpacity
              style={styles.methodRow}
              onPress={() => setSelectedMethod('voice')}
            >
              <View style={[
                styles.radioCircle,
                selectedMethod === 'voice' && styles.radioCircleSelected
              ]}>
                {selectedMethod === 'voice' && <View style={styles.radioDot} />}
              </View>
              <View style={styles.methodTextContainer}>
                <Text style={styles.methodText}>Voice call to phone number ending in</Text>
                <Text style={styles.phoneNumber}>***7895</Text>
              </View>
            </TouchableOpacity>

            {/* Security Questions Option */}
            <TouchableOpacity
              style={styles.methodRow}
              onPress={() => setSelectedMethod('security')}
            >
              <View style={[
                styles.radioCircle,
                selectedMethod === 'security' && styles.radioCircleSelected
              ]}>
                {selectedMethod === 'security' && <View style={styles.radioDot} />}
              </View>
              <View style={styles.methodTextContainer}>
                <Text style={styles.methodText}>Security questions from TransUnion</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          onPress={handleContinue}
          style={[
            styles.continueButton,
            !selectedMethod && styles.continueButtonDisabled
          ]}
          disabled={!selectedMethod}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
    width: '68%', // Approximately 68% based on design
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
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  transUnionCard: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: 32,
    marginBottom: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  logoWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  selectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 26,
  },
  ratesText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  methodsContainer: {
    width: '100%',
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#9E9E9E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  radioCircleSelected: {
    borderColor: '#00A6CA',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00A6CA',
  },
  methodTextContainer: {
    flex: 1,
  },
  methodText: {
    fontSize: 16,
    color: '#1A1A1A',
    lineHeight: 22,
  },
  phoneNumber: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '600',
    lineHeight: 22,
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
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
