import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { storeOverTime } from '../../util/forDataSendingGetting';
import moment from 'moment';
import { getFormattedDate } from '../../util/date';
import UserContext from '../../../components/Store/UserContext';
import { convertRangeStringToArrayOfArrays } from '../../../components/convertStringToarray';
import { GlobalStyles } from '../../../constants/styles';
import { useNavigation } from '@react-navigation/native';


const columnNames = [
   'manpower', 'twoHourOT', 'fourHourOT', 'sixHourOT','Main_TNC', 'TNC_2','TNC_4','TNC_6','remarks'
];

  
  
export default function SpreadsheetForm({defaultValues,onSubmit}) {
  const navigation = useNavigation();
  const { userInfo, updateUser } = useContext(UserContext);
  const blockWiseLine = defaultValues?[[defaultValues.lineNumber]]:convertRangeStringToArrayOfArrays(userInfo.block)
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [open, setOpen] = useState(true);
  const [value, setValue] = useState();
  const [items, setItems] = useState(
    blockWiseLine.map((e) => ({ label: `Line ${e[0]} - ${e[e.length - 1]}`, value: e }))
  );
  const [block,setBlock] = useState(defaultValues?[[defaultValues.lineNumber]]:convertRangeStringToArrayOfArrays(userInfo.block)[0])
  const [inputData, setInputData] = useState({
     [`Line_${defaultValues?defaultValues.lineNumber:''}`]:{lineNumber:defaultValues?defaultValues.lineNumber.toString():'',
     ...columnNames.reduce((acc, columnName) => {
      acc[columnName] = defaultValues ? defaultValues?.[columnName]?.toString() : '';
      return acc;
    }, {})}
  });
  
  useEffect(()=>{
    
    if(value){
      setBlock(value)
    }
  },[value])
  const inputRefs = useRef({});
  const handleSubmit = () => {
    const dataToSubmit = {};
    // Restructure data for Firebase
    for (const lineKey in inputData) {
      const lineData = inputData[lineKey];
      today= getFormattedDate(new Date())
      dataToSubmit[lineKey] = { ...lineData, 'date': defaultValues?defaultValues.date:new Date(today),'lineNumber': lineKey.replace('Line_', '') };
      id= defaultValues?getFormattedDate(defaultValues.date)+lineKey:today + lineKey
      if (dataToSubmit[lineKey].manpower>0) {
        storeOverTime(dataToSubmit[lineKey],id);
        onSubmit(dataToSubmit[lineKey],id)
      }
      
    }
    setIsLoading(false); // Hide the activity indicator and enable the button
    setModalVisible(true); // Show the success modal
    // Store data in Firebase  
  };
  const handleInputChange = (columnName, line, value) => {
    setInputData((prevData) => {
      const key = `Line_${line}`;
      const teamData = prevData[key] || {};
      return {
        ...prevData,
        [key]: {
          ...teamData,
          [columnName]: value,
        },
      };
    });
  };

  const handleNextField = (currentColumn, currentLine) => {
    const columnIndex = columnNames.indexOf(currentColumn);
    
   
  //   if (currentLine<value[value.length-1]) {
  //     var newLine = currentLine+1;
  //     var newColumnIndex = (columnIndex + 0) % columnNames.length;
  //     console.log(currentLine +''+ value[value.length-1])
  //   }else{var newLine = value[0]; 
  //     var newColumnIndex = (columnIndex + 1) % columnNames.length;}
  //   const newColumn = columnNames[newColumnIndex];

  //   const newInputRef = inputRefs.current[`${newColumn}_${newLine}`];
  //   if (newInputRef) {
  //     newInputRef.focus();
  //   }
  // };

  if (currentLine<block[block.length-1]) {
        var newLine = currentLine+1;
        var newColumnIndex = (columnIndex + 0) % columnNames.length;
        console.log(currentLine +'-'+ block.length)
      }else{var newLine = value[0]; 
        var newColumnIndex = (columnIndex + 1) % columnNames.length;}
      const newColumn = columnNames[newColumnIndex];
  
      const newInputRef = inputRefs.current[`${newColumn}_${newLine}`];
      if (newInputRef) {
        newInputRef.focus();
      }
    };


  console.log(inputData);
  //console.log(...convertRangeStringToArrayOfArrays(userInfo.block))
  return (
    
    <View style={styles.container}>
      <View style={{paddingVertical:20}}>
      <DropDownPicker
        listMode="MODAL"
        open={open}
        value={value}
        //defaulValue={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={styles.picker}
      />
      </View>
      <KeyboardAwareScrollView
      extraScrollHeight={Platform.select({ android: 200, ios: 0 })}
      enableOnAndroid={true}
        >
      <ScrollView horizontal={true} style={{paddingVertical:20}} >
        <View>
         <View style={styles.row}>
              <Text key={0} style={styles.columnHeader}>
                TEAM NO
              </Text>
 
            {columnNames.map((columnName, index) => (
              <Text key={index} style={styles.columnHeader}>
                {columnName}
              </Text>
            ))}
          </View>
          {block &&
            block.map((line) => (
          <View key={line} style={styles.row}>
            <View key={0} style={styles.columnHeader}>
                {/* <TextInput
                  
                  placeholder="Enter data..."
                  onChangeText={(value) => handleInputChange("lineNumber", line, value)}
                  value={inputData[`Line_${line}`]?.lineNumber || line.toString()}
                  ref={(input) => (inputRefs.current[`${"lineNumber"}_${line}`] = input)}
                  returnKeyType="next"
                  onSubmitEditing={() => handleNextField("lineNumber", line)}
                /> */}
                <Text key={0} style={{color:GlobalStyles.colors.buttonTextColor,textAlign:'center'}}>
                {inputData[`Line_${line}`]?.lineNumber || line.toString()}
                </Text>

              </View>
            {columnNames.map((columnName, index) => (
              <View key={index+1} style={styles.inputRow}>
                <TextInput
                  placeholder="Enter data..."
                  keyboardType='number-pad'
                  onChangeText={(value) => handleInputChange(columnName, line, value)}
                  value={inputData[`Line_${line}`]?.[columnName]}
                  ref={(input) => (inputRefs.current[`${columnName}_${line}`] = input)}
                  returnKeyType="next"
                  onSubmitEditing={() => handleNextField(columnName, line)}
                />
              </View>
            ))}
          </View>
        ))}
        </View>
      </ScrollView>
      </KeyboardAwareScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Data Submitted Successfully!</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.goBack();                
              }}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{justifyContent:'center',alignItems:'center',marginTop:30,paddingVertical:20}}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSubmit}
          disabled={isLoading}
          
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.loginButtonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  picker: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  columnHeader: {
    flex: 1,
    padding: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 0.5,
    width: 90,
    borderColor:'gray',
    backgroundColor:'#008080',
    color:'white'
  },
  inputRow: {
    flex: 1,
    padding: 5,
    borderWidth: 0.5,
    width: 90,
    height:40,
    borderColor:'gray'
  },
  loginButton: {
    width: '80%',
    height: 50,
    backgroundColor: GlobalStyles.colors.primaryButtonColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    elevation:5
  },
  loginButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#FFF', // Background color of the modal
    borderRadius: 10,
    elevation: 10,
    padding: 20, // Padding inside the modal
    alignItems: 'center',
    width: '80%', // Adjust the width as needed
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center', // Center-align the text
  },
  closeButton: {
    marginTop: 15, // Add spacing between text and button
    paddingVertical: 10, // Adjust the vertical padding of the button
    paddingHorizontal: 20, // Adjust the horizontal padding of the button
    backgroundColor: '#3897F0',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center', // Center-align the button text
  },
});



