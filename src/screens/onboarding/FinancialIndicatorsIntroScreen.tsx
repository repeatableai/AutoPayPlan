import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '@components/layout';
import { Button, Card } from '@components/common';
import { colors, typography, spacing } from '@theme';
import { Ionicons } from '@expo/vector-icons';
import type { OnboardingStackNavigationProp } from '../../types/navigation';

export const FinancialIndicatorsIntroScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();

  const topics = [
    'Your financial goals',
    'Retirement plans',
    'Emergency fund targets',
    'Budget priorities',
    'Current concerns',
  ];

  return (
    <Screen scrollable={false}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Let's Get to Know You</Text>
          <Text style={styles.subtitle}>We'll ask a few questions to personalize your experience</Text>
        </View>

        <Card style={styles.contentCard}>
          <View style={styles.iconContainer}>
            <Ionicons name="clipboard" size={48} color={colors.primary.green} />
          </View>
          <Text style={styles.cardText}>This will take about 5 minutes. We'll ask about:</Text>

          <View style={styles.bulletList}>
            {topics.map((topic, index) => (
              <View key={index} style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>{topic}</Text>
              </View>
            ))}
          </View>
        </Card>

        <Card style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle" size={24} color={colors.status.info} />
            <Text style={styles.infoText}>
              All information is encrypted and private. We never share your data.
            </Text>
          </View>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button onPress={() => navigation.navigate('GoalsIntro')} fullWidth>
          Let's Start
        </Button>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.xl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  contentCard: {
    padding: spacing.xl,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: spacing.lg,
  },
  cardText: {
    ...typography.body,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  bulletList: {
    alignSelf: 'stretch',
    gap: spacing.md,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary.green,
    marginRight: spacing.md,
  },
  bulletText: {
    ...typography.body,
    flex: 1,
  },
  infoCard: {
    backgroundColor: colors.background.lightBlue,
    padding: spacing.lg,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  infoText: {
    ...typography.bodySmall,
    color: colors.text.primary,
    flex: 1,
  },
  footer: {
    padding: spacing.xl,
    backgroundColor: colors.background.white,
  },
});
