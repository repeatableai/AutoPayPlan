import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import type { OnboardingStackNavigationProp, OnboardingStackParamList } from '../../types/navigation';

type FlinksInstitutionLoginRouteProp = RouteProp<OnboardingStackParamList, 'FlinksInstitutionLogin'>;

export const FlinksInstitutionLoginScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();
  const route = useRoute<FlinksInstitutionLoginRouteProp>();
  const { institutionName, institutionId } = route.params;

  const [cardNumber, setCardNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleContinue = () => {
    // Navigate to Flinks success screen after successful login
    // In production, this would involve API call to Flinks
    navigation.navigate('FlinksConnectionSuccess');
  };

  const isFormValid = cardNumber.length > 0 && password.length > 0;

  // Get institution logo/icon based on institution name
  const getInstitutionIcon = () => {
    switch (institutionName.toUpperCase()) {
      case 'BMO':
        return '🏦'; // Placeholder - would use actual BMO logo
      case 'TD':
        return '🏦';
      case 'RBC':
        return '🏦';
      case 'SCOTIABANK':
        return '🏦';
      case 'CIBC':
        return '🏦';
      default:
        return '🏦';
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

        {/* Institution Card */}
        <View style={styles.institutionCard}>
          {/* Institution Logo/Name */}
          <View style={styles.institutionHeader}>
            <View style={styles.institutionIconContainer}>
              <Text style={styles.institutionIconText}>{getInstitutionIcon()}</Text>
            </View>
            <Text style={styles.institutionName}>{institutionName}</Text>
          </View>

          {/* Login Form */}
          <Text style={styles.formTitle}>Log in to your {institutionName} account</Text>

          {/* Card Number Input */}
          <TextInput
            style={styles.input}
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholder="Card Number"
            placeholderTextColor="#999999"
            keyboardType="numeric"
          />

          {/* Password Input */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="#999999"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.eyeIconText}>{showPassword ? '👁️' : '👁️'}</Text>
            </TouchableOpacity>
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </TouchableOpacity>

          {/* Continue Button */}
          <TouchableOpacity
            onPress={handleContinue}
            style={[
              styles.continueButton,
              isFormValid && styles.continueButtonActive
            ]}
            disabled={!isFormValid}
          >
            <Text style={[
              styles.continueButtonText,
              isFormValid && styles.continueButtonTextActive
            ]}>Continue</Text>
          </TouchableOpacity>

          {/* Security Message */}
          <View style={styles.securityMessageContainer}>
            <Text style={styles.securityMessage}>
              Your data is secured by 256-bit encryption. Flinks will never share your credentials.
            </Text>
          </View>
        </View>
      </ScrollView>
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
    width: '60%', // Slightly more progress than institution selection
    backgroundColor: colors.primary.blue,
  },
  institutionCard: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  institutionHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  institutionIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  institutionIconText: {
    fontSize: 40,
  },
  institutionName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 24,
    textAlign: 'left',
  },
  input: {
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 16,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  passwordInput: {
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    paddingRight: 50,
    fontSize: 16,
    color: '#1A1A1A',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 14,
    padding: 4,
  },
  eyeIconText: {
    fontSize: 20,
    color: '#666666',
  },
  forgotPasswordContainer: {
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  continueButtonActive: {
    backgroundColor: '#388307',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  continueButtonTextActive: {
    color: '#FFFFFF',
  },
  securityMessageContainer: {
    alignItems: 'center',
  },
  securityMessage: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 18,
  },
});
