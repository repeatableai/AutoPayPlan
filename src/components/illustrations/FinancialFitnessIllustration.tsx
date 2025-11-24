import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const FinancialFitnessIllustration = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/financial-fitness-illustration.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
