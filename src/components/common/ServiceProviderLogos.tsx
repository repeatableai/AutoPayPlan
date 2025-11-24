import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

// Import the logos
const TransUnionLogoImage = require('../../assets/images/transunion-logo.png');
const FlinksLogoImage = require('../../assets/images/flinks-logo.png');

interface LogoProps {
  width?: number;
  height?: number;
}

export const FlinksLogo: React.FC<LogoProps> = ({ width = 120, height = 40 }) => {
  return (
    <View style={[styles.logoContainer, { width, height }]}>
      <Image
        source={FlinksLogoImage}
        style={{ width, height }}
        resizeMode="contain"
      />
    </View>
  );
};

export const TransUnionLogo: React.FC<LogoProps> = ({ width = 150, height = 40 }) => {
  return (
    <View style={[styles.logoContainer, { width, height }]}>
      <Image
        source={TransUnionLogoImage}
        style={{ width, height }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
