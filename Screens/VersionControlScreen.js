// VersionControl.js

import React from 'react';
import { View, Button, Linking } from 'react-native';

const VersionControl = () => {
  // Define the download link URL
  const downloadLink = 'https://example.com/your-download-link';

  // Function to handle the button press
  const handleDownloadPress = () => {
    // Use Linking to open the download link in the device's browser
    Linking.openURL(downloadLink)
      .catch((err) => console.error('Error opening link: ', err));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Download App" onPress={handleDownloadPress} />
    </View>
  );
};

export default VersionControl;
