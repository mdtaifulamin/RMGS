import React, { useState } from 'react'
import { View,Text,Modal,TouchableOpacity,StyleSheet } from "react-native"

export const ModalAlert=({modalVisible,onRequestClose})=>{

    return(
        <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={onRequestClose}
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
              onPress={onRequestClose}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
}

const styles= StyleSheet.create({
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
})