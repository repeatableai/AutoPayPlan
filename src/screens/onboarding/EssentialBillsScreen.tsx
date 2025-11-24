import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import type { OnboardingStackNavigationProp } from '../../types/navigation';

interface BillItem {
  id: string;
  label: string;
  amount: string;
}

export const EssentialBillsScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();

  // Mock data - in real app, this would come from Flinks/state
  const [bills, setBills] = useState<BillItem[]>([
    { id: '1', label: 'Housing', amount: '1600.00' },
    { id: '2', label: 'Utilities', amount: '225.00' },
    { id: '3', label: 'Transportation', amount: '500.00' },
    { id: '4', label: 'Groceries', amount: '250.00' },
    { id: '5', label: 'Healthcare', amount: '240.00' },
    { id: '6', label: 'Debt Payments', amount: '300.00' },
  ]);

  const handleAmountChange = (id: string, value: string) => {
    setBills(prevBills =>
      prevBills.map(bill =>
        bill.id === id ? { ...bill, amount: value } : bill
      )
    );
  };

  const handleContinue = () => {
    navigation.navigate('LifestyleExtras');
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
        <Text style={styles.title}>Review your summary</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Here is a snapshot of your income, bills, and spending buckets we detected.
        </Text>

        {/* Needs Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Needs (Essential Bills)</Text>

          <View style={styles.divider} />

          {/* Bills List */}
          {bills.map((bill) => (
            <View key={bill.id} style={styles.billItem}>
              <Text style={styles.billLabel}>{bill.label}</Text>
              <View style={styles.amountInputContainer}>
                <Text style={styles.dollarSign}>$</Text>
                <TextInput
                  style={styles.amountInput}
                  value={bill.amount}
                  onChangeText={(value) => handleAmountChange(bill.id, value)}
                  keyboardType="numeric"
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
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
    paddingBottom: 120,
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
    width: '80%', // Slightly more progress
    backgroundColor: colors.primary.blue,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 32,
    lineHeight: 24,
  },
  card: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 24,
  },
  billItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  billLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.background.white,
    minWidth: 140,
  },
  dollarSign: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginRight: 4,
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    padding: 0,
    textAlign: 'right',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
