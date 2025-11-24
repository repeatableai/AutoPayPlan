import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { colors } from '@theme';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 40; // 20px padding on each side

export const ActivePlanScreen = () => {
  const [selectedDateType, setSelectedDateType] = useState<'debit' | 'payment'>('debit');
  const [currentMilestoneIndex, setCurrentMilestoneIndex] = useState(0);
  const milestoneScrollRef = useRef<ScrollView>(null);

  const handleMilestoneScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / CARD_WIDTH);
    if (index !== currentMilestoneIndex && index >= 0 && index < 4) {
      setCurrentMilestoneIndex(index);
    }
  };

  const scrollToMilestone = (index: number) => {
    milestoneScrollRef.current?.scrollTo({ x: index * CARD_WIDTH, animated: true });
    setCurrentMilestoneIndex(index);
  };

  // Mock data - will be replaced with real data from store
  const monthlyIncome = 5000;
  const needs = 3000;
  const wants = 1215;
  const remaining = 785;

  const needsPercentage = (needs / monthlyIncome) * 100; // 60%
  const wantsPercentage = (wants / monthlyIncome) * 100; // 24%
  const remainingPercentage = (remaining / monthlyIncome) * 100; // 16%

  const upcomingPayments = [
    { id: '1', date: 'NOV\n29', type: 'AutoPayPlan', subtype: 'Debit', amount: 785.00 },
    { id: '2', date: 'DEC\n5', type: 'Chase Credit Card', subtype: 'Payment', amount: 184.00 },
  ];

  const milestones = [
    {
      id: '1',
      month: 'MONTH 1-2',
      icon: '💵',
      focus: 'Build up emergency cash',
      milestone: 'Emergency Savings reached at $1,051.90',
      allocations: [
        { label: 'Emergency Savings', amount: '$525.95', priority: 'high' },
        { label: 'Debt Payments', amount: '$172.70', priority: 'high' },
        { label: 'Short-term Goals', amount: '$86.35', priority: 'low' },
        { label: 'Retirement', amount: '$0', priority: 'low' },
      ],
      totalMonthly: '$785',
    },
    {
      id: '2',
      month: 'MONTH 3-29',
      icon: '💳',
      focus: 'Payoff Credit Card Debt',
      milestone: 'American Express **34 $0 Balance, Large Purchase Fund reached at $6,152.70',
      allocations: [
        { label: 'Debt Payments', amount: '$500.00', priority: 'high' },
        { label: 'Short-term Goals', amount: '$230.00', priority: 'high' },
        { label: 'Emergency Savings', amount: '$55.00', priority: 'low' },
        { label: 'Retirement', amount: '$0', priority: 'low' },
      ],
      totalMonthly: '$785',
    },
    {
      id: '3',
      month: 'MONTH 30-40',
      icon: '🌱',
      focus: 'Save for future goals',
      milestone: 'Wedding Fund reached at $6,204.40',
      allocations: [
        { label: 'Long-term Goals', amount: '$620.00', priority: 'high' },
        { label: 'Retirement', amount: '$100.00', priority: 'high' },
        { label: 'Emergency Savings', amount: '$65.00', priority: 'low' },
        { label: 'Debt Payments', amount: '$0', priority: 'low' },
      ],
      totalMonthly: '$785',
    },
    {
      id: '4',
      month: 'MONTH 41-56',
      icon: '🪑',
      focus: 'Build retirement and long-term goal funds',
      milestone: 'Downpayment Fund reached at $10,900',
      allocations: [
        { label: 'Retirement', amount: '$450.00', priority: 'high' },
        { label: 'Long-term Goals', amount: '$400.00', priority: 'high' },
        { label: 'Emergency Savings', amount: '$150.00', priority: 'low' },
        { label: 'Debt Payments', amount: '$0', priority: 'low' },
      ],
      totalMonthly: '$785',
    },
  ];

  const currentMilestone = milestones[currentMilestoneIndex];

  return (
    <ScrollView style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={styles.dateHeader}>
          <Text style={styles.dateText}>TODAY, NOVEMBER 14</Text>
        </View>

        <View style={styles.spendingCard}>
          <Text style={styles.spendingLabel}>NOVEMBER SPENDING</Text>

          <View style={styles.chartRow}>
            <View style={styles.chartContainer}>
              <Svg width="140" height="140" viewBox="0 0 100 100">
                {/* Needs arc (green) */}
                <Circle
                  cx="50"
                  cy="50"
                  r="35"
                  stroke="#388307"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(needsPercentage / 100) * 219.8} 219.8`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                  strokeLinecap="round"
                />
                {/* Wants arc (purple) */}
                <Circle
                  cx="50"
                  cy="50"
                  r="35"
                  stroke="#A844A6"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(wantsPercentage / 100) * 219.8} 219.8`}
                  strokeDashoffset={`-${(needsPercentage / 100) * 219.8}`}
                  transform="rotate(-90 50 50)"
                  strokeLinecap="round"
                />
                {/* Center text */}
                <SvgText
                  x="50"
                  y="52"
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="700"
                  fill="#1E1E1E">
                  {`$${monthlyIncome.toLocaleString('en-US')}`}
                </SvgText>
              </Svg>
            </View>

            <View style={styles.percentageContainer}>
              <Text style={styles.percentageText}>{Math.round(remainingPercentage)}%</Text>
              <Text style={styles.percentageLabel}>Remaining{'\n'}from income</Text>
            </View>
          </View>

          {/* Breakdown */}
          <View style={styles.breakdown}>
            <View style={styles.breakdownRow}>
              <View style={styles.breakdownLeft}>
                <View style={[styles.statusDot, { backgroundColor: '#388307' }]} />
                <Text style={styles.statusLabel}>Needs (Essential bills)</Text>
              </View>
              <Text style={styles.statusAmount}>${needs.toLocaleString()}</Text>
            </View>
            <View style={styles.breakdownRow}>
              <View style={styles.breakdownLeft}>
                <View style={[styles.statusDot, { backgroundColor: '#A844A6' }]} />
                <Text style={styles.statusLabel}>Wants (Lifestyle extras)</Text>
              </View>
              <Text style={styles.statusAmount}>${wants.toLocaleString()}</Text>
            </View>
            <View style={styles.breakdownRow}>
              <View style={styles.breakdownLeft}>
                <View style={[styles.statusDot, styles.statusDotOutline]} />
                <Text style={styles.statusLabel}>Remaining (Towards goals)</Text>
              </View>
              <Text style={styles.statusAmount}>${remaining.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {/* All Spending Link */}
        <TouchableOpacity style={styles.allSpendingLink}>
          <Text style={styles.allSpendingText}>All spending</Text>
          <Text style={styles.allSpendingArrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Financial Snapshot Section */}
      <View style={styles.snapshotSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>YOUR FINANCIAL SNAPSHOT</Text>
        </View>

        <View style={styles.snapshotCard}>
          <Text style={styles.currentStatus}>Current Status – November 14, 2025</Text>

          {/* Progress bars */}
          {[
            { icon: '🏦', label: 'Needs', current: 60, target: 50, max: 100, showDetails: true },
            { icon: '🛍️', label: 'Wants', current: 20, target: 30, max: 100, showDetails: true },
            { icon: '💵', label: 'Remaining', current: 16, target: 20, max: 100, showDetails: false },
            { icon: '📊', label: 'DTI Ratio', current: 28, target: 35, max: 100, showDetails: false },
            { icon: '💳', label: 'Credit Usage', current: 33, target: 30, max: 100, showDetails: false },
          ].map((item, index) => (
            <View key={index} style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <View style={styles.progressTitleRow}>
                  <Text style={styles.progressIcon}>{item.icon}</Text>
                  <Text style={styles.progressLabel}>{item.current}% {item.label}</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.infoIcon}>ⓘ</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.progressBarContainer}>
                <Text style={styles.progressMaxLabel}>GOAL</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${item.current}%` }]} />
                  {/* Goal line indicator */}
                  <View style={[styles.goalLine, { left: `${item.target}%` }]} />
                </View>
              </View>

              {item.showDetails && (
                <TouchableOpacity style={styles.detailsLink}>
                  <Text style={styles.detailsText}>See details →</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Upcoming Debits & Payments Section */}
      <View style={styles.paymentsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>UPCOMING DEBITS & PAYMENTS</Text>
        </View>

        <View style={styles.paymentsCard}>
          {/* Payment List */}
          {upcomingPayments.map((payment) => (
            <View key={payment.id} style={styles.paymentRow}>
              <View style={styles.paymentDate}>
                <Text style={styles.paymentDateText}>{payment.date}</Text>
              </View>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentType}>{payment.type}</Text>
                <Text style={styles.paymentSubtype}>{payment.subtype}</Text>
              </View>
              <Text style={styles.paymentAmount}>${payment.amount.toFixed(2)}</Text>
            </View>
          ))}

          {/* Tab Switcher */}
          <View style={styles.tabSwitcher}>
            <TouchableOpacity
              style={[styles.tab, selectedDateType === 'debit' && styles.tabActive]}
              onPress={() => setSelectedDateType('debit')}>
              <Text style={[styles.tabText, selectedDateType === 'debit' && styles.tabTextActive]}>
                Debit Dates
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedDateType === 'payment' && styles.tabActive]}
              onPress={() => setSelectedDateType('payment')}>
              <Text style={[styles.tabText, selectedDateType === 'payment' && styles.tabTextActive]}>
                Payment Dates
              </Text>
            </TouchableOpacity>
          </View>

          {/* Calendar */}
          <Text style={styles.calendarMonth}>NOVEMBER 2025</Text>
          <View style={styles.calendar}>
            <View style={styles.calendarHeader}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <Text key={i} style={styles.calendarDay}>{day}</Text>
              ))}
            </View>
            <View style={styles.calendarGrid}>
              {[...Array(30)].map((_, i) => {
                const date = i + 1;
                const isToday = date === 14;
                const isDebit = date === 29;
                const isPayment = date === 5 || date === 19;

                return (
                  <View
                    key={i}
                    style={[
                      styles.calendarDate,
                      isToday && styles.calendarDateToday,
                      (isDebit || isPayment) && styles.calendarDateEvent,
                    ]}>
                    <Text
                      style={[
                        styles.calendarDateText,
                        (isToday || isDebit || isPayment) && styles.calendarDateTextActive,
                      ]}>
                      {date}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* All Account Activity Link */}
          <TouchableOpacity style={styles.activityLink}>
            <Text style={styles.activityLinkText}>All account activity →</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Your Milestones Section */}
      <View style={styles.milestonesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>YOUR MILESTONES</Text>
        </View>

        <ScrollView
          ref={milestoneScrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleMilestoneScroll}
          scrollEventThrottle={16}
          style={styles.milestoneCarousel}
          contentContainerStyle={styles.milestoneCarouselContent}
          nestedScrollEnabled={true}
          decelerationRate="fast"
          snapToInterval={CARD_WIDTH}
          snapToAlignment="start"
        >
          {milestones.map((milestone) => (
            <View key={milestone.id} style={[styles.milestoneCard, { width: CARD_WIDTH }]}>
              <View style={styles.monthBadge}>
                <Text style={styles.monthBadgeText}>{milestone.month}</Text>
              </View>

              <View style={styles.milestoneIconRow}>
                <View style={styles.milestoneIcon}>
                  <Text style={styles.milestoneIconText}>{milestone.icon}</Text>
                </View>
                <View style={styles.milestoneTextContainer}>
                  <Text style={styles.milestoneFocus}>
                    <Text style={styles.milestoneFocusLabel}>Focus: </Text>
                    {milestone.focus}
                  </Text>
                  <Text style={styles.milestoneText}>
                    <Text style={styles.milestoneTextLabel}>Milestone: </Text>
                    {milestone.milestone}
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.detailsDropdown}>
                <Text style={styles.detailsDropdownText}>Details</Text>
                <Text style={styles.detailsDropdownIcon}>∧</Text>
              </TouchableOpacity>

              {/* Allocations */}
              <View style={styles.allocationsContainer}>
                {milestone.allocations.map((allocation, index) => (
                  <View
                    key={index}
                    style={[
                      styles.allocationRow,
                      allocation.priority === 'high' ? styles.allocationHighPriority : styles.allocationLowPriority,
                    ]}>
                    <Text style={[
                      styles.allocationLabel,
                      allocation.priority === 'high' && styles.allocationLabelBold,
                    ]}>
                      {allocation.label}
                    </Text>
                    <Text style={[
                      styles.allocationAmount,
                      allocation.priority === 'high' && styles.allocationAmountBold,
                    ]}>
                      {allocation.amount}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Total */}
              <View style={styles.totalAllocationRow}>
                <Text style={styles.totalAllocationLabel}>Total Allocated Monthly:</Text>
                <Text style={styles.totalAllocationAmount}>{milestone.totalMonthly}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Pagination */}
        <View style={styles.pagination}>
          {milestones.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => scrollToMilestone(index)}
              style={[
                styles.paginationDot,
                index === currentMilestoneIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Contact Support */}
      <View style={styles.supportSection}>
        <Text style={styles.supportText}>
          Contact member support at{'\n'}
          <Text style={styles.supportPhone}>(800) 894-5000</Text> or{' '}
          <Text style={styles.supportLink}>chat here</Text>.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.gray || '#F5F5F5',
  },
  topSection: {
    backgroundColor: colors.background.white,
    padding: 20,
    marginBottom: 16,
  },
  dateHeader: {
    backgroundColor: colors.primary.blue,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  dateText: {
    color: colors.background.white,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  spendingCard: {
    marginBottom: 16,
  },
  spendingLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#949494',
    marginBottom: 16,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 16,
  },
  chartContainer: {
    alignItems: 'center',
    flex: 0,
  },
  percentageContainer: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
  },
  percentageText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  percentageLabel: {
    fontSize: 13,
    color: '#949494',
    textAlign: 'right',
    lineHeight: 18,
  },
  breakdown: {
    gap: 16,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 28,
  },
  breakdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusDotOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#1E1E1E',
  },
  statusLabel: {
    fontSize: 14,
    color: '#1E1E1E',
    flexShrink: 1,
  },
  statusAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E1E',
    marginLeft: 8,
  },
  allSpendingLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  allSpendingText: {
    fontSize: 14,
    color: colors.primary.blue,
    fontWeight: '600',
  },
  allSpendingArrow: {
    fontSize: 14,
    color: colors.primary.blue,
  },
  snapshotSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    backgroundColor: colors.primary.blue,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  sectionHeaderText: {
    color: colors.background.white,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  snapshotCard: {
    backgroundColor: colors.background.white,
    padding: 20,
    gap: 20,
  },
  currentStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: '#636566',
    textAlign: 'center',
  },
  progressItem: {
    gap: 12,
    marginBottom: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  progressIcon: {
    fontSize: 20,
  },
  progressLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E1E1E',
    flexShrink: 1,
  },
  infoIcon: {
    fontSize: 16,
    color: '#949494',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressMaxLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#949494',
  },
  progressBar: {
    flex: 1,
    height: 28,
    backgroundColor: '#E0E0E0',
    borderRadius: 14,
    position: 'relative',
    overflow: 'visible',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary.blue,
    borderRadius: 14,
  },
  goalLine: {
    position: 'absolute',
    top: -4,
    bottom: -4,
    width: 3,
    backgroundColor: '#1E1E1E',
    borderRadius: 1.5,
    transform: [{ translateX: -1.5 }],
  },
  progressIndicator: {
    position: 'absolute',
    top: -32,
    transform: [{ translateX: -18 }],
  },
  progressValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  detailsLink: {
    alignSelf: 'flex-start',
  },
  detailsText: {
    fontSize: 12,
    color: colors.primary.blue,
    fontWeight: '600',
  },
  paymentsSection: {
    marginBottom: 16,
  },
  paymentsCard: {
    backgroundColor: colors.background.white,
    padding: 20,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    gap: 12,
  },
  paymentDate: {
    width: 56,
    height: 56,
    backgroundColor: colors.primary.green,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentDateText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.background.white,
    textAlign: 'center',
    lineHeight: 16,
  },
  paymentInfo: {
    flex: 1,
    gap: 4,
  },
  paymentType: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  paymentSubtype: {
    fontSize: 13,
    color: '#949494',
  },
  paymentAmount: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E1E1E',
    marginLeft: 8,
  },
  tabSwitcher: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#A844A6',
  },
  tabText: {
    fontSize: 14,
    color: '#949494',
  },
  tabTextActive: {
    color: '#A844A6',
    fontWeight: '600',
  },
  calendarMonth: {
    fontSize: 14,
    fontWeight: '700',
    color: '#A844A6',
    textAlign: 'center',
    marginBottom: 12,
  },
  calendar: {
    gap: 8,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  calendarDay: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#949494',
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    justifyContent: 'space-between',
  },
  calendarDate: {
    width: '13%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  calendarDateToday: {
    backgroundColor: colors.primary.blue,
    borderRadius: 20,
  },
  calendarDateEvent: {
    backgroundColor: colors.primary.green,
    borderRadius: 20,
  },
  calendarDateText: {
    fontSize: 14,
    color: '#1E1E1E',
  },
  calendarDateTextActive: {
    color: colors.background.white,
    fontWeight: '600',
  },
  activityLink: {
    marginTop: 16,
  },
  activityLinkText: {
    fontSize: 14,
    color: colors.primary.blue,
    fontWeight: '600',
  },
  milestonesSection: {
    marginBottom: 16,
  },
  milestoneCarousel: {
    flexGrow: 0,
  },
  milestoneCarouselContent: {
    paddingHorizontal: 20,
  },
  milestoneCard: {
    backgroundColor: colors.background.white,
    padding: 20,
    alignItems: 'center',
    marginRight: 0,
  },
  monthBadge: {
    backgroundColor: colors.primary.blue,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
    alignSelf: 'stretch',
  },
  monthBadgeText: {
    color: colors.background.white,
    fontSize: 14,
    fontWeight: '700',
  },
  milestoneIconRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
    alignSelf: 'stretch',
  },
  milestoneTextContainer: {
    flex: 1,
  },
  milestoneIcon: {
    width: 56,
    height: 56,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  milestoneIconText: {
    fontSize: 28,
  },
  milestoneFocus: {
    fontSize: 14,
    color: '#1E1E1E',
    marginBottom: 4,
    lineHeight: 20,
  },
  milestoneFocusLabel: {
    fontWeight: '700',
  },
  milestoneText: {
    fontSize: 14,
    color: '#636566',
    lineHeight: 20,
  },
  milestoneTextLabel: {
    fontWeight: '700',
  },
  detailsDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },
  detailsDropdownText: {
    fontSize: 14,
    color: colors.primary.blue,
    fontWeight: '600',
  },
  detailsDropdownIcon: {
    fontSize: 10,
    color: colors.primary.blue,
  },
  allocationsContainer: {
    alignSelf: 'stretch',
    gap: 8,
    marginBottom: 16,
  },
  allocationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  allocationHighPriority: {
    backgroundColor: '#388307',
  },
  allocationLowPriority: {
    backgroundColor: '#C5E1A5',
  },
  allocationLabel: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  allocationLabelBold: {
    fontWeight: '700',
    color: colors.background.white,
  },
  allocationAmount: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  allocationAmountBold: {
    fontWeight: '700',
    color: colors.background.white,
  },
  totalAllocationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginBottom: 16,
  },
  totalAllocationLabel: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#636566',
  },
  totalAllocationAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: colors.background.white,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
  },
  paginationDotActive: {
    backgroundColor: colors.primary.blue,
  },
  supportSection: {
    padding: 20,
    marginBottom: 40,
  },
  supportText: {
    fontSize: 12,
    color: '#636566',
    textAlign: 'center',
    lineHeight: 18,
  },
  supportPhone: {
    fontWeight: '700',
    color: '#1E1E1E',
  },
  supportLink: {
    color: colors.primary.blue,
    textDecorationLine: 'underline',
  },
});
