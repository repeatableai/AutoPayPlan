import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

// Import the building blocks illustration
const BuildingBlocksImage = require('../../assets/images/building-blocks.png');
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { PlanStackParamList } from '../../types/navigation';
import { colors } from '@theme';

type ReviewPlanNavigationProp = StackNavigationProp<PlanStackParamList, 'ReviewPlan'>;

// Mock debt data - will be replaced with real data from store
interface DebtItem {
  type: string;
  count: number;
  withoutPlan: {
    payoffTime: string;
    interestPaid: string;
  };
  withPlan: {
    payoffTime: string;
    interestPaid: string;
  };
  details?: string[];
}

const debtData: DebtItem[] = [
  {
    type: 'Auto Loans',
    count: 1,
    withoutPlan: {
      payoffTime: '5 years',
      interestPaid: '$4,200',
    },
    withPlan: {
      payoffTime: '4 years',
      interestPaid: '$3,150',
    },
    details: [
      'Honda Civic 2020 - $18,500 remaining',
      'Interest Rate: 4.5%',
      'Current Monthly Payment: $350',
    ],
  },
  {
    type: 'Mortgage Accounts',
    count: 1,
    withoutPlan: {
      payoffTime: '25 years',
      interestPaid: '$185,000',
    },
    withPlan: {
      payoffTime: '20 years',
      interestPaid: '$145,000',
    },
    details: [
      'Primary Residence - $285,000 remaining',
      'Interest Rate: 3.75%',
      'Current Monthly Payment: $1,600',
    ],
  },
  {
    type: 'Credit Cards',
    count: 3,
    withoutPlan: {
      payoffTime: '8 years',
      interestPaid: '$12,500',
    },
    withPlan: {
      payoffTime: '3 years',
      interestPaid: '$4,800',
    },
    details: [
      'Chase Sapphire - $8,200 at 17.99% APR',
      'Discover Card - $4,500 at 19.24% APR',
      'Capital One - $2,100 at 21.99% APR',
      'Total Balance: $14,800',
    ],
  },
  {
    type: 'Student Loans',
    count: 2,
    withoutPlan: {
      payoffTime: '12 years',
      interestPaid: '$15,200',
    },
    withPlan: {
      payoffTime: '8 years',
      interestPaid: '$9,215',
    },
    details: [
      'Federal Loan 1 - $32,000 at 4.5%',
      'Federal Loan 2 - $18,500 at 5.2%',
      'Total Balance: $50,500',
    ],
  },
  {
    type: 'Other Loans',
    count: 1,
    withoutPlan: {
      payoffTime: '3 years',
      interestPaid: '$1,800',
    },
    withPlan: {
      payoffTime: '2 years',
      interestPaid: '$950',
    },
    details: [
      'Personal Loan - $8,500 remaining',
      'Interest Rate: 7.5%',
      'Current Monthly Payment: $275',
    ],
  },
];

export const ReviewPlanScreen = () => {
  const navigation = useNavigation<ReviewPlanNavigationProp>();
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (sectionType: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionType]: !prev[sectionType],
    }));
  };

  const handleContinue = () => {
    navigation.navigate('Schedule');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Plan</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Stepper */}
      <View style={styles.stepper}>
        <View style={styles.stepActive}>
          <View style={styles.stepCircleActive}>
            <Text style={styles.stepNumberActive}>1</Text>
          </View>
          <Text style={styles.stepLabelActive}>Review Plan</Text>
        </View>
        <View style={styles.stepLine} />
        <View style={styles.stepInactive}>
          <View style={styles.stepCircleInactive}>
            <Text style={styles.stepNumberInactive}>2</Text>
          </View>
          <Text style={styles.stepLabelInactive}>Schedule</Text>
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
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustration}>
            <Image
              source={BuildingBlocksImage}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
            <Text style={styles.illustrationText}>Your Personalized Debt Payoff Plan</Text>
          </View>
        </View>

        {/* Comparison Headers */}
        <View style={styles.comparisonHeaders}>
          <View style={styles.comparisonHeaderColumn}>
            <Text style={styles.comparisonHeaderText}>Without Plan</Text>
          </View>
          <View style={styles.comparisonHeaderColumn}>
            <Text style={styles.comparisonHeaderText}>With Plan</Text>
          </View>
        </View>

        {/* Auto Loans */}
        <View style={styles.debtSection}>
          <TouchableOpacity
            style={styles.debtHeader}
            onPress={() => toggleSection('Auto Loans')}
          >
            <View style={styles.debtHeaderLeft}>
              <Text style={styles.debtType}>Auto Loans ({debtData[0].count})</Text>
              <Text style={styles.expandIndicator}>
                {expandedSections['Auto Loans'] ? '▼' : '▶'}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.debtComparison}>
            <View style={styles.debtColumn}>
              <Text style={styles.debtTime}>{debtData[0].withoutPlan.payoffTime}</Text>
              <Text style={styles.debtInterest}>{debtData[0].withoutPlan.interestPaid} interest</Text>
            </View>
            <View style={styles.debtColumn}>
              <Text style={[styles.debtTime, styles.withPlanText]}>{debtData[0].withPlan.payoffTime}</Text>
              <Text style={[styles.debtInterest, styles.withPlanText]}>{debtData[0].withPlan.interestPaid} interest</Text>
            </View>
          </View>
          {expandedSections['Auto Loans'] && (
            <View style={styles.debtDetails}>
              {debtData[0].details?.map((detail, index) => (
                <Text key={index} style={styles.debtDetailText}>• {detail}</Text>
              ))}
            </View>
          )}
        </View>

        {/* Additional Debts Header */}
        <View style={styles.additionalDebtsHeader}>
          <Text style={styles.additionalDebtsTitle}>ADDITIONAL DEBTS</Text>
        </View>

        {/* Mortgage Accounts */}
        <View style={styles.debtSection}>
          <TouchableOpacity
            style={styles.debtHeader}
            onPress={() => toggleSection('Mortgage Accounts')}
          >
            <View style={styles.debtHeaderLeft}>
              <Text style={styles.debtType}>Mortgage Accounts ({debtData[1].count})</Text>
              <Text style={styles.expandIndicator}>
                {expandedSections['Mortgage Accounts'] ? '▼' : '▶'}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.debtComparison}>
            <View style={styles.debtColumn}>
              <Text style={styles.debtTime}>{debtData[1].withoutPlan.payoffTime}</Text>
              <Text style={styles.debtInterest}>{debtData[1].withoutPlan.interestPaid} interest</Text>
            </View>
            <View style={styles.debtColumn}>
              <Text style={[styles.debtTime, styles.withPlanText]}>{debtData[1].withPlan.payoffTime}</Text>
              <Text style={[styles.debtInterest, styles.withPlanText]}>{debtData[1].withPlan.interestPaid} interest</Text>
            </View>
          </View>
          {expandedSections['Mortgage Accounts'] && (
            <View style={styles.debtDetails}>
              {debtData[1].details?.map((detail, index) => (
                <Text key={index} style={styles.debtDetailText}>• {detail}</Text>
              ))}
            </View>
          )}
        </View>

        {/* Credit Cards */}
        <View style={styles.debtSection}>
          <TouchableOpacity
            style={styles.debtHeader}
            onPress={() => toggleSection('Credit Cards')}
          >
            <View style={styles.debtHeaderLeft}>
              <Text style={styles.debtType}>Credit Cards ({debtData[2].count})</Text>
              <Text style={styles.expandIndicator}>
                {expandedSections['Credit Cards'] ? '▼' : '▶'}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.debtComparison}>
            <View style={styles.debtColumn}>
              <Text style={styles.debtTime}>{debtData[2].withoutPlan.payoffTime}</Text>
              <Text style={styles.debtInterest}>{debtData[2].withoutPlan.interestPaid} interest</Text>
            </View>
            <View style={styles.debtColumn}>
              <Text style={[styles.debtTime, styles.withPlanText]}>{debtData[2].withPlan.payoffTime}</Text>
              <Text style={[styles.debtInterest, styles.withPlanText]}>{debtData[2].withPlan.interestPaid} interest</Text>
            </View>
          </View>
          {expandedSections['Credit Cards'] && (
            <View style={styles.debtDetails}>
              {debtData[2].details?.map((detail, index) => (
                <Text key={index} style={styles.debtDetailText}>• {detail}</Text>
              ))}
            </View>
          )}
        </View>

        {/* Student Loans */}
        <View style={styles.debtSection}>
          <TouchableOpacity
            style={styles.debtHeader}
            onPress={() => toggleSection('Student Loans')}
          >
            <View style={styles.debtHeaderLeft}>
              <Text style={styles.debtType}>Student Loans ({debtData[3].count})</Text>
              <Text style={styles.expandIndicator}>
                {expandedSections['Student Loans'] ? '▼' : '▶'}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.debtComparison}>
            <View style={styles.debtColumn}>
              <Text style={styles.debtTime}>{debtData[3].withoutPlan.payoffTime}</Text>
              <Text style={styles.debtInterest}>{debtData[3].withoutPlan.interestPaid} interest</Text>
            </View>
            <View style={styles.debtColumn}>
              <Text style={[styles.debtTime, styles.withPlanText]}>{debtData[3].withPlan.payoffTime}</Text>
              <Text style={[styles.debtInterest, styles.withPlanText]}>{debtData[3].withPlan.interestPaid} interest</Text>
            </View>
          </View>
          {expandedSections['Student Loans'] && (
            <View style={styles.debtDetails}>
              {debtData[3].details?.map((detail, index) => (
                <Text key={index} style={styles.debtDetailText}>• {detail}</Text>
              ))}
            </View>
          )}
        </View>

        {/* Other Loans */}
        <View style={styles.debtSection}>
          <TouchableOpacity
            style={styles.debtHeader}
            onPress={() => toggleSection('Other Loans')}
          >
            <View style={styles.debtHeaderLeft}>
              <Text style={styles.debtType}>Other Loans ({debtData[4].count})</Text>
              <Text style={styles.expandIndicator}>
                {expandedSections['Other Loans'] ? '▼' : '▶'}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.debtComparison}>
            <View style={styles.debtColumn}>
              <Text style={styles.debtTime}>{debtData[4].withoutPlan.payoffTime}</Text>
              <Text style={styles.debtInterest}>{debtData[4].withoutPlan.interestPaid} interest</Text>
            </View>
            <View style={styles.debtColumn}>
              <Text style={[styles.debtTime, styles.withPlanText]}>{debtData[4].withPlan.payoffTime}</Text>
              <Text style={[styles.debtInterest, styles.withPlanText]}>{debtData[4].withPlan.interestPaid} interest</Text>
            </View>
          </View>
          {expandedSections['Other Loans'] && (
            <View style={styles.debtDetails}>
              {debtData[4].details?.map((detail, index) => (
                <Text key={index} style={styles.debtDetailText}>• {detail}</Text>
              ))}
            </View>
          )}
        </View>

        {/* Total Savings Section */}
        <View style={styles.savingsSection}>
          <Text style={styles.savingsTitle}>TOTAL SAVINGS WITH AUTOPAYPLAN</Text>

          <View style={styles.savingsCard}>
            <View style={styles.savingsRow}>
              <Text style={styles.savingsLabel}>Combined Interest Reduction</Text>
              <Text style={styles.savingsAmount}>$22,915</Text>
            </View>
            <View style={styles.savingsDivider} />
            <View style={styles.savingsRow}>
              <Text style={styles.savingsLabel}>Subscription Fee</Text>
              <Text style={[styles.savingsAmount, styles.negativeAmount]}>-$750.00</Text>
            </View>
            <View style={styles.savingsDivider} />
            <View style={styles.savingsRow}>
              <Text style={styles.savingsTotalLabel}>Net Savings</Text>
              <Text style={styles.savingsTotalAmount}>$22,165</Text>
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
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
  stepActive: {
    alignItems: 'center',
  },
  stepInactive: {
    alignItems: 'center',
  },
  stepCircleActive: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary.blue,
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
  stepLabelActive: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary.blue,
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
  illustrationContainer: {
    marginBottom: 24,
  },
  illustration: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  illustrationImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 298 / 192, // Matches actual image dimensions
    marginBottom: 12,
  },
  illustrationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    textAlign: 'center',
  },
  comparisonHeaders: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  comparisonHeaderColumn: {
    flex: 1,
    alignItems: 'center',
  },
  comparisonHeaderText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#636566',
  },
  debtSection: {
    backgroundColor: colors.background.white,
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  debtHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  debtHeaderLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  debtType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  expandIndicator: {
    fontSize: 12,
    color: '#636566',
  },
  debtComparison: {
    flexDirection: 'row',
    padding: 16,
  },
  debtColumn: {
    flex: 1,
    alignItems: 'center',
  },
  debtTime: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  debtInterest: {
    fontSize: 14,
    color: '#636566',
  },
  withPlanText: {
    color: colors.primary.green,
  },
  debtDetails: {
    padding: 16,
    paddingTop: 0,
    backgroundColor: '#F9F9F9',
  },
  debtDetailText: {
    fontSize: 14,
    color: '#636566',
    marginBottom: 8,
    lineHeight: 20,
  },
  additionalDebtsHeader: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  additionalDebtsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#949494',
    letterSpacing: 0.5,
  },
  savingsSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  savingsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#949494',
    letterSpacing: 0.5,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  savingsCard: {
    backgroundColor: colors.background.white,
    borderRadius: 8,
    padding: 20,
  },
  savingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  savingsDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  savingsLabel: {
    fontSize: 16,
    color: '#636566',
  },
  savingsAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  negativeAmount: {
    color: '#D32F2F',
  },
  savingsTotalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  savingsTotalAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary.green,
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
});
