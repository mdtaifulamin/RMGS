import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SignupWaitingPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Your account is being created. Please wait...</Text>
      {/* You can add loading indicators or other content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default SignupWaitingPage;
