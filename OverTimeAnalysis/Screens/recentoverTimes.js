import React, { useContext, useEffect,  useState } from "react";
import {  StyleSheet, Text, ToastAndroid, TouchableOpacity, View,Modal, Dimensions } from "react-native";
import OverTimesOutput from "../components/overTimesOutput/OverTimesOutput";
import { OverTimesContext } from "../Store/overTimes-context";
import { getFormattedDate, momentTime} from "../util/date";
import DropDownPicker from 'react-native-dropdown-picker';
import { GlobalStyles } from "../../constants/styles";
import { Fontisto } from '@expo/vector-icons';
import { fetchOverTimes, storeOverTime } from "../util/forDataSendingGetting";
import Loadingspinner from "../components/UI/loading";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import ButtonM from "../util/Button";
import { convertOrdinalToNumber, getOrdinalIndicator } from "../util/ordinalTonumberToordinal";
import NightSkyBackground from "../../components/ColoredCircle";
import Header from "../../components/Header";
import UserContext from "../../components/Store/UserContext";
import { convertRangeStringToArrayOfArrays } from "../../components/convertStringToarray";


    const screenWidth = Dimensions.get('window').width
    const screen_height=Dimensions.get('window').height
export default function RecentoverTimes(){
    const { userInfo, updateUser } = useContext(UserContext);
    const blockWiseLine = userInfo.block?convertRangeStringToArrayOfArrays(userInfo.block):[
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
    
    const [modalVisible, setModalVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null); //updated 31/3/2023
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
        console.log(ConChange+'t')
        };
    
        const cshowDatepicker = () => {
        cshowMode('date');
       
        };
    
        const cshowTimepicker = () => {
        cshowMode('time');
        };
    
    
    
    
   const overTimesCtx= useContext(OverTimesContext);
   useEffect(() =>{                                        //updated
        async  function getOverTimes(){
            const overTimes=  await fetchOverTimes(date,value);
            setIsfetching(false);
            setRefreshing(false);
            overTimesCtx.setOverTime(overTimes);   
        }
        getOverTimes();
     },[value,date,refreshing])
    //  const overTimesCtx= useContext(OverTimesContext);  
    //  useFocusEffect(
    //   React.useCallback(() => {                                        //updated
    //       async  function getOverTimes(){
    //           const overTimes=  await fetchOverTimes(date,value);
    //           setIsfetching(false);
    //           overTimesCtx.setOverTime(overTimes);   
    //       }
    //       getOverTimes();
         
    //    },[value,date]))
     
     
    if(isfetching){
        return <Loadingspinner/>       
     }
     
    const recentOverTimes= overTimesCtx.overTimes.filter((overTime)=>{
        
        return  getFormattedDate(date) === getFormattedDate(overTime.date); //&& checkNumberInArray(Number(overTime.lineNumber), value) ;
        
    });
   
    function copyHandler(){
       
       recentOverTimes.forEach(async(data) => {
       // itoday.setDate(itoday.getDate())

        //console.log(new Date(itoday))
        const changedDaysRun= data.daysRun?getOrdinalIndicator(convertOrdinalToNumber(data.daysRun)+1):'';
        const overTimeData= {
          lineNumber: data.lineNumber, 
          date: new Date(momentTime(cdate)),
          buyerName: data.buyerName,
          SO:        data.SO,
          daysRun: changedDaysRun,
          styleName: data.styleName,
          itemName: data.itemName,
          TWO_HOUR_OT:       +data.TWO_HOUR_OT,
          manpower:  0,
          hour:       0,
          production: '',
          without:   '',
          due:        '',
          rejection:  '',
          };
          const id= await storeOverTime(overTimeData);
         
    }
    )
        const showToast = () => {
            ToastAndroid.show('Successfully Copied', ToastAndroid.SHORT);
        };
        //console.log(recentOverTimes+'r')
        showToast()
        handleCloseModal()
    }

// const createTwoButtonAlert = () =>
// Alert.alert('Data Copy for Next Day', 'Are You Sure, You want to copy data to '+ momentTime( new Date( )) +'  ?', [
//     {
//         text: 'Cancel',
//         onPress: () => console.log('Cancel Pressed'),
//         style: 'cancel',
//     },
//     { text: 'Copy', onPress:() =>  copyHandler() },
// ]);

const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
return (
    
    <View style={{ flex: 1 }}>
        <NightSkyBackground/>
        {/* <View style={styles.rootSearchContainer}> */}
        <Header >
            <View style={{flexDirection:'row'}}>
                <View style={{ backgroundColor:GlobalStyles.colors.backgroundColor,marginHorizontal:screenWidth*0.03,}}>
                    <DropDownPicker
                        listMode="MODAL"
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        style={{height:screen_height*0.06,width:screenWidth*0.3,borderWidth:0,elevation:2}}
                        placeholder="Select a Block"
                        
                    />
                </View>
                    <TouchableOpacity onPress={showDatepicker}  style={{height:screen_height*0.06,elevation:2,backgroundColor:GlobalStyles.colors.backgroundColor,borderRadius:10,flexDirection:"row",justifyContent:'center',alignItems:'center',marginHorizontal:screenWidth*0.03}}>
                        <View style={{ justifyContent:'center',marginRight:screenWidth*0.04}}>
                            <Text style={{fontSize:13}}>Date: {getFormattedDate(date)} </Text>
                        </View>
                        <View style={{ justifyContent:'center', marginLeft:'3%'}}>
                            <Fontisto name="date" size={16} color="black" />
                        </View>
                    </TouchableOpacity> 
                <View style={{marginRight:screenWidth*0.01,minHeight:42,justifyContent:'center',alignItems:'center',alignContent:'center',flexWrap:'wrap',}}>
                    <ButtonM onPress={handleOpenModal} >Batch Copy</ButtonM>
                </View>
            </View>
        </Header>
            <View style={styles.container}>
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
            </View>
        
       
        <View style={{flex:10}}>
            <OverTimesOutput overTimes={recentOverTimes}  fallbackText={' No Data Found at Today for Selected Block'} refreshing={refreshing} onRefresh={() => setRefreshing(true)}/>
        </View>    
    </View>
)}

const styles=StyleSheet.create({
    rootSearchContainer:{
        flexDirection:'row',
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
    
