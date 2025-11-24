import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';

export const AddAccountScreen = () => {
  const navigation = useNavigation();
  const [accountType, setAccountType] = useState<'checking' | 'savings' | 'credit' | null>(null);
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [accountNickname, setAccountNickname] = useState('');

  const handleAddAccount = () => {
    // TODO: Implement account addition logic
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Account</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Accelerate Your Debt Payoffs</Text>
          <Text style={styles.infoDescription}>
            Connect additional accounts to pay off more loans and credit cards faster. AutoPayPlan will automatically manage payments across all your connected accounts.
          </Text>
        </View>

        {/* Account Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Type</Text>
          <View style={styles.accountTypeContainer}>
            <TouchableOpacity
              style={[styles.accountTypeButton, accountType === 'checking' && styles.accountTypeButtonSelected]}
              onPress={() => setAccountType('checking')}
            >
              <Text style={[styles.accountTypeText, accountType === 'checking' && styles.accountTypeTextSelected]}>
                Checking
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.accountTypeButton, accountType === 'savings' && styles.accountTypeButtonSelected]}
              onPress={() => setAccountType('savings')}
            >
              <Text style={[styles.accountTypeText, accountType === 'savings' && styles.accountTypeTextSelected]}>
                Savings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.accountTypeButton, accountType === 'credit' && styles.accountTypeButtonSelected]}
              onPress={() => setAccountType('credit')}
            >
              <Text style={[styles.accountTypeText, accountType === 'credit' && styles.accountTypeTextSelected]}>
                Credit Card
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Details</Text>

          {accountType !== 'credit' && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Routing Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter 9-digit routing number"
                placeholderTextColor="#949494"
                value={routingNumber}
                onChangeText={setRoutingNumber}
                keyboardType="numeric"
                maxLength={9}
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              {accountType === 'credit' ? 'Card Number' : 'Account Number'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={accountType === 'credit' ? 'Enter card number' : 'Enter account number'}
              placeholderTextColor="#949494"
              value={accountNumber}
              onChangeText={setAccountNumber}
              keyboardType="numeric"
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              Confirm {accountType === 'credit' ? 'Card Number' : 'Account Number'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={accountType === 'credit' ? 'Re-enter card number' : 'Re-enter account number'}
              placeholderTextColor="#949494"
              value={confirmAccountNumber}
              onChangeText={setConfirmAccountNumber}
              keyboardType="numeric"
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Account Nickname (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., My Chase Checking"
              placeholderTextColor="#949494"
              value={accountNickname}
              onChangeText={setAccountNickname}
            />
          </View>
        </View>

        {/* Security Note */}
        <View style={styles.securityNote}>
          <Text style={styles.securityIcon}>🔒</Text>
          <Text style={styles.securityText}>
            Your information is encrypted and secure. We use bank-level security to protect your data.
          </Text>
        </View>

        {/* Add Account Button */}
        <TouchableOpacity
          style={[styles.addButton, (!accountType || !accountNumber || !confirmAccountNumber) && styles.addButtonDisabled]}
          onPress={handleAddAccount}
          disabled={!accountType || !accountNumber || !confirmAccountNumber}
        >
          <Text style={styles.addButtonText}>Add Account</Text>
        </TouchableOpacity>

        {/* Connect with Plaid Option */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity
          style={styles.plaidButton}
          onPress={() => (navigation as any).navigate('Onboarding', {
            screen: 'FlinksInstitutionSelection'
          })}
        >
          <Text style={styles.plaidButtonText}>Connect with Bank Login</Text>
        </TouchableOpacity>
        <Text style={styles.plaidNote}>
          Securely connect using your bank credentials via Flinks
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.gray || '#F5F5F5',
  },
  header: {
    backgroundColor: colors.background.white,
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 5,
  },
  backArrow: {
    fontSize: 24,
    color: '#1E1E1E',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  headerSpacer: {
    width: 34,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  infoCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0066FF',
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 14,
    color: '#1E1E1E',
    lineHeight: 20,
  },
  section: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 16,
  },
  accountTypeContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  accountTypeButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    backgroundColor: colors.background.white,
  },
  accountTypeButtonSelected: {
    borderColor: '#0066FF',
    backgroundColor: '#E3F2FD',
  },
  accountTypeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#636566',
  },
  accountTypeTextSelected: {
    color: '#0066FF',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    gap: 12,
  },
  securityIcon: {
    fontSize: 20,
  },
  securityText: {
    flex: 1,
    fontSize: 13,
    color: '#636566',
    lineHeight: 18,
  },
  addButton: {
    backgroundColor: colors.primary.green || '#388307',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  addButtonDisabled: {
    backgroundColor: '#D9D9D9',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.background.white,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    fontSize: 14,
    color: '#949494',
    marginHorizontal: 16,
  },
  plaidButton: {
    backgroundColor: colors.background.white,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0066FF',
    marginBottom: 8,
  },
  plaidButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0066FF',
  },
  plaidNote: {
    fontSize: 12,
    color: '#949494',
    textAlign: 'center',
  },
});
