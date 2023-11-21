import React, { useEffect, useState,useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions,Modal, ScrollView } from 'react-native';
import UserContext from '../components/Store/UserContext';
import ColoredCirclesBackground from '../components/ColoredCircle';
import Header from '../components/Header';
import { ModalAlert } from '../components/AlertModal';
import { FontAwesome5,Ionicons,Feather,MaterialCommunityIcons ,MaterialIcons,Entypo} from '@expo/vector-icons';
import { countTest } from '../forDataSendingGetting';
import { database1 } from '../firebase';
import { collection, getDoc, query, where } from 'firebase/firestore';
import MachineList from '../lib/machineList.json'
import DropDownPicker from 'react-native-dropdown-picker';
import { Switch } from "react-native";
const MachineLocationSearching = ({ navigation }) => {
  
  const buttonWidth = Dimensions.get('window').width / 2 - 30;
  const { userInfo, updateUser } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [nopen, setnOpen] = useState(false);
  const [nvalue, setnValue] = useState( null); //updated 31/3/2023
  const [nitems, setnItems] = useState(MachineList.map((e) => ({label:e, value:e})))
  const [activity,setActivity] = useState("Idle");
  const [name,setName] = useState("Over Lock")
  const [quantity,setQuantity] = useState("0")
  useEffect(() => {
   //countTest("activity")
   const search= async()=>{
      r=await countTest(activity,name)
      setQuantity(r)
   }
   search()
  }, [activity,name]);

 

  return (
    <View style={styles.container}>
        <ColoredCirclesBackground />
        <Header title={"Machine Quantity Searching"}/>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'rgba(255,255,255,0.5)',marginTop:'10%'}}>
            <DropDownPicker
                                    listMode="MODAL"
                                    open={nopen}
                                    value={nvalue?nvalue:name}
                                    items={nitems}
                                    setOpen={setnOpen}
                                    setValue={setnValue}
                                    setItems={setnItems}
                                    containerProps={{style:{width:150,borderWidth:0,padding:0,}}}
                                    containerStyle={{ height: 40, width: 150 }}
                                    style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, paddingHorizontal: 5, margin: 5 }}
                                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                                    onChangeValue={setName}
                                    placeholder="Machine Name"
                                    searchable={true} 
                                    placeholderStyle={{
                                        color: "gray",
                                    }}
                                    searchTextInputProps={{
                                        keyboardType:'phone-pad'
                                    }}                        
                                />
         <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' ,margin:4}}>
            
            <View style={{ margin:5,display: 'flex', flexDirection: 'row', alignItems: 'center',alignSelf:'center',borderWidth:1, alignItems:'center',justifyContent:'center',width:150,borderRadius:5,borderColor:'gray',backgroundColor:'white' }}>
               <Text style={{  }}> Idle </Text>
               <Switch
               value={activity === "Active"}
               onValueChange={(newValue) => setActivity(newValue ? "Active" : "Idle")}
               trackColor={{ false: "#767577", true: "#81b0ff" }}
               thumbColor={activity === "Active" ? "green" : "#f4f3f4"}
               ios_backgroundColor="#3e3e3e"
               />
               <Text style={{ }}> Active </Text>
            </View>
            </View>
         </View>    
        <View style={{flexDirection:'row',alignContent:'center',alignItems:'center',justifyContent:'center',flex:1}}>
            <View style={{borderWidth:0,padding:8,backgroundColor:'white',borderRadius:4,width:"40%",margin:4,alignItems:'center',justifyContent:'center'}}>
             <Text style={{fontSize:20}}> Total Machine </Text>
            </View>
            <View style={{borderWidth:0,padding:8,backgroundColor:'white',borderRadius:4,width:"40%",margin:4,alignItems:'center',justifyContent:'center'}}>
             <Text style={{fontSize:20}} >  {quantity} </Text>
            </View>  
        </View>
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

export default MachineLocationSearching ;
