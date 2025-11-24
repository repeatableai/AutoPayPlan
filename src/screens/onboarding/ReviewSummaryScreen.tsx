import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import type { OnboardingStackNavigationProp } from '../../types/navigation';

interface IncomeItem {
  id: string;
  label: string;
  amount: string;
  frequency: string;
}

export const ReviewSummaryScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();

  // Mock data - in real app, this would come from Flinks/state
  const [incomes, setIncomes] = useState<IncomeItem[]>([
    { id: '1', label: 'Income 1', amount: '$2,000.00', frequency: 'Payday: Biweekly' },
    { id: '2', label: 'Income 2', amount: '$1,500.00', frequency: 'Payday: Monthly' },
  ]);

  const [showAddIncome, setShowAddIncome] = useState(false);
  const [newIncomeAmount, setNewIncomeAmount] = useState('');
  const [newIncomeFrequency, setNewIncomeFrequency] = useState<'Weekly' | 'Biweekly' | 'Monthly'>('Monthly');

  const handleContinue = () => {
    // Navigate to Needs/Essential Bills screen
    navigation.navigate('EssentialBills');
  };

  const handleAddOtherIncome = () => {
    setShowAddIncome(true);
  };

  const handleSaveNewIncome = () => {
    if (newIncomeAmount) {
      const newIncome: IncomeItem = {
        id: (incomes.length + 1).toString(),
        label: `Income ${incomes.length + 1}`,
        amount: `$${parseFloat(newIncomeAmount).toFixed(2)}`,
        frequency: `Payday: ${newIncomeFrequency}`,
      };
      setIncomes([...incomes, newIncome]);
      setNewIncomeAmount('');
      setNewIncomeFrequency('Monthly');
      setShowAddIncome(false);
    }
  };

  return (
    <View style={styles.container}>
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

        {/* Income Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Income</Text>

          <View style={styles.divider} />

          {/* Income List */}
          {incomes.map((income) => (
            <View key={income.id} style={styles.incomeItem}>
              <View style={styles.incomeInfo}>
                <Text style={styles.incomeLabel}>{income.label}</Text>
                <Text style={styles.incomeFrequency}>{income.frequency}</Text>
              </View>
              <View style={styles.amountBox}>
                <Text style={styles.amountText}>{income.amount}</Text>
              </View>
            </View>
          ))}

          {/* Add Other Income Button */}
          {!showAddIncome && (
            <TouchableOpacity style={styles.addIncomeButton} onPress={handleAddOtherIncome}>
              <Text style={styles.addIncomeText}>+ Other Income</Text>
            </TouchableOpacity>
          )}

          {/* New Income Form */}
          {showAddIncome && (
            <View style={styles.newIncomeForm}>
              <Text style={styles.newIncomeLabel}>Other Income Amount</Text>
              <TextInput
                style={styles.newIncomeInput}
                value={newIncomeAmount}
                onChangeText={setNewIncomeAmount}
                placeholder="Enter amount"
                keyboardType="numeric"
                placeholderTextColor="#999999"
              />

              <Text style={styles.newIncomeLabel}>Frequency</Text>
              <View style={styles.frequencyButtons}>
                <TouchableOpacity
                  style={[
                    styles.frequencyButton,
                    newIncomeFrequency === 'Weekly' && styles.frequencyButtonActive
                  ]}
                  onPress={() => setNewIncomeFrequency('Weekly')}
                >
                  <Text style={[
                    styles.frequencyButtonText,
                    newIncomeFrequency === 'Weekly' && styles.frequencyButtonTextActive
                  ]}>Weekly</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.frequencyButton,
                    newIncomeFrequency === 'Biweekly' && styles.frequencyButtonActive
                  ]}
                  onPress={() => setNewIncomeFrequency('Biweekly')}
                >
                  <Text style={[
                    styles.frequencyButtonText,
                    newIncomeFrequency === 'Biweekly' && styles.frequencyButtonTextActive
                  ]}>Biweekly</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.frequencyButton,
                    newIncomeFrequency === 'Monthly' && styles.frequencyButtonActive
                  ]}
                  onPress={() => setNewIncomeFrequency('Monthly')}
                >
                  <Text style={[
                    styles.frequencyButtonText,
                    newIncomeFrequency === 'Monthly' && styles.frequencyButtonTextActive
                  ]}>Monthly</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.saveIncomeButton}
                onPress={handleSaveNewIncome}
              >
                <Text style={styles.saveIncomeButtonText}>Add Income</Text>
              </TouchableOpacity>
            </View>
          )}
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
    width: '75%',
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
  incomeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  incomeInfo: {
    flex: 1,
  },
  incomeLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  incomeFrequency: {
    fontSize: 14,
    color: '#666666',
  },
  amountBox: {
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.background.white,
    minWidth: 140,
    alignItems: 'center',
  },
  amountText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  addIncomeButton: {
    marginTop: 8,
  },
  addIncomeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  newIncomeForm: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  newIncomeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
    marginTop: 12,
  },
  newIncomeInput: {
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1A1A1A',
  },
  frequencyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  frequencyButton: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    backgroundColor: colors.background.white,
  },
  frequencyButtonActive: {
    backgroundColor: colors.primary.blue,
    borderColor: colors.primary.blue,
  },
  frequencyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  frequencyButtonTextActive: {
    color: colors.background.white,
  },
  saveIncomeButton: {
    backgroundColor: colors.primary.blue,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveIncomeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background.white,
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
