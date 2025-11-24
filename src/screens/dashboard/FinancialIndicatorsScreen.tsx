import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { DashboardStackParamList } from '@types/navigation';
import { colors, spacing } from '@theme';
import { Button } from '@components/common';

type FinancialIndicatorsScreenNavigationProp = StackNavigationProp<DashboardStackParamList, 'FinancialIndicators'>;

export const FinancialIndicatorsScreen = () => {
  const navigation = useNavigation<FinancialIndicatorsScreenNavigationProp>();
  const [showAll, setShowAll] = useState(false);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Title */}
        <Text style={styles.title}>
          Factors we use to track your{'\n'}financial health
        </Text>

        {/* Key Indicators Card */}
        <View style={styles.indicatorsCard}>
          <View style={styles.indicatorsHeader}>
            <Text style={styles.indicatorsHeaderText}>6 KEY FINANCIAL INDICATORS*</Text>
          </View>

          {/* Needs Row */}
          <View style={styles.indicatorRow}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>📋</Text>
            </View>
            <Text style={styles.indicatorLabel}>Needs</Text>
            <View style={styles.targetContainer}>
              <Text style={styles.targetLabel}>TARGET</Text>
              <View style={styles.targetBadge}>
                <Text style={styles.targetValue}>≤ 50%</Text>
              </View>
            </View>
            <Text style={styles.chevron}>∨</Text>
          </View>

          {/* Wants Row */}
          <View style={styles.indicatorRow}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>🛍️</Text>
            </View>
            <Text style={styles.indicatorLabel}>Wants</Text>
            <View style={styles.targetContainer}>
              <Text style={styles.targetLabel}>TARGET</Text>
              <View style={styles.targetBadge}>
                <Text style={styles.targetValue}>≤ 30%</Text>
              </View>
            </View>
            <Text style={styles.chevron}>∨</Text>
          </View>

          {/* Remaining Row */}
          <View style={styles.indicatorRow}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>💵</Text>
            </View>
            <Text style={styles.indicatorLabel}>Remaining</Text>
            <View style={styles.targetContainer}>
              <Text style={styles.targetLabel}>TARGET</Text>
              <View style={styles.targetBadge}>
                <Text style={styles.targetValue}>≤ 20%</Text>
              </View>
            </View>
            <Text style={styles.chevron}>∨</Text>
          </View>

          {/* Additional rows when expanded */}
          {showAll && (
            <>
              {/* Credit Usage Row */}
              <View style={styles.indicatorRow}>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>💳</Text>
                </View>
                <Text style={styles.indicatorLabel}>Credit Usage</Text>
                <View style={styles.targetContainer}>
                  <Text style={styles.targetLabel}>TARGET</Text>
                  <View style={styles.targetBadge}>
                    <Text style={styles.targetValue}>≤ 30%</Text>
                  </View>
                </View>
                <Text style={styles.chevron}>∨</Text>
              </View>

              {/* Debt to Income (DTI) Row */}
              <View style={styles.indicatorRow}>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>📊</Text>
                </View>
                <Text style={styles.indicatorLabel}>Debt to Income (DTI)</Text>
                <View style={styles.targetContainer}>
                  <Text style={styles.targetLabel}>TARGET</Text>
                  <View style={styles.targetBadge}>
                    <Text style={styles.targetValue}>≤ 36%</Text>
                  </View>
                </View>
                <Text style={styles.chevron}>∨</Text>
              </View>

              {/* Credit Score Row */}
              <View style={styles.indicatorRow}>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>⭐</Text>
                </View>
                <Text style={styles.indicatorLabel}>Credit Score</Text>
                <View style={styles.targetContainer}>
                  <Text style={styles.targetLabel}>TARGET</Text>
                  <View style={styles.targetBadge}>
                    <Text style={styles.targetValue}>≥ 740</Text>
                  </View>
                </View>
                <Text style={styles.chevron}>∨</Text>
              </View>
            </>
          )}

          {/* Show All Button */}
          <TouchableOpacity
            style={styles.showAllButton}
            onPress={() => setShowAll(!showAll)}
          >
            <Text style={styles.showAllText}>{showAll ? 'Show less' : 'Show all'}</Text>
          </TouchableOpacity>
        </View>

        {/* Start Button */}
        <Button
          onPress={() => navigation.navigate('GoalSelection')}
          fullWidth
          style={styles.startButton}
        >
          Start your first free 6 months*
        </Button>

        {/* Preview Mode Button */}
        <Button
          onPress={() => console.log('Try preview mode')}
          fullWidth
          variant="secondary"
          style={styles.previewButton}
        >
          Try preview mode
        </Button>

        {/* Footnote */}
        <Text style={styles.footnote}>
          *These are key financial indicators (KFIs) standard across all Americans, but not all Americans view money the same way. That's why AutoPayPlan personalizes your strategy based on your financial fears, not just your finances.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8F0',
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 36,
  },
  indicatorsCard: {
    backgroundColor: colors.background.white,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  indicatorsHeader: {
    backgroundColor: colors.primary.blue,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  indicatorsHeaderText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.background.white,
    letterSpacing: 0.5,
  },
  indicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 28,
  },
  indicatorLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  targetContainer: {
    alignItems: 'flex-end',
    marginRight: 12,
  },
  targetLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#666666',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  targetBadge: {
    backgroundColor: colors.primary.blue,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  targetValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.background.white,
  },
  chevron: {
    fontSize: 16,
    color: '#666666',
  },
  showAllButton: {
    paddingVertical: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  showAllText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    textDecorationLine: 'underline',
  },
  startButton: {
    marginBottom: 16,
    backgroundColor: '#388307',
  },
  previewButton: {
    marginBottom: 24,
    backgroundColor: colors.background.white,
    borderWidth: 2,
    borderColor: '#1A1A1A',
  },
  footnote: {
    fontSize: 13,
    color: '#999999',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 32,
  },
});
