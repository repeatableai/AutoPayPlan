import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import { FlinksLogo } from '@components/common';
import type { OnboardingStackNavigationProp } from '../../types/navigation';

interface FinancialInstitution {
  id: string;
  name: string;
  website: string;
}

const institutions: FinancialInstitution[] = [
  { id: '1', name: 'Flinks Capital', website: 'flinks-capital.com' },
  { id: '2', name: 'TD', website: 'td.com' },
  { id: '3', name: 'RBC', website: 'rbc.com' },
  { id: '4', name: 'BMO', website: 'bmo.com' },
  { id: '5', name: 'Scotiabank', website: 'scotiabank.com' },
  { id: '6', name: 'CIBC', website: 'cibc.com' },
  { id: '7', name: 'National Bank', website: 'nbc.ca' },
  { id: '8', name: 'Tangerine', website: 'tangerine.ca' },
];

export const FlinksInstitutionSelectionScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInstitutions = institutions.filter(institution =>
    institution.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInstitutionSelect = (institution: FinancialInstitution) => {
    // Navigate to institution login screen
    navigation.navigate('FlinksInstitutionLogin', {
      institutionId: institution.id,
      institutionName: institution.name,
    });
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

        {/* Flinks Logo */}
        <View style={styles.logoContainer}>
          <FlinksLogo width={40} height={40} />
          <Text style={styles.flinksText}>flinks</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Select your institution</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search 100+ financial institutions"
            placeholderTextColor="#999999"
          />
        </View>

        {/* Security Message */}
        <View style={styles.securityMessageContainer}>
          <Text style={styles.lockIcon}>🔒</Text>
          <Text style={styles.securityMessage}>
            Flinks is trusted by 500k+ monthly users to securely connect their account.
          </Text>
        </View>

        {/* Institution List */}
        <View style={styles.institutionList}>
          {filteredInstitutions.map((institution) => (
            <TouchableOpacity
              key={institution.id}
              style={styles.institutionCard}
              onPress={() => handleInstitutionSelect(institution)}
            >
              <View style={styles.institutionInfo}>
                <View style={styles.institutionIconPlaceholder}>
                  <Text style={styles.institutionInitial}>
                    {institution.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.institutionDetails}>
                  <Text style={styles.institutionName}>{institution.name}</Text>
                  <Text style={styles.institutionWebsite}>{institution.website}</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    width: '55%',
    backgroundColor: colors.primary.blue,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  flinksText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 36,
  },
  searchContainer: {
    marginBottom: 24,
  },
  searchInput: {
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1A1A1A',
  },
  securityMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
  },
  lockIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  securityMessage: {
    flex: 1,
    fontSize: 13,
    color: '#388307',
    lineHeight: 18,
  },
  institutionList: {
    width: '100%',
  },
  institutionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  institutionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  institutionIconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  institutionInitial: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.background.white,
  },
  institutionDetails: {
    flex: 1,
  },
  institutionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  institutionWebsite: {
    fontSize: 13,
    color: '#666666',
  },
  chevron: {
    fontSize: 28,
    color: '#CCCCCC',
    fontWeight: '300',
  },
});
