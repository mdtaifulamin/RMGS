import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

export const ModalAlert = ({ modalVisible, onRequestClose }) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.background}>
          <BlurView intensity={20} tint='default' style={[styles.blurContainer]} />
        </View>
        <View style={styles.modalContent}>
          <View style={{ textAlign:''}}>
            <Text style={styles.modalText}>
              You do not have permission to access this department.
            </Text>
            <Text style={styles.modalText}>
              Please, Contact with Md. Taiful Amin
            </Text>
            <Text style={styles.modalText}>Mobile:- 01701014481</Text>
          </View>
          <TouchableOpacity style={styles.modalButton} onPress={onRequestClose}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export const ModalOTAlert = ({ modalVisible, onRequestClose }) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.background}>
          <BlurView intensity={20} tint='default' style={[styles.blurContainer]} />
        </View>
        <View style={styles.modalContent}>
          <View style={{ textAlign:''}}>
            <Text style={{color:'red',fontWeight:'bold',fontSize:30}}>
             OT is Not Downloaded 
            </Text>
            <Text style={styles.modalText}>
              Due to network error or other issue
            </Text>
            <Text style={styles.modalText}>Refresh efficiency analysis or enter efficiency analysis again</Text>
          </View>
          <TouchableOpacity style={styles.modalButton} onPress={onRequestClose}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  modalContent: {
    borderRadius: 200, // Rounded corner with border radius
    padding: 20,
    width: '80%',
  },
  modalText: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'left',
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
  background: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
   
  },
});
