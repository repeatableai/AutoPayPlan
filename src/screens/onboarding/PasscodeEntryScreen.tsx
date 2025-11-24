import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import { TransUnionLogo } from '@components/common';
import type { OnboardingStackNavigationProp } from '../../types/navigation';

export const PasscodeEntryScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();
  const [passcode, setPasscode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handlePasscodeChange = (text: string, index: number) => {
    // Only allow single digit
    if (text.length > 1) {
      text = text[text.length - 1];
    }

    const newPasscode = [...passcode];
    newPasscode[index] = text;
    setPasscode(newPasscode);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !passcode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    // Navigate to success screen after passcode validation
    navigation.navigate('AccountConnectionSuccess');
  };

  const isPasscodeComplete = passcode.every(digit => digit !== '');

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

          {/* Passcode Instructions */}
          <Text style={styles.instructionsTitle}>
            Enter the passcode we sent to your cell phone:
          </Text>

          {/* Passcode Input Boxes */}
          <View style={styles.passcodeContainer}>
            {passcode.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => inputRefs.current[index] = ref}
                style={styles.passcodeInput}
                value={digit}
                onChangeText={text => handlePasscodeChange(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                keyboardType="numeric"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          onPress={handleContinue}
          style={[
            styles.continueButton,
            !isPasscodeComplete && styles.continueButtonDisabled
          ]}
          disabled={!isPasscodeComplete}
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
    width: '75%', // Approximately 75% based on design
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
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 26,
  },
  passcodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    width: '100%',
  },
  passcodeInput: {
    width: 48,
    height: 56,
    backgroundColor: colors.background.white,
    borderWidth: 2,
    borderColor: '#CED4DA',
    borderRadius: 8,
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
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
