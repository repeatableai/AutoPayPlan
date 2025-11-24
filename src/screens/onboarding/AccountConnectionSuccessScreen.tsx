import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import { TransUnionLogo } from '@components/common';
import type { OnboardingStackNavigationProp } from '../../types/navigation';

export const AccountConnectionSuccessScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();

  const handleContinue = () => {
    // Navigate to Flinks institution selection
    navigation.navigate('FlinksInstitutionSelection');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Connected!</Text>

        {/* Lock Icon */}
        <View style={styles.lockIconContainer}>
          <View style={styles.lockIcon}>
            <View style={styles.lockBody}>
              <View style={styles.lockShackle} />
            </View>
          </View>
        </View>

        {/* Connected Services */}
        <View style={styles.servicesContainer}>
          {/* TransUnion - Connected */}
          <View style={styles.serviceRow}>
            <View style={styles.checkmarkCircle}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
            <View style={styles.logoContainer}>
              <TransUnionLogo width={403} height={101} />
            </View>
          </View>
        </View>
      </View>

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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 40,
    textAlign: 'center',
  },
  lockIconContainer: {
    marginBottom: 60,
  },
  lockIcon: {
    width: 100,
    height: 100,
    backgroundColor: colors.background.white,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  lockBody: {
    width: 40,
    height: 45,
    backgroundColor: '#388307',
    borderRadius: 6,
    position: 'relative',
    alignItems: 'center',
  },
  lockShackle: {
    width: 28,
    height: 20,
    borderWidth: 4,
    borderColor: '#388307',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomWidth: 0,
    position: 'absolute',
    top: -18,
  },
  servicesContainer: {
    width: '100%',
    alignItems: 'center',
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  checkmarkCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#388307',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -176,
  },
  checkmark: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.background.white,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 100,
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
