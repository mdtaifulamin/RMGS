import React, { useContext, useEffect,  useState } from "react";
import {  StyleSheet, Text, ToastAndroid, TouchableOpacity, View,Modal, Dimensions } from "react-native";
import PermissionsOutput from "../components/permissionsOutput/PermissionsOutput";
import { PermissionsContext } from "../Store/permissions-context";
import { getFormattedDate, momentTime} from "../util/date";
import DropDownPicker from 'react-native-dropdown-picker';
import { GlobalStyles } from "../../constants/styles";
import { Fontisto } from '@expo/vector-icons';
import { fetchUserInfoBYDate } from "../../forDataSendingGetting";
import Loadingspinner from "../components/UI/loading";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import ButtonM from "../util/Button";
import { convertOrdinalToNumber, getOrdinalIndicator } from "../util/ordinalTonumberToordinal";
import NightSkyBackground from "../../components/ColoredCircle";
import { fetchPermissions } from "../util/forDataSendingGetting";
import { fetchDepartments } from "../../forDataSendingGetting";

const blockWiseLine = [
    [1,2,3,4,5,6],
    [7,8,9,10,11,12,13,14,15],
    [16,17,18,19,20,21],
    [22,23,24,25,26,27,28,29,30],
    [31,32,33,34,35,36],
    [37,38,39,40,41,42,43,44,45],
    [46,47,48,49],
    [50,51,52,53,54,55],
    [56,57,58,59,60,61,62],
    [63,64,65,66,67,68,69],
    [70,71,72,73,74,75,76],
    [77,78,79,80,81],
    [82,83,84,85,86],
    [87,88,89,90,91],
    [92,93,94,95,96],
    [97,98,99,100,101,102,103,104,105],
    [106,107,108,109,110,111,112,113,114]
]


const checkNumberInArray = (number, array) => {

    if(!array)
        return
    
    for(let i=0; i<array.length; i++)
    {
        if(number === array[i])
            {
                return true;
            }
    }
    

    return false;
}

    const screenWidth = Dimensions.get('window').width
    const screen_height=Dimensions.get('window').height
export default function Recentpermissions(){
    
    const [modalVisible, setModalVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState( null); //updated 31/3/2023
    const [items, setItems] = useState(
        [{label: "Loading, please wait", value: "loading"}] //blockWiseLine.map((e) => ({label: `Line ${e[0]} - ${e[e.length - 1]}`,value:e}))
    );
    const [dept, setdept] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [ isfetching,setIsfetching]= useState(true)

    const [date, setDate] = useState(new Date());

    const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    
    };
    
    const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
    };

    const showDatepicker = () => {
    showMode('date');
    };

    const showTimepicker = () => {
    showMode('time');
    };
   //for copy 
    // const [cdate, setcDate] = useState(new Date());
    // const ConChange = (event, cselectedDate) =>{
    //     const ccurrentDate = cselectedDate;
    //     setcDate(ccurrentDate);
        
    //     };
        
    //     const cshowMode = (ccurrentMode) => {
    //     DateTimePickerAndroid.open({
    //       value: cdate,
    //       onChange: ConChange,
    //       mode: ccurrentMode,
    //       is24Hour: true,
          
    //     });
    //     console.log(ConChange+'t')
    //     };
    
    //     const cshowDatepicker = () => {
    //     cshowMode('date');
       
    //     };
    
    //     const cshowTimepicker = () => {
    //     cshowMode('time');
    //     };
    
    
    
    
   const permissionsCtx= useContext(PermissionsContext);
   useEffect(() =>{ 
            const d=async()=>{
                const departmentsname= await fetchDepartments();
                setItems(eval(departmentsname.name))
            }
            d();                                       //updated
        async  function getPermissions(){
            const permissions=  await fetchPermissions(value);
            setIsfetching(false);
            setRefreshing(false);
            permissionsCtx.setPermission(permissions);   
        }
        getPermissions();
     },[value,refreshing])
    
     
     
    if(isfetching){
        return <Loadingspinner/>       
     }
     

const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
return (
    
    <View style={{ flex: 1 }}>
        <NightSkyBackground/>
       <View style={styles.rootSearchContainer}>
                     <DropDownPicker
                            listMode="MODAL"
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            style={styles.input}
                            containerStyle={{backgroundColor:''}}
                            onChangeValue={setdept}
                            placeholder="Select Departments"
                            searchable={true}
                            placeholderStyle={{
                                color: 'gray',
                                //fontWeight: "bold"
                              }}  
                            //loading={isfetching}                        
                        />
                {/* <TouchableOpacity onPress={showDatepicker}  style={{backgroundColor:GlobalStyles.colors.backgroundColor,borderWidth:.2,borderRadius:10,flexDirection:"row",padding:screenWidth*0.03,flex:3.5,justifyContent:'center',alignItems:'center',}}>
                    <View style={{ justifyContent:'center',marginRight:'3%'}}>
                        <Text style={{fontSize:13}}>Date: {getFormattedDate(date)} </Text>
                    </View>
                    <View style={{ justifyContent:'center', marginLeft:'3%'}}>
                        <Fontisto name="date" size={16} color="black" />
                    </View>
                </TouchableOpacity>  */}
            {/* <View style={{backgroundColor:GlobalStyles.colors.backgroundColor,flex:3,marginLeft:6,minHeight:42,justifyContent:'center',alignItems:'center',alignContent:'center',flexWrap:'wrap'}}>
                <ButtonM onPress={handleOpenModal} >Batch Copy</ButtonM>
            </View> */}
            {/* <View style={styles.container}>
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={handleCloseModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View style={{borderWidth:0,borderRadius:10,padding:screen_height*0.01,elevation:10,backgroundColor:GlobalStyles.colors.backgroundColor,paddingHorizontal:screenWidth*0.08}}>
                            <Text style={styles.modalText}> SELECT YOUR DESIRED DATE </Text>
                            </View>
                            <TouchableOpacity onPress={cshowDatepicker} style={{justifyContent:'center',alignItems:'center',width:screenWidth*0.5,marginVertical:screen_height*0.04,backgroundColor:GlobalStyles.colors.backgroundColor,elevation:10,borderRadius:10}}>
                                <View style={{flexDirection:'row',padding:screen_height*0.01,}}>
                                    <View style={{ justifyContent:'center',marginRight:screenWidth*0.03,marginLeft:screenWidth*0.03}}>
                                        <Text >From Date: {cdate.toLocaleDateString()} </Text>
                                    </View>
                                    <View style={{ justifyContent:'center', marginRight:screenWidth*0.03}}>
                                        <Fontisto name="date" size={16} color="black" />
                                    </View>
                                </View>
                            </TouchableOpacity> 
                            
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:screenWidth*0.6,borderWidth:0, marginTop:screen_height*0.03}}>
                                <ButtonM onPress={handleCloseModal} style={styles.button} mode={"flat"}>Cancel</ButtonM>
                                <ButtonM onPress={copyHandler} style={styles.button}> Copy </ButtonM>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View> */}
        </View>
        <View style={{flex:10}}>
            <PermissionsOutput permissions={permissionsCtx.permissions} fallbackText={' No Data Found at Today for Selected Block'} refreshing={refreshing} onRefresh={() => setRefreshing(true)}/>
        </View>    
    </View>
)}

const styles=StyleSheet.create({
    rootSearchContainer:{
        //flexDirection:'row',
        backgroundColor:GlobalStyles.colors.backgroundColor,
        paddingTop:10,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        paddingBottom:5,
        elevation:20,
        marginBottom:1
    },
    
  
    deleteCopyContainer:{
        marginTop:"5%",
        paddingTop:20,
        borderTopWidth: 2,
        borderTopColor: 'white',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    button: {
        marginHorizontal:screenWidth*0.05,
        width:screenWidth*0.3
      },
      modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      },
      modalContent: {
        backgroundColor: GlobalStyles.colors.backgroundColor,
        borderRadius: 10,
        elevation: 10,
        //justifyContent:'center',
        alignItems:'center',
        width:screenWidth*0.9,
        height:screen_height*0.3,
        paddingTop:screen_height*0.01
      },
      modalText: {
        fontSize: 18,
        marginBottom: 10,
      },
      closeButton: {
        fontSize: 16,
        color: GlobalStyles.colors.primaryButtonColor,
        textAlign: "center",
      },
    });
    
