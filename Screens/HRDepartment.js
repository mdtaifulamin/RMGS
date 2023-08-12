import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HRDepartmentPage = () => {
  return (
    <View style={styles.container}>
      <Text>HR Department Screen</Text>
      {/* Add content specific to IE Department */}
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

export default HRDepartmentPage;
