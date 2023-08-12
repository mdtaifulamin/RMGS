import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductionDepartmentPage = () => {
  return (
    <View style={styles.container}>
      <Text>production Department Screen</Text>
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

export default ProductionDepartmentPage;
