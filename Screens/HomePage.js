import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, Animated, Easing, Modal, Button } from 'react-native';
import { AntDesign ,MaterialCommunityIcons,Ionicons,MaterialIcons} from '@expo/vector-icons';
import UserContext from '../components/Store/UserContext';
import ColoredCirclesBackground from '../components/ColoredCircle';
import Header from '../components/Header';
import { ModalAlert } from '../components/AlertModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { countTest } from '../forDataSendingGetting';


const HomeScreen = ({ navigation }) => {
  const [animation] = useState(new Animated.Value(0));
  const buttonWidth = Dimensions.get('window').width / 2 - 20;
  const { userInfo, updateUser } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
    if(userInfo?.ID==""){
      navigation.navigate("Login")
      
    }
    console.log(userInfo.ID)
    //console.log(userInfo===null)
    countTest()
  }, []);

  const buttonTransform = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1000, 0],
  });

  return (
    <View style={styles.container}>
      <ColoredCirclesBackground />
      <Header header={"Welcome to "} title={"RMGS"}/>
     
      <ScrollView style={styles.buttonContainer}>
        <View style={styles.row}>
          <Animated.View style={{ transform: [{ translateY: buttonTransform }] }}>
            <TouchableOpacity
              style={[styles.departmentButton, styles.shinyButton, { width: buttonWidth }]}
              onPress={() => { if (userInfo?userInfo.IEDepartment:false) {navigation.navigate('IEDepartment')}else setModalVisible(true); }}>
              <AntDesign name="rocket1" size={40} />
              <Text style={styles.buttonText}>IE Department</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ transform: [{ translateY: buttonTransform }] }}>
            <TouchableOpacity
              style={[styles.departmentButton, styles.shinyButton, { width: buttonWidth }]}
              onPress={() => { if (userInfo?userInfo.ProductionDepartment:false) {navigation.navigate('ProductionDepartment')}else setModalVisible(true); }}>
              <MaterialCommunityIcons name="factory" size={40} color="black" />
              <Text style={styles.buttonText}>Production Department</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <View style={styles.row}>
          <Animated.View style={{ transform: [{ translateY: buttonTransform }] }}>
            <TouchableOpacity
              style={[styles.departmentButton, styles.shinyButton, { width: buttonWidth }]}
              onPress={() => { if (userInfo?userInfo.QualityDepartment:false) {navigation.navigate('QualityDepartment')}else setModalVisible(true); }}>
              <AntDesign name="checkcircleo" size={40} />
              <Text style={styles.buttonText}>Quality Department</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ transform: [{ translateY: buttonTransform }] }}>
            <TouchableOpacity
              style={[styles.departmentButton, styles.shinyButton, { width: buttonWidth }]}
              onPress={() => { if (userInfo?userInfo.Engineering:false) {navigation.navigate('EngineeringDepartment')}else setModalVisible(true); }}>
              <MaterialIcons name="engineering" size={40} color="black" />
              <Text style={styles.buttonText}>Engineering Department</Text>
            </TouchableOpacity>
          </Animated.View>
          </View>
          <View style={styles.row}>
            <Animated.View style={{ transform: [{ translateY: buttonTransform }] }}>
              <TouchableOpacity
                style={[styles.departmentButton, styles.shinyButton, { width: buttonWidth }]}
                onPress={() => { if (userInfo?userInfo.Admin:false) {navigation.navigate('AdminPage')}else setModalVisible(true); }}>
                <AntDesign name="customerservice" size={40} />
                <Text style={styles.buttonText}>Admin</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{ transform: [{ translateY: buttonTransform }] }}>
              <TouchableOpacity
                style={[styles.departmentButton, styles.shinyButton, { width: buttonWidth }]}
                onPress={() => {
                navigation.navigate('developermeet');
                } }>
                <MaterialCommunityIcons name="contacts-outline" size={40} color="black" />
                <Text style={styles.buttonText}>Developer</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
          <View style={styles.row}>
            <Animated.View style={{ transform: [{ translateY: buttonTransform }] }}>
                <TouchableOpacity
                  style={[styles.departmentButton, styles.shinyButton, { width: buttonWidth }]}
                  onPress={() => {
                  AsyncStorage.setItem('userInfo', JSON.stringify({...userInfo,login:false}))
                  .catch(error => console.log('Error saving user info:', error));
                  navigation.navigate('Login');
                  } }>
                  <AntDesign name="logout" size={50} />
                  <Text style={styles.buttonText}>Log Out</Text>
                  <Text style={styles.buttonText}>User:{userInfo.userName}</Text>
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
  
 
  shinyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    },

  buttonContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  departmentButton: {
    backgroundColor: '#007AFF',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingTop: 10,
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
  fixedView : {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width:50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
});

export default HomeScreen;
