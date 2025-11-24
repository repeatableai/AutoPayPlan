import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import type { OnboardingStackNavigationProp } from '../../types/navigation';
import { TransUnionLogo } from '@components/common';

interface SecurityQuestion {
  id: number;
  question: string;
  options: string[];
}

const securityQuestions: SecurityQuestion[] = [
  {
    id: 1,
    question: 'What is the monthly payment of your student loan?',
    options: ['$451 - $500', '$501 - $550', '$601 - $650', 'None of the above'],
  },
  {
    id: 2,
    question: 'Which of the following is a current or previous employer?',
    options: ['Chewy', 'Valley Hospital and Health', 'Plante & Moran', 'Russell Investment Group', 'None of the above'],
  },
  {
    id: 3,
    question: 'What state was your social security number issued (this could be the state in which you were born or had your first job)?',
    options: ['Colorado', 'Delaware', 'Hawaii', 'New Hampshire', 'None of the above'],
  },
  {
    id: 4,
    question: 'What is the balance of your most recent mortgage?',
    options: ['$80,000 - $85,000', '$85,001 - $90,000', '$90,001 - $95,000', '$95,001 - $100,000'],
  },
];

export const SecurityQuestionsScreen = () => {
  const navigation = useNavigation<OnboardingStackNavigationProp>();
  const [answers, setAnswers] = useState<{ [key: number]: string | null }>({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleContinue = () => {
    // Navigate to success screen after security questions validation
    navigation.navigate('AccountConnectionSuccess');
  };

  const isFormComplete = Object.values(answers).every(answer => answer !== null);

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
        <Text style={styles.title}>Security Questions</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Please answer the following questions to verify your identity.
        </Text>

        {/* TransUnion Card */}
        <View style={styles.transUnionCard}>
          <View style={styles.logoWrapper}>
            <TransUnionLogo width={403} height={101} />
          </View>

          {/* Security Questions */}
          <View style={styles.questionsContainer}>
            {securityQuestions.map((question, qIndex) => (
              <View key={question.id} style={styles.questionBlock}>
                <Text style={styles.questionNumber}>{qIndex + 1}. {question.question}</Text>

                <View style={styles.optionsContainer}>
                  {question.options.map((option, oIndex) => (
                    <TouchableOpacity
                      key={oIndex}
                      style={styles.optionRow}
                      onPress={() => handleAnswerChange(question.id, option)}
                    >
                      <View style={[
                        styles.radioCircle,
                        answers[question.id] === option && styles.radioCircleSelected
                      ]}>
                        {answers[question.id] === option && <View style={styles.radioDot} />}
                      </View>
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          onPress={handleContinue}
          style={[
            styles.continueButton,
            !isFormComplete && styles.continueButtonDisabled
          ]}
          disabled={!isFormComplete}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
    width: '75%',
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
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  transUnionCard: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  logoWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  questionsContainer: {
    width: '100%',
  },
  questionBlock: {
    marginBottom: 32,
  },
  questionNumber: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
    lineHeight: 22,
  },
  optionsContainer: {
    width: '100%',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioCircleSelected: {
    borderColor: '#00A6CA',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00A6CA',
  },
  optionText: {
    fontSize: 15,
    color: '#1A1A1A',
    lineHeight: 22,
    flex: 1,
  },
  bottomButtonContainer: {
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
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
