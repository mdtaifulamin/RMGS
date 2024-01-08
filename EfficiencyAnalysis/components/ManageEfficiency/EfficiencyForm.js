import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import Input from "./Input";
import Button, { ButtonColor } from "../../util/Button";
import { getdateMinusdays, getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../../constants/styles";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { fetchBuyer, fetchHours } from "../../util/forDataSendingGetting";
import { async } from "@firebase/util";
import DropDownPicker from 'react-native-dropdown-picker';
import Loadingspinner from "../UI/loading";
import { evalCalculation } from "../../util/ordinalTonumberToordinal";
import OTContext from "../../../components/Store/OTcontext";
import UserContext from "../../../components/Store/UserContext";
import { convertRangeStringToArrayOfArrays } from "../../../components/convertStringToarray";
//import STYLE from "../../../lib/STYLE.json"
import ButtonM from "../../util/Button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal } from "react-native";
import TrackingStatus from "../../../components/TrackingStatus";
import SwipeUnlock from "../../../components/Slider";
import RibbonButton from "../../../components/RibbonButton";

export default function EfficiencyForm({ onSubmit, onCancel, onButton, defaultValues, testp }) {
  const [modalisVisible,setModalisVisible]=useState(false)
  const [downloadState,setdownloadstate]=useState(1)
  const [STYLE, setSTYLE] = useState('')
  const { userInfo, updateUser } = useContext(UserContext);
  const { otInfo, setOTInfo } = useContext(OTContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [buyerItems, setBuyerItems] = useState(Object.keys(STYLE).map((e) => ({ label: e, value: e })));
 // console.log(buyerItems)
  const [lopen, setlOpen] = useState(false);
  const [lvalue, setlValue] = useState(null);
  const [litems, setlItems] = useState(convertRangeStringToArrayOfArrays(userInfo.block).flatMap((range) =>
  range.map((value) => ({
    label: `${value}`,
    value: `${value}`,
  }))
)
);
  const [openSalesDocument, setOpenSalesDocument] = useState(false);
  const [salesDocument, setSalesDocument] = useState(null);
  const [salesDocumentItems, setSalesDocumentItems] = useState([]);
  const [openStyleDocument, setOpenStyleDocument] = useState(false);
  const [styleDocument, setStyleDocument] = useState(null);
  const [styleDocumentItems, setStyleDocumentItems] = useState([]);  
  const [dopen, setdOpen] = useState(false);
  const [dvalue, setdValue] = useState(null);
  const [ditems, setdItems] = useState(Array.from({ length: 215 }, (_, i) => {
    const label = i === 0 ? 'due' : (i === 1 ? '0' : (i === 2 ? '1st' : (i === 3 ? '2nd' : (i === 4 ? '3rd' : `${i - 1}th`))));
    return { label, value: label };
  }));
  const [itemopen, setitemOpen] = useState(false);
  const [itemvalue, setitemValue] = useState(null);
  const [itemitems, setitemItems] = useState([{ label: "Loading, please wait", value: "loading" }]);
  const [isfetching, setIsfetching] = useState(false);
  const manpowerValue = defaultValues?.lineNumber
    ? otInfo.find(item => item.lineNumber === defaultValues.lineNumber)?.manpower?.toString()
    : '';
  const databaseManpower = defaultValues ? defaultValues.manpower : '0';
  const [inputs, setInputs] = useState({
    lineNumber: { value: defaultValues?.lineNumber?.toString() || '', isValid: true },
    date: { value: defaultValues?.date ? getFormattedDate(defaultValues.date) : '', isValid: true },
    buyerName: { value: defaultValues?.buyerName || '', isValid: true },
    SO: { value: defaultValues?.SO?.toString() || '3000', isValid: true },
    styleName: { value: defaultValues?.styleName?.toString() || '', isValid: true },
    itemName: { value: defaultValues?.itemName?.toString() || '', isValid: true },
    daysRun: { value: defaultValues?.daysRun?.toString() || '', isValid: true },
    SMV: { value: defaultValues?.SMV?.toString() || '', isValid: true },
    manpower: { value: manpowerValue, isValid: true },
    target10: { value: defaultValues?.target10?.toString() || '', isValid: true },
    hour: { value: defaultValues?.hour?.toString() || '', isValid: true },
    hourTNC: { value: defaultValues?.hourTNC?.toString() || '', isValid: true },
    hourMinusTNC: { value: defaultValues?.hourMinusTNC?.toString() || '', isValid: true },
    production: { value: defaultValues?.production?.toString() || '', isValid: true },
    without: { value: defaultValues?.without?.toString() || '', isValid: true },
    due: { value: defaultValues?.due?.toString() || '', isValid: true },
    rejection: { value: defaultValues?.rejection?.toString() || '', isValid: true },
    Button: { Value: true, isValid: true },
    remarks: { value: defaultValues?.remarks?.toString() || '', isValid: true },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true }
      };
    });
  }

  function checkevalerror(value) {
    let result = ''
    try {
      result = eval(value).toFixed(6);
    } catch (error) {
      result = 0;
    }
    return result;
  }

  function submitHandler() {
    const efficiencyData = {
      lineNumber: inputs.lineNumber.value,
      date: new Date(inputs.date.value),
      buyerName: inputs.buyerName.value,
      SO: inputs.SO.value,
      styleName: inputs.styleName.value.toUpperCase().trim().replace(/[^\w\s]+$/, '').replace(/\s+/g, " ").trim(),
      itemName: inputs.itemName.value,
      daysRun: inputs.daysRun.value,
      SMV: +inputs.SMV.value,
      manpower: +inputs.manpower.value,
      target10: +inputs.target10.value,
      hour: +(!isNaN(inputs.hour.value) ? (+inputs.hour.value).toFixed(6) : +checkevalerror(inputs.hour.value)),
      hourTNC:+(!isNaN(inputs.hourTNC.value) ? (+inputs.hourTNC.value).toFixed(6) : +checkevalerror(inputs.hourTNC.value)),
      hourMinusTNC:+(!isNaN(inputs.hourMinusTNC.value) ? (+inputs.hourMinusTNC.value).toFixed(6) : +checkevalerror(inputs.hourMinusTNC.value)),
      production: +(!isNaN(inputs.production.value) ? +inputs.production.value : +checkevalerror(inputs.production.value)),
      without: +(!isNaN(inputs.without.value) ? +inputs.without.value : +checkevalerror(inputs.without.value)),
      due: +(!isNaN(inputs.due.value) ? +inputs.due.value : +checkevalerror(inputs.due.value)),
      rejection: +(!isNaN(inputs.rejection.value) ? +inputs.rejection.value : +checkevalerror(inputs.rejection.value)),
      remarks: inputs.remarks.value,
    };

    const lineNumberIsValid = efficiencyData.lineNumber.trim().length > 0;
    const buyerNameIsValid = efficiencyData.buyerName.trim().length > 0;
    //console.log( efficiencyData.buyerName.trim().length)
    //const SOIsValid = efficiencyData.SO.trim().length > 7;
    const styleNameIsValid = efficiencyData.styleName.trim().length > 0;
    const dateIsValid = efficiencyData.date.toString() !== 'Invalid Date';
    const itemNameIsValid = efficiencyData.itemName.trim().length > 0;
    const SMVIsvalid = !isNaN(efficiencyData.SMV) && efficiencyData.SMV > 0;
    const manpowerIsvalid = true;
    const target10Isvalid = true;
    const hourIsvalid = true;
    const daysRunIsvalid = true;
    const withoutsvalid = true;
    const dueIsvalid = true;
    const rejectionIsvalid = true;
    const productionIsvalid = true;
    const remarksIsValid = efficiencyData.without > 0 ? efficiencyData.remarks.trim().length > 0 : true;

    if (!lineNumberIsValid || !buyerNameIsValid  || !styleNameIsValid || !itemNameIsValid || !dateIsValid || !SMVIsvalid || !manpowerIsvalid || !target10Isvalid || !hourIsvalid || !productionIsvalid || !withoutsvalid || !dueIsvalid || !rejectionIsvalid || !remarksIsValid) {
      setInputs((curInputs) => {
        return {
          lineNumber: { value: curInputs.lineNumber.value, isValid: lineNumberIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          buyerName: { value: curInputs.buyerName.value, isValid: buyerNameIsValid },
          SO: { value: curInputs.SO.value, isValid: true },
          styleName: { value: curInputs.styleName.value.trim().replace(/[^\w\s]+$/, '').replace(/\s+/g, " ").trim(), isValid: styleNameIsValid },
          itemName: { value: curInputs.itemName.value, isValid: itemNameIsValid },
          daysRun: { value: curInputs.daysRun.value, isValid: daysRunIsvalid },
          SMV: { value: curInputs.SMV.value, isValid: SMVIsvalid },
          manpower: { value: curInputs.manpower.value, isValid: manpowerIsvalid },
          target10: { value: curInputs.target10.value, isValid: target10Isvalid },
          hour: { value: (+curInputs.hour.value).toFixed(6), isValid: hourIsvalid },
          hourTNC:{value:(+curInputs.hourTNC.value).toFixed(6),isValid:true},
          hourMinusTNC:{value:(+curInputs.hourMinusTNC.value).toFixed(6),isValid:true},
          production: { value: curInputs.production.value, isValid: productionIsvalid },
          without: { value: curInputs.without.value, isValid: withoutsvalid },
          due: { value: curInputs.due.value, isValid: dueIsvalid },
          rejection: { value: curInputs.rejection.value, isValid: rejectionIsvalid },
          Button: { value: true, isValid: submitButtonisValid },
          remarks: { value: curInputs.remarks.value, isValid: remarksIsValid }
        }
      })

      return;
    }

    onSubmit(efficiencyData);
  }

  const [date, setDate] = useState(new Date());
  const [hourss, sethourss] = useState('1+10/24')
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    const dt = new Date(currentDate);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    setDate(currentDate);
    inputChangeHandler("date", x1[0] + '-' + x1[1] + '-' + x1[2])
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
//console.log(inputs.buyerName.isValid)
  const formIsValid =
  !inputs.lineNumber.isValid ||
  !inputs.date.isValid ||
  !inputs.buyerName.isValid ||
  !inputs.styleName.isValid ||
  !inputs.itemName.isValid ||
  !inputs.SO.isValid ||
  !inputs.SMV.isValid ||
  !inputs.hour.isValid ||
  !inputs.manpower.isValid ||
  !inputs.production.isValid ||
  !inputs.due.isValid ||
  !inputs.without.isValid ||
  !inputs.rejection.isValid ||
  !inputs.remarks.isValid;
  const today = new Date();
  const Difference_In_Time = today.valueOf() - new Date(inputs.date.value).valueOf();
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  const submitButtonisValid = Difference_In_Days + 6 / 24 < eval(hourss) || Number(inputs.date.value) === 0;

  const handleBuyerChange = (selectedBuyer) => {
    inputChangeHandler('buyerName',selectedBuyer); //send selected buyer name along with the key
    // Check if the selectedBuyer exists in STYLE before accessing its properties
    if (STYLE[selectedBuyer]) {
      const selectedBuyerData = STYLE[selectedBuyer];
      const salesDocumentOptions = Object.keys(selectedBuyerData).map((e) => ({ label: e, value: e }));
      setSalesDocumentItems(salesDocumentOptions);
      setSalesDocument(null); // Reset selected sales document
      //setStyleDocument(null)
      //setStyleDocument(null)
    } else {
      // Handle the case where the selectedBuyer doesn't exist in STYLE
     // console.error(`Buyer data not found for ${selectedBuyer}`);
    }
  };
  const handleSalesDocumentChange = (selectedSalesDocument) => {
    setSalesDocument(selectedSalesDocument);
    if(STYLE[inputs.buyerName.value][salesDocument]){
      const selectedSalesDocumentData=STYLE[inputs.buyerName.value][salesDocument];
      setStyleDocumentItems(selectedSalesDocumentData.map((e)=>({label:e,value:e})))
      setStyleDocument(null)
    }else{

    }
    // Fetch and update styles based on the selected sales document
    // setStyles([...]); // Update with the fetched styles
  };
  useEffect(()=>{
   
  },[downloadState])
  const downloadStyle = async () => {
    try {
      setModalisVisible(true);
      setdownloadstate(0);
      // Fetch buyer details
      const buyerDetails = await fetchBuyer(1);
      const data2 = buyerDetails[0].Style;
  
      // Save buyer details to AsyncStorage
      await AsyncStorage.setItem('STYLE', JSON.stringify(data2));
  
      // Update buyerItems with actual buyer data
      const actualBuyerItems = Object.keys(data2).map((e) => ({ label: e, value: e }));
      setBuyerItems(actualBuyerItems);
  
      // Set STYLE state with the downloaded data
      setSTYLE(data2);
  
      // Simulate a progress bar
      let progress = 0;
      const intervalId = setInterval(() => {
        progress += 1;
        setdownloadstate(progress);
  
        if (progress >= 8) {
          clearInterval(intervalId);
          setModalisVisible(false);
        }
      }, 1000);
    } catch (error) {
      console.error('Error downloading style: ', error);
    }
  };

 
  useEffect(() => {
    // Load data from AsyncStorage on component mount
    setIsfetching(true);
    const loadStyleFromStorage = async () => {
      try {
        const storedSTYLE = await AsyncStorage.getItem('STYLE');
  
        if (storedSTYLE == null || storedSTYLE == "null" || storedSTYLE === '[]' || storedSTYLE == []|| storedSTYLE == '') {
          console.log(storedSTYLE == null || storedSTYLE == "null" || storedSTYLE === '[]' )
          // Start downloading if no data in AsyncStorage
          downloadStyle();
        } else if (storedSTYLE !== null || storedSTYLE !== "null" || storedSTYLE !== '[]' || storedSTYLE !== '') {
          //console.log("entered" + storedSTYLE)
          const parsedSTYLE = JSON.parse(storedSTYLE);
          setSTYLE(parsedSTYLE);
          setBuyerItems(Object.keys(parsedSTYLE).map((e) => ({ label: e, value: e })));
        }
      } catch (error) {
        console.error('Error loading style from storage: ', error);
      } finally {
        setIsfetching(false);
      }
    };
  
    loadStyleFromStorage();
  }, []);
  
useEffect(() => {
  if (STYLE && STYLE[inputs.buyerName.value]) {
    setSalesDocumentItems(
      Object.keys(STYLE[inputs.buyerName.value]).map((e) => ({
        label: e,
        value: e,
      }))
    );
  } else {
    // Handle the case when STYLE or STYLE[inputs.buyerName.value] is not defined
  }

  if (
    STYLE &&
    STYLE[inputs.buyerName.value] &&
    STYLE[inputs.buyerName.value][inputs.SO.value]
  ) {
    const selectedSalesDocumentData =
      STYLE[inputs.buyerName.value][inputs.SO.value];
    setStyleDocumentItems(
      selectedSalesDocumentData.map((e) => ({ label: e, value: e }))
    );
  } else {
    // Handle the case when STYLE, STYLE[inputs.buyerName.value], or STYLE[inputs.buyerName.value][inputs.SO.value] is not defined
  }

  // Fetch and update styles based on the selected sales document
  // setStyles([...]); // Update with the fetched styles

}, [STYLE, inputs.buyerName.value, inputs.SO.value]);

  
  useEffect(() => {
    testp(submitButtonisValid);
  
    async function fetchData() {
      try {
        const hours = await fetchHours();
        sethourss(hours);
        //console.log(hours)
        if (inputs.lineNumber.value) {
          const lineNumber = +inputs.lineNumber.value;
          const otInfoItem = otInfo.find(item => item.lineNumber === lineNumber && getFormattedDate(item.date) === inputs.date.value);

          if (otInfoItem) {
            const {
              Main_TNC,
              TNC_2,
              TNC_4,
              TNC_6,
              fourHourOT,
              lineNumber,
              manpower,
              remarks,
              sixHourOT,
              twoHourOT
          } = otInfoItem;
          
            
            setInputs(prevInputs => ({
              ...prevInputs,
              manpower: {
                value: manpower.toString(),
                isValid: true
              },
              hourTNC:{
                value:manpower?(8+(Number(twoHourOT)/Number(manpower)*2)+(Number(fourHourOT)/Number(manpower)*1.75)+(Number(sixHourOT)/Number(manpower)*2)).toString():"0",
                isValid:true
              },
              hourMinusTNC:{
                value:manpower?(8+(Number(twoHourOT-TNC_2)/Number(manpower-Main_TNC)*2)+(Number(fourHourOT-TNC_4)/Number(manpower-Main_TNC)*1.75)+(Number(sixHourOT-TNC_6)/Number(manpower-Main_TNC)*2)).toString():"0",
                isValid:true
              },
  
            }));
           // console.log(otInfo)
            // Now you have the values of manpower and TNC_Main from otInfoItem
          } else {
            // Handle the case where no matching item was found in otInfo
            
          }
          
          
        }
         
        const buyername = await fetchBuyer(0);
        let data2 = eval(buyername[0].name3);
        //setItems(Object.entries(data2).map(([label, value]) => ({ label, value })));

        let data = eval(buyername[0].name2);
        setitemItems(Object.entries(data).map(([label, value]) => ({ label, value })));
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    
    fetchData();
    
  }, [inputs.date.value, value, inputs.lineNumber.value]);

  if(isfetching){
    return <Loadingspinner/>       
 }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your line-wise style efficiency Data</Text>
      {/*  */}
      <RibbonButton onPress={downloadStyle} children={'Download Style Information'} />
      {/* <SwipeUnlock
          onUnlock={() => {
            downloadStyle()
          }}
          swipText="Swipe To download Style"
      /> */}
      <Modal visible={modalisVisible} >
        <View style={styles.modalContent}>
          <View style={{justifyContent:'center',alignItems:'center',borderWidth:0}}>
            <View style={{paddingVertical:'40%',justifyContent:'center',alignItems:'center',borderWidth:0,marginVertical:'40%'}}>
              <Text style={{fontWeight:'bold', fontSize:20,margin:'5%'}}>{(downloadState/7*100).toFixed(0) + '%'}</Text>
              <TrackingStatus currentIndex={downloadState} statuses={ ['Sent Request ', 'Downloading ', '43%',' 57% ','71%','86%', 'Completed ',]} activeColor={'green'}/>
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <View style={styles.inputsRow}>
          <View style={{ flex: 1, marginVertical: 8, }}>
            <Text style={{ fontSize: 12, color: GlobalStyles.colors.textcolor, marginBottom: 4 }}> Line:</Text>
            <DropDownPicker
              listMode="MODAL"
              open={lopen}
              value={lvalue ? lvalue : inputs.lineNumber.value}
              items={litems}
              setOpen={setlOpen}
              setValue={setlValue}
              setItems={setlItems}
              style={{ borderRadius: 10, backgroundColor: GlobalStyles.colors.textInputBackground, borderColor: 'white', borderWidth: .2 }}
              containerStyle={{ elevation: 5, backgroundColor: GlobalStyles.colors.textInputBackground, borderRadius: 10 }}
              onChangeValue={inputChangeHandler.bind(this, 'lineNumber')}
              placeholder="Select Line"
              searchable={true}
              placeholderStyle={{
                color: "red",
                fontWeight: "bold"
              }}
              searchTextInputProps={{
                keyboardType: 'phone-pad'
              }}
            />
          </View>
          <TouchableOpacity style={styles.rowInput} onPress={showDatepicker} >
            <Input
              style={styles.rowInput}
              invalid={!inputs.date.isValid}
              label='Date:' textInputConfig={{
                maxLentgh: 10,
                onChangeText: inputChangeHandler.bind(this, 'date'),
                value: inputs.date.value,
              }} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, marginVertical: 8 }}>
            <Text style={{ fontSize: 12, color: GlobalStyles.colors.textcolor, marginBottom: 4 }}> Buyer:</Text>
            <DropDownPicker
              listMode="MODAL"
              open={open}
              value={value ? value : inputs.buyerName.value}
              items={buyerItems}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setBuyerItems}
              style={{ borderRadius: 10, backgroundColor: GlobalStyles.colors.textInputBackground, borderColor: 'white', borderWidth: 0.2 }}
              containerStyle={{ elevation: 5, backgroundColor: GlobalStyles.colors.textInputBackground, borderRadius: 10 }}
              onChangeValue={handleBuyerChange}
              placeholder="Select Buyer"
              searchable={true}
              placeholderStyle={{
                color: 'red',
                fontWeight: 'bold',
              }}
            />
          </View>
          
          <View style={{ flex: 1, marginVertical: 8,marginHorizontal: '2%' }}>
            <Text style={{ fontSize: 12, color: GlobalStyles.colors.textcolor, marginBottom: 4 }}> SO:</Text>
            <DropDownPicker
              listMode="MODAL"
              open={openSalesDocument}
              value={salesDocument?salesDocument:inputs.SO.value}
              items={salesDocumentItems}
              setOpen={setOpenSalesDocument}
              setValue={setSalesDocument}
              setItems={setSalesDocumentItems}
              style={{ borderRadius: 10, backgroundColor: GlobalStyles.colors.textInputBackground, borderColor:'white', borderWidth: 0.2 }}
              containerStyle={{ elevation: 5, backgroundColor: GlobalStyles.colors.textInputBackground, borderRadius: 10 }}
              onChangeValue={(e)=>{inputChangeHandler('SO',e);handleSalesDocumentChange(e);}}
              placeholder="Select Sales Document"
              searchable={true}
              placeholderStyle={{
                color: 'red',
                fontWeight: 'bold',
              }}
            />
          </View>
        </View>
        <View style={styles.inputsRow}>
          <View style={{ flex: 1, marginVertical: 8, marginHorizontal: '1%' }}>
            <Text style={{ fontSize: 12, color: GlobalStyles.colors.textcolor, marginBottom: 4 }}> Days Run:</Text>
            <DropDownPicker
              listMode="MODAL"
              open={dopen}
              value={dvalue ? dvalue : inputs.daysRun.value}
              items={ditems}
              setOpen={setdOpen}
              setValue={setdValue}
              setItems={setdItems}
              style={{ borderRadius: 10, backgroundColor: GlobalStyles.colors.textInputBackground, borderColor: 'white', borderWidth: .2 }}
              containerStyle={{ elevation: 5, backgroundColor: GlobalStyles.colors.textInputBackground, borderRadius: 10 }}
              onChangeValue={inputChangeHandler.bind(this, "daysRun")}
              placeholder="Select Day"
              searchable={true}
              placeholderStyle={{
                color: "red",
                fontWeight: "bold"
              }}
              searchTextInputProps={{
                keyboardType: 'phone-pad'
              }}
            />
          </View>
          <View style={{ flex: 1, marginVertical: 8, marginHorizontal: '1%' }}>
            <Text style={{ fontSize: 12, color: GlobalStyles.colors.textcolor, marginBottom: 4 }}> Item Name:</Text>
            <DropDownPicker
              listMode="MODAL"
              open={itemopen}
              value={itemvalue ? itemvalue : inputs.itemName.value}
              items={itemitems}
              setOpen={setitemOpen}
              setValue={setitemValue}
              setItems={setitemItems}
              style={{ borderRadius: 10, backgroundColor: GlobalStyles.colors.textInputBackground, borderColor: 'white', borderWidth: .2 }}
              containerStyle={{ elevation: 5, backgroundColor: GlobalStyles.colors.textInputBackground, borderRadius: 10 }}
              onChangeValue={inputChangeHandler.bind(this, "itemName")}
              placeholder="Select Item"
              searchable={true}
              placeholderStyle={{
                color: "red",
                fontWeight: "bold"
              }}
            />
          </View>

        </View>
        <View style={styles.inputsRow}>
          <View style={{ flex: 1, marginVertical: 8, marginHorizontal: '1%' }}>
            <Text style={{ fontSize: 12, color: GlobalStyles.colors.textcolor, marginBottom: 4 }}> Style Name:</Text>
              <DropDownPicker
                  listMode="MODAL"
                  open={openStyleDocument}
                  value={styleDocument?styleDocument:inputs.styleName.value}
                  items={styleDocumentItems}
                  setOpen={setOpenStyleDocument}
                  setValue={setStyleDocument}
                  setItems={setStyleDocumentItems}
                  style={{ borderRadius: 10, backgroundColor: GlobalStyles.colors.textInputBackground, borderColor: 'white', borderWidth: 0.2 }}
                  containerStyle={{ elevation: 5, backgroundColor: GlobalStyles.colors.textInputBackground, borderRadius: 10 }}
                  onChangeValue={(e)=>{inputChangeHandler('styleName',e);setStyleDocument(e);console.log(styleDocument)}}
                  placeholder="Select Style Document"
                  searchable={true}
                  placeholderStyle={{
                    color: 'red',
                    fontWeight: 'bold',
                  }}
                />
          </View>
          <Input
            style={styles.rowInput}
            invalid={!inputs.SMV.isValid}
            label='SMV:' textInputConfig={{
              keyboardType: 'phone-pad',
              maxLentgh: 10,
              onChangeText: inputChangeHandler.bind(this, 'SMV'),
              value: inputs.SMV.value,
            }} />
        </View>
        <View style={styles.inputsRow}>

          <Input
            style={styles.rowInput}
            invalid={!inputs.manpower.isValid}
            label={'Manpower: (Database Manpower:' + databaseManpower + ")"} textInputConfig={{
              keyboardType: 'phone-pad',
              maxLentgh: 10,
              //editable: false,
              onChangeText: inputChangeHandler.bind(this, 'manpower'),
              value: inputs.manpower.value,
            }} />
          <Input
            style={styles.rowInput}
            invalid={!inputs.hour.isValid}
            label={"Style Hour:  "+ (evalCalculation(inputs.hour.value)*(+inputs.hourTNC.value)/10).toFixed(2)+'   Total Hour: '+(+inputs.hourTNC.value).toFixed(2) } textInputConfig={{
              keyboardType: 'phone-pad',
              maxLentgh: 10,
              onChangeText: inputChangeHandler.bind(this, 'hour'),
              value: inputs.hour.value,
            }} />

        </View>
        <View style={styles.inputsRow}>
          <Input
            style={styles.rowInput}
            invalid={!inputs.target10.isValid}
            label={'Target ( 10 hours ):' + inputs.hour.value * (inputs.target10.value) / 10} textInputConfig={{
              keyboardType: 'phone-pad',
              maxLentgh: 10,
              onChangeText: inputChangeHandler.bind(this, 'target10'),
              value: inputs.target10.value,
            }} />
          <Input
            style={styles.rowInput}
            invalid={!inputs.production.isValid}
            label={'Production: '} textInputConfig={{
              keyboardType: 'phone-pad',
              maxLentgh: 10,
              onChangeText: inputChangeHandler.bind(this, 'production'),
              value: inputs.production.value,
            }} />
        </View>
        <View style={styles.inputsRow}>
          <Input
            style={styles.rowInput}
            invalid={!inputs.without.isValid}
            label='Without:' textInputConfig={{
              keyboardType: 'phone-pad',
              maxLentgh: 10,
              onChangeText: inputChangeHandler.bind(this, 'without'),
              value: inputs.without.value,
            }} />
          <Input
            style={styles.rowInput}
            invalid={!inputs.due.isValid}
            label='Due:' textInputConfig={{
              keyboardType: 'phone-pad',
              maxLentgh: 10,
              onChangeText: inputChangeHandler.bind(this, 'due'),
              value: inputs.due.value,
            }} />
          <Input
            style={styles.rowInput}
            invalid={!inputs.rejection.isValid}
            label='Rejection:' textInputConfig={{
              keyboardType: 'phone-pad',
              maxLentgh: 10,
              onChangeText: inputChangeHandler.bind(this, 'rejection'),
              value: inputs.rejection.value,
            }} />
        </View>
        <View>
          <Input
            style={styles.rowInput}
            invalid={!inputs.remarks.isValid}
            label='Remarks:' textInputConfig={{
              maxLentgh: 150,
              onChangeText: inputChangeHandler.bind(this, 'remarks'),
              value: inputs.remarks.value,
            }} />
        </View>
      </View>

      {formIsValid && <Text style={styles.errortext}>Invalid inputs data, check that out</Text>}

      <View style={styles.buttons}>
        <Button mode='flat' onPress={onCancel} style={styles.button}> Cancel </Button>
        {submitButtonisValid && <Button onPress={submitHandler} style={styles.button}>{onButton}</Button>}
      </View>

    </View>

  )

}

const styles = StyleSheet.create({
  form: {
    marginTop: '1%',
    marginBottom: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: GlobalStyles.colors.textcolor,
    marginBottom: 25,
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowInput: {
    flex: 1,
    marginHorizontal:"1%"
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  button: {
    minWidth:130,
    marginHorizontal:10,
  },
  errortext: {
    color: 'red',
    textAlign: 'center',
    marginTop: 5,
  },
});


// import {  StyleSheet, Text, View ,TouchableOpacity,TextInput} from "react-native";
// import Input from "./Input";
// import Button from "../../util/Button";
// import { getdateMinusdays, getFormattedDate } from "../../util/date";
// import { GlobalStyles } from "../../../constants/styles";
// import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
// import { fetchBuyer, fetchHours } from "../../util/forDataSendingGetting";
// import { async } from "@firebase/util";
// import DropDownPicker from 'react-native-dropdown-picker';
// import Loadingspinner from "../UI/loading";
// import { evalCalculation } from "../../util/ordinalTonumberToordinal";
// import OTContext from "../../../components/Store/OTcontext";

// export default function EfficiencyForm({onSubmit,onCancel,onButton, defaultValues,testp}) {
//     const {otInfo, setOTInfo}=useContext(OTContext)
//     const [open, setOpen] = useState(false);
//     const [value, setValue] = useState( null); //updated 31/3/2023
//     const [items, setItems] = useState(
//         [{label: "Loading, please wait", value: "loading"}] //blockWiseLine.map((e) => ({label: `Line ${e[0]} - ${e[e.length - 1]}`,value:e}))
//     );
//     const [lopen, setlOpen] = useState(false);
//     const [lvalue, setlValue] = useState( null); //updated 31/3/2023
//     const [litems, setlItems] = useState(
//         Array.from({ length: 150 }, (_, i) => ({ label: `${i + 1}`, value: `${i + 1}` }))
//     );

//     const [dopen, setdOpen] = useState(false);
//     const [dvalue, setdValue] = useState( null); //updated 31/3/2023
//     const [ditems, setdItems] = useState(
//         Array.from({ length: 215 }, (_, i) => {
//             const label = i === 0 ? 'due' : (i === 1 ? '0' : (i === 2 ? '1st' : (i === 3 ? '2nd' : (i === 4 ? '3rd' : `${i-1}th`))));
//             return { label, value: label };
//           })          
//     );
//     const [itemopen, setitemOpen] = useState(false);
//     const [itemvalue, setitemValue] = useState( null); //updated 31/3/2023
//     const [itemitems, setitemItems] = useState(
//         [{label: "Loading, please wait", value: "loading"}]
//     );

//     const [ isfetching,setIsfetching]= useState(false);
//     const manpowerValue = defaultValues?.lineNumber
//         ? otInfo.find(item => item.lineNumber === defaultValues.lineNumber )?.manpower?.toString()
//         : '';
//     const databaseManpower=defaultValues?defaultValues.manpower:'0'
//     const [inputs, setInputs] = useState({
//         lineNumber: { value: defaultValues?.lineNumber?.toString() || '', isValid: true },
//         date: { value: defaultValues?.date ? getFormattedDate(defaultValues.date) : '', isValid: true },
//         buyerName: { value: defaultValues?.buyerName || '', isValid: true },
//         SO: { value: defaultValues?.SO?.toString() || '3000', isValid: true },
//         styleName: { value: defaultValues?.styleName?.toString() || '', isValid: true },
//         itemName: { value: defaultValues?.itemName?.toString() || '', isValid: true },
//         daysRun: { value: defaultValues?.daysRun?.toString() || '', isValid: true },
//         SMV: { value: defaultValues?.SMV?.toString() || '', isValid: true },
//         manpower: { value: manpowerValue, isValid: true },
//         target10: { value: defaultValues?.target10?.toString() || '', isValid: true },
//         hour: { value: defaultValues?.hour?.toString() || '', isValid: true },
//         hourTNC: { value: defaultValues?.hourTNC?.toString() || '', isValid: true },
//         hourMinusTNC: { value: defaultValues?.hourMinusTNC?.toString() || '', isValid: true },
//         production: { value: defaultValues?.production?.toString() || '', isValid: true },
//         without: { value: defaultValues?.without?.toString() || '', isValid: true },
//         due: { value: defaultValues?.due?.toString() || '', isValid: true },
//         rejection: { value: defaultValues?.rejection?.toString() || '', isValid: true },
//         Button: { Value: true, isValid: true },
//         remarks: { value: defaultValues?.remarks?.toString() || '', isValid: true },
//       });
      
    
//     function inputChangeHandler(inputIdentifier,enteredValue) {
//         // console.log("Entered val: "+enteredValue);

//         setInputs((curInputs)=>{
//                                 return{
//                                         ...curInputs,
//                                         [inputIdentifier]: {value: enteredValue, isValid: true}
//                                     };
//         });
//     }

//     function checkevalerror(value){
//         let result=''
//         try {
//            result= eval(value).toFixed(6) ;
//         } catch (error) {
//             result=0;
//         }
//         return result;
//     }



//     function submitHandler(){
//                             //console.log(!isNaN(inputs.hour.value));
//                             const efficiencyData={
//                                                     lineNumber: inputs.lineNumber.value,//toString(checkevalerror( inputs.lineNumber.value)) ,
//                                                     date: new Date(inputs.date.value),
//                                                     buyerName: inputs.buyerName.value,
//                                                     SO:        inputs.SO.value,
//                                                     styleName: inputs.styleName.value.toUpperCase().trim().replace(/[^\w\s]+$/, '').replace(/\s+/g, " ").trim(),
//                                                     itemName:inputs.itemName.value,
//                                                     daysRun:   inputs.daysRun.value,
//                                                     SMV:       +inputs.SMV.value,
//                                                     manpower:    +inputs.manpower.value, // eval is removed for removing NaN
//                                                     target10: +inputs.target10.value,
//                                                     hour:       +(+!isNaN(inputs.hour.value)?(+inputs.hour.value).toFixed(6):+checkevalerror(inputs.hour.value)),
//                                                     production: +(!isNaN(inputs.production.value)?+inputs.production.value:+checkevalerror(inputs.production.value)),
//                                                     without:     +(!isNaN(inputs.without.value)?+inputs.without.value:+checkevalerror(inputs.without.value)),
//                                                     due:         +(!isNaN(inputs.due.value)?+inputs.due.value:+checkevalerror(inputs.due.value)),
//                                                     rejection:   +(!isNaN(inputs.rejection.value)?+inputs.rejection.value:+checkevalerror(inputs.rejection.value)),
//                                                     remarks:inputs.remarks.value,
//                                                  };

             
//                                 const lineNumberIsValid = efficiencyData.lineNumber.trim().length > 0;  //!isNaN(efficiencyData.lineNumber.trim()) && efficiencyData.lineNumber.trim().length > 0;
//                                 const buyerNameIsValid = efficiencyData.buyerName.trim().length > 0;
//                                 const SOIsValid = efficiencyData.SO.trim().length > 7;
//                                 const styleNameIsValid = efficiencyData.styleName.trim().length > 0;
//                                 const dateIsValid = efficiencyData.date.toString() !== 'Invalid Date';
//                                 const itemNameIsValid= efficiencyData.itemName.trim().length>0;
//                                 const SMVIsvalid = !isNaN(efficiencyData.SMV) && efficiencyData.SMV > 0;
//                                 const manpowerIsvalid = true;//!isNaN(efficiencyData.manpower) && efficiencyData.manpower > 0;
//                                 const target10Isvalid=true;
//                                 const hourIsvalid = true;
//                                 const daysRunIsvalid=true;
//                                 const withoutsvalid = true ;
//                                 const dueIsvalid = true ;
//                                 const rejectionIsvalid = true ;
//                                 const productionIsvalid = true;
//                                 const remarksIsValid= efficiencyData.without>0?efficiencyData.remarks.trim().length>0:true;
                               



//                                 if ( !lineNumberIsValid || !buyerNameIsValid || !SOIsValid || !styleNameIsValid || !itemNameIsValid|| !dateIsValid || !SMVIsvalid ||!manpowerIsvalid ||!target10Isvalid || !hourIsvalid || !productionIsvalid ||!withoutsvalid || !dueIsvalid || !rejectionIsvalid||!remarksIsValid){
//                                 // Alert.alert('invalid Input','Please, check your input values');
//                                     setInputs((curInputs)=>{

//                                         return{
//                                             lineNumber:{ value:curInputs.lineNumber.value, isValid:lineNumberIsValid},
//                                             date:{ value:curInputs.date.value, isValid:dateIsValid},
//                                             buyerName:{ value:curInputs.buyerName.value, isValid:buyerNameIsValid},
//                                             SO:{ value:curInputs.SO.value, isValid:SOIsValid},
//                                             styleName:{ value:curInputs.styleName.value.trim().replace(/[^\w\s]+$/, '').replace(/\s+/g, " ").trim(), isValid:styleNameIsValid},
//                                             itemName:{ value:curInputs.itemName.value, isValid:itemNameIsValid},
//                                             daysRun:{ value:curInputs.daysRun.value, isValid:daysRunIsvalid},
//                                             SMV:{ value:curInputs.SMV.value, isValid:SMVIsvalid},
//                                             manpower:{ value:curInputs.manpower.value, isValid:manpowerIsvalid},
//                                             target10:{value:curInputs.target10.value, isValid:target10Isvalid},
//                                             hour:{ value:(+curInputs.hour.value).toFixed(6), isValid:hourIsvalid},
//                                             production:{ value:curInputs.production.value, isValid:productionIsvalid},
//                                             without:{ value:curInputs.without.value, isValid:withoutsvalid},
//                                             due:{ value:curInputs.due.value, isValid:dueIsvalid},
//                                             rejection:{ value:curInputs.rejection.value, isValid:rejectionIsvalid},
//                                             Button:{value:true, isValid:submitButtonisValid},
//                                             remarks:{value:curInputs.remarks.value, isValid:remarksIsValid}
//                                         }   
//                                     })

//                                     return;
//                                 }

//                                 onSubmit(efficiencyData); // to pass the data at manageefficiency confirm handler
//     }

    
//     const [date, setDate] = useState(new Date());
//     const[hourss,sethourss]=useState('1+10/24')
//     const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate;
//     const dt = new Date(currentDate);

//     const x= dt.toISOString().split('T');
//     const x1= x[0].split('-');
//     setDate(currentDate);
//     inputChangeHandler("date", x1[0]+'-'+x1[1]+'-'+x1[2])
    
//   };

//   const showMode = (currentMode) => {
//     DateTimePickerAndroid.open({
//       value: date,
//       onChange,
//       mode: currentMode,
//       is24Hour: true,
//     });
//   };

//   const showDatepicker = () => {
//     showMode('date');
//   };

  


//     const formIsValid = !inputs.lineNumber.isValid|| !inputs.date.isValid || !inputs.buyerName.isValid|| !inputs.styleName.isValid ||!inputs.itemName.isValid ||!inputs.SO.isValid|| !inputs.SMV.isValid || !inputs.hour.isValid|| !inputs.manpower.isValid || !inputs.production.isValid|| !inputs.due.isValid || !inputs.without.isValid|| !inputs.rejection.isValid || !inputs.remarks.isValid ;
//     const today= new Date();  
    
//     const Difference_In_Time=today.valueOf()-new Date(inputs.date.value).valueOf();
//     const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
//     const submitButtonisValid= Difference_In_Days+6/24 <eval(hourss) || Number(inputs.date.value)===0; 
    
//     useEffect(() => {
//         testp(submitButtonisValid);
    
//         async function fetchData() {
//             try {
//                 const hours = await fetchHours();
//                 sethourss(hours);
    
//                 // Check if defaultValues is defined before accessing its properties
//                 if (inputs.lineNumber.value) {
//                     const lineNumber = +inputs.lineNumber.value;
                    
//                     const manpowerValue = otInfo.find(item => {return item.lineNumber===lineNumber && getFormattedDate(item.date)==inputs.date.value})?.manpower?.toString();
//                     // Update the inputs state with the manpower value
//                     console.log(getFormattedDate(otInfo[0].date)===inputs.date.value)
//                     setInputs(prevInputs => ({
//                         ...prevInputs,
//                         manpower: {
//                             value: manpowerValue,
//                             isValid: true
//                         }
//                     }));
//                 }
    
//                 const buyername = await fetchBuyer();
//                 let data2 = eval(buyername[0].name3);
//                 setItems(Object.entries(data2).map(([label, value]) => ({ label, value })));
    
//                 let data = eval(buyername[0].name2);
//                 setitemItems(Object.entries(data).map(([label, value]) => ({ label, value })));
//                 setIsfetching(true);
//             } catch (error) {
//                 // Handle the error here, you can log it or show a user-friendly message
//                 console.error("Error fetching data:", error);
//             }
//         }
    
//         fetchData();
//     }, [inputs.date.value, value,inputs.lineNumber.value]);
    
     
//     return (
       
//         <View style={styles.form}>
//             <Text style={styles.title}>Your line-wise style efficiency Data</Text>
            
//             <View >
//                 <View style={styles.inputsRow}>
//                     <View style={{flex:1,marginVertical:8}}>                
//                         <Text style={{fontSize:12,color:GlobalStyles.colors.textcolor,marginBottom: 4}}> Line:</Text>
//                         <DropDownPicker
//                             listMode="MODAL"
//                             open={lopen}
//                             value={lvalue?lvalue:inputs.lineNumber.value}
//                             items={litems}
//                             setOpen={setlOpen}
//                             setValue={setlValue}
//                             setItems={setlItems}
//                             style={{borderRadius:10,backgroundColor:GlobalStyles.colors.textInputBackground,borderColor:'white',borderWidth:.2}}
//                             containerStyle={{elevation:5,backgroundColor:GlobalStyles.colors.textInputBackground,borderRadius:10}}
//                             onChangeValue={inputChangeHandler.bind(this,'lineNumber')}
//                             placeholder="Select Line"
//                             searchable={true} 
//                             placeholderStyle={{
//                                 color: "red",
//                                 fontWeight: "bold"
//                               }}
//                             searchTextInputProps={{
//                                 keyboardType:'phone-pad'
//                               }}                        
//                         />
//                     </View>
//                     <TouchableOpacity style={styles.rowInput} onPress={showDatepicker} >    
//                         <Input 
//                             style={styles.rowInput}
//                             invalid={!inputs.date.isValid}
//                             label='Date:' textInputConfig={{
                                
//                                 maxLentgh: 10,
//                                 onChangeText: inputChangeHandler.bind(this,'date'),
//                                 value: inputs.date.value,
//                     }} /> 
//                     </TouchableOpacity>  
//                 </View>
//                 <View style={{flexDirection:'row'}}> 
//                     <View style={{flex:1,marginVertical:8}}>                
//                         <Text style={{fontSize:12,color:GlobalStyles.colors.textcolor,marginBottom: 4}}> Buyer:</Text>
//                         <DropDownPicker
//                             listMode="MODAL"
//                             open={open}
//                             value={value?value:inputs.buyerName.value}
//                             items={items}
//                             setOpen={setOpen}
//                             setValue={setValue}
//                             setItems={setItems}
//                             style={{borderRadius:10,backgroundColor:GlobalStyles.colors.textInputBackground,borderColor:'white',borderWidth:.2}}
//                             containerStyle={{elevation:5,backgroundColor:GlobalStyles.colors.textInputBackground,borderRadius:10}}
//                             onChangeValue={inputChangeHandler.bind(this,'buyerName')}
//                             placeholder="Select Buyer"
//                             searchable={true}
//                             placeholderStyle={{
//                                 color: "red",
//                                 fontWeight: "bold"
//                               }}  
//                             loading={isfetching}                        
//                         />
//                     </View>   
//                     <View style={{flex:1}}>
//                         <Input 
//                         style={styles.rowInput}
//                         invalid={!inputs.styleName.isValid}
//                         label='Style Name:' textInputConfig={{
                            
//                             maxLentgh: 10,
//                             onChangeText: inputChangeHandler.bind(this,'styleName'),
//                             value: inputs.styleName.value,
//                         }} />
                         
//                     </View>
//                 </View>
//                 <View style={styles.inputsRow}>
//                     <View style={{flex:1,marginVertical:8,marginHorizontal:'1%'}}>                
//                         <Text style={{fontSize:12,color:GlobalStyles.colors.textcolor,marginBottom: 4}}> Days Run:</Text>
//                         <DropDownPicker
//                             listMode="MODAL"
//                             open={dopen}
//                             value={dvalue?dvalue:inputs.daysRun.value}
//                             items={ditems}
//                             setOpen={setdOpen}
//                             setValue={setdValue}
//                             setItems={setdItems}
//                             style={{borderRadius:10,backgroundColor:GlobalStyles.colors.textInputBackground,borderColor:'white',borderWidth:.2}}
//                             containerStyle={{elevation:5,backgroundColor:GlobalStyles.colors.textInputBackground,borderRadius:10}}
//                             onChangeValue={inputChangeHandler.bind(this,"daysRun")}
//                             placeholder="Select Day"
//                             searchable={true} 
//                             placeholderStyle={{
//                                 color: "red",
//                                 fontWeight: "bold"
//                               }}
//                             searchTextInputProps={{
//                                 keyboardType:'phone-pad'
//                               }}                   
//                         />
//                     </View>
//                     <View style={{flex:1,marginVertical:8, marginHorizontal:'1%'}}>                
//                         <Text style={{fontSize:12,color:GlobalStyles.colors.textcolor,marginBottom: 4}}> Item Name:</Text>
//                         <DropDownPicker
//                             listMode="MODAL"
//                             open={itemopen}
//                             value={itemvalue?itemvalue:inputs.itemName.value}
//                             items={itemitems}
//                             setOpen={setitemOpen}
//                             setValue={setitemValue}
//                             setItems={setitemItems}
//                             style={{borderRadius:10,backgroundColor:GlobalStyles.colors.textInputBackground,borderColor:'white',borderWidth:.2}}
//                             containerStyle={{elevation:5,backgroundColor:GlobalStyles.colors.textInputBackground,borderRadius:10}}
//                             onChangeValue={inputChangeHandler.bind(this,"itemName")}
//                             placeholder="Select Item"
//                             searchable={true} 
//                             placeholderStyle={{
//                                 color: "red",
//                                 fontWeight: "bold"
//                               }}
//                             // searchTextInputProps={{
//                             //     keyboardType:'phone-pad'
//                             //   }}                   
//                         />
//                     </View>
                    
//                 </View>
//                 <View  style={styles.inputsRow}>
//                     <Input 
//                         style={styles.rowInput}
//                         invalid={!inputs.SO.isValid}
//                         label='SO:' textInputConfig={{
//                             keyboardType:'phone-pad',
//                             onChangeText: inputChangeHandler.bind(this,'SO'),
//                             value: inputs.SO.value
//                         }} />
//                     <Input 
//                         style={styles.rowInput}
//                         invalid={!inputs.SMV.isValid}
//                         label='SMV:' textInputConfig={{
//                             keyboardType:'phone-pad',
//                             maxLentgh: 10,
//                             onChangeText: inputChangeHandler.bind(this,'SMV'),
//                             value: inputs.SMV.value,
//                         }} />
//                 </View>
//                 <View style={styles.inputsRow}>
                    
//                     <Input 
//                     style={styles.rowInput}
//                     invalid={!inputs.manpower.isValid}
//                     label={'Manpower: (Database Manpower:'+ databaseManpower+")"} textInputConfig={{
//                         keyboardType:'phone-pad',
//                         maxLentgh: 10,
//                         editable:false,
//                         onChangeText: inputChangeHandler.bind(this,'manpower'),
//                         value: inputs.manpower.value,
//                     }} />
//                    <Input 
//                     style={styles.rowInput}
//                     invalid={!inputs.hour.isValid}
//                     label={"Hour:  " + evalCalculation( inputs.hour.value)} textInputConfig={{
//                         keyboardType:'phone-pad',
//                         maxLentgh: 10,
//                         onChangeText: inputChangeHandler.bind(this,'hour'),
//                         value: inputs.hour.value,
//                     }} />
                    
//                 </View>
//                 <View style={styles.inputsRow}>
//                 <Input 
//                     style={styles.rowInput}
//                     invalid={!inputs.target10.isValid}
//                     label={'Target ( 10 hours ):' + inputs.hour.value*(inputs.target10.value)/10} textInputConfig={{
//                         keyboardType:'phone-pad',
//                         maxLentgh: 10,
//                         onChangeText: inputChangeHandler.bind(this,'target10'),
//                         value: inputs.target10.value,
//                     }} />
//                 <Input 
//                     style={styles.rowInput}
//                     invalid={!inputs.production.isValid}
//                     label={'Production: '} textInputConfig={{
//                         keyboardType:'phone-pad',
//                         maxLentgh: 10,
//                         onChangeText: inputChangeHandler.bind(this,'production'),
//                         value: inputs.production.value,
//                     }} />
//                 </View>
//                 <View style={styles.inputsRow}>
//                  <Input 
//                     style={styles.rowInput}
//                     invalid={!inputs.without.isValid}
//                     label='Without:' textInputConfig={{
//                         keyboardType:'phone-pad',
//                         maxLentgh: 10,
//                         onChangeText: inputChangeHandler.bind(this,'without'),
//                         value: inputs.without.value,
//                     }} />
//                  <Input 
//                     style={styles.rowInput}
//                     invalid={!inputs.due.isValid}
//                     label='Due:' textInputConfig={{
//                         keyboardType:'phone-pad',
//                         maxLentgh: 10,
//                         onChangeText: inputChangeHandler.bind(this,'due'),
//                         value: inputs.due.value,
//                     }} />
//                  <Input 
//                     style={styles.rowInput}
//                     invalid={!inputs.rejection.isValid}
//                     label='Rejection:' textInputConfig={{
//                         keyboardType:'phone-pad',
//                         maxLentgh: 10,
//                         onChangeText: inputChangeHandler.bind(this,'rejection'),
//                         value: inputs.rejection.value,
//                     }} />
//                 </View>
//                 <View>
//                     <Input 
//                         style={styles.rowInput}
//                         invalid={!inputs.remarks.isValid}
//                         label='Remarks:' textInputConfig={{
//                             maxLentgh: 150,
//                             onChangeText: inputChangeHandler.bind(this,'remarks'),
//                             value: inputs.remarks.value,
//                         }} /> 
//                 </View>
//             </View>

               

//         {formIsValid && <Text style={styles.errortext}>Invalid inputs data, check that out</Text>}
        
//         <View style={styles.buttons}>
//             <Button mode='flat' onPress={onCancel} style={styles.button}> Cancel </Button>
//            { submitButtonisValid && <Button onPress={submitHandler} style={styles.button}>{onButton}</Button>}
//         </View>

//     </View>
    
//     )
    
// }

// const styles = StyleSheet.create({
//     form:{
//         marginTop:'1%',
//         marginBottom:2,
//     },
//     title:{
//         fontSize:20,
//         fontWeight:'bold',
//         color:GlobalStyles.colors.textcolor,
//         marginBottom:25,
//         textAlign:'center',
//     },
//     inputsRow:{
//         flexDirection:'row',
//         justifyContent:'space-between',
//     },
//     rowInput:{
//         flex:1,
//     },
//     buttons:{
//         flexDirection:'row',
//         justifyContent:'center',
//         alignItems:'center',
//         marginTop:'5%',
//     },
//     button:{
//         minWidth:130,
//         marginHorizontal:10,
//     },
//     errortext:{
//         textAlign:'center',
//         color: GlobalStyles.colors.error500,
//         margin:8,
//     }
// });