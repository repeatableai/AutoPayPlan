import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

// Import the accelerate debt image
const AccelerateDebtImage = require('../../assets/images/accelerate-debt.png');
import { useNavigation, CommonActions } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { MoreStackParamList } from '../../types/navigation';
import { colors } from '@theme';
import { useUserStore } from '@store/userStore';

type MoreScreenNavigationProp = StackNavigationProp<MoreStackParamList, 'MoreHome'>;

export const MoreScreen = () => {
  const navigation = useNavigation<MoreScreenNavigationProp>();
  const signOut = useUserStore((state) => state.signOut);

  const handleLogout = () => {
    // Call signOut from the store
    signOut();

    // Navigate back to the Welcome screen by resetting the navigation stack
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Onboarding',
            state: {
              routes: [{ name: 'Welcome' }],
            },
          },
        ],
      })
    );
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileIconText}>👤</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Chris Whitman</Text>
          <Text style={styles.profileMember}>Member since 2024</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Menu Items */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.menuItemText}>Profile</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>My Accounts</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Credit Alerts</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Finance Planner</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Virtual Rewards</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Help</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Text style={styles.menuItemText}>Logout</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </TouchableOpacity>

        {/* Promotional Card - Full card image with interactive button overlay */}
        <TouchableOpacity
          style={styles.promoCard}
          onPress={() => navigation.navigate('AddAccount')}
          activeOpacity={0.9}
        >
          <Image
            source={AccelerateDebtImage}
            style={styles.promoImage}
            resizeMode="contain"
          />
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
  profileHeader: {
    backgroundColor: colors.background.white,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0066FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileIconText: {
    fontSize: 24,
    color: colors.background.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 2,
  },
  profileMember: {
    fontSize: 13,
    color: '#949494',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  menuItem: {
    backgroundColor: colors.background.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuItemText: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  menuItemArrow: {
    fontSize: 24,
    color: '#949494',
    fontWeight: '300',
  },
  promoCard: {
    marginTop: 20,
    marginBottom: 20,
  },
  promoImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 780 / 691, // Matches actual image dimensions (780x691)
  },
});
