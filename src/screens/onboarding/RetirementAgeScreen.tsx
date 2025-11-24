import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import { useUserStore } from '@store/userStore';
import type { OnboardingStackNavigationProp } from '../../types/navigation';

export const RetirementAgeScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();
  const setRetirementAge = useUserStore(state => state.setRetirementAge);

  const [age, setAge] = useState(62);
  const [whyMatterExpanded, setWhyMatterExpanded] = useState(false);
  const [ageDropdownVisible, setAgeDropdownVisible] = useState(false);

  const ageOptions = Array.from({ length: 26 }, (_, i) => 50 + i); // 50-75

  const handleContinue = () => {
    setRetirementAge(age);
    navigation.navigate('EmergencyFund');
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
        <Text style={styles.title}>What age do you plan{'\n'}on retiring?</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>This helps us set your monthly contribution.</Text>

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
              Most Americans step away from full-time work around age 62-64, while Social Security's full retirement age is currently 67. Picking a target age lets us project how many paychecks you'll need — and how long your savings must last.
            </Text>
            <Text style={styles.whyMattersExpandedText}>
              (Guardian Life, US News Money)
            </Text>
          </View>
        )}

        {/* Retirement Card */}
        <View style={styles.retirementCard}>
          <Text style={styles.retirementTitle}>Retirement</Text>
          <View style={styles.divider} />
          <View style={styles.ageRow}>
            <Text style={styles.ageLabel}>Target Age</Text>
            <TouchableOpacity
              style={styles.ageDropdown}
              onPress={() => setAgeDropdownVisible(true)}
            >
              <Text style={styles.ageValue}>{age}</Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
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

      {/* Age Dropdown Modal */}
      <Modal
        visible={ageDropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setAgeDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setAgeDropdownVisible(false)}
        >
          <View style={styles.modalContent}>
            <ScrollView style={styles.modalScrollView}>
              {ageOptions.map((ageOption) => (
                <TouchableOpacity
                  key={ageOption}
                  style={styles.modalOption}
                  onPress={() => {
                    setAge(ageOption);
                    setAgeDropdownVisible(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{ageOption}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
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
    width: '25%',
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
  retirementCard: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  retirementTitle: {
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
  ageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ageLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  ageDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: 107,
    justifyContent: 'space-between',
  },
  ageValue: {
    fontSize: 16,
    color: '#6C757D',
    marginRight: 8,
  },
  dropdownArrow: {
    fontSize: 10,
    color: '#495057',
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
    maxHeight: 400,
  },
  modalScrollView: {
    maxHeight: 350,
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
});
