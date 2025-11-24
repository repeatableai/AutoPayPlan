import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import type { OnboardingStackNavigationProp } from '../../types/navigation';

interface WantItem {
  id: string;
  label: string;
  amount: string;
}

export const LifestyleExtrasScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();

  // Mock data - in real app, this would come from Flinks/state
  const [wants, setWants] = useState<WantItem[]>([
    { id: '1', label: 'Entertainment', amount: '200.00' },
    { id: '2', label: 'Personal Care', amount: '240.00' },
    { id: '3', label: 'Shopping', amount: '175.00' },
    { id: '4', label: 'Travel', amount: '340.00' },
    { id: '5', label: 'Gifts', amount: '60.00' },
  ]);

  const handleAmountChange = (id: string, value: string) => {
    setWants(prevWants =>
      prevWants.map(want =>
        want.id === id ? { ...want, amount: value } : want
      )
    );
  };

  const handleContinue = () => {
    navigation.navigate('ExpenseReduction');
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

        {/* Wants Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Wants (Lifestyle Extras)</Text>

          <View style={styles.divider} />

          {/* Wants List */}
          {wants.map((want) => (
            <View key={want.id} style={styles.wantItem}>
              <Text style={styles.wantLabel}>{want.label}</Text>
              <View style={styles.amountInputContainer}>
                <Text style={styles.dollarSign}>$</Text>
                <TextInput
                  style={styles.amountInput}
                  value={want.amount}
                  onChangeText={(value) => handleAmountChange(want.id, value)}
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
    width: '87%', // Almost complete
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
  wantItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  wantLabel: {
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
