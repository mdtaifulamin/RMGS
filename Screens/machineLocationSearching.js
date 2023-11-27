import React, { useEffect, useState,useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions,Modal, ScrollView, FlatList } from 'react-native';
import UserContext from '../components/Store/UserContext';
import ColoredCirclesBackground from '../components/ColoredCircle';
import Header from '../components/Header';
import { ModalAlert } from '../components/AlertModal';
import { FontAwesome5,Ionicons,Feather,MaterialCommunityIcons ,MaterialIcons,Entypo} from '@expo/vector-icons';
import { countTest } from '../forDataSendingGetting';
import { database1 } from '../firebase';
import MachineList from "../lib/machineList.json"
import machineBrand from "../lib/machineBrand.json"
import locationList from "../lib/locationList.json"
import { collection, getDoc, query, where } from 'firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import { Switch } from "react-native";
import BrightSkyBackground from '../components/ColoredBackground';
import Loadingspinner from '../EfficiencyAnalysis/components/UI/loading';

const MachineLocationSearching = ({ navigation }) => {
  
  const buttonWidth = Dimensions.get('window').width / 2 - 30;
  const { userInfo, updateUser } = useContext(UserContext);
  const [manufacturer, setManufacturer] = useState('');
  const [type,setType]= useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const [nopen, setnOpen] = useState(false);
  const [nvalue, setnValue] = useState( null); //updated 31/3/2023
  const [nitems, setnItems] = useState(MachineList.map((e) => ({label:e, value:e})))
  const [topen, settOpen] = useState(false);
  const [tvalue, settValue] = useState( null); //updated 31/3/2023
  const [titems, settItems] = useState(["Auto","Half-Auto","Manual"].map((e) => ({label:e, value:e})))
  const [mopen, setmOpen] = useState(false);
  const [mvalue, setmValue] = useState( null); //updated 31/3/2023
  const [mitems, setmItems] = useState(machineBrand.map((e) => ({label:e, value:e})))
  const [activity,setActivity] = useState("Idle");
  const [name,setName] = useState("");
  const [location,setlocation]=useState([])
  const [quantity,setQuantity] = useState("0")
  const [ isfetching,setIsfetching]= useState(true)
  // Initialize locationQuantity with default values
  const initialLocationQuantity = locationList.map((location) =>{return { [location]: 0 }});
  console.log(initialLocationQuantity)
  const [locationQuantity, setLocationQuantity] = useState(initialLocationQuantity);

  // Now locationQuantity is a state variable with the default values for each location

  // Example of how to update a location's quantity
  const updateLocationQuantity = (location, quantity) => {
    setLocationQuantity(prevState => ({ ...prevState, [location]: quantity }));
  };


  useEffect(() => {
   //countTest("activity")
   if(name){
     setIsfetching(true)
     const search= async()=>{
        // r=await countTest(activity,name,manufacturer,type)
        // setQuantity(r)
        const locationCounts = await Promise.all(
          locationList.map(async(location) => await countTest(activity,name,manufacturer,type, location))
        );
        setLocationQuantity(locationCounts)
        setIsfetching(false)
     }
     search()
   }
  }, [activity,name,manufacturer,type]);

  const sum = locationQuantity.reduce((accumulator, item) => {
    // Extract the value from each object and add it to the accumulator
    const value = Object.values(item)[0];
    return accumulator + value;
  }, 0);

  const renderItem = ({ item }) => (
    <View style={{ padding: 2 ,backgroundColor:Object.values(item)[0]>0?'rgba(23,230,20,0.2)':'rgba(255,255,255,0.5)' }}>
      {/* <BrightSkyBackground/> */}
      <View style={{flexDirection:'row',borderWidth:2,flex:1,borderColor:'white',borderRadius:5,overflow:'hidden'}}>
        <View style={{borderColor:'white',borderWidth:1,justifyContent:'center',flex:0.5,height:50,}}> 
          <Text style={{marginLeft:5}}>{`${Object.keys(item)[0]}`} </Text>
        </View>
        <View style={{borderColor:'white',borderWidth:1,justifyContent:'center',alignItems:'center',flex:0.5,height:50}}> 
          <Text>{`${Object.values(item)[0]}`}</Text>
        </View>
      </View>
     
    </View>
  );

  return (
    <View style={styles.container}>
      
        <ColoredCirclesBackground />
        {/* <BrightSkyBackground/> */}
        <Header title={"Machine Quantity Searching"}/>
        <View style={{backgroundColor:'rgba(255,255,255,0.7)',flexDirection:'row',marginVertical:'1%',elevation:1,justifyContent:'center',padding:4,borderRadius:5}}>
         
        <View style={{flexDirection:'coloumn',justifyContent:'center',alignItems:'center',}}>
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
                                    style={{ borderWidth: 1, borderColor:  'white', borderRadius: 5, paddingHorizontal: 5, margin: 5 }}
                                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                                    onChangeValue={setName}
                                    placeholder="Machine Name"
                                    searchable={true} 
                                    placeholderStyle={{
                                        color: "gray",
                                    }}
                                    searchTextInputProps={{
                                      //  keyboardType:'phone-pad'
                                    }}                        
                                />
         
            <DropDownPicker
              listMode="MODAL"
              open={mopen}
              value={mvalue?mvalue:manufacturer}
              items={mitems}
              setOpen={setmOpen}
              setValue={setmValue}
              setItems={setmItems}
              containerProps={{style:{width:150,borderWidth:0,padding:0,}}}
              containerStyle={{ height: 40, width: 150 }}
              style={{ borderWidth: 1, borderColor: 'white', borderRadius: 5, paddingHorizontal: 5, margin: 5 }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeValue={setManufacturer}
              placeholder="Manufacturer"
              searchable={true} 
              placeholderStyle={{
                  color: "gray",
                  
              }}
              searchTextInputProps={{
                  //keyboardType:'phone-pad'
              }}                        
          />
          <DropDownPicker
              listMode="MODAL"
              open={topen}
              value={tvalue?tvalue:type}
              items={titems}
              setOpen={settOpen}
              setValue={settValue}
              setItems={settItems}
              containerProps={{style:{width:150,borderWidth:0,padding:0,}}}
              containerStyle={{ height: 40, width: 150 }}
              style={{ borderWidth: 1, borderColor: 'white', borderRadius: 5, paddingHorizontal: 5, margin: 5 }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeValue={setType}
              placeholder="Auto/halfAuto/manual"
              searchable={true} 
              placeholderStyle={{
                  color: "gray",
              }}
              searchTextInputProps={{
                  keyboardType:'phone-pad'
              }}                        
          />
         
        </View> 
        <View style={{flexDirection:'coloumn',alignItems:'center',paddingHorizontal:20,}}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' ,}}> 
              <View style={{ margin:5,display: 'flex', flexDirection: 'row', alignItems: 'center',alignSelf:'center',borderWidth:1, alignItems:'center',justifyContent:'center',width:150,borderRadius:5,borderColor: 'white',backgroundColor:'white' }}>
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
          <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'white',paddingHorizontal:48,margin:5,padding:10,borderRadius:5}}>
            <Text style={{fontSize:20}}> Total </Text>
            <Text style={{fontSize:50}}>{sum}</Text>
          </View>
        </View>  
      </View>
            <View style={{marginTop:'1%',backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:30,fontWeight:'bold'}}>REPORT</Text>
            </View>
          <View style={{flex:1}}>
          {!isfetching&& <FlatList
            style={{flex:1,backgroundColor:'rgba(255,255,255,0.5)',padding:5}}
            data={locationQuantity}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />}
         {isfetching &&
                 <Loadingspinner/>       
            }
          </View>
      
     <ModalAlert modalVisible={modalVisible} onRequestClose={() => setModalVisible(false)}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
   
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
