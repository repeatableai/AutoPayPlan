import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import { useUserStore } from '@store/userStore';
import type { OnboardingStackNavigationProp } from '../../types/navigation';

export const EmergencyFundScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();
  const setEmergencyFundTarget = useUserStore(state => state.setEmergencyFundTarget);

  const [amount, setAmount] = useState('0');
  const [whyMatterExpanded, setWhyMatterExpanded] = useState(false);

  const handleContinue = () => {
    setEmergencyFundTarget(parseFloat(amount) || 0);
    navigation.navigate('FinancialFears');
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
        <Text style={styles.title}>Do you currently have{'\n'}an emergency fund?</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Enter an estimated amount.</Text>

        {/* Why this matters dropdown */}
        <TouchableOpacity
          style={styles.whyMattersDropdown}
          onPress={() => setWhyMatterExpanded(!whyMatterExpanded)}
        >
          <View style={styles.whyMattersContent}>
            <Text style={styles.lightbulb}>💡</Text>
            <Text style={styles.whyMattersText}>WHY THIS MATTERS</Text>
          </View>
          <Text style={styles.dropdownIcon}>{whyMatterExpanded ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {/* Why this matters expanded content */}
        {whyMatterExpanded && (
          <View style={styles.whyMattersExpandedContent}>
            <Text style={styles.whyMattersExpandedText}>
              Conventional wisdom suggests saving three months of essential expenses to buffer surprises like job loss or medical bills; many Americans have none. We recommend starting at $1,000 and building up to three months after that.
            </Text>
            <Text style={styles.whyMattersExpandedText}>
              (FINRA, Investopedia)
            </Text>
          </View>
        )}

        {/* Emergency Fund Card */}
        <View style={styles.emergencyCard}>
          <Text style={styles.emergencyTitle}>Emergency Fund</Text>
          <View style={styles.divider} />
          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>Savings Balance</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.dollarSign}>$</Text>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#6C757D"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          onPress={handleContinue}
          style={styles.continueButton}
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
    paddingTop: 60,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 32,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '37%', // Approximately 37% based on design
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
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
  },
  whyMattersDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  whyMattersContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lightbulb: {
    fontSize: 24,
    marginRight: 12,
  },
  whyMattersText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#636566',
  },
  whyMattersExpandedContent: {
    backgroundColor: colors.background.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    marginTop: -16,
  },
  whyMattersExpandedText: {
    fontSize: 14,
    color: '#636566',
    lineHeight: 22,
    marginBottom: 8,
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#4A90E2',
  },
  emergencyCard: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#D9D9D9',
    marginBottom: 20,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: 107,
  },
  dollarSign: {
    fontSize: 16,
    color: '#6C757D',
    marginRight: 8,
  },
  amountInput: {
    fontSize: 16,
    color: '#6C757D',
    flex: 1,
    padding: 0,
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
