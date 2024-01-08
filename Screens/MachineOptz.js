import { useState } from "react";
import { StyleSheet, Dimensions, TextInput, View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import {store_line_machine} from '../Components/server_activity'
import Spinner from "react-native-loading-spinner-overlay";
import { ColorLibrary } from "../Style/color";

let screen_height = Dimensions.get("window").height;
let screen_width = Dimensions.get("window").width;


function MachineOptz() {

  const day = new Date()
  let enteredDate = day.toLocaleDateString().replace(/[/]/g,"-")
  // DROPDOWN Section
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: "BRAX", value: "BRAX" },
    { label: "CARHARTT", value: "CARHARTT" },
    { label: "Casamoda", value: "Casamoda" },
    { label: "Creasions", value: "Creasions" },
    { label: "Dickies", value: "Dickies" },
    { label: "El-Corte", value: "El-Corte" },
    { label: "E. Strauss", value: "E. Strauss" },
    { label: "ESPRIT", value: "ESPRIT" },
    { label: "FUSSLE", value: "FUSSLE" },
    { label: "G.Star", value: "G.Star" },
    { label: "HUGO BOSS", value: "HUGO BOSS" },
    { label: "HUGO BOSS CWF", value: "HUGO BOSS CWF" },
    { label: "JOOP", value: "JOOP" },
    { label: "Karstadt", value: "Karstadt" },
    { label: "LEE", value: "LEE" },
    { label: "M&S", value: "M&S" },
    { label: "MALFINI", value: "MALFINI" },
    { label: "MUSTANG", value: "MUSTANG" },
    { label: "MWW", value: "MWW" },
    { label: "NAPAPIJRI", value: "NAPAPIJRI" },
    { label: "NEW ERA", value: "NEW ERA" },
    { label: "NEXT UK", value: "NEXT UK" },
    { label: "PUMA", value: "PUMA" },
    { label: "P&C", value: "P&C" },
    { label: "P&C GSM", value: "P&C GSM" },
    { label: "Pierre Cardin", value: "Pierre Cardin" },
    { label: "RAGNO", value: "RAGNO" },
    { label: "S. Oliver", value: "S. Oliver" },
    { label: "Strellson", value: "Strellson" },
    { label: "Tommy Hilfiger", value: "Tommy Hilfiger" },
    { label: "Timberland VF", value: "Timberland VF" },
    { label: "Timberland CWF", value: "Timberland CWF" },
    { label: "T. Australia", value: "T. Australia" },
    { label: "VANZ", value: "VANZ" },
    { label: "Wrangler", value: "Wrangler" },
  ]);
  ///////////////////////////////////////////////////

  const [totalMachine, setTotalMachine] = useState(0);

  const [machineList, setMachineList] = useState({
    "SN":{name: "Single Needle", count:0},
    "SN-LA":{name: "LA Single Needle", count:0},
    "SN-522":{name: "522 Single Needle", count:0},
    "SN-380":{name: "380 Single Needle", count:0},
    "FL-CB":{name: "Cyl. Bed Flat Lock", count:0},
    "FL-FB":{name: "Flat Bed Flat Lock", count:0},
    "OL-4T":{name: "4T Over Lock", count:0},
    "OL-3T":{name: "3T Over Lock", count:0},
    "OL-R":{name: "Roller Over Lock", count:0},
    "OL-BH":{name: "Blind Hem Over Lock", count:0},
    "B-HOLE":{name: "Button Hole", count:0},
    "B-ATC":{name: "Button Attach", count:0},
    "B-SNAP":{name: "Snap Button", count:0},
    "BT":{name: "Bartack M/C", count:0},
    "ZZ":{name: "Zig-zag M/C", count:0},
    "KANSAI":{name: "Kansai M/C", count:0},
    "RIB":{name: "Rib Cutter", count:0},
    "EYELET":{name: "Eyelet Hole", count:0},
    "SMOKE":{name: "Smoke", count:0},
    "SHUTTLE":{name: "Shuttle Stitch", count:0},
    "AUTO-ACS":{name: "Auto Cycle Sewing", count:0},
    "AUTO-MOON":{name: "Auto Back Moon Sewing", count:0},
    "AUTO-LABEL":{name: "Auto Label Attach", count:0},
    "DN":{name: "Double Needle", count:0},
    "DN-CHS":{name: "Double Needle Chain", count:0},
    "FOA":{name: "Feed of the Arm", count:0},
    "FOA-V":{name: "Feed of the Arm Ver", count:0},
    "OTHERS":{name: "Other Machines", count:0}
})

  const addMachine =(key) => {
    const tempMachineList = machineList;
    tempMachineList[key].count++;
    setMachineList({...tempMachineList})
    setTotalMachine(totalMachine=> totalMachine+1)
  }

  const removeMachine =(key) => {
    const tempMachineList = machineList;
    tempMachineList[key].count--;
    setMachineList({...tempMachineList})
    setTotalMachine(totalMachine=> totalMachine-1)
  }

  ///////////////// Line No and Style /////////////////
  const [lineNo, getLineNo] = useState('')
  const [styleNo, getStyleNo] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function getLine(line){
    getLineNo(line)
  }
  function getStyle(style){
    getStyleNo(style)
  }

  const machineDataSet = () => {
    // "Date": enteredDate,
    // "Total" : totalMachine,
    const tempMachineList = {machines:{}, date: enteredDate}
    Object.keys(machineList).forEach(element => {
      if(machineList[element].count!==0)
      tempMachineList.machines[element] = machineList[element].count;
    });

    return tempMachineList;
  }

  // console.log(machineDataSet)
  
  
  async function data_store(){
    console.log("mc list: "+ JSON.stringify(machineDataSet()))
    if(lineNo){
      setIsSubmitting(true)
      let errormsg = 'success'
      errormsg = await store_line_machine(lineNo, machineDataSet())

      if(errormsg === 'success'){
        setTimeout(() => {setIsSubmitting(false)}, 3000)
        setMachineList({
          "SN":{name: "Single Needle", count:0},
          "SN-LA":{name: "LA Single Needle", count:0},
          "SN-522":{name: "522 Single Needle", count:0},
          "SN-380":{name: "380 Single Needle", count:0},
          "FL-CB":{name: "Cyl. Bed Flat Lock", count:0},
          "FL-FB":{name: "Flat Bed Flat Lock", count:0},
          "OL-4T":{name: "4T Over Lock", count:0},
          "OL-3T":{name: "3T Over Lock", count:0},
          "OL-R":{name: "Roller Over Lock", count:0},
          "OL-BH":{name: "Blind Hem Over Lock", count:0},
          "B-HOLE":{name: "Button Hole", count:0},
          "B-ATC":{name: "Button Attach", count:0},
          "B-SNAP":{name: "Snap Button", count:0},
          "BT":{name: "Bartack M/C", count:0},
          "ZZ":{name: "Zig-zag M/C", count:0},
          "KANSAI":{name: "Kansai M/C", count:0},
          "RIB":{name: "Rib Cutter", count:0},
          "EYELET":{name: "Eyelet Hole", count:0},
          "SMOKE":{name: "Smoke", count:0},
          "SHUTTLE":{name: "Shuttle Stitch", count:0},
          "AUTO-ACS":{name: "Auto Cycle Sewing", count:0},
          "AUTO-MOON":{name: "Auto Back Moon Sewing", count:0},
          "AUTO-LABEL":{name: "Auto Label Attach", count:0},
          "DN":{name: "Double Needle", count:0},
          "DN-CHS":{name: "Double Needle Chain", count:0},
          "FOA":{name: "Feed of the Arm", count:0},
          "FOA-V":{name: "Feed of the Arm Ver", count:0},
          "OTHERS":{name: "Other Machines", count:0}
      })
      setTotalMachine(0)
      getLineNo('')
      }
      else{
        Alert.alert('A Network Error Occured, Please try Again')
        setTimeout(() => {setIsSubmitting(false)}, 1000)
      }
    }
    else{
      Alert.alert("Please Enter Line and Try AGAIN")
    }
  }

//   if(isSubmitting){
//     return <LoadingOverlay/>
// }

  return (
    <View style={styles.container}>
      <Spinner
                  visible={isSubmitting}
                  textContent={'Loading...'}
                  textStyle={styles.spinnerTextStyle}
                 />
      <View style={styles.header}>
        <View style={styles.lineNoContainer}>
          <TextInput style={styles.textinput} placeholder="Line No" keyboardType="numeric" onChangeText={getLineNo}></TextInput>
        </View>
        <View style={styles.styleContainer}>
          <TextInput style={styles.textinput} placeholder="STYLE" onChangeText={getStyle}></TextInput>
        </View>
        <View>
          <DropDownPicker
            style={styles.dropdown}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            listMode="MODAL"
            modalTitle="Select Your Block"
            modalProps={{ animationType: "fade" }}
            placeholder="BUYER"
          />
        </View>
      </View>
      <View style={styles.totalMachineContainer}>
        <Text style={styles.totalMachineText}>
          TOTAL MACHINE: <Text style={{ color: "green" }}>{totalMachine}</Text>
        </Text>
      </View>
      
      <ScrollView style={styles.scrolloption}>
        {Object.keys(machineList).map((key) => (
          <View style={styles.machineContainer1}>
            <View>
              <Text style={styles.machineText} >{machineList[key].name}</Text>
            </View>
            <View style={styles.machineQtyContainer}>
              <TouchableOpacity
                onPress={() => removeMachine(key)}
                disabled={machineList[key].count===0}
              >
                <Ionicons
                  name="remove-circle-outline"
                  color={machineList[key].count===0?"gray":"black"}
                  size={50}
                />
              </TouchableOpacity>
              <Text style={styles.machineText}>{machineList[key].count}</Text>
              <TouchableOpacity
                onPress={() => addMachine(key)}
              >
                <Ionicons
                  name="add-circle-outline"
                  color={"black"}
                  size={50}
                />
              </TouchableOpacity>
              
            </View>
          </View>
        ))}
        
      </ScrollView>
      <TouchableOpacity style={styles.pressButton} onPress={data_store}>
          
          <Text style={styles.pressButtonText}>SUBMIT</Text>
        
      </TouchableOpacity>
    </View>
  );
}

export default MachineOptz;

screen_width = Dimensions.get("window").width;
screen_height = Dimensions.get("window").height;

const styles = StyleSheet.create({
 container:{
  paddingBottom:0,
  backgroundColor: ColorLibrary.body_background,
 }, 
  header: {
    flexDirection: "row",
    marginHorizontal: screen_width * 0.02,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "green",
  },
  lineNoContainer: {
    width: screen_width * 0.15,
    marginRight: screen_width * 0.02,
    marginBottom: 10,
  },
  styleContainer: {
    width: screen_width * 0.35,
    marginRight: screen_width * 0.02,
  },
  textinput: {
    borderWidth: 0.5,
    borderColor: ColorLibrary.primary_text_border_button,
    borderRadius: 10,
    height: 50,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Roboto-Regular"
  },
  dropdown: {
    width: screen_width * 0.42,
    backgroundColor: ColorLibrary.body_background,
    borderColor: ColorLibrary.primary_text_border_button,
    borderWidth: 0.5,
    fontFamily: "Roboto-Regular"
  },
  ///////// Total Machine Container ///////////
  scrolloption:{
    marginBottom: screen_height * 0.3

  },
  totalMachineContainer: {
    marginLeft: screen_width * 0.02,
    marginTop: 5,
  },
  totalMachineText: {
    fontSize: 16,
    fontFamily: "Roboto-Bold",
  },
  /////////// Button Input Section ////////////

  machineQtyContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  machineContainer1:{
    marginHorizontal:10,
    marginVertical: 2,
    padding:5,
    backgroundColor:'#f0fff1',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderRadius: 10
  },
  machineText: {
    fontSize: 18,
    padding: 5,
    fontFamily: "Roboto-Regular",
  },
  pressButton:{
    position: 'absolute',
    marginVertical: screen_height * 0.05,
    marginLeft: screen_width * 0.25,
    width: screen_width * 0.5,
    height: screen_height * 0.06,
    backgroundColor: ColorLibrary.primary_text_border_button,
    borderRadius:15,
    elevation: 5,
    overflow: 'hidden',
    bottom: screen_height * 0.17
  },
  pressButtonText:{
    height: '100%',
    textAlign: "center",
    paddingTop: screen_height * 0.015,
    fontSize: 18,
    fontFamily: "Roboto-Bold",
    color: ColorLibrary.button_text_color_1,
  }
});
