import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Clipboard from 'expo-clipboard';
import Dialog from "react-native-dialog";
import SwitchSelector from 'react-native-switch-selector';

export default function BarCode({setData}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  // const [breakdownType, setBreakdownType] = useState("start")
  // const options = [
  //   { label: "Breakdown Start", value: "start", activeColor: 'green'},
  //   { label: "Breakdown End", value: "end", activeColor: 'green'}
  // ];

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    setData(data);
    
  };

  if (hasPermission === null) {
    return (
    <View style={styles.container}>
      <Text>Requesting for camera permission</Text>
    </View>
    );
  }
  if (hasPermission === false) {
    return (
    <View style={styles.container}>
      <Text>No access to camera</Text>
    </View>
    );
  }

  return (
    <View style={styles.container}>
      {!scanned?<BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />:null}
      {/* <View>
        <Dialog.Container visible={scanned}>
          <Dialog.Title>Machine Breakdown</Dialog.Title>
          <Dialog.Input placeholder='Enter Line No' />
          
          <Dialog.Description>
            Machine ID: {data}
          </Dialog.Description>
          <Dialog.Description>
            Machine Name: Overlock
          </Dialg.Description>
          <Dialog.Button label="Scan Again" onPress={() => setScanned(false)} />
          <Dialog.Button label="Submit" onPress={() => {
              setScannerOpen(false);
              sendDataToServer(data);
              }
            } />
            <View >
            <SwitchSelector
            style={{paddingBottom:20}}
            options={options}
            initial={0}
            onPress={setBreakdownType}  
            backgroundColor='#c2f8cb'
          />
            </View>
          
        </Dialog.Container>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center'
  },
});

