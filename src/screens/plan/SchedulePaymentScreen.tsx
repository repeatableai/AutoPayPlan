import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { PlanStackParamList } from '../../types/navigation';
import { colors } from '@theme';

type SchedulePaymentNavigationProp = StackNavigationProp<PlanStackParamList, 'Schedule'>;

// Mock account data
interface Account {
  id: string;
  name: string;
  lastFour: string;
  dueDate: string;
}

const mockAccounts: Account[] = [
  { id: '1', name: 'AMERICAN EXPRESS', lastFour: '6900', dueDate: '08/29/2025' },
  { id: '2', name: 'CHASE SAPPHIRE', lastFour: '4521', dueDate: '09/05/2025' },
  { id: '3', name: 'DISCOVER CARD', lastFour: '3210', dueDate: '09/12/2025' },
  { id: '4', name: 'CAPITAL ONE', lastFour: '7890', dueDate: '09/19/2025' },
];

export const SchedulePaymentScreen = () => {
  const navigation = useNavigation<SchedulePaymentNavigationProp>();
  const [selectedSchedule, setSelectedSchedule] = useState<'weekly' | 'biweekly'>('biweekly');
  const [lastPaycheck, setLastPaycheck] = useState('08/15/2025');
  const [accountDueDates, setAccountDueDates] = useState<{ [key: string]: string }>({
    '1': '08/29/2025',
    '2': '09/05/2025',
    '3': '09/12/2025',
    '4': '09/19/2025',
  });
  const [currentAccountIndex, setCurrentAccountIndex] = useState(0);
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);

  // Format date input to MM/DD/YYYY (only numeric, auto-add slashes)
  const formatDateMMDDYYYY = (text: string, setter: (value: string) => void) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, '');

    // Limit to 8 digits (MMDDYYYY)
    const limited = cleaned.slice(0, 8);

    // Add slashes in MM/DD/YYYY format
    if (limited.length >= 4) {
      setter(`${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4)}`);
    } else if (limited.length >= 2) {
      setter(`${limited.slice(0, 2)}/${limited.slice(2)}`);
    } else {
      setter(limited);
    }
  };

  // Format handler for lastPaycheck
  const handleLastPaycheckChange = (text: string) => {
    formatDateMMDDYYYY(text, setLastPaycheck);
  };

  // Format handler for account due dates
  const handleDueDateChange = (accountId: string, text: string) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, '');

    // Limit to 8 digits (MMDDYYYY)
    const limited = cleaned.slice(0, 8);

    // Add slashes in MM/DD/YYYY format
    let formatted: string;
    if (limited.length >= 4) {
      formatted = `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4)}`;
    } else if (limited.length >= 2) {
      formatted = `${limited.slice(0, 2)}/${limited.slice(2)}`;
    } else {
      formatted = limited;
    }

    setAccountDueDates({ ...accountDueDates, [accountId]: formatted });
  };

  const handleContinue = () => {
    navigation.navigate('Agree');
  };

  const handleAddAccount = () => {
    // Show inline modal with options
    setShowAddAccountModal(true);
  };

  const handleConnectWithFlinks = () => {
    setShowAddAccountModal(false);
    // Navigate to Flinks flow
    (navigation as any).navigate('Onboarding', {
      screen: 'FlinksInstitutionSelection'
    });
  };

  const handleManualEntry = () => {
    setShowAddAccountModal(false);
    // Navigate to manual entry screen
    (navigation as any).navigate('More', {
      screen: 'AddAccount'
    });
  };

  const handlePrevAccount = () => {
    if (currentAccountIndex > 0) {
      setCurrentAccountIndex(currentAccountIndex - 1);
    }
  };

  const handleNextAccount = () => {
    if (currentAccountIndex < mockAccounts.length - 1) {
      setCurrentAccountIndex(currentAccountIndex + 1);
    }
  };

  const currentAccount = mockAccounts[currentAccountIndex];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Stepper */}
      <View style={styles.stepper}>
        <View style={styles.stepCompleted}>
          <View style={styles.stepCircleCompleted}>
            <Text style={styles.stepCheckmark}>✓</Text>
          </View>
          <Text style={styles.stepLabelCompleted}>Review Plan</Text>
        </View>
        <View style={styles.stepLine} />
        <View style={styles.stepActive}>
          <View style={styles.stepCircleActive}>
            <Text style={styles.stepNumberActive}>2</Text>
          </View>
          <Text style={styles.stepLabelActive}>Schedule</Text>
        </View>
        <View style={styles.stepLine} />
        <View style={styles.stepInactive}>
          <View style={styles.stepCircleInactive}>
            <Text style={styles.stepNumberInactive}>3</Text>
          </View>
          <Text style={styles.stepLabelInactive}>Agree</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Content Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Schedule payments</Text>

          {/* 1. Payment Schedule */}
          <View style={styles.section}>
            <Text style={styles.sectionNumber}>1. Choose a payment schedule based{'\n'}   on your payday:</Text>

            <View style={styles.scheduleOptions}>
              <TouchableOpacity
                style={[
                  styles.scheduleOption,
                  selectedSchedule === 'weekly' && styles.scheduleOptionSelected,
                ]}
                onPress={() => setSelectedSchedule('weekly')}
              >
                <Text style={[styles.scheduleTitle, selectedSchedule === 'weekly' && styles.scheduleTextSelected]}>
                  Weekly{'\n'}Schedule
                </Text>
                <Text style={styles.scheduleSubtitle}>every 7 days</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.scheduleOption,
                  selectedSchedule === 'biweekly' && styles.scheduleOptionSelected,
                ]}
                onPress={() => setSelectedSchedule('biweekly')}
              >
                <Text style={[styles.scheduleTitle, selectedSchedule === 'biweekly' && styles.scheduleTextSelected]}>
                  Biweekly{'\n'}Schedule
                </Text>
                <Text style={styles.scheduleSubtitle}>every 14 days</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 2. Last Paycheck */}
          <View style={styles.section}>
            <Text style={styles.sectionNumber}>2. When was your last paycheck?</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={lastPaycheck}
                onChangeText={handleLastPaycheckChange}
                placeholder="MM/DD/YYYY"
                placeholderTextColor="#AFAFAF"
                keyboardType="numeric"
                maxLength={10}
              />
              <TouchableOpacity style={styles.infoButton}>
                <Text style={styles.infoIcon}>ⓘ</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 3. Account Due Dates */}
          <View style={styles.section}>
            <Text style={styles.sectionNumber}>3. Confirm due dates for each{'\n'}   account:</Text>

            {/* Account Card */}
            <View style={styles.accountCard}>
              <View style={styles.accountHeader}>
                <View style={styles.checkboxChecked}>
                  <Text style={styles.checkboxCheckmark}>✓</Text>
                </View>
                <Text style={styles.accountName}>
                  {currentAccount.name} *{currentAccount.lastFour}
                </Text>
              </View>

              <View style={styles.dueDateContainer}>
                <Text style={styles.dueDateLabel}>
                  Due date{' '}
                  <TouchableOpacity style={styles.infoButtonInline}>
                    <Text style={styles.infoIcon}>ⓘ</Text>
                  </TouchableOpacity>
                </Text>

                <TextInput
                  style={styles.dueDateInput}
                  value={accountDueDates[currentAccount.id]}
                  onChangeText={(text) => handleDueDateChange(currentAccount.id, text)}
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor="#AFAFAF"
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>
            </View>

            {/* Add Another Account */}
            <TouchableOpacity style={styles.addAccountButton} onPress={handleAddAccount}>
              <Text style={styles.addAccountText}>+ Add another account</Text>
            </TouchableOpacity>

            {/* Carousel Navigation */}
            {mockAccounts.length > 1 && (
              <View style={styles.carouselContainer}>
                <TouchableOpacity
                  style={[styles.carouselArrow, currentAccountIndex === 0 && styles.carouselArrowDisabled]}
                  onPress={handlePrevAccount}
                  disabled={currentAccountIndex === 0}
                >
                  <Text style={styles.carouselArrowText}>‹</Text>
                </TouchableOpacity>

                <View style={styles.pagination}>
                  {mockAccounts.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.paginationDot,
                        index === currentAccountIndex && styles.paginationDotActive,
                      ]}
                    />
                  ))}
                </View>

                <TouchableOpacity
                  style={[styles.carouselArrow, currentAccountIndex === mockAccounts.length - 1 && styles.carouselArrowDisabled]}
                  onPress={handleNextAccount}
                  disabled={currentAccountIndex === mockAccounts.length - 1}
                >
                  <Text style={styles.carouselArrowText}>›</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add Account Modal */}
      <Modal
        visible={showAddAccountModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAddAccountModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowAddAccountModal(false)}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <Text style={styles.modalTitle}>Add Another Account</Text>
            <Text style={styles.modalDescription}>
              Choose how you'd like to add your account
            </Text>

            {/* Connect with Flinks Button */}
            <TouchableOpacity style={styles.modalButtonPrimary} onPress={handleConnectWithFlinks}>
              <Text style={styles.modalButtonPrimaryText}>Connect with Bank Login</Text>
              <Text style={styles.modalButtonSubtext}>Securely connect using Flinks</Text>
            </TouchableOpacity>

            {/* Manual Entry Button */}
            <TouchableOpacity style={styles.modalButtonSecondary} onPress={handleManualEntry}>
              <Text style={styles.modalButtonSecondaryText}>Enter Account Manually</Text>
              <Text style={styles.modalButtonSubtextSecondary}>Add account details yourself</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setShowAddAccountModal(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    fontSize: 16,
    color: colors.primary.blue,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  stepper: {
    backgroundColor: colors.background.white,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepCompleted: {
    alignItems: 'center',
  },
  stepActive: {
    alignItems: 'center',
  },
  stepInactive: {
    alignItems: 'center',
  },
  stepCircleCompleted: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF9500',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepCircleActive: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF9500',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepCircleInactive: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepCheckmark: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.background.white,
  },
  stepNumberActive: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.background.white,
  },
  stepNumberInactive: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepLabelCompleted: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  stepLabelActive: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  stepLabelInactive: {
    fontSize: 12,
    fontWeight: '600',
    color: '#949494',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 8,
    marginBottom: 24,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 16,
  },
  scheduleOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  scheduleOption: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#D9D9D9',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  scheduleOptionSelected: {
    borderColor: '#A844A6',
    backgroundColor: '#F5E6F5',
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 4,
  },
  scheduleTextSelected: {
    color: '#1E1E1E',
  },
  scheduleSubtitle: {
    fontSize: 14,
    color: '#636566',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1E1E1E',
  },
  infoButton: {
    padding: 4,
  },
  infoButtonInline: {
    padding: 0,
    marginLeft: 4,
  },
  infoIcon: {
    fontSize: 16,
    color: '#0066FF',
  },
  accountCard: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxChecked: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#0066FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxCheckmark: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.background.white,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  dueDateContainer: {
    marginLeft: 36,
  },
  dueDateLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDateInput: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1E1E1E',
  },
  addAccountButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  addAccountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  carouselContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 16,
  },
  carouselArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0066FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselArrowDisabled: {
    backgroundColor: '#D9D9D9',
    opacity: 0.5,
  },
  carouselArrowText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
  },
  paginationDotActive: {
    backgroundColor: '#0066FF',
  },
  continueButton: {
    backgroundColor: colors.primary.green,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.background.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.background.white,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    color: '#636566',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  modalButtonPrimary: {
    backgroundColor: '#0066FF',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  modalButtonPrimaryText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.background.white,
    marginBottom: 4,
  },
  modalButtonSubtext: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  modalButtonSecondary: {
    backgroundColor: colors.background.white,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  modalButtonSecondaryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  modalButtonSubtextSecondary: {
    fontSize: 13,
    color: '#636566',
  },
  modalCancelButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#949494',
  },
});
