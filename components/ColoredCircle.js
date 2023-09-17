import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const NightSkyBackground = () => {
  const circleColors = ['#0B3D91', '#1E3799', '#292B2C', '#4A235A', '#17202A'];

  const animatedValues = useRef([]);
  const animationDuration = 30000;

  useEffect(() => {
    circleColors.forEach((_, index) => {
      animatedValues.current[index] = new Animated.Value(0);
    });

    const animations = circleColors.map((_, index) => (
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValues.current[index], {
            toValue: 1,
            duration: animationDuration,
            useNativeDriver: false,
          }),
          Animated.timing(animatedValues.current[index], {
            toValue: 1,
            duration: animationDuration,
            useNativeDriver: false,
          }),
        ])
      )
    ));

    Animated.parallel(animations).start();
  }, []);

  return (
    <View style={styles.backgroundContainer}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {circleColors.map((color, index) => (
          <AnimatedCircle
            key={index}
            cx={Math.random() * 100}
            cy={Math.random() * 15}
            r={Math.random() * 100}
            fill={color}
            opacity={0.5}
          />
        ))}
      </Svg>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
});

export default NightSkyBackground;
