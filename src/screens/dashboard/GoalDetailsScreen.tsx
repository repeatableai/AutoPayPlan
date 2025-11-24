import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import type { DashboardStackParamList } from '@types/navigation';
import { colors } from '@theme';
import { Button } from '@components/common';
import { useUserStore } from '@store/userStore';

type GoalDetailsScreenNavigationProp = StackNavigationProp<DashboardStackParamList, 'GoalDetails'>;
type GoalDetailsScreenRouteProp = RouteProp<DashboardStackParamList, 'GoalDetails'>;

type GoalOption = 'Vacation' | 'Downpayment' | 'Large purchase' | '';

export const GoalDetailsScreen = () => {
  const navigation = useNavigation<GoalDetailsScreenNavigationProp>();
  const route = useRoute<GoalDetailsScreenRouteProp>();
  const { goalType, goalId } = route.params;
  const addGoal = useUserStore((state) => state.addGoal);
  const updateGoal = useUserStore((state) => state.updateGoal);
  const goals = useUserStore((state) => state.goals);

  // Debug logging
  console.log('GoalDetailsScreen - goalType:', goalType);
  console.log('GoalDetailsScreen - goalId:', goalId);
  console.log('GoalDetailsScreen - all goals:', goals);

  // Find existing goal if editing
  const existingGoal = goalId ? goals.find(g => g.id === goalId) : null;
  console.log('GoalDetailsScreen - existingGoal:', existingGoal);

  // Determine the selected goal option based on existing goal
  const getGoalOption = (goal: typeof existingGoal): GoalOption => {
    if (!goal) return '';
    if (goal.name === 'Vacation' || goal.name === 'Downpayment') {
      return goal.name;
    }
    return 'Large purchase';
  };

  // Format date from existing goal
  const formatDateFromGoal = (goal: typeof existingGoal): string => {
    if (!goal?.targetDate) return '';
    const date = new Date(goal.targetDate);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${year}`;
  };

  const [selectedGoal, setSelectedGoal] = useState<GoalOption>(getGoalOption(existingGoal));
  const [customGoalName, setCustomGoalName] = useState(
    existingGoal && existingGoal.name !== 'Vacation' && existingGoal.name !== 'Downpayment'
      ? existingGoal.name
      : ''
  );
  const [amount, setAmount] = useState(existingGoal?.targetAmount.toString() || '');
  const [date, setDate] = useState(formatDateFromGoal(existingGoal));
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Format date input to MM/YYYY (only numeric, auto-add slash)
  const formatDateInput = (text: string) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, '');

    // Limit to 6 digits (MMYYYY)
    const limited = cleaned.slice(0, 6);

    // Add slash after month
    if (limited.length >= 2) {
      setDate(`${limited.slice(0, 2)}/${limited.slice(2)}`);
    } else {
      setDate(limited);
    }
  };
  const [whyMatterVisible, setWhyMatterVisible] = useState(false);
  const [whyMatterExpanded, setWhyMatterExpanded] = useState(false);
  const [selectedWhyMatter, setSelectedWhyMatter] = useState('');

  const isShortTerm = goalType === 'short-term';
  const goalTitle = isShortTerm ? 'Short-term' : 'Long-term';
  const isEditing = !!goalId;

  const goalOptions: GoalOption[] = ['Vacation', 'Downpayment', 'Large purchase'];

  const handleSelectGoal = (goal: GoalOption) => {
    setSelectedGoal(goal);
    setDropdownVisible(false);
    if (goal !== 'Large purchase') {
      setCustomGoalName('');
    }
  };

  const whyMattersOptions = ['New Couch', 'New TV', 'Downpayment', 'Wedding'];

  const handleSelectWhyMatter = (option: string) => {
    setSelectedWhyMatter(option);
    setWhyMatterVisible(false);
  };

  const handleSave = () => {
    // For editing flow, navigate to onboarding RetirementAge screen
    if (isEditing) {
      // @ts-ignore - navigating to a different stack
      navigation.navigate('Onboarding', { screen: 'RetirementAge' });
      return;
    }

    // Creation flow validation and save
    if (!selectedGoal || !amount || !date) {
      return;
    }

    const goalName = selectedGoal === 'Large purchase' && customGoalName
      ? customGoalName
      : selectedGoal;

    const parsedAmount = parseFloat(amount.replace(/,/g, ''));

    // Parse date (MM/YYYY format)
    const [month, year] = date.split('/');
    const targetDate = new Date(parseInt(year), parseInt(month) - 1, 1);

    // Create new goal
    const newGoal = {
      id: Date.now().toString(),
      userId: 'temp-user-id',
      name: goalName,
      targetAmount: parsedAmount,
      currentAmount: 0,
      monthlyContribution: 0,
      targetDate,
      projectedCompletionDate: targetDate,
      startDate: new Date(),
      category: selectedGoal === 'Vacation' ? 'vacation' : selectedGoal === 'Downpayment' ? 'home' : 'other' as 'vacation' | 'home' | 'other',
      priority: 'medium' as 'medium',
      icon: selectedGoal === 'Vacation' ? '✈️' : selectedGoal === 'Downpayment' ? '🏠' : '🎯',
      status: 'active' as 'active',
      isOnTrack: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    addGoal(newGoal);

    navigation.navigate('GoalSelection');
  };

  // If editing, show the priority/non-negotiable screen instead
  if (isEditing) {
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
          <Text style={styles.editTitle}>Which goal is{'\n'}non-negotiable?</Text>
          <Text style={styles.editSubtitle}>Choose {'{'} one {'}'}.</Text>

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
                Life happens. If cash flow dips, we may recommend pushing the target date back a few months rather than pausing your plan. You stay in control — approve, adjust, or reject any date change we suggest.
              </Text>
            </View>
          )}

          {/* Goal Cards */}
          <View style={styles.goalsGrid}>
            {whyMattersOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.goalOptionCard,
                  selectedWhyMatter === option && styles.goalOptionCardSelected
                ]}
                onPress={() => setSelectedWhyMatter(option)}
              >
                <View style={styles.goalOptionIconContainer}>
                  <Text style={styles.goalOptionIcon}>
                    {option === 'New Couch' ? '🏷️' : option === 'New TV' ? '🏷️' : option === 'Wedding' ? '🧡' : '🏠'}
                  </Text>
                </View>
                <Text style={styles.goalOptionLabel}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.bottomButtonContainer}>
          <Button
            onPress={handleSave}
            fullWidth
            style={styles.continueButton}
          >
            Continue
          </Button>
        </View>

        {/* Why this matters Modal */}
        <Modal
          visible={whyMatterVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setWhyMatterVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setWhyMatterVisible(false)}
          >
            <View style={styles.modalContent}>
              {whyMattersOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.modalOption}
                  onPress={() => handleSelectWhyMatter(option)}
                >
                  <Text style={styles.modalOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }

  // Creation flow
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🌱</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{`{${goalTitle}} goal`}</Text>

        {/* Select a goal dropdown */}
        <View style={styles.fieldContainer}>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setDropdownVisible(true)}
          >
            <Text style={[
              selectedGoal ? styles.dropdownText : styles.dropdownPlaceholder
            ]}>
              {selectedGoal || 'Select a goal'}
            </Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Conditional Goal Name field for Large purchase */}
        {selectedGoal === 'Large purchase' && (
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Goal Name</Text>
            <TextInput
              style={styles.dateInput}
              value={customGoalName}
              onChangeText={setCustomGoalName}
              placeholder="Enter goal name"
              placeholderTextColor="#999999"
            />
          </View>
        )}

        {/* Amount */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder=""
            />
          </View>
        </View>

        {/* Date of Goal */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Date of Goal</Text>
          <TextInput
            style={styles.dateInput}
            value={date}
            onChangeText={formatDateInput}
            placeholder="MM/YYYY"
            placeholderTextColor="#999999"
            keyboardType="numeric"
            maxLength={7}
          />
        </View>

        {/* Dropdown Modal */}
        <Modal
          visible={dropdownVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setDropdownVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setDropdownVisible(false)}
          >
            <View style={styles.modalContent}>
              {goalOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.modalOption}
                  onPress={() => handleSelectGoal(option)}
                >
                  <Text style={styles.modalOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Why this matters Modal */}
        <Modal
          visible={whyMatterVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setWhyMatterVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setWhyMatterVisible(false)}
          >
            <View style={styles.modalContent}>
              {whyMattersOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.modalOption}
                  onPress={() => handleSelectWhyMatter(option)}
                >
                  <Text style={styles.modalOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>

      {/* Bottom buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>Close</Text>
        </TouchableOpacity>
        <Button
          onPress={handleSave}
          style={styles.saveButton}
        >
          Save
        </Button>
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
    width: '10%',
    backgroundColor: colors.primary.blue,
  },
  editTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 40,
  },
  editSubtitle: {
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
  },
  whyMattersExpandedText: {
    fontSize: 14,
    color: '#636566',
    lineHeight: 22,
  },
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  goalOptionCard: {
    width: '48%',
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
  },
  goalOptionCardSelected: {
    borderColor: '#1A1A1A',
  },
  goalOptionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  goalOptionIcon: {
    fontSize: 28,
  },
  goalOptionLabel: {
    fontSize: 16,
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
    backgroundColor: '#73A942',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 32,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#999999',
  },
  dropdownText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#4A90E2',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: 8,
    width: '80%',
    maxWidth: 400,
  },
  modalOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#1A1A1A',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 18,
    color: '#1A1A1A',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    paddingVertical: 16,
  },
  dateInput: {
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#1A1A1A',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  closeButton: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    textDecorationLine: 'underline',
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 48,
  },
  sectionContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#636566',
  },
});
