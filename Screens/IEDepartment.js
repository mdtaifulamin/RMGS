import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import ColoredCirclesBackground from '../components/ColoredCircle';
const IEDepartmentPage = ({ navigation }) => {
  const [animation] = useState(new Animated.Value(0));
  const buttonWidth = Dimensions.get('window').width / 2 - 20;

  useEffect(() => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  }, []);

  const buttonTransform = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1000, 0],
  });

  return (
    <View style={styles.container}>
        <ColoredCirclesBackground/>
      <Animated.View style={[styles.header, { transform: [{ translateY: buttonTransform }] }]}>
        <Text style={styles.title}>IE Department</Text>
      </Animated.View>
      <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: buttonTransform }] }]}>
        <TouchableOpacity
          style={[styles.subPageButton, { width: buttonWidth }]}
          onPress={() => navigation.navigate('EfficiencyAnalysis')}>
          <Text style={styles.buttonText}>Efficiency Analysis</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.subPageButton, { width: buttonWidth }]}
          onPress={() => navigation.navigate('OverTime')}>
          <Text style={styles.buttonText}>Over Time</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.subPageButton, { width: buttonWidth }]}
          onPress={() => navigation.navigate('Target')}>
          <Text style={styles.buttonText}>Target</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.subPageButton, { width: buttonWidth }]}
          onPress={() => navigation.navigate('NewOperatorAssessment')}>
          <Text style={styles.buttonText}>New Operator Assessment</Text>
        </TouchableOpacity>
      </Animated.View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#007AFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  subPageButton: {
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default IEDepartmentPage;
