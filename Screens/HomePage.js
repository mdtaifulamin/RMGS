import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, Animated, Easing, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import UserContext from '../UserContext';
import ColoredCirclesBackground from '../components/ColoredCircle';
import Header from '../components/Header';
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
    console.log(userInfo)
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
              <AntDesign name="tool" size={40} />
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
              onPress={() => { if (userInfo?userInfo.HRDepartment:false) {navigation.navigate('HRDepartment')}else setModalVisible(true); }}>
              <AntDesign name="team" size={40} />
              <Text style={styles.buttonText}>HR Department</Text>
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
          </View>
        
      </ScrollView>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              You do not have permission to access this department.
            </Text>
            <Text style={styles.modalText}>
              Please, Contact with Md. Taiful Amin
            </Text>
            <Text style={styles.modalText}>
              Mobile:- 01701014481
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation:20,
    marginBottom:'10%'
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 250, 0.3)',
  },
  shinyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  titleContainer: {
    borderBottomWidth: 2,
    paddingBottom: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
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
});

export default HomeScreen;
