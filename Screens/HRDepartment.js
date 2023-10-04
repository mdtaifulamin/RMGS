import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const HRDepartmentPage = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/RMGS2.gif')} // Add an image of the developer
        style={styles.avatar}
      />
      <Text style={styles.title}>Meet the Developer</Text>
      <Text style={styles.subtitle}>MD. TAIFUL AMIN</Text>
      <View style={styles.separator}></View>
      <Text style={styles.description}>
        Hi there! I'm MD. Taiful Amin, the developer behind this app. I'm passionate about creating user-friendly and efficient mobile applications.
        Let's make technology work for you.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Darker text color
  },
  subtitle: {
    fontSize: 20,
    color: 'gray',
  },
  separator: {
    height: 2,
    width: '80%',
    backgroundColor: '#007AFF', // Accent color
    marginVertical: 20,
  },
  description: {
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
    color: '#666', // Slightly darker text color
  },
});

export default HRDepartmentPage;
