import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { DashboardStackParamList } from '@types/navigation';
import { colors, spacing } from '@theme';
import { Button } from '@components/common';
import { useUserStore } from '@store/userStore';

type GoalType = 'short-term' | 'long-term' | 'both';
type GoalSelectionScreenNavigationProp = StackNavigationProp<DashboardStackParamList, 'GoalSelection'>;

export const GoalSelectionScreen = () => {
  const navigation = useNavigation<GoalSelectionScreenNavigationProp>();
  const [selectedGoal, setSelectedGoal] = useState<GoalType>('short-term');
  const goals = useUserStore((state) => state.goals);

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
        <Text style={styles.title}>
          What goals are you{'\n'}saving for?
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Enter as many short-term or long-term goals.{'\n'}Customize the details anytime.
        </Text>

        {/* Goal Options */}
        <View style={styles.optionsContainer}>
          {/* Short-term Goal */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedGoal === 'short-term' && styles.optionCardSelected,
            ]}
            onPress={() => setSelectedGoal('short-term')}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Short-term goal</Text>
              <Text style={styles.optionSubtitle}>
                Within the next{'\n'}0–12 months
              </Text>
            </View>
          </TouchableOpacity>

          {/* Long-term Goal */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedGoal === 'long-term' && styles.optionCardSelected,
            ]}
            onPress={() => setSelectedGoal('long-term')}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Long-term goal</Text>
              <Text style={styles.optionSubtitle}>
                Over 12 months
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <Button
          onPress={() => navigation.navigate('GoalDetails', { goalType: selectedGoal })}
          fullWidth
          style={styles.continueButton}
        >
          Continue
        </Button>

        {/* Goals List */}
        {goals.length > 0 && (
          <View style={styles.goalsSection}>
            <Text style={styles.goalsTitle}>GOALS:</Text>
            <View style={styles.goalsList}>
              {goals.map((goal) => {
                // Determine if goal is short-term or long-term based on targetDate
                const getGoalType = (): 'short-term' | 'long-term' => {
                  if (!goal.targetDate) return 'long-term';
                  const now = new Date();
                  const target = new Date(goal.targetDate);
                  const monthsDiff = (target.getFullYear() - now.getFullYear()) * 12 +
                                    (target.getMonth() - now.getMonth());
                  return monthsDiff <= 12 ? 'short-term' : 'long-term';
                };

                return (
                  <TouchableOpacity
                    key={goal.id}
                    style={styles.goalCard}
                    onPress={() => navigation.navigate('GoalDetails', {
                      goalType: getGoalType(),
                      goalId: goal.id
                    })}
                  >
                    <View style={styles.goalIconContainer}>
                      <Text style={styles.goalIcon}>{goal.icon || '🎯'}</Text>
                    </View>
                    <Text style={styles.goalName}>{goal.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
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
    paddingTop: 60,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 32,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '10%',
    backgroundColor: colors.primary.blue,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  optionCard: {
    backgroundColor: colors.background.white,
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    minHeight: 120,
    justifyContent: 'center',
  },
  optionCardSelected: {
    backgroundColor: colors.background.white,
    borderColor: '#1A1A1A',
  },
  optionContent: {
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    textAlign: 'center',
  },
  continueButton: {
    marginTop: 'auto',
    backgroundColor: '#73A942',
  },
  goalsSection: {
    marginTop: 32,
  },
  goalsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  goalsList: {
    gap: 12,
  },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  goalIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  goalIcon: {
    fontSize: 24,
  },
  goalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
});
