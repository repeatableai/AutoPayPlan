import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import { useUserStore } from '@store/userStore';
import type { OnboardingStackNavigationProp } from '../../types/navigation';
import { TransUnionLogo } from '@components/common';

export const DateOfBirthScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();
  const setDateOfBirth = useUserStore(state => state.setDateOfBirth);

  const [dateOfBirth, setDateOfBirthLocal] = useState('');

  const formatDateOfBirth = (text: string) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, '');

    // Limit to 8 digits (MMDDYYYY)
    const limited = cleaned.slice(0, 8);

    // Add slashes automatically
    let formatted = limited;
    if (limited.length >= 3) {
      formatted = `${limited.slice(0, 2)}/${limited.slice(2)}`;
    }
    if (limited.length >= 5) {
      formatted = `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4)}`;
    }

    setDateOfBirthLocal(formatted);
  };

  const handleContinue = () => {
    setDateOfBirth(dateOfBirth);
    navigation.navigate('IdentityValidation');
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
        <Text style={styles.title}>Please provide your{'\n'}date of birth.</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          We need this to authenticate your identity with TransUnion to connect your loans.
        </Text>

        {/* Combined TransUnion and Date Input Card */}
        <View style={styles.combinedCard}>
          <View style={styles.logoWrapper}>
            <TransUnionLogo width={300} height={75} />
          </View>

          <View style={styles.divider} />

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Enter date of birth</Text>
            <TextInput
              style={styles.dateInput}
              value={dateOfBirth}
              onChangeText={formatDateOfBirth}
              placeholder="MM/DD/YYYY"
              placeholderTextColor="#999999"
              keyboardType="numeric"
              maxLength={10}
            />
            <Text style={styles.exampleText}>Example: 01/28/2000</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          onPress={handleContinue}
          style={styles.continueButton}
          disabled={!dateOfBirth}
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
    width: '62%', // Approximately 62% based on design
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
    color: '#2C2C2C',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  combinedCard: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 32,
  },
  logoWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 24,
  },
  inputSection: {
    padding: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  dateInput: {
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 8,
  },
  exampleText: {
    fontSize: 14,
    color: '#999999',
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
