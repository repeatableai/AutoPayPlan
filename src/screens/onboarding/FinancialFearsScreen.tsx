import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import { useUserStore } from '@store/userStore';
import type { OnboardingStackNavigationProp } from '../../types/navigation';

export const FinancialFearsScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();
  const setFinancialFears = useUserStore(state => state.setFinancialFears);

  const [selectedFear, setSelectedFear] = useState<string | null>(null);

  const fears = [
    { id: 'debt', label: 'Drowning in debt' },
    { id: 'emergency', label: 'Not having funds to deal with a sudden emergency' },
    { id: 'credit-1', label: 'Not qualifying for a good loan, due to a bad credit score' },
    { id: 'credit-2', label: 'Not qualifying for a good loan, due to a bad credit score' },
    { id: 'paycheck', label: 'Barely making it, living paycheck to paycheck' },
    { id: 'none', label: 'None' },
  ];

  const handleContinue = () => {
    setFinancialFears(selectedFear ? [selectedFear] : []);
    navigation.navigate('AccountConnectionConsent');
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
        <Text style={styles.title}>What is your biggest{'\n'}financial fear?</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Select only one.</Text>

        {/* Fear Options Grid */}
        <View style={styles.fearsGrid}>
          {fears.map((fear) => (
            <TouchableOpacity
              key={fear.id}
              style={[
                styles.fearCard,
                selectedFear === fear.id && styles.fearCardSelected
              ]}
              onPress={() => setSelectedFear(fear.id)}
            >
              <Text style={styles.fearLabel}>{fear.label}</Text>
            </TouchableOpacity>
          ))}
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
    width: '43%', // Approximately 43% based on design
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
  fearsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  fearCard: {
    width: '48%',
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: 24,
    borderWidth: 1.25,
    borderColor: '#2C2C2C',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
    marginBottom: 16,
  },
  fearCardSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#1A1A1A',
    borderWidth: 2,
  },
  fearLabel: {
    fontSize: 16,
    color: '#2C2C2C',
    textAlign: 'center',
    lineHeight: 22,
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
