import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import { useUserStore } from '@store/userStore';
import { useFinancialCalculations } from '@hooks/useFinancialCalculations';
import { getFinancialProfile } from '@services/supabase/profileService';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

export const DashboardHomeScreen = () => {
  const navigation = useNavigation();
  const resetOnboarding = useUserStore(state => state.resetOnboarding);
  const profileId = useUserStore(state => state.profileId);
  
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Use financial calculations hook
  const { dti, utilization, emergencyTarget, loading: calcLoading } = useFinancialCalculations({
    profileId,
    enabled: !!profileId,
  });

  // Load profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!profileId) {
        setLoading(false);
        return;
      }
      
      try {
        const profileData = await getFinancialProfile(profileId);
        setProfile(profileData);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProfile();
  }, [profileId]);

  // Use real data from profile or fallback to defaults
  const monthlyIncome = profile?.income || 3500;
  const needs = profile?.needs || 3115;
  const wants = profile?.wants || 1015;
  const totalSpent = needs + wants;
  const remaining = monthlyIncome - totalSpent;

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
                x="65"
                y="60"
                textAnchor="middle"
                fontSize="20"
                fontWeight="700"
                fill="#1E1E1E"
              >
                {Math.round(spendingPercentage)}
              </SvgText>
              <SvgText
                x="83"
                y="60"
                textAnchor="start"
                fontSize="20"
                fontWeight="700"
                fill="#1E1E1E"
              >
                %
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

      {/* Financial Indicators Summary */}
      {profileId && (
        <View style={styles.indicatorsCard}>
          <Text style={styles.indicatorsTitle}>Financial Health</Text>
          {calcLoading ? (
            <ActivityIndicator size="small" color={colors.primary.blue} />
          ) : (
            <>
              {dti !== null && (
                <View style={styles.indicatorRow}>
                  <Text style={styles.indicatorLabel}>Debt-to-Income:</Text>
                  <Text style={styles.indicatorValue}>
                    {dti === 'Infinity' ? '∞' : `${dti.toFixed(1)}%`}
                  </Text>
                </View>
              )}
              {utilization !== null && (
                <View style={styles.indicatorRow}>
                  <Text style={styles.indicatorLabel}>Credit Utilization:</Text>
                  <Text style={styles.indicatorValue}>{utilization.toFixed(1)}%</Text>
                </View>
              )}
              {emergencyTarget !== null && (
                <View style={styles.indicatorRow}>
                  <Text style={styles.indicatorLabel}>Emergency Fund Target:</Text>
                  <Text style={styles.indicatorValue}>${emergencyTarget.toLocaleString()}</Text>
                </View>
              )}
            </>
          )}
        </View>
      )}

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
  indicatorsCard: {
    backgroundColor: colors.background.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  indicatorsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 12,
  },
  indicatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  indicatorLabel: {
    fontSize: 14,
    color: '#666666',
  },
  indicatorValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
  },
});
