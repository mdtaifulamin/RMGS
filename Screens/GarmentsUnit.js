import React, { useEffect, useState,useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions,Modal, ScrollView } from 'react-native';
import UserContext from '../components/Store/UserContext';
import ColoredCirclesBackground from '../components/ColoredCircle';
import Header from '../components/Header';
import { ModalAlert } from '../components/AlertModal';
import { FontAwesome5,Ionicons,Feather,MaterialCommunityIcons ,MaterialIcons,Entypo} from '@expo/vector-icons';

const GarmentsUnit = ({ navigation }) => {
  const [animation] = useState(new Animated.Value(0));
  const buttonWidth = Dimensions.get('window').width / 2 - 30;
  const { userInfo, updateUser } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
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
      <ColoredCirclesBackground />
      <Header title={"Engineering Department"}/>
      <ScrollView style={{marginTop:30,flex:1}}>
        <View style={styles.buttonRow}>
          <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: buttonTransform }] }]}>
            <TouchableOpacity
              style={[styles.subPageButton, { width: buttonWidth, elevation: 10 }]}
              onPress={() => {if (true) {
                navigation.navigate('MachineStatusScanner')
              }else setModalVisible(true);}}>
            <View style={{flexDirection:'row'}}>
              <Entypo name="location" size={24} color="black" />
              <MaterialIcons name="qr-code-scanner" size={24} color="black" />
            </View>
              <Text style={[styles.buttonText, ]}>Machine Location Scanner</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: buttonTransform }] }]}>
            <TouchableOpacity
              style={[styles.subPageButton, { width: buttonWidth, elevation: 10 }]}
              onPress={() => {if (true) {
                navigation.navigate('machineLocationSearching')
              }else setModalVisible(true);}}>
            <View style={{flexDirection:'row'}}>
              
              <MaterialCommunityIcons name="book-search-outline" size={24} color="black" />
            </View>
              <Text style={[styles.buttonText, ]}>Machine Location Searching</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <View style={styles.buttonRow}>
          <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: buttonTransform }] }]}>
            <TouchableOpacity
              style={[styles.subPageButton, { width: buttonWidth, elevation: 10 }]}
              onPress={() => {if (true) {
                navigation.navigate('LocationWiseMachineQTY')
              }else setModalVisible(true);}}>
            <View style={{flexDirection:'row'}}>
              
              <MaterialCommunityIcons name="book-account-outline" size={24} color="black" />
            </View>
              <Text style={[styles.buttonText, ]}>Location-wise Report</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
    </ScrollView>
     <ModalAlert modalVisible={modalVisible} onRequestClose={() => setModalVisible(false)}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
   
  },
  header: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical:"10%",
    justifyContent:'center',
    alignItems:'center',
    elevation:20,
    marginBottom:'15%'
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'center'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
    
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  subPageButton: {
    backgroundColor: 'rgba(255, 255, 254, 0.9)',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100, 100, 100, 0.8)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-end',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GarmentsUnit;
