import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TargetPage = () => {
  return (
    <View style={styles.container}>
      <Text>Target Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TargetPage;
