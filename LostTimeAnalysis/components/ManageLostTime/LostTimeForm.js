import { useEffect, useState } from "react";
import {  StyleSheet, Text, View ,TouchableOpacity,TextInput} from "react-native";
import Input from "./Input";
import Button from "../../util/Button";
import { getdateMinusdays, getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../../constants/styles";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { fetchBuyer, fetchHours } from "../../util/forDataSendingGetting";
import { async } from "@firebase/util";
import DropDownPicker from 'react-native-dropdown-picker';
import Loadingspinner from "../UI/loading";
import { evalCalculation } from "../../util/ordinalTonumberToordinal";

export default function LostTimeForm({onSubmit,onCancel,onButton, defaultValues,testp}) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState( null); //updated 31/3/2023
    const [items, setItems] = useState(
        [{label: "Loading, please wait", value: "loading"}] //blockWiseLine.map((e) => ({label: `Line ${e[0]} - ${e[e.length - 1]}`,value:e}))
    );
    const [lopen, setlOpen] = useState(false);
    const [lvalue, setlValue] = useState( null); //updated 31/3/2023
    const [litems, setlItems] = useState(
        [{label:"1" , value:"1"},{label:"2" , value:"2"},{label:"3" , value:"3"},{label:"4" , value:"4"},{label:"5" , value:"5"},{label:"6" , value:"6"},{label:"7" , value:"7"},{label:"8" , value:"8"},{label:"9" , value:"9"},{label:"10" , value:"10"},{label:"11" , value:"11"},{label:"12" , value:"12"},{label:"13" , value:"13"},{label:"14" , value:"14"},{label:"15" , value:"15"},{label:"16" , value:"16"},{label:"17" , value:"17"},{label:"18" , value:"18"},{label:"19" , value:"19"},{label:"20" , value:"20"},{label:"21" , value:"21"},{label:"22" , value:"22"},{label:"23" , value:"23"},{label:"24" , value:"24"},{label:"25" , value:"25"},{label:"26" , value:"26"},{label:"27" , value:"27"},{label:"28" , value:"28"},{label:"29" , value:"29"},{label:"30" , value:"30"},{label:"31" , value:"31"},{label:"32" , value:"32"},{label:"33" , value:"33"},{label:"34" , value:"34"},{label:"35" , value:"35"},{label:"36" , value:"36"},{label:"37" , value:"37"},{label:"38" , value:"38"},{label:"39" , value:"39"},{label:"40" , value:"40"},{label:"41" , value:"41"},{label:"42" , value:"42"},{label:"43" , value:"43"},{label:"44" , value:"44"},{label:"45" , value:"45"},{label:"46" , value:"46"},{label:"47" , value:"47"},{label:"48" , value:"48"},{label:"49" , value:"49"},{label:"50" , value:"50"},{label:"51" , value:"51"},{label:"52" , value:"52"},{label:"53" , value:"53"},{label:"54" , value:"54"},{label:"55" , value:"55"},{label:"56" , value:"56"},{label:"57" , value:"57"},{label:"58" , value:"58"},{label:"59" , value:"59"},{label:"60" , value:"60"},{label:"61" , value:"61"},{label:"62" , value:"62"},{label:"63" , value:"63"},{label:"64" , value:"64"},{label:"65" , value:"65"},{label:"66" , value:"66"},{label:"67" , value:"67"},{label:"68" , value:"68"},{label:"69" , value:"69"},{label:"70" , value:"70"},{label:"71" , value:"71"},{label:"72" , value:"72"},{label:"73" , value:"73"},{label:"74" , value:"74"},{label:"75" , value:"75"},{label:"76" , value:"76"},{label:"77" , value:"77"},{label:"78" , value:"78"},{label:"79" , value:"79"},{label:"80" , value:"80"},{label:"81" , value:"81"},{label:"82" , value:"82"},{label:"83" , value:"83"},{label:"84" , value:"84"},{label:"85" , value:"85"},{label:"86" , value:"86"},{label:"87" , value:"87"},{label:"88" , value:"88"},{label:"89" , value:"89"},{label:"90" , value:"90"},{label:"91" , value:"91"},{label:"92" , value:"92"},{label:"93" , value:"93"},{label:"94" , value:"94"},{label:"95" , value:"95"},{label:"96" , value:"96"},{label:"97" , value:"97"},{label:"98" , value:"98"},{label:"99" , value:"99"},{label:"100" , value:"100"},{label:"101" , value:"101"},{label:"102" , value:"102"},{label:"103" , value:"103"},{label:"104" , value:"104"},{label:"105" , value:"105"},{label:"106" , value:"106"},{label:"107" , value:"107"},{label:"108" , value:"108"},{label:"109" , value:"109"},{label:"110" , value:"110"},{label:"111" , value:"111"},{label:"112" , value:"112"},{label:"113" , value:"113"},{label:"114" , value:"114"}] //blockWiseLine.map((e) => ({label: `Line ${e[0]} - ${e[e.length - 1]}`,value:e}))
    );

    const [dopen, setdOpen] = useState(false);
    const [dvalue, setdValue] = useState( null); //updated 31/3/2023
    const [ditems, setdItems] = useState(
        [{label:"due" , value:"due"},{label:"0" , value:"0"},{label:"1st" , value:"1st"},{label:"2nd" , value:"2nd"},{label:"3rd" , value:"3rd"},{label:"4th" , value:"4th"},{label:"5th" , value:"5th"},{label:"6th" , value:"6th"},{label:"7th" , value:"7th"},{label:"8th" , value:"8th"},{label:"9th" , value:"9th"},{label:"10th" , value:"10th"},{label:"11th" , value:"11th"},{label:"12th" , value:"12th"},{label:"13th" , value:"13th"},{label:"14th" , value:"14th"},{label:"15th" , value:"15th"},{label:"16th" , value:"16th"},{label:"17th" , value:"17th"},{label:"18th" , value:"18th"},{label:"19th" , value:"19th"},{label:"20th" , value:"20th"},{label:"21st" , value:"21st"},{label:"22nd" , value:"22nd"},{label:"23rd" , value:"23rd"},{label:"24th" , value:"24th"},{label:"25th" , value:"25th"},{label:"26th" , value:"26th"},{label:"27th" , value:"27th"},{label:"28th" , value:"28th"},{label:"29th" , value:"29th"},{label:"30th" , value:"30th"},{label:"31st" , value:"31st"},{label:"32nd" , value:"32nd"},{label:"33rd" , value:"33rd"},{label:"34th" , value:"34th"},{label:"35th" , value:"35th"},{label:"36th" , value:"36th"},{label:"37th" , value:"37th"},{label:"38th" , value:"38th"},{label:"39th" , value:"39th"},{label:"40th" , value:"40th"},{label:"41st" , value:"41st"},{label:"42nd" , value:"42nd"},{label:"43rd" , value:"43rd"},{label:"44th" , value:"44th"},{label:"45th" , value:"45th"},{label:"46th" , value:"46th"},{label:"47th" , value:"47th"},{label:"48th" , value:"48th"},{label:"49th" , value:"49th"},{label:"50th" , value:"50th"},{label:"51st" , value:"51st"},{label:"52nd" , value:"52nd"},{label:"53rd" , value:"53rd"},{label:"54th" , value:"54th"},{label:"55th" , value:"55th"},{label:"56th" , value:"56th"},{label:"57th" , value:"57th"},{label:"58th" , value:"58th"},{label:"59th" , value:"59th"},{label:"60th" , value:"60th"},{label:"61st" , value:"61st"},{label:"62nd" , value:"62nd"},{label:"63rd" , value:"63rd"},{label:"64th" , value:"64th"},{label:"65th" , value:"65th"},{label:"66th" , value:"66th"},{label:"67th" , value:"67th"},{label:"68th" , value:"68th"},{label:"69th" , value:"69th"},{label:"70th" , value:"70th"},{label:"71st" , value:"71st"},{label:"72nd" , value:"72nd"},{label:"73rd" , value:"73rd"},{label:"74th" , value:"74th"},{label:"75th" , value:"75th"},{label:"76th" , value:"76th"},{label:"77th" , value:"77th"},{label:"78th" , value:"78th"},{label:"79th" , value:"79th"},{label:"80th" , value:"80th"},{label:"81st" , value:"81st"},{label:"82nd" , value:"82nd"},{label:"83rd" , value:"83rd"},{label:"84th" , value:"84th"},{label:"85th" , value:"85th"},{label:"86th" , value:"86th"},{label:"87th" , value:"87th"},{label:"88th" , value:"88th"},{label:"89th" , value:"89th"},{label:"90th" , value:"90th"},{label:"91st" , value:"91st"},{label:"92nd" , value:"92nd"},{label:"93rd" , value:"93rd"},{label:"94th" , value:"94th"},{label:"95th" , value:"95th"},{label:"96th" , value:"96th"},{label:"97th" , value:"97th"},{label:"98th" , value:"98th"},{label:"99th" , value:"99th"},{label:"100th" , value:"100th"},{label:"101st" , value:"101st"},{label:"102nd" , value:"102nd"},{label:"103rd" , value:"103rd"},{label:"104th" , value:"104th"},{label:"105th" , value:"105th"},{label:"106th" , value:"106th"},{label:"107th" , value:"107th"},{label:"108th" , value:"108th"},{label:"109th" , value:"109th"},{label:"110th" , value:"110th"},{label:"111th" , value:"111th"},{label:"112th" , value:"112th"},{label:"113th" , value:"113th"},{label:"114th" , value:"114th"},]
    );
    const [itemopen, setitemOpen] = useState(false);
    const [itemvalue, setitemValue] = useState( null); //updated 31/3/2023
    const [itemitems, setitemItems] = useState(
        [{label: "Loading, please wait", value: "loading"}]
    );

    const [ isfetching,setIsfetching]= useState(false);
    const [inputs,setInputs]= useState({
        lineNumber:{
                        value: defaultValues? defaultValues.lineNumber.toString():'',
                        isValid: true  //defaultValues? true :false                       
                    },
        date:       {
                        value: defaultValues?getFormattedDate(defaultValues.date):'',
                        isValid: true
                    },
        buyerName:{
                     value: defaultValues?defaultValues.buyerName:'',
                     isValid: true
                    },
        SO:{
                        value: defaultValues?defaultValues.SO.toString():'3000',
                        isValid: true
                       },
        styleName:{
                        value: defaultValues?defaultValues.styleName.toString():'',
                        isValid: true
                       },
        itemName:{
                        value: defaultValues?defaultValues.itemName.toString():'',
                        isValid:true
                    },
        daysRun:{
                        value: defaultValues?defaultValues.daysRun.toString():'',
                        isValid: true
                       },              
        SMV:{
                           value: defaultValues?defaultValues.SMV.toString():'',
                           isValid: true
                          },
        manpower:{
                           value: defaultValues?defaultValues.manpower.toString():'',
                           isValid: true
                          },
        target10:{
                           value: defaultValues?defaultValues.target10.toString():'',
                           isValid: true
                        } ,                 
                           
        hour:{
                               value: defaultValues?defaultValues.hour.toString():'',
                               isValid: true
                              },
        production:{
                               value: defaultValues?defaultValues.production.toString():'',
                               isValid: true
                              },
        without:{
                                value: defaultValues?defaultValues.without.toString():'',
                                isValid: true
                               },
        due:{
                                value: defaultValues?defaultValues.due.toString():'',
                                isValid: true
                               },
        rejection:{
                                value: defaultValues?defaultValues.rejection.toString():'',
                                isValid: true
                               },
        Button:{
                                Value: true,
                                isValid: true
        },
        remarks:{
                                value: defaultValues?defaultValues.remarks.toString():'',
                                isValid:true
        }
    });
    
    function inputChangeHandler(inputIdentifier,enteredValue) {
        // console.log("Entered val: "+enteredValue);

        setInputs((curInputs)=>{
                                return{
                                        ...curInputs,
                                        [inputIdentifier]: {value: enteredValue, isValid: true}
                                    };
        });
    }

    function checkevalerror(value){
        let result=''
        try {
           result= eval(value).toFixed(6) ;
        } catch (error) {
            result=0;
        }
        return result;
    }



    function submitHandler(){
                            //console.log(!isNaN(inputs.hour.value));
                            const lostTimeData={
                                                    lineNumber: inputs.lineNumber.value,//toString(checkevalerror( inputs.lineNumber.value)) ,
                                                    date: new Date(inputs.date.value),
                                                    buyerName: inputs.buyerName.value,
                                                    SO:        inputs.SO.value,
                                                    styleName: inputs.styleName.value.toUpperCase().trim().replace(/[^\w\s]+$/, '').replace(/\s+/g, " ").trim(),
                                                    itemName:inputs.itemName.value,
                                                    daysRun:   inputs.daysRun.value,
                                                    SMV:       +inputs.SMV.value,
                                                    manpower:    +inputs.manpower.value, // eval is removed for removing NaN
                                                    target10: +inputs.target10.value,
                                                    hour:       +(+!isNaN(inputs.hour.value)?(+inputs.hour.value).toFixed(6):+checkevalerror(inputs.hour.value)),
                                                    production: +(!isNaN(inputs.production.value)?+inputs.production.value:+checkevalerror(inputs.production.value)),
                                                    without:     +(!isNaN(inputs.without.value)?+inputs.without.value:+checkevalerror(inputs.without.value)),
                                                    due:         +(!isNaN(inputs.due.value)?+inputs.due.value:+checkevalerror(inputs.due.value)),
                                                    rejection:   +(!isNaN(inputs.rejection.value)?+inputs.rejection.value:+checkevalerror(inputs.rejection.value)),
                                                    remarks:inputs.remarks.value,
                                                 };

 
                                                 
                               
                                
                                            
                                const lineNumberIsValid = lostTimeData.lineNumber.trim().length > 0;  //!isNaN(lostTimeData.lineNumber.trim()) && lostTimeData.lineNumber.trim().length > 0;
                                const buyerNameIsValid = lostTimeData.buyerName.trim().length > 0;
                                const SOIsValid = lostTimeData.SO.trim().length > 7;
                                const styleNameIsValid = lostTimeData.styleName.trim().length > 0;
                                const dateIsValid = lostTimeData.date.toString() !== 'Invalid Date';
                                const itemNameIsValid= lostTimeData.itemName.trim().length>0;
                                const SMVIsvalid = !isNaN(lostTimeData.SMV) && lostTimeData.SMV > 0;
                                // const manpowerIsvalid = !isNaN(lostTimeData.manpower) && lostTimeData.manpower > 0;
                                // const hourIsvalid = !isNaN(lostTimeData.hour) && lostTimeData.hour > 0;
                                // const productionIsvalid = !isNaN(lostTimeData.production) ;
                                // const withoutsvalid = !isNaN(lostTimeData.without) ;
                                // const dueIsvalid = !isNaN(lostTimeData.due) ;
                                // const rejectionIsvalid = !isNaN(lostTimeData.rejection) ;
                                const manpowerIsvalid = true;//!isNaN(lostTimeData.manpower) && lostTimeData.manpower > 0;
                                const target10Isvalid=true;
                                const hourIsvalid = true;
                                const daysRunIsvalid=true;
                                const withoutsvalid = true ;
                                const dueIsvalid = true ;
                                const rejectionIsvalid = true ;
                                const productionIsvalid = true;
                                const remarksIsValid= lostTimeData.without>0?lostTimeData.remarks.trim().length>0:true;
                               



                                if ( !lineNumberIsValid || !buyerNameIsValid || !SOIsValid || !styleNameIsValid || !itemNameIsValid|| !dateIsValid || !SMVIsvalid ||!manpowerIsvalid ||!target10Isvalid || !hourIsvalid || !productionIsvalid ||!withoutsvalid || !dueIsvalid || !rejectionIsvalid||!remarksIsValid){
                                // Alert.alert('invalid Input','Please, check your input values');
                                    setInputs((curInputs)=>{

                                        return{
                                            lineNumber:{ value:curInputs.lineNumber.value, isValid:lineNumberIsValid},
                                            date:{ value:curInputs.date.value, isValid:dateIsValid},
                                            buyerName:{ value:curInputs.buyerName.value, isValid:buyerNameIsValid},
                                            SO:{ value:curInputs.SO.value, isValid:SOIsValid},
                                            styleName:{ value:curInputs.styleName.value.trim().replace(/[^\w\s]+$/, '').replace(/\s+/g, " ").trim(), isValid:styleNameIsValid},
                                            itemName:{ value:curInputs.itemName.value, isValid:itemNameIsValid},
                                            daysRun:{ value:curInputs.daysRun.value, isValid:daysRunIsvalid},
                                            SMV:{ value:curInputs.SMV.value, isValid:SMVIsvalid},
                                            manpower:{ value:curInputs.manpower.value, isValid:manpowerIsvalid},
                                            target10:{value:curInputs.target10.value, isValid:target10Isvalid},
                                            hour:{ value:(+curInputs.hour.value).toFixed(6), isValid:hourIsvalid},
                                            production:{ value:curInputs.production.value, isValid:productionIsvalid},
                                            without:{ value:curInputs.without.value, isValid:withoutsvalid},
                                            due:{ value:curInputs.due.value, isValid:dueIsvalid},
                                            rejection:{ value:curInputs.rejection.value, isValid:rejectionIsvalid},
                                            Button:{value:true, isValid:submitButtonisValid},
                                            remarks:{value:curInputs.remarks.value, isValid:remarksIsValid}
                                        }   
                                    })

                                    return;
                                }

                                onSubmit(lostTimeData); // to pass the data at managelostTime confirm handler
    }

    
    const [date, setDate] = useState(new Date());
    const[hourss,sethourss]=useState('1+10/24')
    const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    const dt = new Date(currentDate);

    const x= dt.toISOString().split('T');
    const x1= x[0].split('-');
    setDate(currentDate);
    inputChangeHandler("date", x1[0]+'-'+x1[1]+'-'+x1[2])
    
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

  


    const formIsValid = !inputs.lineNumber.isValid|| !inputs.date.isValid || !inputs.buyerName.isValid|| !inputs.styleName.isValid ||!inputs.itemName.isValid ||!inputs.SO.isValid|| !inputs.SMV.isValid || !inputs.hour.isValid|| !inputs.manpower.isValid || !inputs.production.isValid|| !inputs.due.isValid || !inputs.without.isValid|| !inputs.rejection.isValid || !inputs.remarks.isValid ;
    const today= new Date();  
    
    const Difference_In_Time=today.valueOf()-new Date(inputs.date.value).valueOf();
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    const submitButtonisValid= Difference_In_Days+6/24 <eval(hourss) || Number(inputs.date.value)===0; 
    
    useEffect(() => {
        testp(submitButtonisValid)
        async function fetchData(){ 
            const hours= await fetchHours()
            sethourss(hours);
            console.log(items.length<2)
            const buyername= await fetchBuyer();
            let data2= (eval(buyername[0].name3))
            setItems(Object.entries(data2).map(([label, value]) => ({ label, value })))
            let data= eval(buyername[0].name2)
            setitemItems(Object.entries(data).map(([label, value]) => ({ label, value })))   //itemName
            setIsfetching(true)
        }
        fetchData()
    }, [inputs.date.value,value]); 
     
    return (
       
        <View style={styles.form}>
            <Text style={styles.title}>Your line-wise style lostTime Data</Text>
            
            <View >
                <View style={styles.inputsRow}>
                    <View style={{flex:1,marginVertical:8}}>                
                        <Text style={{fontSize:12,color:GlobalStyles.colors.textcolor,marginBottom: 4}}> Line:</Text>
                        <DropDownPicker
                            listMode="MODAL"
                            open={lopen}
                            value={lvalue?lvalue:inputs.lineNumber.value}
                            items={litems}
                            setOpen={setlOpen}
                            setValue={setlValue}
                            setItems={setlItems}
                            style={{borderRadius:20,backgroundColor:'white',borderColor:'white',borderWidth:.2}}
                            containerStyle={{elevation:5,backgroundColor:GlobalStyles.colors.backgroundColor,borderRadius:20}}
                            onChangeValue={inputChangeHandler.bind(this,'lineNumber')}
                            placeholder="Select Line"
                            searchable={true} 
                            placeholderStyle={{
                                color: "red",
                                fontWeight: "bold"
                              }}
                            searchTextInputProps={{
                                keyboardType:'phone-pad'
                              }}                        
                        />
                    </View>
                    <TouchableOpacity style={styles.rowInput} onPress={showDatepicker} >    
                        <Input 
                            style={styles.rowInput}
                            invalid={!inputs.date.isValid}
                            label='Date:' textInputConfig={{
                                
                                maxLentgh: 10,
                                onChangeText: inputChangeHandler.bind(this,'date'),
                                value: inputs.date.value,
                    }} /> 
                    </TouchableOpacity>  
                </View>
                <View style={{flexDirection:'row'}}> 
                    <View style={{flex:1,marginVertical:8}}>                
                        <Text style={{fontSize:12,color:GlobalStyles.colors.textcolor,marginBottom: 4}}> Buyer:</Text>
                        <DropDownPicker
                            listMode="MODAL"
                            open={open}
                            value={value?value:inputs.buyerName.value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            style={{borderRadius:20,backgroundColor:GlobalStyles.colors.backgroundColor,borderColor:'white',borderWidth:.2}}
                            containerStyle={{elevation:5,backgroundColor:GlobalStyles.colors.backgroundColor,borderRadius:20}}
                            onChangeValue={inputChangeHandler.bind(this,'buyerName')}
                            placeholder="Select Buyer"
                            searchable={true}
                            placeholderStyle={{
                                color: "red",
                                fontWeight: "bold"
                              }}  
                            loading={isfetching}                        
                        />
                    </View>   
                    <View style={{flex:1}}>
                        <Input 
                        style={styles.rowInput}
                        invalid={!inputs.styleName.isValid}
                        label='Style Name:' textInputConfig={{
                            
                            maxLentgh: 10,
                            onChangeText: inputChangeHandler.bind(this,'styleName'),
                            value: inputs.styleName.value,
                        }} />
                         
                    </View>
                </View>
                <View style={styles.inputsRow}>
                    <View style={{flex:1,marginVertical:8}}>                
                        <Text style={{fontSize:12,color:GlobalStyles.colors.textcolor,marginBottom: 4}}> Days Run:</Text>
                        <DropDownPicker
                            listMode="MODAL"
                            open={dopen}
                            value={dvalue?dvalue:inputs.daysRun.value}
                            items={ditems}
                            setOpen={setdOpen}
                            setValue={setdValue}
                            setItems={setdItems}
                            style={{borderRadius:20,backgroundColor:GlobalStyles.colors.backgroundColor,borderColor:'white',borderWidth:.2}}
                            containerStyle={{elevation:5,backgroundColor:GlobalStyles.colors.backgroundColor,borderRadius:20}}
                            onChangeValue={inputChangeHandler.bind(this,"daysRun")}
                            placeholder="Select Day"
                            searchable={true} 
                            placeholderStyle={{
                                color: "red",
                                fontWeight: "bold"
                              }}
                            searchTextInputProps={{
                                keyboardType:'phone-pad'
                              }}                   
                        />
                    </View>
                    <View style={{flex:1,marginVertical:8, marginLeft:'1%'}}>                
                        <Text style={{fontSize:12,color:GlobalStyles.colors.textcolor,marginBottom: 4}}> Item Name:</Text>
                        <DropDownPicker
                            listMode="MODAL"
                            open={itemopen}
                            value={itemvalue?itemvalue:inputs.itemName.value}
                            items={itemitems}
                            setOpen={setitemOpen}
                            setValue={setitemValue}
                            setItems={setitemItems}
                            style={{borderRadius:20,backgroundColor:GlobalStyles.colors.backgroundColor,borderColor:'white',borderWidth:.2}}
                            containerStyle={{elevation:5,backgroundColor:GlobalStyles.colors.backgroundColor,borderRadius:20}}
                            onChangeValue={inputChangeHandler.bind(this,"itemName")}
                            placeholder="Select Item"
                            searchable={true} 
                            placeholderStyle={{
                                color: "red",
                                fontWeight: "bold"
                              }}
                            // searchTextInputProps={{
                            //     keyboardType:'phone-pad'
                            //   }}                   
                        />
                    </View>
                    
                </View>
                <View  style={styles.inputsRow}>
                    <Input 
                        style={styles.rowInput}
                        invalid={!inputs.SO.isValid}
                        label='SO:' textInputConfig={{
                            keyboardType:'phone-pad',
                            onChangeText: inputChangeHandler.bind(this,'SO'),
                            value: inputs.SO.value
                        }} />
                    <Input 
                        style={styles.rowInput}
                        invalid={!inputs.SMV.isValid}
                        label='SMV:' textInputConfig={{
                            keyboardType:'phone-pad',
                            maxLentgh: 10,
                            onChangeText: inputChangeHandler.bind(this,'SMV'),
                            value: inputs.SMV.value,
                        }} />
                </View>
                <View style={styles.inputsRow}>
                    
                    <Input 
                    style={styles.rowInput}
                    invalid={!inputs.manpower.isValid}
                    label='Manpower:' textInputConfig={{
                        keyboardType:'phone-pad',
                        maxLentgh: 10,
                        onChangeText: inputChangeHandler.bind(this,'manpower'),
                        value: inputs.manpower.value,
                    }} />
                   <Input 
                    style={styles.rowInput}
                    invalid={!inputs.hour.isValid}
                    label={"Hour:  " + evalCalculation( inputs.hour.value)} textInputConfig={{
                        keyboardType:'phone-pad',
                        maxLentgh: 10,
                        onChangeText: inputChangeHandler.bind(this,'hour'),
                        value: inputs.hour.value,
                    }} />
                    
                </View>
                <View style={styles.inputsRow}>
                <Input 
                    style={styles.rowInput}
                    invalid={!inputs.target10.isValid}
                    label={'Target ( 10 hours ):' + inputs.hour.value*(inputs.target10.value)/10} textInputConfig={{
                        keyboardType:'phone-pad',
                        maxLentgh: 10,
                        onChangeText: inputChangeHandler.bind(this,'target10'),
                        value: inputs.target10.value,
                    }} />
                <Input 
                    style={styles.rowInput}
                    invalid={!inputs.production.isValid}
                    label={'Production: '} textInputConfig={{
                        keyboardType:'phone-pad',
                        maxLentgh: 10,
                        onChangeText: inputChangeHandler.bind(this,'production'),
                        value: inputs.production.value,
                    }} />
                </View>
                <View style={styles.inputsRow}>
                 <Input 
                    style={styles.rowInput}
                    invalid={!inputs.without.isValid}
                    label='Without:' textInputConfig={{
                        keyboardType:'phone-pad',
                        maxLentgh: 10,
                        onChangeText: inputChangeHandler.bind(this,'without'),
                        value: inputs.without.value,
                    }} />
                 <Input 
                    style={styles.rowInput}
                    invalid={!inputs.due.isValid}
                    label='Due:' textInputConfig={{
                        keyboardType:'phone-pad',
                        maxLentgh: 10,
                        onChangeText: inputChangeHandler.bind(this,'due'),
                        value: inputs.due.value,
                    }} />
                 <Input 
                    style={styles.rowInput}
                    invalid={!inputs.rejection.isValid}
                    label='Rejection:' textInputConfig={{
                        keyboardType:'phone-pad',
                        maxLentgh: 10,
                        onChangeText: inputChangeHandler.bind(this,'rejection'),
                        value: inputs.rejection.value,
                    }} />
                </View>
                <View>
                    <Input 
                        style={styles.rowInput}
                        invalid={!inputs.remarks.isValid}
                        label='Remarks:' textInputConfig={{
                            maxLentgh: 150,
                            onChangeText: inputChangeHandler.bind(this,'remarks'),
                            value: inputs.remarks.value,
                        }} /> 
                </View>
            </View>

               

        {formIsValid && <Text style={styles.errortext}>Invalid inputs data, check that out</Text>}
        
        <View style={styles.buttons}>
            <Button mode='flat' onPress={onCancel} style={styles.button}> Cancel </Button>
           { submitButtonisValid && <Button onPress={submitHandler} style={styles.button}>{onButton}</Button>}
        </View>

    </View>
    
    )
    
}

const styles = StyleSheet.create({
    form:{
        marginTop:'1%',
        marginBottom:2,
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        color:GlobalStyles.colors.textcolor,
        marginBottom:25,
        textAlign:'center',
    },
    inputsRow:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    rowInput:{
        flex:1,
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5%',
    },
    button:{
        minWidth:130,
        marginHorizontal:10,
    },
    errortext:{
        textAlign:'center',
        color: GlobalStyles.colors.error500,
        margin:8,
    }
});