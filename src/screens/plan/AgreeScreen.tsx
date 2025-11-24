import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { PlanStackParamList } from '../../types/navigation';
import { colors } from '@theme';

type AgreeScreenNavigationProp = StackNavigationProp<PlanStackParamList, 'Agree'>;

export const AgreeScreen = () => {
  const navigation = useNavigation<AgreeScreenNavigationProp>();
  const [agreedToDebits, setAgreedToDebits] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleAgreeAndAuthorize = () => {
    if (agreedToDebits && agreedToTerms) {
      // Navigate to confirmation screen
      console.log('Plan authorized!');
      navigation.navigate('Confirmed');
    } else {
      console.log('Please accept both agreements');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agree</Text>
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
        <View style={styles.stepCompleted}>
          <View style={styles.stepCircleCompleted}>
            <Text style={styles.stepCheckmark}>✓</Text>
          </View>
          <Text style={styles.stepLabelCompleted}>Schedule</Text>
        </View>
        <View style={styles.stepLine} />
        <View style={styles.stepActive}>
          <View style={styles.stepCircleActive}>
            <Text style={styles.stepNumberActive}>3</Text>
          </View>
          <Text style={styles.stepLabelActive}>Agree</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Content Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Plan Summary</Text>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Your AutoPayPlan will begin on December 1, 2025. Please continue to make payments before the start date.
            </Text>
          </View>

          {/* Biweekly Debit */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryLeft}>
              <Text style={styles.summaryLabel}>Biweekly Debit</Text>
              <Text style={styles.summarySubLabel}>(Every 14 days)</Text>
            </View>
            <View style={styles.summaryRight}>
              <Text style={styles.summaryAmount}>$392.50*</Text>
              <Text style={styles.summaryMultiplier}>× 2</Text>
            </View>
          </View>

          {/* Subscription Fee */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryLeft}>
              <Text style={styles.summaryLabel}>Subscription Fee</Text>
              <Text style={styles.summarySubLabel}>Waived for 6 months</Text>
            </View>
            <Text style={[styles.summaryAmount, styles.strikethrough]}>$14.99</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Total */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Allocated Monthly:</Text>
            <Text style={styles.totalAmount}>$785.00</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Authorization Checkbox */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAgreedToDebits(!agreedToDebits)}
          >
            <View style={[styles.checkbox, agreedToDebits && styles.checkboxChecked]}>
              {agreedToDebits && <Text style={styles.checkboxCheckmark}>✓</Text>}
            </View>
            <View style={styles.checkboxTextContainer}>
              <Text style={styles.checkboxText}>
                I authorize biweekly debits of $392.50 for my{' '}
                <Text style={styles.boldText}>AutoPayPlan</Text>, totaling $785.00 per month,{' '}
                <Text style={styles.underlineText}>starting on December 1, 2025</Text>. The allocated
                amount may change if I have additional remaining income. The $14.99 ACH Program fee will be
                waived for the first 6 months. Beginning June 1, 2026, this fee will be included in my
                biweekly payments.
              </Text>
            </View>
          </TouchableOpacity>

          {/* Terms and Conditions Checkbox */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAgreedToTerms(!agreedToTerms)}
          >
            <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
              {agreedToTerms && <Text style={styles.checkboxCheckmark}>✓</Text>}
            </View>
            <View style={styles.checkboxTextContainer}>
              <Text style={styles.checkboxText}>
                I accept the AutoPayPlus{' '}
                <Text style={styles.linkText}>Terms and Conditions</Text>.
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Agree and Authorize Button */}
        <TouchableOpacity
          style={[
            styles.agreeButton,
            (!agreedToDebits || !agreedToTerms) && styles.agreeButtonDisabled,
          ]}
          onPress={handleAgreeAndAuthorize}
          disabled={!agreedToDebits || !agreedToTerms}
        >
          <Text style={styles.agreeButtonText}>Agree and Authorize</Text>
        </TouchableOpacity>

        {/* Fine Print */}
        <Text style={styles.fineprint}>
          * Enter some fine print about multiple transactions in one day equal to $392.50 and why that
          happens.
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
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#1E1E1E',
    lineHeight: 20,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  summaryLeft: {
    flex: 1,
  },
  summaryRight: {
    alignItems: 'flex-end',
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 2,
  },
  summarySubLabel: {
    fontSize: 14,
    color: '#949494',
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  summaryMultiplier: {
    fontSize: 14,
    color: '#949494',
    textAlign: 'right',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D9D9D9',
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#0066FF',
    borderColor: '#0066FF',
  },
  checkboxCheckmark: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.background.white,
  },
  checkboxTextContainer: {
    flex: 1,
  },
  checkboxText: {
    fontSize: 14,
    color: '#1E1E1E',
    lineHeight: 20,
  },
  boldText: {
    fontWeight: '700',
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  linkText: {
    color: '#0066FF',
    textDecorationLine: 'underline',
  },
  agreeButton: {
    backgroundColor: colors.primary.green,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  agreeButtonDisabled: {
    backgroundColor: '#A0CDA0',
  },
  agreeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.background.white,
  },
  fineprint: {
    fontSize: 12,
    color: '#949494',
    lineHeight: 16,
    textAlign: 'center',
  },
});
