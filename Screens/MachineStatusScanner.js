
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Button, Alert, ScrollView } from "react-native"
import BarCode from "../components/BarcodeScanner"
import { fireStoreDb } from "../lib/firebase"
import Spinner from "react-native-loading-spinner-overlay";
import { Switch } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import MachineList from "../lib/machineList.json"
function MachineStatusScanner(){
    const today = new Date();
    const dateString = `${today.getFullYear()}-${(today.getMonth()+1)<10?'0'+(today.getMonth()+1):(today.getMonth()+1)}-${today.getDate()<10?'0'+today.getDate():today.getDate()}`;
    const [lopen, setlOpen] = useState(false);
    const [lvalue, setlValue] = useState( null); //updated 31/3/2023
    const [litems, setlItems] = useState(
        [{label:"1" , value:"1"},{label:"2" , value:"2"},{label:"3" , value:"3"},{label:"4" , value:"4"},{label:"5" , value:"5"},{label:"6" , value:"6"},{label:"7" , value:"7"},{label:"8" , value:"8"},{label:"9" , value:"9"},{label:"10" , value:"10"},{label:"11" , value:"11"},{label:"12" , value:"12"},{label:"13" , value:"13"},{label:"14" , value:"14"},{label:"15" , value:"15"},{label:"16" , value:"16"},{label:"17" , value:"17"},{label:"18" , value:"18"},{label:"19" , value:"19"},{label:"20" , value:"20"},{label:"21" , value:"21"},{label:"22" , value:"22"},{label:"23" , value:"23"},{label:"24" , value:"24"},{label:"25" , value:"25"},{label:"26" , value:"26"},{label:"27" , value:"27"},{label:"28" , value:"28"},{label:"29" , value:"29"},{label:"30" , value:"30"},{label:"31" , value:"31"},{label:"32" , value:"32"},{label:"33" , value:"33"},{label:"34" , value:"34"},{label:"35" , value:"35"},{label:"36" , value:"36"},{label:"37" , value:"37"},{label:"38" , value:"38"},{label:"39" , value:"39"},{label:"40" , value:"40"},{label:"41" , value:"41"},{label:"42" , value:"42"},{label:"43" , value:"43"},{label:"44" , value:"44"},{label:"45" , value:"45"},{label:"46" , value:"46"},{label:"47" , value:"47"},{label:"48" , value:"48"},{label:"49" , value:"49"},{label:"50" , value:"50"},{label:"51" , value:"51"},{label:"52" , value:"52"},{label:"53" , value:"53"},{label:"54" , value:"54"},{label:"55" , value:"55"},{label:"56" , value:"56"},{label:"57" , value:"57"},{label:"58" , value:"58"},{label:"59" , value:"59"},{label:"60" , value:"60"},{label:"61" , value:"61"},{label:"62" , value:"62"},{label:"63" , value:"63"},{label:"64" , value:"64"},{label:"65" , value:"65"},{label:"66" , value:"66"},{label:"67" , value:"67"},{label:"68" , value:"68"},{label:"69" , value:"69"},{label:"70" , value:"70"},{label:"71" , value:"71"},{label:"72" , value:"72"},{label:"73" , value:"73"},{label:"74" , value:"74"},{label:"75" , value:"75"},{label:"76" , value:"76"},{label:"77" , value:"77"},{label:"78" , value:"78"},{label:"79" , value:"79"},{label:"80" , value:"80"},{label:"81" , value:"81"},{label:"82" , value:"82"},{label:"83" , value:"83"},{label:"84" , value:"84"},{label:"85" , value:"85"},{label:"86" , value:"86"},{label:"87" , value:"87"},{label:"88" , value:"88"},{label:"89" , value:"89"},{label:"90" , value:"90"},{label:"91" , value:"91"},{label:"92" , value:"92"},{label:"93" , value:"93"},{label:"94" , value:"94"},{label:"95" , value:"95"},{label:"96" , value:"96"},{label:"97" , value:"97"},{label:"98" , value:"98"},{label:"99" , value:"99"},{label:"100" , value:"100"},{label:"101" , value:"101"},{label:"102" , value:"102"},{label:"103" , value:"103"},{label:"104" , value:"104"},{label:"105" , value:"105"},{label:"106" , value:"106"},{label:"107" , value:"107"},{label:"108" , value:"108"},{label:"109" , value:"109"},{label:"110" , value:"110"},{label:"111" , value:"111"},{label:"112" , value:"112"},{label:"113" , value:"113"},{label:"114" , value:"114"}] //blockWiseLine.map((e) => ({label: `Line ${e[0]} - ${e[e.length - 1]}`,value:e}))
    );
    const [nopen, setnOpen] = useState(false);
    const [nvalue, setnValue] = useState( null); //updated 31/3/2023
    const [nitems, setnItems] = useState(MachineList.map((e) => ({label:e, value:e})))
    const [oopen, setoOpen] = useState(false);
    const [ovalue, setoValue] = useState( null); //updated 31/3/2023
    const [oitems, setoItems] = useState(["Owned","hired"].map((e) => ({label:e, value:e})))
    const [topen, settOpen] = useState(false);
    const [tvalue, settValue] = useState( null); //updated 31/3/2023
    const [titems, settItems] = useState(["Auto","Half-Auto","Manual"].map((e) => ({label:e, value:e})))

    const [scannerOpen, setScannerOpen] = useState(false)
    const [data, setData] = useState('');
    const [defaultValue,setDefaultValue]=useState(null)
    const [status,setStatus]=useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [lines, setLines] = useState(Array.from({ length: 150 }, (_, index) => (index + 1).toString()).map((line) => ({ label: line, value: line })));
    const [line, setLine] = useState(defaultValue?defaultValue.line:"");
    const [location, setlocation]=useState(defaultValue?defaultValue.location:"");
    const [problem, setProblem] = useState('');
    const [activity, setActivity] = useState(defaultValue?defaultValue.activity:"Active");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [manufacturer, setManufacturer] = useState('');
    const [name, setName] = useState('');
    const [no, setNo] = useState('');
    const [ownership, setOwnership] = useState('');
    const [type, setType] = useState('');

    

    const getStatusOfMachine = async (data) => {
        try {
            setIsSubmitting(true);
            const docRef = doc(fireStoreDb, "machine-info", data);
            const docSnap = await getDoc(docRef);
            setDefaultValue(docSnap.data());
            console.log(defaultValue)
            setLine(defaultValue?.line?defaultValue.line:'')
            if (docSnap.exists()) {
                setStatus(true);
                setOpenModal(true);
            } else {
                setOpenModal2(true);
            }
    
            setScannerOpen(false);
            setIsSubmitting(false);
        } catch (error) {
            console.log(error);
            Alert.alert("Network Problem");
            setScannerOpen(false);
            setIsSubmitting(false);
            setData("");
        }
    };
    
    useEffect(() => {
        if (data) {
            getStatusOfMachine(data);
        }
        // Generate an array of numbers from 1 to 150
            const lineNumbers = Array.from({ length: 150 }, (_, index) => (index + 1).toString());
            setLines(lineNumbers.map((line) => ({ label: line, value: line })));
            console.log(lines)
    }, [data]);
    useEffect(() => {
        if (defaultValue) {
          setLine(defaultValue.line || ""); // Set line based on defaultValue
          setlocation(defaultValue.location || ""); // Set location based on defaultValue
        }
      }, [defaultValue]);
    const sendDataToServer = async(data) => {
        try {
        setIsSubmitting(true);
        console.log(defaultValue)
        if(defaultValue){
        await setDoc(doc(fireStoreDb, "machine-info", data), {
            location: location,
            line: line,
            activity:activity
        }, { merge:true })
        setDefaultValue(null)
        }else{
            await setDoc(doc(fireStoreDb, "machine-info", data), {
                location: location,
                line: line,
                activity:activity,
                manufacturer:manufacturer,
                name:name,
                no:no,
                ownership:ownership,
                type:type
            }, { merge:true })
            setDefaultValue(null)
        }
        
        
        Alert.alert("Data Upload Success");

        setOpenModal(false);
        setData("");
        setLine(null);
        setProblem("");
        setlocation("")
        setIsSubmitting(false);
        setDisabled(false);
        } catch (error) {
            Alert.alert("Network Problem")
            setOpenModal(false);
            setOpenModal2(false);
            setData("");
            setLine(null);
            setProblem("");
            setIsSubmitting(false);
            setDisabled(false);
        }
    }

    return(
        <View style={styles.mainContainer}>
            <Spinner
                visible={isSubmitting}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <Modal
            animationType="slide"
            transparent={true}
            visible={openModal}
            onRequestClose={() => {
            setOpenModal(false);
            setScannerOpen(false);
            setData("");
            setLine(null);
            setProblem("");
            }}
            >
                <View style={styles.centeredView}>
                
                    <View style={styles.modalView}>
                        <Text style={{fontSize:20}}>ID: {data} is at {location}</Text>
                        <>
                        <View style={{display:'flex', flexDirection:'column', justifyContent:'flex-start', margin:20}}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ width:100}}> Status </Text>
                            <View style={{ margin:5,display: 'flex', flexDirection: 'row', alignItems: 'center',alignSelf:'center',borderWidth:1, alignItems:'center',justifyContent:'center',width:150,borderRadius:5,borderColor:'gray' }}>
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
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ width: 100 }}>Line No:</Text>
                                <DropDownPicker
                                    listMode="MODAL"
                                    open={lopen}
                                    value={lvalue?lvalue:line}
                                    items={litems}
                                    setOpen={setlOpen}
                                    setValue={setlValue}
                                    setItems={setlItems}
                                    containerProps={{style:{width:150,borderWidth:0,padding:0}}}
                                    containerStyle={{ height: 40, width: 150 }}
                                    style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, paddingHorizontal: 5, margin: 5 }}
                                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                                    onChangeValue={setLine}
                                    placeholder="Line Number"
                                    searchable={true} 
                                    placeholderStyle={{
                                        color: "gray",
                                        
                                    }}
                                    searchTextInputProps={{
                                        keyboardType:'phone-pad'
                                    }}                        
                                />
                            </View>
                            <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <Text style={{width:100}}>Location:</Text><TextInput value={location} placeholder="Location" keyboardType='numeric' onChangeText={setlocation} style={{borderWidth:1, width:150, borderColor:'gray', borderRadius:5, paddingHorizontal:5, margin:5,height:50}} />
                            </View>  
                        </View>
                        
                        </>
                        
                        <View style={{ margin:10, padding:10 }}>
                            <TouchableOpacity disabled={disabled} style={{backgroundColor:'green', padding:15, borderRadius:20}} onPress={() => {setDisabled(true); sendDataToServer(data)}}>
                                <Text style={{color:'white'}} > Submit </Text> 
                            </TouchableOpacity>
                        </View>    
                    </View>
                </View>
            </Modal>
            <Modal
            animationType="slide"
            transparent={true}
            visible={openModal2}
            onRequestClose={() => {
            setOpenModal2(false);
            setScannerOpen(false);
            setData("");
            setLine(null);
            setProblem("");
            }}
            >
                <View style={styles.centeredView}>
                 <ScrollView style={{marginTop:30}}>
                    <View style={styles.modalView}>
                        <Text style={{fontSize:20}}>ID: {data} </Text>
                        <>
                        <View style={{display:'flex',padding:10, borderRadius:10,flexDirection:'column', justifyContent:'flex-start', margin:20,backgroundColor:'rgba(190,190,190,0.3)'}}>
                            {/* Active/Idle */}
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ width:100}}> Status </Text>
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
                           {/* Manufacturer */}
                           <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ width: 100 }}>Manufacturer:</Text>
                                <TextInput
                                    value={manufacturer}
                                    onChangeText={setManufacturer}
                                    placeholder="Manufacturer"
                                    style={ styles.textInput}
                                />
                            </View>
                            {/* No */}
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ width: 100 }}>M/C No:</Text>
                            <TextInput
                                value={no}
                                onChangeText={setNo}
                                //keyboardType="numeric"
                                placeholder="no"
                                style={ styles.textInput}
                            />
                            </View>
                            <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <Text  style={{width: 100 }}>Location:</Text><TextInput value={location} placeholder="Location" keyboardType='numeric' onChangeText={setlocation} style={ styles.textInput} />
                            </View>  
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ width: 100 }}>Line No:</Text>
                                <DropDownPicker
                                    listMode="MODAL"
                                    open={lopen}
                                    value={lvalue?lvalue:line}
                                    items={litems}
                                    setOpen={setlOpen}
                                    setValue={setlValue}
                                    setItems={setlItems}
                                    containerProps={{style:{width:150,borderWidth:0,padding:0}}}
                                    containerStyle={{ height: 40, width: 150 }}
                                    style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, paddingHorizontal: 5, margin: 5 }}
                                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                                    onChangeValue={setLine}
                                    placeholder="Line Number"
                                    searchable={true} 
                                    placeholderStyle={{
                                        color: "gray",
                                        
                                    }}
                                    searchTextInputProps={{
                                        keyboardType:'phone-pad'
                                    }}                        
                                />
                            </View>


                            {/* Name */}
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ width: 100 }}>Name:</Text>
                            <DropDownPicker
                                    listMode="MODAL"
                                    open={nopen}
                                    value={nvalue?nvalue:name}
                                    items={nitems}
                                    setOpen={setnOpen}
                                    setValue={setnValue}
                                    setItems={setnItems}
                                    containerProps={{style:{width:150,borderWidth:0,padding:0}}}
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
                                        //keyboardType:'phone-pad'
                                    }}                        
                                />
                            </View>



                            {/* Ownership */}
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ width: 100 }}>Ownership:</Text>
                            <DropDownPicker
                                    listMode="MODAL"
                                    open={oopen}
                                    value={ovalue?ovalue:ownership}
                                    items={oitems}
                                    setOpen={setoOpen}
                                    setValue={setoValue}
                                    setItems={setoItems}
                                    containerProps={{style:{width:150,borderWidth:0,padding:0}}}
                                    containerStyle={{ height: 40, width: 150 }}
                                    style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, paddingHorizontal: 5, margin: 5 }}
                                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                                    onChangeValue={setOwnership}
                                    placeholder="Hired or Owned"
                                    searchable={true} 
                                    placeholderStyle={{
                                        color: "gray",
                                    }}
                                    searchTextInputProps={{
                                        keyboardType:'phone-pad'
                                    }}                        
                                />
                            </View>

                            {/* Type */}
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ width: 100 }}>Type:</Text>
                            <DropDownPicker
                                    listMode="MODAL"
                                    open={topen}
                                    value={tvalue?tvalue:type}
                                    items={titems}
                                    setOpen={settOpen}
                                    setValue={settValue}
                                    setItems={settItems}
                                    containerProps={{style:{width:150,borderWidth:0,padding:0}}}
                                    containerStyle={{ height: 40, width: 150 }}
                                    style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, paddingHorizontal: 5, margin: 5 }}
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
                        </View>
                        
                        </>
                        
                        <View style={{ margin:10, padding:10 }}>
                            <TouchableOpacity disabled={disabled} style={{backgroundColor:'green', padding:15, borderRadius:20}} onPress={() => {setDisabled(true); sendDataToServer(data)}}>
                                <Text style={{color:'white'}} > Submit </Text> 
                            </TouchableOpacity>
                        </View>    
                    </View>
                 </ScrollView>
                </View>
            </Modal>
                                
            {scannerOpen?
            <View style={styles.scannerContainer}>
                <BarCode setData={setData} />
            </View>
            :<TouchableOpacity
                style={styles.glassButton}
                onPress={() => setScannerOpen(true)}
            >
                <Text style={styles.glassButtonText}>Scan</Text>
                <View style={styles.glassButtonEdge} />
            </TouchableOpacity>}
        </View>
        
        
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1, 
        backgroundColor:"rgba(255, 255, 255, 0.1)",
        justifyContent:'center', 
        alignItems:'center'
    },
    scannerContainer: {
        height:"100%", 
        width:"100%"
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
      },
      switchLabel: {
        marginHorizontal: 10,
        fontSize: 16,
      },
    scannerButton: {
        alignItems:'center',
        justifyContent:'center',
        width:100,
        height:100,
        backgroundColor:'palegreen',
        borderRadius:100,
    },
    scannerButtonText: {
        fontWeight:'bold', 
        fontSize:20
    },
    textInput:{
        borderWidth: 1,
        width: 150,
        height:50,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 5,
        margin: 5,
        backgroundColor:'white'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      glassButton: {
        alignItems: "center",
        justifyContent: "center",
        width: 120,
        height: 60,
        backgroundColor: "rgba(25, 25, 255, 0.4)", // Semi-transparent white for the glass effect
        borderRadius: 30,
        position: "relative",
        overflow: "hidden",
        marginTop: 20,
        elevation:2
      },
      glassButtonText: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#FFF", // White text color
      },
      glassButtonEdge: {
        position: "absolute",
        bottom: -4, // Adjust this value to control the downward edge
        width: "100%",
        height: 10,
        backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent white for the edge
        
      },
})


export default MachineStatusScanner;