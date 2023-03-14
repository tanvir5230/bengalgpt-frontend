import React, {useRef} from 'react';
import {StyleSheet, View, Animated, TouchableOpacity} from 'react-native';
export default function Logo() {
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
          source={require('../../assets/images/logo.png')}
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
