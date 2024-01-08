import React, { Component, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  KeyboardAvoidingView,
  Alert,
  Button,
} from "react-native";
import CAScrollDown from "../components/CAScrollDown";
import { store_capacity_data } from "../components/server_activity";
import DropDownPicker from "react-native-dropdown-picker";
import Spinner from "react-native-loading-spinner-overlay";
import Stopwatch from "../components/StopWatch";
import MachineList from "../lib/machineList.json"
import { ColorLibrary } from "../Style/color";

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width
let totalInterval = []

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }


function CapacityAnalysis(){

    const today = new Date()
    // const enteredDate = day.toLocaleDateString().replace(/[/]/g,"-") 
    const enteredDate = `${today.getFullYear()}-${(today.getMonth()+1)<10?'0'+(today.getMonth()+1):(today.getMonth()+1)}-${today.getDate()<10?'0'+today.getDate():today.getDate()}`;

    const [avgCycleTime, setAvgCycleTime] = useState(0)
    const [smv, setSMV] = useState(0)
    const [capacityPerHour, setCapacityPerHour] = useState(0)

    const [iD, setID] = useState('330')

    const [openLine, setOpenLine] = useState(false)
    const [lineNo, setLineNo] = useState(1)
    const [lineItems, setLineItems] = useState([
        {label: "Line: 1", value: 1},
        {label: "Line: 2", value: 2},
        {label: "Line: 3", value: 3},
        {label: "Line: 4", value: 4},
        {label: "Line: 5", value: 5},
        {label: "Line: 6", value: 6},
        {label: "Line: 7", value: 7},
        {label: "Line: 8", value: 8},
        {label: "Line: 9", value: 9},
        {label: "Line: 10", value: 10},
        {label: "Line: 11", value: 11},
        {label: "Line: 12", value: 12},
        {label: "Line: 13", value: 13},
        {label: "Line: 14", value: 14},
        {label: "Line: 15", value: 15},
        {label: "Line: 16", value: 16},
        {label: "Line: 17", value: 17},
        {label: "Line: 18", value: 18},
        {label: "Line: 19", value: 19},
        {label: "Line: 20", value: 20},
        {label: "Line: 21", value: 21},
        {label: "Line: 22", value: 22},
        {label: "Line: 23", value: 23},
        {label: "Line: 24", value: 24},
        {label: "Line: 25", value: 25},
        {label: "Line: 26", value: 26},
        {label: "Line: 27", value: 27},
        {label: "Line: 28", value: 28},
        {label: "Line: 29", value: 29},
        {label: "Line: 30", value: 30},
        {label: "Line: 31", value: 31},
        {label: "Line: 32", value: 32},
        {label: "Line: 33", value: 33},
        {label: "Line: 34", value: 34},
        {label: "Line: 35", value: 35},
        {label: "Line: 36", value: 36},
        {label: "Line: 37", value: 37},
        {label: "Line: 38", value: 38},
        {label: "Line: 39", value: 39},
        {label: "Line: 40", value: 40},
        {label: "Line: 41", value: 41},
        {label: "Line: 42", value: 42},
        {label: "Line: 43", value: 43},
        {label: "Line: 44", value: 44},
        {label: "Line: 45", value: 45},
        {label: "Line: 46", value: 46},
        {label: "Line: 47", value: 47},
        {label: "Line: 48", value: 48},
        {label: "Line: 49", value: 49},
        {label: "Line: 50", value: 50},
        {label: "Line: 51", value: 51},
        {label: "Line: 52", value: 52},
        {label: "Line: 53", value: 53},
        {label: "Line: 54", value: 54},
        {label: "Line: 55", value: 55},
        {label: "Line: 56", value: 56},
        {label: "Line: 57", value: 57},
        {label: "Line: 58", value: 58},
        {label: "Line: 59", value: 59},
        {label: "Line: 60", value: 60},
        {label: "Line: 61", value: 61},
        {label: "Line: 62", value: 62},
        {label: "Line: 63", value: 63},
        {label: "Line: 64", value: 64},
        {label: "Line: 65", value: 65},
        {label: "Line: 66", value: 66},
        {label: "Line: 67", value: 67},
        {label: "Line: 68", value: 68},
        {label: "Line: 69", value: 69},
        {label: "Line: 70", value: 70},
        {label: "Line: 71", value: 71},
        {label: "Line: 72", value: 72},
        {label: "Line: 73", value: 73},
        {label: "Line: 74", value: 74},
        {label: "Line: 75", value: 75},
        {label: "Line: 76", value: 76},
        {label: "Line: 77", value: 77},
        {label: "Line: 78", value: 78},
        {label: "Line: 79", value: 79},
        {label: "Line: 80", value: 80},
        {label: "Line: 81", value: 81},
        {label: "Line: 82", value: 82},
        {label: "Line: 83", value: 83},
        {label: "Line: 84", value: 84},
        {label: "Line: 85", value: 85},
        {label: "Line: 86", value: 86},
        {label: "Line: 87", value: 87},
        {label: "Line: 88", value: 88},
        {label: "Line: 89", value: 89},
        {label: "Line: 90", value: 90},
        {label: "Line: 91", value: 91},
        {label: "Line: 92", value: 92},
        {label: "Line: 93", value: 93},
        {label: "Line: 94", value: 94},
        {label: "Line: 95", value: 95},
        {label: "Line: 96", value: 96},
        {label: "Line: 97", value: 97},
        {label: "Line: 98", value: 98},
        {label: "Line: 99", value: 99},
        {label: "Line: 100", value: 100},
        {label: "Line: 101", value: 101},
        {label: "Line: 102", value: 102},
        {label: "Line: 103", value: 103},
        {label: "Line: 104", value: 104},
        {label: "Line: 105", value: 105},
        {label: "Line: 106", value: 106},
        {label: "Line: 107", value: 107},
        {label: "Line: 108", value: 108},
        {label: "Line: 109", value: 109},
        {label: "Line: 110", value: 110},
        {label: "Line: 111", value: 111},
        {label: "Line: 112", value: 112},
        {label: "Line: 113", value: 113},
        {label: "Line: 114", value: 114},
    ])
    

    const [openFabric, setOpenFabric] = useState(false);
    const [fabricsType, setFabricsType] = useState('')
    const [fabricItems, setFabricItems] = useState([
        {label: "L/S/J", value: "L/S/J"},
        {label: "S/J", value: "S/J"},
        {label: "Slub S/J", value: "Slub S/J"},
        {label: "RIB", value: "RIB"},
        {label: "L/Rib", value: "L/Rib"},
        {label: "Interlock", value: "Interlock"},
        {label: "Pique", value: "Pique"},
        {label: "L/Pique", value: "L/Pique"},
        {label: "T/F", value: "T/F"},
        {label: "F/Terry", value: "F/Terry"},
        {label: "D/Terry", value: "D/Terry"},
        {label: "Design Rib", value: "Design Rib"},
        {label: "Youn/J", value: "Youn/J"},
        {label: "Youn/Rib", value: "Youn/Rib"},
        {label: "Com/J", value: "Com/J"},
        {label: "Com/Rib", value: "Com/Rib"},
        {label: "Lyon/J", value: "Lyon/J"},
        {label: "Lyon/Rib", value: "Lyon/Rib"},
        {label: "NY/J", value: "NY/J"},
        {label: "NY/Rib", value: "NY/Rib"},
        {label: "L/P/Pique", value: "L/P/Pique"},
        {label: "P/Pique", value: "P/Pique"},
        {label: "S/L", value: "S/L"},
        {label: "D/L", value: "D/L"},
        {label: "Mesh", value: "Mesh"},
        {label: "Bubble Jersey", value: "Bubble Jersey"},
        {label: "JACQ", value: "JACQ"},
        {label: "Regal Pique", value: "Regal Pique"},
        {label: "L/Loop Terry", value: "L/Loop Terry"},
        {label: "H/Jersy", value: "H/Jersy"},
        {label: "Dry Jersey", value: "Dry Jersey"},
        {label: "Dry Rib", value: "Dry Rib"},
        {label: "J Slub Jersey", value: "J Slub Jersey"},
        {label: "Scalar Jersey", value: "Scalar Jersey"},
        {label: "Mercury Jersey", value: "Mercury Jersey"},
    ]);

    const [openMachineList, setOpenMachineList] = useState(false);
    const [machineType, setMachineType] = useState('')
    const [machineList, setMachineList] = useState(MachineList.map((e) => ({label:e, value:e})))

    const [remarks, setRemarks] = useState('')

    const [itemValue, setItemValue] = useState()
    const [processValue, setProcessValue] = useState()

    const [refreshing, setRefreshing] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [laps, setLaps] = useState([]);
    
    
    const getCycleTimeFromLaps = (laps) => {
        // console.log('laps :'+ laps)
        let totalTime = 0
        for(let v of laps){
            totalTime = totalTime + Number(v)
            
        }
        console.log('total time :'+ totalTime)
        return totalTime/laps.length;
    }

    const getCapcityFromLaps = (laps) => {
        const cycleTime = getCycleTimeFromLaps(laps)
        return 3060/cycleTime;
    }

    const getSmvFromLaps = (laps) => {
        const cycleTime = getCycleTimeFromLaps(laps)
        return cycleTime/60
    }


    // console.log(iD, lineNo, fabricsType, remarks)

    useEffect(() => {
        totalInterval=[]
    }, [])
    

    useEffect(() => {
        console.log(laps);
    }, [laps])

    function getDropdownValue(value, processValue){
        setItemValue(value)
        setProcessValue(processValue)
        console.log(value, processValue)
    }

    

    async function importCapacityData(){

        const totalCapacityData = {
            "cycle" : Number(getCycleTimeFromLaps(laps).toFixed(2)),
            "date" : new Date(enteredDate),
            "fabric" : fabricsType,
            "id": iD,
            "item" : itemValue,
            "machine": machineType,
            "line" : lineNo,
            "process-id": processValue,
            "remarks" : remarks,            
        }

        // const totalCapacityData = {[iD]: processValue + '-' + itemValue + '-' + fabricsType + '-' + lineNo + '-' + getCycleTimeFromLaps(laps).toFixed(2) + '-' + remarks};
        // setIsSubmitting(true)
        // let errormsg = 'success'
        // errormsg = await store_capacity_data(totalCapacityData)

        // if(errormsg === 'success'){
        //     setTimeout(() => {
        //         setIsSubmitting(false)
        //     }, 3000)
        // }
        // else{
        //     Alert.alert('A Network Error Occured, Please try Again')
        //     setTimeout(() => {
        //         setIsSubmitting(false)
        //     }, 1000)
        // }

        if (iD.length === 8){
            setIsSubmitting(true)
            let errormsg = 'success'
            errormsg = await store_capacity_data(totalCapacityData)

            if(errormsg === 'success'){
                setTimeout(() => {
                    setIsSubmitting(false)
                }, 3000)
            }
            else{
                Alert.alert('A Network Error Occured, Please try Again')
                setTimeout(() => {
                    setIsSubmitting(false)
                }, 1000)
            }
        }
        else{
            Alert.alert("Please Enter Operator ID and Retry, Thank you")
            console.log(iD.length)
        }
    }

//     if(isSubmitting){
//         return <LoadingOverlay/>
//   }

    return(
        <View style={styles.headContainer}>
            <Spinner
                visible={isSubmitting}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View>
                <CAScrollDown getDropdownValue={getDropdownValue}/>
            </View>
            <KeyboardAvoidingView style={{paddingBottom:80}} behavior="position">
                <View style={styles.stopWatchContainer}>
                        <Stopwatch laps={laps} setLaps={setLaps} />
                        {/* <StopWatch setLaps = {setLaps} laps={laps} /> */}
                </View>
                <View style={styles.reportContainer}>
                    <View style={styles.eachReport}>
                        <Text style={[styles.reportValue]}>{isNaN(getCycleTimeFromLaps(laps).toFixed(2))?0:getCycleTimeFromLaps(laps).toFixed(2)} s</Text>
                        <Text style={[styles.reportText]}>CYCLE TIME</Text>
                    </View>
                    <View style={styles.eachReport}>
                        <Text style={[styles.reportValue]}>{isNaN(getSmvFromLaps(laps).toFixed(2))?0:getSmvFromLaps(laps).toFixed(2)}</Text>
                        <Text style={[styles.reportText]}>SMV</Text>
                    </View>
                    <View style={styles.eachReport}>
                        <Text style={[styles.reportValue]}>{isNaN(getCapcityFromLaps(laps).toFixed(0))?0:getCapcityFromLaps(laps).toFixed(0)} pcs</Text>
                        <Text style={[styles.reportText]}>CAPACITY</Text>
                    </View>
                </View>
                <View style={styles.manualEntryContainer}>
                        <View style={styles.IdLineNoContainer}>
                            <View style={{flex:1, marginHorizontal:5}}>
                                <DropDownPicker
                                    placeholder="Select Machine"
                                    style={{borderColor:ColorLibrary.primary_text_border_button}}
                                    dropDownContainerStyle={{}}
                                    listItemContainerStyle={{}}
                                    open={openMachineList}
                                    value={machineType}
                                    items={machineList}
                                    setOpen={setOpenMachineList}
                                    setValue={setMachineType}
                                    setItems={setMachineList}
                                    listMode="MODAL"
                                    modalTitle="Select Machine Type"
                                />
                            </View>
                            <TextInput style={[styles.idTextInputStyle, {flex:1, marginHorizontal:5}]} keyboardType='numeric' onChangeText={setID}>{iD}</TextInput>
                        </View>
                    
                    <View style={styles.IdLineNoContainer}>
                        {/* <TextInput style={styles.textInputStyle} placeholder='LINE NO' keyboardType="numeric" onChangeText={setLineNo}>{lineNo}</TextInput> */}
                        <View style={{flex:1, marginHorizontal:5}}>
                        <DropDownPicker
                            placeholder="Select Line"
                            style={{borderColor: ColorLibrary.primary_text_border_button}}
                            dropDownContainerStyle={{}}
                            listItemContainerStyle={{}}
                            open={openLine}
                            value={lineNo}
                            items={lineItems}
                            setOpen={setOpenLine}
                            setValue={setLineNo}
                            setItems={setLineItems}
                            listMode="MODAL"
                            modalTitle="Select Line"
                            
                        />
                        </View>
                        <View style={{flex:1, marginHorizontal:5}}>
                        <DropDownPicker
                            placeholder="Select Fabric"
                            style={{borderColor: ColorLibrary.primary_text_border_button}}
                            dropDownContainerStyle={{}}
                            listItemContainerStyle={{}}
                            open={openFabric}
                            value={fabricsType}
                            items={fabricItems}
                            setOpen={setOpenFabric}
                            setValue={setFabricsType}
                            setItems={setFabricItems}
                            listMode="MODAL"
                            modalTitle="Select Fabric Type"
                        />
                        </View>
                        
                    </View>
                    <View style={{flexDirection:"row", justifyContent:"center"}}>
                        <TextInput style={{borderWidth:1, borderRadius: 5, flex:1, marginHorizontal:15, marginVertical:5, padding:5, paddingLeft:10, borderColor: ColorLibrary.primary_text_border_button, fontFamily: "Roboto-Regular"}} placeholder="REMARKS" onChangeText={setRemarks}>{remarks}</TextInput>
                    </View>
                    <TouchableOpacity style={styles.pressButton} onPress={importCapacityData}>
                        <View>
                            <Text style={styles.pressButtonText}>SUBMIT</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default CapacityAnalysis

const styles = StyleSheet.create({
    headContainer:{
        backgroundColor: '#f8f9fa',
        height: screenHeight,
    },
    stopWatchContainer:{
        height: screenHeight * 0.375,
        marginTop: screenHeight * 0.01,
    },
    reportContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        // marginHorizontal: screenWidth * 0.1,
        marginTop: screenHeight * 0.00,
        // borderWidth: 2,
        // borderRadius: 10,
        // borderColor: '#000000'
    },
    reportValue:{
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: screenWidth < 300 ? 14:16,
    },
    reportText:{
        textAlign: 'center',
        fontSize: screenWidth < 300 ? 10:12,
    },
    eachReport:{
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginHorizontal: screenWidth * 0.01,
        padding: screenWidth * 0.02,
        marginVertical: screenHeight * 0.008,
        // borderBottomWidth: 1,
        borderWidth: 0.5,
        borderColor: ColorLibrary.primary_text_border_button,
        width: 100,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    IdLineNoContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: screenWidth * 0.025,
        marginVertical: 2
    },
    idTextInputStyle:{
        // width: "40%",
        paddingVertical:5,
        borderWidth: 1,
        borderColor: ColorLibrary.primary_text_border_button,
        borderRadius: 10,
        fontSize: 17,
        textAlign: 'center',
        marginVertical: 2
        // marginLeft: screenWidth * 0.025,
    },
    manualEntryContainer:{
        borderColor: ColorLibrary.primary_text_border_button,
        marginTop: screenHeight * 0.00,
    },
    pressButton:{
        alignSelf:'center',
        marginHorizontal: screenWidth * 0.05,
        padding: screenWidth * 0.03,
        // margin: screenWidth * 0.000,
        backgroundColor: '#7bf1a8',
        borderRadius: 15,
        elevation: 5,
        overflow: 'hidden',
        width: screenWidth * 0.3
      },
      pressButtonText:{
        textAlign: "center",
        fontSize: 18,
        color: '#000000',
        fontFamily: "Roboto-Bold"
      },
      spinnerTextStyle: {
        color: '#FFF'
      },
      container: { flex: 1, alignItems: "center" },
  timeText: {
    fontSize: 60,
    fontWeight: "300",
    marginTop: 100,
    fontVariant: ["tabular-nums"], // fixed width character
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 100,
  },
})