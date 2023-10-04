import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const BrightSkyBackground = () => {
    const circleColors1 = ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f', '#9b59b6'];
    const circleColors = ['#ffffff', '#f0f0f0', '#e0e0e0', '#d0d0d0', '#c0c0c0'];



  return (
    <View style={styles.backgroundContainer}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {circleColors1.map((color, index) => (
          <Circle
            key={index}
            cx={Math.random() * 100}
            cy={Math.random() * 15}
            r={Math.random() * 100}
            fill={color}
            opacity={0.2}
          />
        ))}
      </Svg>
    </View>
  );
};

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

export default BrightSkyBackground;
