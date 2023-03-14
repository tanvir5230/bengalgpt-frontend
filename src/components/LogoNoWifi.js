import React, {useRef, useState} from 'react';
import {StyleSheet, View, Animated, TouchableOpacity} from 'react-native';
export default function LogoNoWifi() {
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const handleLogoPress = () => {
    const slowDuration = 100;
    const fastDuration = 50;
    const movement = 2;

    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: movement,
        duration: fastDuration,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -movement,
        duration: fastDuration,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: movement,
        duration: slowDuration,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -movement,
        duration: slowDuration,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogoPress}>
        <Animated.Image
          source={require('../../assets/images/no-wifi.png')}
          style={[
            styles.logo,
            {
              transform: [
                {
                  rotate: shakeAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '10deg'],
                  }),
                },
              ],
            },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },
});
