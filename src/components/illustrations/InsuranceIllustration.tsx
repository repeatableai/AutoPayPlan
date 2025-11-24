import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const InsuranceIllustration = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/insurance-illustration.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
