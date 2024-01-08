import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Input,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
  Alert
} from "react-native";
// import Calendar from '../Components/calendar';
import DropDownPicker from "react-native-dropdown-picker";
import styleWiseProcess from "../lib/processList.json"

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height


function CAScrollDown({getDropdownValue}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Tee");
  const [items, setItems] = useState([
    { label: "Tee", value: "Tee" },
    { label: "Polo", value: "Polo" },
    { label: "Sweat Shirt", value: "Sweat Shirt" },
    { label: "Jacket", value: "Jacket" },
    { label: "Trouser", value: "Trouser" }
  ]);

  const [processOpen, setProcessOpen] = useState(false);
  const [processValue, setProcessValue] = useState([]);

  const [process, setProcess] = useState(
    styleWiseProcess[value]
  );

  const onChange = (value) => {
    setProcessOpen(false);
    setProcess(styleWiseProcess[value]);
  };

  const onChangeProcess = (processValue) => {
    getDropdownValue(value, processValue)
  }

  return (
      <View style={styles.dropdown}>
        
        <View style={styles.dropdownContainer1}>
          <DropDownPicker
            style={styles.dropdown1}
            dropDownContainerStyle={{}}
            listItemContainerStyle={{}}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={onChange}
            dropDownDirection="BOTTOM"
            listMode="FLATLIST"
          />
        </View>
        <View style={styles.dropdownContainer2}>
          <DropDownPicker
            style={styles.dropdown2}
            dropDownContainerStyle={{}}
            listItemContainerStyle={{}}
            open={processOpen}
            value={processValue}
            items={process}
            setOpen={setProcessOpen}
            setValue={setProcessValue}
            setItems={setProcess}
            searchable={true}
            searchPlaceholder="Type and Select Process"
            dropDownDirection="BOTTOM"
            listMode= 'MODAL'
            modalTitle="Select Process from Below List"
            modalProps={{ animationType: "fade" }}
            placeholder="Select Process"
            onChangeValue={onChangeProcess}
          />
        </View>                    
      </View>
    
  );
}

export default CAScrollDown;

const styles = StyleSheet.create({
  dropdown:{
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    height: screenHeight*0.05,
    marginTop: 10
  },
  dropdownContainer1: {
    paddingLeft: 5,
    paddingRight: 2,
    width:'30%'
  },
  dropdownContainer2: {
    paddingRight: 5,
    paddingRight: 2,
    width:'70%'
  },  
  dropdown1:{
    backgroundColor: "#f8f9fa"
  },
  dropdown2:{
    backgroundColor: "#f8f9fa"
  },
  
});