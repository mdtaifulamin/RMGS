import React, { useContext, useEffect,  useState } from "react";
import {  StyleSheet, Text, ToastAndroid, TouchableOpacity, View,Modal, Dimensions } from "react-native";
import EfficienciesOutput from "../components/efficienciesOutput/EfficienciesOutput";
import { EfficienciesContext } from "../Store/efficiencies-context";
import { getFormattedDate, momentTime} from "../util/date";
import DropDownPicker from 'react-native-dropdown-picker';
import { GlobalStyles } from "../../constants/styles";
import { Fontisto } from '@expo/vector-icons';
import { fetchEfficiencies, storeEfficiency } from "../util/forDataSendingGetting";
import Loadingspinner from "../components/UI/loading";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import ButtonM from "../util/Button";
import { convertOrdinalToNumber, getOrdinalIndicator } from "../util/ordinalTonumberToordinal";
import NightSkyBackground from "../../components/ColoredCircle";
import Header from "../../components/Header";
import { fetchOverTimes } from "../../OverTimeAnalysis/util/forDataSendingGetting";
import OTContext from "../../components/Store/OTcontext";
import UserContext from "../../components/Store/UserContext";
import { convertRangeStringToArrayOfArrays } from "../../components/convertStringToarray";
import { ModalOTAlert } from "../../components/AlertModal";

// const blockWiseLine = [
//     [1,2,3,4,5,6],
//     [7,8,9,10,11,12,13,14,15],
//     [16,17,18,19,20,21],
//     [22,23,24,25,26,27,28,29,30],
//     [31,32,33,34,35,36],
//     [37,38,39,40,41,42,43,44,45],
//     [46,47,48,49],
//     [50,51,52,53,54,55],
//     [56,57,58,59,60,61,62],
//     [63,64,65,66,67,68,69],
//     [70,71,72,73,74,75,76],
//     [77,78,79,80,81],
//     [82,83,84,85,86],
//     [87,88,89,90,91],
//     [92,93,94,95,96],
//     [97,98,99,100,101,102,103,104,105],
//     [106,107,108,109,110,111,112,113,114]
// ]


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

export default function Recentefficiencies(){
    const { userInfo, updateUser } = useContext(UserContext);
    const [modalotVisible, setModalotVisible] = useState(false);
    const {OTInfo, setOTInfo}=useContext(OTContext);
    // const { userInfo, updateUser } = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState( null); //updated 31/3/2023
    const blockWiseLine = convertRangeStringToArrayOfArrays(userInfo.block)
    const [items, setItems] = useState(
        blockWiseLine.map((e) => ({label: `Line ${e[0]} - ${e[e.length - 1]}`,value:e}))
    );

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
    const [cdate, setcDate] = useState(new Date());
    const ConChange = (event, cselectedDate) =>{
        const ccurrentDate = cselectedDate;
        setcDate(ccurrentDate);
        
        };
        
        const cshowMode = (ccurrentMode) => {
        DateTimePickerAndroid.open({
          value: cdate,
          onChange: ConChange,
          mode: ccurrentMode,
          is24Hour: true,
          
        });
        //console.log(ConChange+'t')
        };
    
        const cshowDatepicker = () => {
        cshowMode('date');
       
        };
    
        const cshowTimepicker = () => {
        cshowMode('time');
        };
    
    
    
    
   const efficienciesCtx= useContext(EfficienciesContext);
   useEffect(() =>{                                        //updated
        async  function getEfficiencies(){
            const ot= await fetchOverTimes(date,value);
            setOTInfo(ot)
            console.log(ot);
            const efficiencies=  await fetchEfficiencies(date,value);
            setIsfetching(false);
            setRefreshing(false);
            efficienciesCtx.setEfficiency([])
            efficienciesCtx.setEfficiency(efficiencies);   
        }
        try{getEfficiencies();}catch{ setModalotVisible(true)};
        console.log(value)
     },[value,date,refreshing])
    
     
     
    if(isfetching){
        return <Loadingspinner/>       
     }
     
    const recentEfficiencies= efficienciesCtx.efficiencies.filter((efficiency)=>{
        
        return  getFormattedDate(date) === getFormattedDate(efficiency.date); //&& checkNumberInArray(Number(efficiency.lineNumber), value) ;
        
    });
   
    function copyHandler(){
       
       recentEfficiencies.forEach(async(data) => {
       // itoday.setDate(itoday.getDate())

        //console.log(new Date(itoday))
        const changedDaysRun= data.daysRun?getOrdinalIndicator(convertOrdinalToNumber(data.daysRun)+1):'';
        const efficiencyData= {
          lineNumber: data.lineNumber, 
          date: new Date(momentTime(cdate)),
          buyerName: data.buyerName,
          SO:        data.SO,
          daysRun: changedDaysRun,
          styleName: data.styleName,
          itemName: data.itemName,
          SMV:       +data.SMV,
          manpower:  0,
          hour:       0,
          production: '',
          without:   '',
          due:        '',
          rejection:  '',
          };
          const id= await storeEfficiency(efficiencyData);
         
    }
    )
        const showToast = () => {
            ToastAndroid.show('Successfully Copied', ToastAndroid.SHORT);
        };
        //console.log(recentEfficiencies+'r')
        showToast()
        handleCloseModal()
    }
const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
return (

    <View style={{ flex: 1 }}>
       <Header>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:screen_height/15}}>
                <View style={{ }}>
                    <DropDownPicker
                        listMode="MODAL"
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        style={{height:screen_height/15,width:screenWidth/10*2.5,marginLeft:screenWidth/30,elevation:2,borderWidth:0}}
                        placeholder="Block "
                        
                    />
                </View>
                    <TouchableOpacity onPress={showDatepicker}  style={{height:screen_height/15,elevation:2,backgroundColor:GlobalStyles.colors.backgroundColor,borderRadius:10,flexDirection:"row",justifyContent:'center',alignItems:'center',marginHorizontal:screenWidth*0.02}}>
                        <View style={{ justifyContent:'center',marginRight:screenWidth*0.04}}>
                            <Text style={{fontSize:13}}>Date: {getFormattedDate(date)} </Text>
                        </View>
                        <View style={{ justifyContent:'center', marginLeft:'3%'}}>
                            <Fontisto name="date" size={16} color="black" />
                        </View>
                    </TouchableOpacity> 
                <View style={{marginRight:screenWidth/30,minHeight:42,justifyContent:'center',alignItems:'center',alignContent:'center',flexWrap:'wrap',}}>
                    <ButtonM onPress={handleOpenModal} >Batch Copy</ButtonM>
                </View>
            </View>
       </Header>
    
            <View >
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
                <ModalOTAlert modalVisible={modalotVisible} onRequestClose={() => setModalotVisible(false)}/>
            </View>

        <View style={{flex:10,}}>
            <EfficienciesOutput efficiencies={recentEfficiencies}  fallbackText={' No Data Found at Today for Selected Block'} refreshing={refreshing} onRefresh={() => setRefreshing(true)}/>
        </View>    
    </View>
)}

const styles=StyleSheet.create({
  
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
    
