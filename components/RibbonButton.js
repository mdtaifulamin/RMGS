import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const RibbonButton = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#555', // Change the background color
    paddingVertical: 16,
    paddingHorizontal: 3,
    overflow: 'hidden', // Hide overflow content
    width:'40%',
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
    elevation:10,
  },
  text: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default RibbonButton;
