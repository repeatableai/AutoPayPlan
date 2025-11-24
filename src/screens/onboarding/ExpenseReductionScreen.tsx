import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import { useUserStore } from '@store/userStore';
import type { RootStackNavigationProp } from '../../types/navigation';

interface ExpenseCategory {
  id: string;
  title: string;
  description: string;
}

const expenseCategories: ExpenseCategory[] = [
  {
    id: 'entertainment',
    title: 'Entertainment',
    description: 'Subscriptions, hobbies, concerts, dining, coffee shops',
  },
  {
    id: 'personal-care',
    title: 'Personal Care',
    description: 'Haircuts, beauty products, gym memberships, spas',
  },
  {
    id: 'shopping',
    title: 'Shopping',
    description: 'Clothing, electronics, household items',
  },
  {
    id: 'travel',
    title: 'Travel',
    description: 'Flights, hotels, vacation expenses',
  },
  {
    id: 'gifts',
    title: 'Gifts',
    description: 'Donations, charitable contributions',
  },
  {
    id: 'not-sure',
    title: 'Not sure',
    description: 'Do this for me',
  },
];

export const ExpenseReductionScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const completeOnboarding = useUserStore((state) => state.completeOnboarding);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [whyThisMattersExpanded, setWhyThisMattersExpanded] = useState(false);

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleContinue = () => {
    // Mark user as onboarded and navigate to main app
    completeOnboarding();
    navigation.navigate('Main', { screen: 'Dashboard' });
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

        {/* Title */}
        <Text style={styles.title}>Which expenses are you open to reducing?</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Choose all that apply.</Text>

        {/* Why This Matters Section */}
        <TouchableOpacity
          style={styles.whyThisMattersContainer}
          onPress={() => setWhyThisMattersExpanded(!whyThisMattersExpanded)}
          activeOpacity={0.7}
        >
          <View style={styles.whyThisMattersHeader}>
            <View style={styles.bulbIconContainer}>
              <Text style={styles.bulbIcon}>💡</Text>
            </View>
            <Text style={styles.whyThisMattersTitle}>WHY THIS MATTERS</Text>
            <Text style={styles.expandIcon}>{whyThisMattersExpanded ? '︿' : '﹀'}</Text>
          </View>
          {whyThisMattersExpanded && (
            <Text style={styles.whyThisMattersText}>
              Think of these cutbacks as short-term levers — streaming subscriptions, dining out, or other nice-to-haves. We'll only pull them when needed to keep your bigger goals on track, and you can revise the list at any time.
            </Text>
          )}
        </TouchableOpacity>

        {/* Expense Categories Grid */}
        <View style={styles.categoriesGrid}>
          {expenseCategories.map((category, index) => {
            const isSelected = selectedCategories.includes(category.id);
            const isLeftColumn = index % 2 === 0;

            return (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  isLeftColumn ? styles.categoryCardLeft : styles.categoryCardRight,
                  isSelected && styles.categoryCardSelected,
                ]}
                onPress={() => toggleCategory(category.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.categoryTitle, isSelected && styles.categoryTitleSelected]}>
                  {category.title}
                </Text>
                <Text style={[styles.categoryDescription, isSelected && styles.categoryDescriptionSelected]}>
                  {category.description}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
          <Text style={styles.continueButtonText}>View my dashboard</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 120,
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
    width: '100%', // Complete
    backgroundColor: colors.primary.blue,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
    lineHeight: 24,
  },
  whyThisMattersContainer: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  whyThisMattersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulbIconContainer: {
    marginRight: 8,
  },
  bulbIcon: {
    fontSize: 24,
  },
  whyThisMattersTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666666',
    flex: 1,
    letterSpacing: 0.5,
  },
  expandIcon: {
    fontSize: 18,
    color: '#666666',
    fontWeight: '700',
  },
  whyThisMattersText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginTop: 12,
    paddingLeft: 32,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  categoryCard: {
    width: '47%',
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    minHeight: 140,
  },
  categoryCardLeft: {
    marginRight: 6,
  },
  categoryCardRight: {
    marginLeft: 6,
  },
  categoryCardSelected: {
    borderColor: colors.primary.blue,
    backgroundColor: '#E8F4FD',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  categoryTitleSelected: {
    color: colors.primary.blue,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  categoryDescriptionSelected: {
    color: '#333333',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 40,
    backgroundColor: '#F5F5F5',
  },
  continueButton: {
    backgroundColor: '#388307',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
