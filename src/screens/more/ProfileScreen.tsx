import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const [accountInfoEnabled, setAccountInfoEnabled] = useState(true);
  const [debitRemindersEnabled, setDebitRemindersEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Security Notice */}
        <Text style={styles.securityNotice}>
          For security reasons, not all information can be updated online. Please call us if you need assistance.
        </Text>

        {/* Personal Information Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>Gregg Crystal</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>gregg@mailign.com</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Username</Text>
            <Text style={styles.infoValue}>credit_a@test.com</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Home Phone</Text>
            <Text style={styles.infoValue}>3155551234</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Cell Phone</Text>
            <Text style={styles.infoValue}>3155551234</Text>
          </View>

          <Text style={styles.subsectionTitle}>Physical Address</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address 1</Text>
            <Text style={styles.infoValue}>123 Main St.</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address 2</Text>
            <Text style={styles.infoValue}></Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>City</Text>
            <Text style={styles.infoValue}>Chittenango</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>State</Text>
            <Text style={styles.infoValue}>NY</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ZIP</Text>
            <Text style={styles.infoValue}>13037</Text>
          </View>

          <Text style={styles.subsectionTitle}>Mailing Address</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Mailing Address*</Text>
            <Text style={styles.infoValue}>123 Main St.</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Apt. # / Suite</Text>
            <Text style={styles.infoValue}></Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>City*</Text>
            <Text style={styles.infoValue}>Chittenango</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>State*</Text>
            <Text style={styles.infoValue}>NY</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Zip*</Text>
            <Text style={styles.infoValue}>13037</Text>
          </View>
        </View>

        {/* Subscription Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderBlue}>
            <Text style={styles.sectionTitleWhite}>Subscription</Text>
          </View>

          <View style={styles.subscriptionContent}>
            <View style={styles.subscriptionHeader}>
              <Text style={styles.subscriptionTitle}>AutoPayPlan</Text>
              <View style={styles.activeTrialBadge}>
                <View style={styles.activeDot} />
                <Text style={styles.activeTrialText}>Active Trial</Text>
              </View>
            </View>

            <Text style={styles.subscriptionDescription}>
              AutoPayPlus will debit biweekly on your payday and make payments to your loans and credit cards on your behalf.
            </Text>

            <View style={styles.subscriptionDetail}>
              <Text style={styles.subscriptionLabel}>Bill amount:</Text>
              <Text style={styles.subscriptionValue}>$14.99 Free for 6 months</Text>
            </View>

            <View style={styles.subscriptionDetail}>
              <Text style={styles.subscriptionLabel}>Schedule:</Text>
              <Text style={styles.subscriptionValue}>Biweekly</Text>
            </View>

            <View style={styles.subscriptionDetail}>
              <Text style={styles.subscriptionLabel}>Payment method:</Text>
              <Text style={styles.subscriptionValue}>CapitalOne... 6509</Text>
            </View>

            <View style={styles.subscriptionDetail}>
              <Text style={styles.subscriptionLabel}>Next debit:</Text>
              <Text style={styles.subscriptionValue}>Oct 15, 2025</Text>
            </View>
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderBlue}>
            <Text style={styles.sectionTitleWhite}>Notifications</Text>
          </View>

          <View style={styles.notificationsContent}>
            <Text style={styles.notificationsDescription}>
              Customize how we notify you via email and text. Privacy Policy here.
            </Text>

            <View style={styles.notificationItem}>
              <View style={styles.notificationTextContainer}>
                <Text style={styles.notificationTitle}>Account Information</Text>
                <Text style={styles.notificationSubtitle}>Updates to loans, payment issues...</Text>
              </View>
              <Switch
                value={accountInfoEnabled}
                onValueChange={setAccountInfoEnabled}
                trackColor={{ false: '#D9D9D9', true: '#34C759' }}
                thumbColor={colors.background.white}
              />
            </View>

            <View style={styles.notificationItem}>
              <View style={styles.notificationTextContainer}>
                <Text style={styles.notificationTitle}>Debit Reminders/Notices</Text>
              </View>
              <Switch
                value={debitRemindersEnabled}
                onValueChange={setDebitRemindersEnabled}
                trackColor={{ false: '#D9D9D9', true: '#34C759' }}
                thumbColor={colors.background.white}
              />
            </View>

            <View style={styles.notificationItem}>
              <View style={styles.notificationTextContainer}>
                <Text style={styles.notificationTitle}>Marketing and Promotions</Text>
                <Text style={styles.notificationSubtitle}>Offers for insurance and credit monitoring</Text>
              </View>
            </View>

            <View style={styles.notificationSubItem}>
              <Text style={styles.notificationTitle}>Email</Text>
              <Switch
                value={emailEnabled}
                onValueChange={setEmailEnabled}
                trackColor={{ false: '#D9D9D9', true: '#34C759' }}
                thumbColor={colors.background.white}
              />
            </View>

            <View style={styles.notificationSubItem}>
              <View style={styles.notificationTextContainer}>
                <Text style={styles.notificationTitle}>SMS</Text>
                <Text style={styles.notificationSubtitle}>Text message rates apply</Text>
              </View>
              <Switch
                value={smsEnabled}
                onValueChange={setSmsEnabled}
                trackColor={{ false: '#D9D9D9', true: '#34C759' }}
                thumbColor={colors.background.white}
              />
            </View>
          </View>
        </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 5,
  },
  backArrow: {
    fontSize: 24,
    color: '#1E1E1E',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  headerSpacer: {
    width: 34,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  securityNotice: {
    fontSize: 13,
    color: '#636566',
    marginBottom: 20,
    lineHeight: 18,
  },
  section: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  sectionHeader: {
    backgroundColor: '#0066FF',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeaderBlue: {
    backgroundColor: '#0066FF',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.background.white,
  },
  sectionTitleWhite: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.background.white,
  },
  editButton: {
    backgroundColor: colors.background.white,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0066FF',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  infoValue: {
    fontSize: 14,
    color: '#636566',
    textAlign: 'right',
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E1E',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  subscriptionContent: {
    padding: 16,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subscriptionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  activeTrialBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34C759',
  },
  activeTrialText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#34C759',
  },
  subscriptionDescription: {
    fontSize: 13,
    color: '#636566',
    marginBottom: 16,
    lineHeight: 18,
  },
  subscriptionDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  subscriptionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  subscriptionValue: {
    fontSize: 14,
    color: '#636566',
    textAlign: 'right',
  },
  notificationsContent: {
    padding: 16,
  },
  notificationsDescription: {
    fontSize: 13,
    color: '#636566',
    marginBottom: 16,
    lineHeight: 18,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  notificationSubItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  notificationTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 2,
  },
  notificationSubtitle: {
    fontSize: 12,
    color: '#949494',
  },
});
