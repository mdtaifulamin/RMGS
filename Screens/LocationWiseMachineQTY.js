import React, { useEffect, useState,useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions,Modal, ScrollView, FlatList } from 'react-native';
import UserContext from '../components/Store/UserContext';
import ColoredCirclesBackground from '../components/ColoredCircle';
import Header from '../components/Header';
import { ModalAlert } from '../components/AlertModal';
import { FontAwesome5,Ionicons,Feather,MaterialCommunityIcons ,MaterialIcons,Entypo} from '@expo/vector-icons';
import { countTest, locationWiseMacine } from '../forDataSendingGetting';
import { database1 } from '../firebase';
import MachineList from "../lib/machineList.json"
import machineBrand from "../lib/machineBrand.json"
import locationList from "../lib/locationList.json"
import { collection, getDoc, query, where } from 'firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import { Switch } from "react-native";
import BrightSkyBackground from '../components/ColoredBackground';
import Loadingspinner from '../EfficiencyAnalysis/components/UI/loading';

const LocationWiseMachineQTY = ({ navigation }) => {

  const buttonWidth = Dimensions.get('window').width / 2 - 30;
  const { userInfo, updateUser } = useContext(UserContext);
  const [manufacturer, setManufacturer] = useState('');
  const [type,setType]= useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const [lopen, setlOpen] = useState(false);
  const [lvalue, setlValue] = useState( null); //updated 31/3/2023
  const [litems, setlItems] = useState(locationList.map((e) => ({label:e, value:e})))
  const [topen, settOpen] = useState(false);
  const [tvalue, settValue] = useState( null); //updated 31/3/2023
  const [titems, settItems] = useState(["Auto","Half-Auto","Manual"].map((e) => ({label:e, value:e})))
  const [lnopen, setlnOpen] = useState(false);
  const [lnvalue, setlnValue] = useState( null); //updated 31/3/2023
  const [lnitems, setlnItems] = useState( [{label:"Idle Location" , value:"Idle Location"},{label:"1" , value:"1"},{label:"2" , value:"2"},{label:"3" , value:"3"},{label:"4" , value:"4"},{label:"5" , value:"5"},{label:"6" , value:"6"},{label:"7" , value:"7"},{label:"8" , value:"8"},{label:"9" , value:"9"},{label:"10" , value:"10"},{label:"11" , value:"11"},{label:"12" , value:"12"},{label:"13" , value:"13"},{label:"14" , value:"14"},{label:"15" , value:"15"},{label:"16" , value:"16"},{label:"17" , value:"17"},{label:"18" , value:"18"},{label:"19" , value:"19"},{label:"20" , value:"20"},{label:"21" , value:"21"},{label:"22" , value:"22"},{label:"23" , value:"23"},{label:"24" , value:"24"},{label:"25" , value:"25"},{label:"26" , value:"26"},{label:"27" , value:"27"},{label:"28" , value:"28"},{label:"29" , value:"29"},{label:"30" , value:"30"},{label:"31" , value:"31"},{label:"32" , value:"32"},{label:"33" , value:"33"},{label:"34" , value:"34"},{label:"35" , value:"35"},{label:"36" , value:"36"},{label:"37" , value:"37"},{label:"38" , value:"38"},{label:"39" , value:"39"},{label:"40" , value:"40"},{label:"41" , value:"41"},{label:"42" , value:"42"},{label:"43" , value:"43"},{label:"44" , value:"44"},{label:"45" , value:"45"},{label:"46" , value:"46"},{label:"47" , value:"47"},{label:"48" , value:"48"},{label:"49" , value:"49"},{label:"50" , value:"50"},{label:"51" , value:"51"},{label:"52" , value:"52"},{label:"53" , value:"53"},{label:"54" , value:"54"},{label:"55" , value:"55"},{label:"56" , value:"56"},{label:"57" , value:"57"},{label:"58" , value:"58"},{label:"59" , value:"59"},{label:"60" , value:"60"},{label:"61" , value:"61"},{label:"62" , value:"62"},{label:"63" , value:"63"},{label:"64" , value:"64"},{label:"65" , value:"65"},{label:"66" , value:"66"},{label:"67" , value:"67"},{label:"68" , value:"68"},{label:"69" , value:"69"},{label:"70" , value:"70"},{label:"71" , value:"71"},{label:"72" , value:"72"},{label:"73" , value:"73"},{label:"74" , value:"74"},{label:"75" , value:"75"},{label:"76" , value:"76"},{label:"77" , value:"77"},{label:"78" , value:"78"},{label:"79" , value:"79"},{label:"80" , value:"80"},{label:"81" , value:"81"},{label:"82" , value:"82"},{label:"83" , value:"83"},{label:"84" , value:"84"},{label:"85" , value:"85"},{label:"86" , value:"86"},{label:"87" , value:"87"},{label:"88" , value:"88"},{label:"89" , value:"89"},{label:"90" , value:"90"},{label:"91" , value:"91"},{label:"92" , value:"92"},{label:"93" , value:"93"},{label:"94" , value:"94"},{label:"95" , value:"95"},{label:"96" , value:"96"},{label:"97" , value:"97"},{label:"98" , value:"98"},{label:"99" , value:"99"},{label:"100" , value:"100"},{label:"101" , value:"101"},{label:"102" , value:"102"},{label:"103" , value:"103"},{label:"104" , value:"104"},{label:"105" , value:"105"},{label:"106" , value:"106"},{label:"107" , value:"107"},{label:"108" , value:"108"},{label:"109" , value:"109"},{label:"110" , value:"110"},{label:"111" , value:"111"},{label:"112" , value:"112"},{label:"113" , value:"113"},{label:"114" , value:"114"}] //blockWiseLine.map((e) => ({label: `Line ${e[0]} - ${e[e.length - 1]}`,value:e}))
    );
  const [activity,setActivity] = useState("Idle");
  const [line,setline] = useState("");
  const [location,setlocation]=useState([])
  const [machineQuantity,setmachineQuantity] = useState([])
  const [ isfetching,setIsfetching]= useState(true)
  // Initialize locationQuantity with default values
//   const initialLocationQuantity = locationList.map((location) =>{return { [location]: 0 }});
//   console.log(initialLocationQuantity)
//   const [locationQuantity, setLocationQuantity] = useState(initialLocationQuantity);

  // Now locationQuantity is a state variable with the default values for each location

  // Example of how to update a location's quantity
//   const updateLocationQuantity = (location, quantity) => {
//     setLocationQuantity(prevState => ({ ...prevState, [location]: quantity }));
//   };


  useEffect(() => {
   //countTest("activity")
   if(location){
     setIsfetching(true)
     const search= async()=>{
        // r=await countTest(activity,name,manufacturer,type)
        // setQuantity(r)
        const machines = await locationWiseMacine(activity,line,manufacturer,type, location)
          
          // Use reduce to count occurrences
          const machineCount = machines.reduce((count, obj) => {
            const machineType = obj.name;
          
            // If the machine type is already in the count object, increment its count
            if (count[machineType]) {
              count[machineType]++;
            } else {
              // If the machine type is not in the count object, initialize its count to 1
              count[machineType] = 1;
            }
          
            return count;
          }, {});
          setmachineQuantity(Object.entries(machineCount).map(([type, count]) => ({ [type]: count })))
          console.log(Object.entries(machineCount).map(([type, count]) => ({ [type]: count })));
          
        setIsfetching(false)
     }
     search()
   }
  }, [activity,line,manufacturer,type,location]);

 

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
        <Header title={"Location Wise Machine Quantity"}/>
        <View style={{backgroundColor:'rgba(255,255,255,0.7)',flexDirection:'row',marginVertical:'1%',elevation:1,justifyContent:'center',padding:4,borderRadius:5}}>
         
        <View style={{flexDirection:'coloumn',justifyContent:'center',alignItems:'center',}}>
            <DropDownPicker
                                    listMode="MODAL"
                                    open={lopen}
                                    value={lvalue?lvalue:location}
                                    items={litems}
                                    setOpen={setlOpen}
                                    setValue={setlValue}
                                    setItems={setlItems}
                                    containerProps={{style:{width:150,borderWidth:0,padding:0,}}}
                                    containerStyle={{ height: 40, width: 150 }}
                                    style={{ borderWidth: 1, borderColor:  'white', borderRadius: 5, paddingHorizontal: 5, margin: 5 }}
                                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                                    onChangeValue={setlocation}
                                    placeholder="Location"
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
              open={lnopen}
              value={lnvalue?lnvalue:line}
              items={lnitems}
              setOpen={setlnOpen}
              setValue={setlnValue}
              setItems={setlnItems}
              containerProps={{style:{width:150,borderWidth:0,padding:0,}}}
              containerStyle={{ height: 40, width: 150 }}
              style={{ borderWidth: 1, borderColor: 'white', borderRadius: 5, paddingHorizontal: 5, margin: 5 }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeValue={setline}
              placeholder="line"
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
            <Text style={{fontSize:50}}>{machineQuantity.reduce((sum, obj) => {
                                const count = Object.values(obj)[0];
                                return sum + count;
                                }, 0)}</Text>
          </View>
        </View>  
      </View>
            <View style={{marginTop:'1%',backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:30,fontWeight:'bold'}}>REPORT</Text>
            </View>
          <View style={{flex:1}}>
          {!isfetching&& <FlatList
            style={{flex:1,backgroundColor:'rgba(255,255,255,0.5)',padding:5}}
            data={machineQuantity}
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

export default LocationWiseMachineQTY ;
