import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, Animated, Easing } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
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
      <View style={styles.header}>
        {/* <View style={styles.headerOverlay}></View>
        <Image
          source={require('../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        /> */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.appName}>RMGS</Text>
        </View>
      </View>
      <ScrollView style={styles.buttonContainer}>
        <View style={styles.row}>
          <Animated.View style={{ transform: [{ translateY: buttonTransform }] }}>
            <TouchableOpacity
             style={[styles.departmentButton, styles.shinyButton, { width: buttonWidth }]}
              onPress={() => navigation.navigate('IEDepartment')}>
              <AntDesign name="rocket1" size={40} color="white" />
              <Text style={styles.buttonText}>IE Department</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ transform: [{ translateY: buttonTransform }] }}>
            <TouchableOpacity
              style={[styles.departmentButton, styles.shinyButton, { width: buttonWidth }]}
              onPress={() => navigation.navigate('ProductionDepartment')}>
              <AntDesign name="tool" size={40} color="white" />
              <Text style={styles.buttonText}>Production</Text>
              <Text style={styles.buttonText}>Department</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <View style={styles.row}>
          <Animated.View style={{ transform: [{ translateY: buttonTransform }] }}>
            <TouchableOpacity
             style={[styles.departmentButton, styles.shinyButton, { width: buttonWidth }]}
              onPress={() => navigation.navigate('QualityDepartment')}>
              <AntDesign name="checkcircleo" size={40} color="white" />
              <Text style={styles.buttonText}>Quality</Text>
              <Text style={styles.buttonText}>Department</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ transform: [{ translateY: buttonTransform }] }}>
            <TouchableOpacity
              style={[styles.departmentButton, styles.shinyButton, { width: buttonWidth }]}
              onPress={() => navigation.navigate('HRDepartment')}>
              <AntDesign name="team" size={40} color="white" />
              <Text style={styles.buttonText}>HR Department</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    position: 'relative',
    backgroundColor: 'rgba(25, 60, 255, 0.5)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  shinyButton: {
    backgroundColor: 'rgba(25, 60, 255, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  titleContainer: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    paddingBottom: 10,
    marginBottom: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  appName: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  departmentButton: {
    backgroundColor: '#007AFF',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
