import { useContext, useEffect, useState } from "react";
import {  TextInput,Text, TouchableOpacity, View } from "react-native";
import EfficienciesOutput from "../components/efficienciesOutput/EfficienciesOutput";
import { EfficienciesContext } from "../Store/efficiencies-context";
import { getdateMinusdays} from "../util/date";
import { GlobalStyles } from "../../constants/styles";
import { Fontisto } from '@expo/vector-icons';
import {  fetchLineEfficiencies } from "../util/forDataSendingGetting";
import Loadingspinner from "../components/UI/loading";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import React from "react";
import Button from "../util/Button";
import NightSkyBackground from "../../components/ColoredCircle";






export default function Allefficiencies(){
    const [refreshing, setRefreshing] = useState(false);

    const [linevalue, setlineValue] = useState('');
    const [search,setSearch] = useState(true)

    const Today= new Date();
    const mdate= getdateMinusdays(Today,5);
    const [ isfetching,setIsfetching]= useState(true)

    const [date, setDate] = useState(new Date(mdate));

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
   
    
    
    
    
    
   const efficienciesCtx= useContext(EfficienciesContext);
   function searchHnadler(){  
        setSearch(!search)
   }
  
   
   useEffect(() =>{                                      //updated
        async  function getAEfficiencies(){
            const efficiencies=  await fetchLineEfficiencies(linevalue,date); 
            setIsfetching(false);
            setRefreshing(false);
            efficienciesCtx.setEfficiency(efficiencies);
        }

        getAEfficiencies();
        
    },[search,refreshing]);

    //  useFocusEffect(
    //     React.useCallback(() => {                                        //updated
    //         async  function getAEfficiencies(){
    //             const efficiencies=  await fetchLineEfficiencies(linevalue,date); 
    //             setIsfetching(false);
    //             setRefreshing(false);
    //             efficienciesCtx.setEfficiency(efficiencies);
    //         }
    
    //         getAEfficiencies();
            
    //      },[search,refreshing]));
   
    if(isfetching){
        return <Loadingspinner/>       
     }
   
    const allEfficiencies= efficienciesCtx.efficiencies.filter((efficiency)=>{
       
        return  efficiency.lineNumber===linevalue ;
        
    });
    
    
        function onchangeHandler(a){
                setlineValue(a)
        }
       
    
return (
    <>
    
        <NightSkyBackground/>
        <View style={{flexDirection:'row', backgroundColor:GlobalStyles.colors.backgroundColor,paddingVertical:10,marginBottom:1.5}}>
            <View style={{flex:2, zIndex:10000, backgroundColor:GlobalStyles.colors.backgroundColor,borderRadius:10,borderWidth:.2,borderRightWidth:.2,marginHorizontal:'1%'}}>
                    <TextInput style={{padding:11,color:GlobalStyles.colors.textcolor}} value={linevalue} placeholder="Line:" onChangeText={onchangeHandler}/>
            </View>
            <View style={{backgroundColor:GlobalStyles.colors.backgroundColor,flex:4,borderRadius:10,borderWidth:.2,maxHeight:'100%'}}>
                <TouchableOpacity onPress={showDatepicker} style={{alignItems:'flex-start',justifyContent:'center',alignItems:'center',flex:1,}}>
                    <View style={{flexDirection:'row',marginHorizontal:'2%',}}>
                        <View style={{ justifyContent:'center',marginRight:'3%',marginLeft:'2%'}}>
                            <Text >From Date: {date.toLocaleDateString()} </Text>
                        </View>
                        <View style={{ justifyContent:'center', marginRight:'2%'}}>
                            <Fontisto name="date" size={16} color="black" />
                        </View>
                    </View>
                </TouchableOpacity> 
            </View>
            <View style={{flex:3,justifyContent:'center',backgroundColor:GlobalStyles.colors.backgroundColor,paddingHorizontal:5}}>
                <Button onPress={searchHnadler} >Search</Button>
            </View>
     </View>
        <EfficienciesOutput  efficiencies={allEfficiencies}  fallbackText={' No Data Found at Today for Selected Block'} refreshing={refreshing} onRefresh={() => setRefreshing(true)}/>
    </>
)}