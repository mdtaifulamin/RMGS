import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QualityDepartmentPage = () => {
  return (
    <View style={styles.container}>
      <Text>quality department Department Screen</Text>
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

export default QualityDepartmentPage;
