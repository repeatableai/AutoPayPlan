import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import { useUserStore } from '@store/userStore';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

export const DashboardHomeScreen = () => {
  const navigation = useNavigation();
  const resetOnboarding = useUserStore(state => state.resetOnboarding);

  // These values would come from state/context in real app
  // For now, using mock data based on onboarding inputs
  const monthlyIncome = 3500; // Sum of all income sources
  const needs = 3115; // Sum of essential bills (Housing 1600 + Utilities 225 + Transportation 500 + Groceries 250 + Healthcare 240 + Debt 300)
  const wants = 1015; // Sum of lifestyle extras (Entertainment 200 + Personal Care 240 + Shopping 175 + Travel 340 + Gifts 60)
  const totalSpent = needs + wants; // 4130
  const remaining = monthlyIncome - totalSpent; // -630 (overspending in this case)

  const needsPercentage = (needs / monthlyIncome) * 100; // ~89%
  const wantsPercentage = (wants / monthlyIncome) * 100; // ~29%
  const spendingPercentage = (totalSpent / monthlyIncome) * 100; // ~118%

  // Current date formatting
  const currentDate = new Date();
  const formattedDate = `Today, ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>{formattedDate.toUpperCase()}</Text>
        </View>

        <View style={styles.headerContent}>
          <Text style={styles.spendingAmount}>
            ${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>

          {/* Progress Circle */}
          <View style={styles.progressContainer}>
            <Svg width="140" height="140" viewBox="0 0 140 140">
              {/* Background circle */}
              <Circle
                cx="70"
                cy="70"
                r="56"
                stroke="#F9F9F9"
                strokeWidth="14"
                fill="none"
              />

              {/* Needs arc (green) - starts at top, goes clockwise */}
              <Circle
                cx="70"
                cy="70"
                r="56"
                stroke="#388307"
                strokeWidth="14"
                fill="none"
                strokeDasharray={`${(needsPercentage / 100) * 351.86} 351.86`}
                strokeDashoffset="0"
                rotation="-90"
                origin="70, 70"
                strokeLinecap="round"
              />

              {/* Wants arc (purple) - starts after needs */}
              <Circle
                cx="70"
                cy="70"
                r="56"
                stroke="#A844A6"
                strokeWidth="14"
                fill="none"
                strokeDasharray={`${(wantsPercentage / 100) * 351.86} 351.86`}
                strokeDashoffset={`-${(needsPercentage / 100) * 351.86}`}
                rotation="-90"
                origin="70, 70"
                strokeLinecap="round"
              />

              {/* Center text */}
              <SvgText
                x="70"
                y="60"
                textAnchor="middle"
                fontSize="32"
                fontWeight="700"
                fill="#1E1E1E"
              >
                {Math.round(spendingPercentage)}%
              </SvgText>
              <SvgText
                x="70"
                y="80"
                textAnchor="middle"
                fontSize="12"
                fill="#636566"
              >
                from income
              </SvgText>
            </Svg>
          </View>
        </View>
      </View>

      {/* Status Items */}
      <View style={styles.statusContainer}>
        {/* Needs */}
        <View style={styles.statusItem}>
          <View style={styles.statusLeft}>
            <View style={[styles.statusDot, { backgroundColor: '#388307' }]} />
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusLabel}>Needs</Text>
              <Text style={styles.statusSubLabel}>(Essential bills)</Text>
            </View>
          </View>
          <Text style={styles.statusAmount}>
            ${needs.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
        </View>

        {/* Wants */}
        <View style={styles.statusItem}>
          <View style={styles.statusLeft}>
            <View style={[styles.statusDot, { backgroundColor: '#A844A6' }]} />
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusLabel}>Wants</Text>
              <Text style={styles.statusSubLabel}>(Lifestyle Extras)</Text>
            </View>
          </View>
          <Text style={styles.statusAmount}>
            ${wants.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>
        </View>

        {/* Remaining/Savings */}
        <View style={styles.statusItem}>
          <View style={styles.statusLeft}>
            <View style={[styles.statusDot, styles.statusDotOutline]} />
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusLabel}>Remaining</Text>
              <Text style={styles.statusSubLabel}>(Toward savings/goals)</Text>
            </View>
          </View>
          <Text style={styles.statusAmount}>
            {remaining >= 0
              ? `$${remaining.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              : `-$${Math.abs(remaining).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            }
          </Text>
        </View>
      </View>

      {/* Additional dashboard content would go here */}
      {/* Financial indicators, goals summary, etc. */}

      {/* Debug: Reset Onboarding Button */}
      <TouchableOpacity
        onPress={resetOnboarding}
        style={styles.resetButton}
      >
        <Text style={styles.resetButtonText}>Reset Onboarding (Demo)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.gradient || '#F5F5F5',
  },
  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 100,
  },
  headerCard: {
    backgroundColor: colors.background.white,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTop: {
    backgroundColor: colors.primary.blue,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.background.white,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  headerContent: {
    padding: 24,
    alignItems: 'center',
  },
  spendingAmount: {
    fontSize: 48,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 24,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusContainer: {
    gap: 12,
  },
  statusItem: {
    backgroundColor: colors.background.white,
    borderRadius: 6,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  statusDotOutline: {
    backgroundColor: colors.background.white,
    borderWidth: 2,
    borderColor: '#D9D9D9',
  },
  statusTextContainer: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 2,
  },
  statusSubLabel: {
    fontSize: 12,
    color: '#949494',
  },
  statusAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  resetButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 24,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
});
