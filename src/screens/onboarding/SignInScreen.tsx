import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '@types/navigation';
import { colors, typography, spacing } from '@theme';
import { Button, Input } from '@components/common';
import { useUserStore } from '@store/userStore';

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const SignInScreen = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const signIn = useUserStore((state) => state.signIn);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
  });

  const handleSignIn = () => {
    const newErrors = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      password: '',
    };

    let hasErrors = false;

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
      hasErrors = true;
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      hasErrors = true;
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
      hasErrors = true;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      hasErrors = true;
    }

    setErrors(newErrors);

    if (!hasErrors) {
      // Get stored profile to show helpful error message
      const storedProfile = useUserStore.getState().userProfile;

      // Attempt to sign in
      const isValid = signIn(firstName.trim(), lastName.trim(), phoneNumber.trim(), password);

      if (isValid) {
        // Navigate to Main app (Dashboard)
        navigation.navigate('Main', { screen: 'Dashboard' });
      } else {
        // Provide helpful error message
        let errorMessage = 'The credentials you entered do not match our records.';

        if (!storedProfile) {
          errorMessage = 'No account found. Please create an account first using "Get Started".';
        } else {
          errorMessage = `Please check your information:\n\n` +
            `• First Name should be: ${storedProfile.firstName}\n` +
            `• Last Name should be: ${storedProfile.lastName}\n` +
            `• Phone Number should be: ${storedProfile.phoneNumber}\n` +
            `• Password: Check if it matches what you entered during registration`;
        }

        Alert.alert(
          'Sign In Failed',
          errorMessage,
          [{ text: 'OK' }]
        );
      }
    }
  };

  const isFormValid = firstName.trim() && lastName.trim() && phoneNumber.trim() && password;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to your account to continue managing your financial plan
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="First Name"
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={setFirstName}
            error={errors.firstName}
            autoCapitalize="words"
            autoCorrect={false}
          />

          <Input
            label="Last Name"
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={setLastName}
            error={errors.lastName}
            autoCapitalize="words"
            autoCorrect={false}
          />

          <Input
            label="Phone Number"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            error={errors.phoneNumber}
            keyboardType="phone-pad"
            autoCorrect={false}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.footer}>
        <Button
          onPress={handleSignIn}
          fullWidth
          disabled={!isFormValid}
        >
          Sign In
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.xl,
    paddingTop: spacing.xxl * 2,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    marginTop: spacing.lg,
  },
  footer: {
    padding: spacing.xl,
    backgroundColor: colors.background.white,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
});
