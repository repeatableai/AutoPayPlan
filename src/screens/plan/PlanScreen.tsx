import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

// Import the building blocks illustration
const BuildingBlocksImage = require('../../assets/images/building-blocks.png');
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { PlanStackParamList } from '@types/navigation';
import { colors } from '@theme';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import { useUserStore } from '@store/userStore';
import { ActivePlanScreen } from './ActivePlanScreen';

type PlanScreenNavigationProp = StackNavigationProp<PlanStackParamList, 'PlanHome'>;

export const PlanScreen = () => {
  const navigation = useNavigation<PlanScreenNavigationProp>();
  const isPlanEnrolled = useUserStore((state) => state.isPlanEnrolled);

  // If user is enrolled, show the active plan view
  if (isPlanEnrolled) {
    return <ActivePlanScreen />;
  }

  const handleSignUpPress = () => {
    navigation.navigate('ReviewPlan');
  };
  // These values would come from state/context in real app
  const monthlyIncome = 5000;
  const needs = 3000;
  const wants = 1215;
  const remaining = 785;
  const totalSpent = needs + wants;

  const needsPercentage = (needs / monthlyIncome) * 100; // 60%
  const wantsPercentage = (wants / monthlyIncome) * 100; // 24%
  const spendingPercentage = ((needs + wants) / monthlyIncome) * 100; // 84%

  // Current month
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long', day: 'numeric' }).toUpperCase();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>TODAY, {currentMonth}</Text>
        </View>

        <View style={styles.headerContent}>
          <View style={styles.spendingRow}>
            <View style={styles.spendingText}>
              <Text style={styles.spendingLabel}>APRIL SPENDING</Text>
              <Text style={styles.spendingAmount}>${totalSpent.toLocaleString()}</Text>
            </View>

            {/* Progress Circle */}
            <View style={styles.progressContainer}>
              <Svg width="100" height="100" viewBox="0 0 100 100">
                {/* Background circle */}
                <Circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#F9F9F9"
                  strokeWidth="10"
                  fill="none"
                />

                {/* Needs arc (green) */}
                <Circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#388307"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${(needsPercentage / 100) * 251.2} 251.2`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                  strokeLinecap="round"
                />

                {/* Wants arc (purple) */}
                <Circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#A844A6"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${(wantsPercentage / 100) * 251.2} 251.2`}
                  strokeDashoffset={`-${(needsPercentage / 100) * 251.2}`}
                  transform="rotate(-90 50 50)"
                  strokeLinecap="round"
                />

                {/* Center text */}
                <SvgText
                  x="50"
                  y="45"
                  textAnchor="middle"
                  fontSize="24"
                  fontWeight="700"
                  fill="#1E1E1E"
                >
                  {Math.round(spendingPercentage)}%
                </SvgText>
                <SvgText
                  x="50"
                  y="60"
                  textAnchor="middle"
                  fontSize="10"
                  fill="#636566"
                >
                  remaining
                </SvgText>
              </Svg>
            </View>
          </View>
        </View>
      </View>

      {/* Status Items */}
      <View style={styles.statusContainer}>
        {/* Needs */}
        <View style={styles.statusItem}>
          <View style={styles.statusLeft}>
            <View style={[styles.statusDot, { backgroundColor: '#388307' }]} />
            <Text style={styles.statusLabel}>Needs (Essential bills)</Text>
          </View>
          <Text style={styles.statusAmount}>${needs.toLocaleString()}</Text>
        </View>

        {/* Wants */}
        <View style={styles.statusItem}>
          <View style={styles.statusLeft}>
            <View style={[styles.statusDot, { backgroundColor: '#A844A6' }]} />
            <Text style={styles.statusLabel}>Wants (Lifestyle extras)</Text>
          </View>
          <Text style={styles.statusAmount}>${wants.toLocaleString()}</Text>
        </View>

        {/* Remaining */}
        <View style={styles.statusItem}>
          <View style={styles.statusLeft}>
            <View style={[styles.statusDot, styles.statusDotOutline]} />
            <Text style={styles.statusLabel}>Remaining (Towards goals)</Text>
          </View>
          <Text style={styles.statusAmount}>${remaining.toLocaleString()}</Text>
        </View>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUpPress}>
        <Text style={styles.signUpButtonText}>Sign up to my personal plan</Text>
      </TouchableOpacity>

      {/* All Spending Link */}
      <TouchableOpacity style={styles.allSpendingLink}>
        <Text style={styles.allSpendingText}>All spending</Text>
        <Text style={styles.allSpendingArrow}>→</Text>
      </TouchableOpacity>

      {/* Building Blocks Section */}
      <View style={styles.buildingBlocksSection}>
        <Text style={styles.buildingBlocksLabel}>YOUR BUILDING BLOCKS TO FINANCIAL WELLNESS</Text>

        <View style={styles.buildingBlocksCard}>
          <Text style={styles.buildingBlocksTitle}>Change your life, without{'\n'}changing your lifestyle</Text>

          <View style={styles.buildingBlocksIllustration}>
            <Image
              source={BuildingBlocksImage}
              style={styles.buildingBlocksImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.comparisonContainer}>
            <View style={styles.comparisonColumn}>
              <Text style={styles.comparisonHeader}>Today, with no{'\n'}real plan</Text>
              <View style={styles.comparisonItem}>
                <Text style={styles.comparisonText}>Above average{'\n'}credit usage at 45%</Text>
              </View>
              <View style={styles.comparisonItem}>
                <Text style={styles.comparisonText}>Debt-to-income{'\n'}over the ideal 30%</Text>
              </View>
              <View style={styles.comparisonItem}>
                <Text style={styles.comparisonText}>Lack of{'\n'}emergency funds</Text>
              </View>
              <View style={styles.comparisonItem}>
                <Text style={styles.comparisonText}>Suboptimal credit{'\n'}score at 620</Text>
              </View>
            </View>

            <View style={styles.comparisonColumn}>
              <Text style={[styles.comparisonHeader, styles.comparisonHeaderBlue]}>Reach goals with{'\n'}AutoPayPlan</Text>
              <View style={[styles.comparisonItem, styles.comparisonItemBlue]}>
                <Text style={styles.comparisonText}>Credit usage under{'\n'}35% in month 6</Text>
              </View>
              <View style={[styles.comparisonItem, styles.comparisonItemBlue]}>
                <Text style={styles.comparisonText}>Debt-to-income{'\n'}under 30% in month 10</Text>
              </View>
              <View style={[styles.comparisonItem, styles.comparisonItemBlue]}>
                <Text style={styles.comparisonText}>Emergency funds in{'\n'}month 2</Text>
              </View>
              <View style={[styles.comparisonItem, styles.comparisonItemBlue]}>
                <Text style={styles.comparisonText}>Credit score at 700{'\n'}for better loan rates,{'\n'}month 15</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUpPress}>
            <Text style={styles.signUpButtonText}>Sign up to my personal plan</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Financial Snapshot Section */}
      <View style={styles.snapshotSection}>
        <View style={styles.snapshotHeader}>
          <Text style={styles.snapshotHeaderText}>YOUR FINANCIAL SNAPSHOT</Text>
        </View>

        <View style={styles.snapshotSubheader}>
          <Text style={styles.snapshotSubheaderText}>Discover how fast we can help you achieve{'\n'}your goals!</Text>
        </View>

        {/* 50% Needs */}
        <View style={styles.progressCard}>
          <View style={styles.progressCardHeader}>
            <View style={styles.progressIconContainer}>
              <Text style={styles.progressIcon}>📋</Text>
            </View>
            <View style={styles.progressHeaderText}>
              <Text style={styles.progressTitle}>50% Needs</Text>
            </View>
            <TouchableOpacity style={styles.infoButton}>
              <Text style={styles.infoButtonText}>ⓘ</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '60%' }]}>
                <Text style={styles.progressBarText}>60%</Text>
              </View>
            </View>
            <View style={styles.maxIndicator}>
              <Text style={styles.maxText}>MAX</Text>
              <View style={styles.maxLine} />
            </View>
          </View>

          <Text style={styles.progressSubtext}>50% reached at month 6</Text>
        </View>

        {/* 30% Wants */}
        <View style={styles.progressCard}>
          <View style={styles.progressCardHeader}>
            <View style={styles.progressIconContainer}>
              <Text style={styles.progressIcon}>🛍️</Text>
            </View>
            <View style={styles.progressHeaderText}>
              <Text style={styles.progressTitle}>30% Wants</Text>
            </View>
            <TouchableOpacity style={styles.infoButton}>
              <Text style={styles.infoButtonText}>ⓘ</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '20%' }]}>
                <Text style={styles.progressBarText}>20%</Text>
              </View>
            </View>
            <View style={[styles.maxIndicator, { left: '30%' }]}>
              <Text style={styles.maxText}>MAX</Text>
              <View style={styles.maxLine} />
            </View>
          </View>

          <Text style={styles.progressSubtext}>{'<30% currently achieved'}</Text>
        </View>

        {/* 20% Remaining */}
        <View style={styles.progressCard}>
          <View style={styles.progressCardHeader}>
            <View style={styles.progressIconContainer}>
              <Text style={styles.progressIcon}>💵</Text>
            </View>
            <View style={styles.progressHeaderText}>
              <Text style={styles.progressTitle}>20% Remaining</Text>
            </View>
            <TouchableOpacity style={styles.infoButton}>
              <Text style={styles.infoButtonText}>ⓘ</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '16%' }]}>
                <Text style={styles.progressBarText}>16%</Text>
              </View>
            </View>
            <View style={[styles.maxIndicator, { left: '20%' }]}>
              <Text style={styles.maxText}>GOAL</Text>
              <View style={styles.maxLine} />
            </View>
          </View>

          <Text style={styles.progressSubtext}>20% reached at month 8</Text>
        </View>

        {/* 35% DTI Ratio */}
        <View style={styles.progressCard}>
          <View style={styles.progressCardHeader}>
            <View style={styles.progressIconContainer}>
              <Text style={styles.progressIcon}>📊</Text>
            </View>
            <View style={styles.progressHeaderText}>
              <Text style={styles.progressTitle}>35% DTI Ratio</Text>
            </View>
            <TouchableOpacity style={styles.infoButton}>
              <Text style={styles.infoButtonText}>ⓘ</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '28%' }]}>
                <Text style={styles.progressBarText}>28%</Text>
              </View>
            </View>
            <View style={[styles.maxIndicator, { left: '35%' }]}>
              <Text style={styles.maxText}>MAX</Text>
              <View style={styles.maxLine} />
            </View>
          </View>

          <Text style={styles.progressSubtext}>35% reached at month 10</Text>
        </View>

        {/* 30% Credit Usage */}
        <View style={styles.progressCard}>
          <View style={styles.progressCardHeader}>
            <View style={styles.progressIconContainer}>
              <Text style={styles.progressIcon}>💳</Text>
            </View>
            <View style={styles.progressHeaderText}>
              <Text style={styles.progressTitle}>30% Credit Usage</Text>
            </View>
            <TouchableOpacity style={styles.infoButton}>
              <Text style={styles.infoButtonText}>ⓘ</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '33%' }]}>
                <Text style={styles.progressBarText}>33%</Text>
              </View>
            </View>
            <View style={[styles.maxIndicator, { left: '30%' }]}>
              <Text style={styles.maxText}>MAX</Text>
              <View style={styles.maxLine} />
            </View>
          </View>

          <Text style={styles.progressSubtext}>30% reached at month 6</Text>
        </View>

        {/* 700+ Credit Score */}
        <View style={styles.progressCard}>
          <View style={styles.progressCardHeader}>
            <View style={styles.progressIconContainer}>
              <Text style={styles.progressIcon}>⭐</Text>
            </View>
            <View style={styles.progressHeaderText}>
              <Text style={styles.progressTitle}>700+ Credit Score</Text>
            </View>
            <TouchableOpacity style={styles.infoButton}>
              <Text style={styles.infoButtonText}>ⓘ</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '85%' }]}>
                <Text style={styles.progressBarText}>620</Text>
              </View>
            </View>
            <View style={[styles.maxIndicator, { left: '95%' }]}>
              <Text style={styles.maxText}>GOAL</Text>
              <View style={styles.maxLine} />
            </View>
          </View>

          <Text style={styles.progressSubtext}>700 Score reached at month 15</Text>
        </View>

        {/* $16,500 Retirement */}
        <View style={styles.progressCard}>
          <View style={styles.progressCardHeader}>
            <View style={styles.progressIconContainer}>
              <Text style={styles.progressIcon}>🛒</Text>
            </View>
            <View style={styles.progressHeaderText}>
              <Text style={styles.progressTitle}>$16,500 Retirement</Text>
            </View>
            <TouchableOpacity style={styles.infoButton}>
              <Text style={styles.infoButtonText}>ⓘ</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '0%' }]}>
                <Text style={styles.progressBarText}>$450</Text>
              </View>
            </View>
            <View style={[styles.maxIndicator, { left: '75%' }]}>
              <Text style={styles.maxText}>GOAL</Text>
              <View style={styles.maxLine} />
            </View>
          </View>

          <Text style={styles.progressSubtext}>$16,500 by age 62</Text>
        </View>

        {/* Bottom Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUpPress}>
          <Text style={styles.signUpButtonText}>Sign up to my personal plan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    paddingBottom: 100,
  },
  headerCard: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    overflow: 'hidden',
    margin: 16,
    marginTop: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTop: {
    backgroundColor: '#0576CE',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.background.white,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  headerContent: {
    padding: 16,
  },
  spendingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spendingText: {
    flex: 1,
  },
  spendingLabel: {
    fontSize: 10,
    color: '#636566',
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  spendingAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  statusItem: {
    backgroundColor: colors.background.white,
    borderRadius: 6,
    padding: 12,
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
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusDotOutline: {
    backgroundColor: colors.background.white,
    borderWidth: 2,
    borderColor: '#D9D9D9',
  },
  statusLabel: {
    fontSize: 14,
    color: '#2C2C2C',
  },
  statusAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  signUpButton: {
    backgroundColor: '#388307',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginHorizontal: 16,
    marginTop: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background.white,
  },
  allSpendingLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  allSpendingText: {
    fontSize: 14,
    color: '#0576CE',
    fontWeight: '500',
    marginRight: 4,
  },
  allSpendingArrow: {
    fontSize: 14,
    color: '#0576CE',
  },
  buildingBlocksSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  buildingBlocksLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#636566',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  buildingBlocksCard: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buildingBlocksTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C2C2C',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 28,
  },
  buildingBlocksIllustration: {
    alignItems: 'center',
    marginBottom: 20,
  },
  buildingBlocksImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 298 / 192, // Matches actual image dimensions
  },
  comparisonContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  comparisonColumn: {
    flex: 1,
  },
  comparisonHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2C2C2C',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 20,
  },
  comparisonHeaderBlue: {
    color: '#0576CE',
  },
  comparisonItem: {
    backgroundColor: '#F9F9F9',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    minHeight: 60,
    justifyContent: 'center',
  },
  comparisonItemBlue: {
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#0576CE',
  },
  comparisonText: {
    fontSize: 12,
    color: '#2C2C2C',
    textAlign: 'center',
    lineHeight: 16,
  },
  snapshotSection: {
    marginTop: 24,
    backgroundColor: colors.background.white,
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  snapshotHeader: {
    backgroundColor: '#0576CE',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  snapshotHeaderText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.background.white,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  snapshotSubheader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  snapshotSubheaderText: {
    fontSize: 13,
    color: '#636566',
    textAlign: 'center',
    lineHeight: 18,
  },
  progressCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  progressCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginRight: 12,
  },
  progressIcon: {
    fontSize: 28,
  },
  progressHeaderText: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  infoButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButtonText: {
    fontSize: 18,
    color: '#636566',
  },
  progressBarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  progressBarBackground: {
    height: 20,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2C2C2C',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0576CE',
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  progressBarText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.background.white,
  },
  maxIndicator: {
    position: 'absolute',
    top: -30,
    alignItems: 'center',
  },
  maxText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0576CE',
    letterSpacing: 0.5,
  },
  maxLine: {
    width: 2,
    height: 20,
    backgroundColor: '#2C2C2C',
    marginTop: 2,
  },
  progressSubtext: {
    fontSize: 12,
    color: '#636566',
  },
});
