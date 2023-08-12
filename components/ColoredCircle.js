import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import  { Svg,Circle } from 'react-native-svg';

const ColoredCirclesBackground = () => {
  const circleColors = ['#FF5733', '#34A853', '#F2D600', '#007BFF', '#9013FE', 'lightpink', 'lightgreen', 'cyan','#FF5733', '#34A853', '#F2D600', '#007BFF', '#9013FE', 'lightpink', 'lightgreen', 'cyan',];

  const animatedValues = useRef([]);
  const animationDuration = 10000;

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
            opacity={animatedValues.current[index]}
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
    top: 20,
    left: 10,
    width: '100%',
    height: '90%',
    opacity:0.2
  },
});

export default ColoredCirclesBackground;
