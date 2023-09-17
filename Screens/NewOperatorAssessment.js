import React from 'react';
import Stopwatch from "../StopWatch";
import { TextInput, View,Text, StyleSheet, ScrollView ,StatusBar, Modal, FlatList, Dimensions, TouchableOpacity,} from "react-native";
import { GlobalStyles } from "../constants/styles";
import { useEffect, useState,useContext } from "react";
import PrimaryButton, { SeconderyButton } from "../PrimaryButtons"
import { StoreData } from "../data-storing";
import Header from '../components/Header';
import UserContext from '../components/Store/UserContext';



const screen_width = Dimensions.get('screen').width
const screen_height = Dimensions.get('screen').height

function Input({label,style,textInputConfig,invalid}) {

    const inputStyles=[styles.input];

    if (textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiline)
    };
    if (invalid) {
        inputStyles.push(styles.invalidinput)
    };
    
    return (    
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label,invalid && styles.invalidlabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
            )
}

 const NewOperatorAssessmentPage = () => {
   //const childRef = useRef(null);
  const [laps, setLaps] = useState([]);
    
  const getCycleTimeFromLaps = (laps) => {
      let totalTime = 0
      for(let v of laps){
          totalTime = totalTime + Number(v)         
      }
     // console.log('total time :'+ totalTime)
      return totalTime/laps.length;
  }


  useEffect(() => {
      totalInterval=[]
     //const fetch= fetchProcesses()
     //console.log(fetch)
  }, [])
  

  useEffect(() => {
      console.log(laps);
     inputChangeHandler("processTime", isNaN(getCycleTimeFromLaps(laps).toFixed(2))?0:getCycleTimeFromLaps(laps).toFixed(2))
  }, [laps])


  const [modalisVisible,setModalisVisible]=useState(false)
  const [rmodalisVisible,setrModalisVisible]=useState(false)
  const [pmodalisVisible,psetrModalisVisible]=useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const originalData= [
      { ID: "01", processName: "Moon attach", factorySMV: 0.45, machineName: "S/N" },
      { ID: "02", processName: "Triangle Attach", factorySMV: 0.45, machineName: "S/N" },
      { ID: "03", processName: "Placket attach", factorySMV: 0.55, machineName: "S/N" },
      { ID: "04", processName: "Placket box make", factorySMV: 0.44, machineName: "S/N" },
      { ID: "05", processName: "Patch pocket attach", factorySMV: 0.7, machineName: "S/N" },
      { ID: "06", processName: "Back welt pocket attach(one pocket)", factorySMV: 0.65, machineName: "S/N" },
      { ID: "07", processName: "Back neck tape close with insert label", factorySMV: 0.38, machineName: "S/N" },
      { ID: "08", processName: "Placket inner topstitch(pattern)", factorySMV: 0.33, machineName: "S/N" },
      { ID: "09", processName: "Collar attach", factorySMV: 0.55, machineName: "S/N" },
      { ID: "10", processName: "Collar close", factorySMV: 0.65, machineName: "S/N" },
      { ID: "11", processName: "Side slit tape attach", factorySMV: 0.54, machineName: "S/N" },
      { ID: "12", processName: "Side slit tap close", factorySMV: 0.51, machineName: "S/N" },
      { ID: "13", processName: "Side slit tape miner make with tack to body", factorySMV: 0.55, machineName: "S/N" },
      { ID: "14", processName: "J stitch make", factorySMV: 0.35, machineName: "S/N" },
      { ID: "15", processName: "Half Zipper attach", factorySMV: 0.65, machineName: "S/N" },
      { ID: "16", processName: "Half Zipper topstitch", factorySMV: 0.6, machineName: "S/N" },
      { ID: "17", processName: "Full Zipper attach", factorySMV: 1.2, machineName: "S/N" },
      { ID: "18", processName: "Full Zipper topstitch", factorySMV: 1.1, machineName: "S/N" },
      { ID: "19", processName: "Kangaroo pocket attach", factorySMV: 0.7, machineName: "S/N" },
      { ID: "20", processName: "Neck rib attach", factorySMV: 0.28, machineName: "4T O/L" },
      { ID: "21", processName: "Sleeve attach", factorySMV: 0.54, machineName: "4T O/L" },
      { ID: "22", processName: "Side seam", factorySMV: 0.65, machineName: "4T O/L" },
      { ID: "23", processName: "Inseam join", factorySMV: 0.65, machineName: "4T O/L" },
      { ID: "24", processName: "Sleeve cuff attach(round)", factorySMV: 0.7, machineName: "4T O/L" },
      { ID: "25", processName: "Bottom rib attach", factorySMV: 0.5, machineName: "4T O/L" },
      { ID: "26", processName: "Sleeve hem(blind stitch)", factorySMV: 0.55, machineName: "3T O/L" },
      { ID: "27", processName: "Bottom hem(blind stitch)", factorySMV: 0.35, machineName: "3T O/L" },
      { ID: "28", processName: "Bottom hem", factorySMV: 0.33, machineName: "F/L" },
      { ID: "29", processName: "Sleeve hem", factorySMV: 0.54, machineName: "F/L" },
      { ID: "30", processName: "Front neck topstitch", factorySMV: 0.22, machineName: "F/L" },
      { ID: "31", processName: "Shoulder topstitch", factorySMV: 0.3, machineName: "F/L" },
      { ID: "32", processName: "Armhole topstitch", factorySMV: 0.55, machineName: "F/L" },
      { ID: "33", processName: "Bottom rib topstitch", factorySMV: 0.5, machineName: "F/L" },
      { ID: "34", processName: "Sleeve cuff topstitch(round)", factorySMV: 0.55, machineName: "F/L" },
      { ID: "35", processName: "Back neck tape attach(shoulder to shoulder)", factorySMV: 0.35, machineName: "F/L" },
      { ID: "36", processName: "Back neck tape attach(shoulder to shoulder)", factorySMV: 0.4, machineName: "FOA" },
      { ID: "37", processName: "Shoulder topstitch", factorySMV: 0.3, machineName: "FOA" },
      { ID: "38", processName: "Make button hole", factorySMV: 0.4, machineName: "B/H" },
      { ID: "39", processName: "Button Attach", factorySMV: 0.45, machineName: "B/A" },
      { ID: "40", processName: "Bartack at side slit", factorySMV: 0.25, machineName: "B/TK" },
      { ID: "41", processName: "Snap button attach", factorySMV: 0.45, machineName: "S/B" },
      { ID: "42", processName: "Hole make at waist", factorySMV: 0.5, machineName: "EYELET" },
      { ID: "43", processName: "Waist band topstitch", factorySMV: 0.55, machineName: "Kansai" },
    ];

    //const originalData= eval(fetchProcesses());
    const { userInfo, updateUser } = useContext(UserContext);
    const [data,setData]=useState(originalData);
    const [filterText, setFilterText] = useState('');
    const handleFilter = (text) => {
      setFilterText(text);
  
      // Filter the data based on the input text or set it to the original data if the input is empty
      if (text.trim() === '') {
        setData(originalData);
      } else {
        const filteredData = originalData.filter((item) =>
          item.processName.toLowerCase().includes(text.toLowerCase())
        );
        setData(filteredData);
      }
    };
  
  
 
  const DefectsItem = ({ item }) => {
    const  handleDefectPress = async() => {
     psetrModalisVisible(true);
      setInputs({...inputs,processName: item.processName,factorySMV: item.factorySMV,machineName:item.machineName})
    };
   
    return (
      <TouchableOpacity onPress={handleDefectPress}>
        <View style={styles.defectsInnerContainer}>
          <Text style={styles.defectsText}> {item.processName} </Text>
          <Text style={styles.defectsText}> ( {item.machineName} )</Text>
        </View>
      </TouchableOpacity>
    );
  };
//   const  processSubmithandler = async()=>{
    
//     await StoreData(convertedInputs)   
//     psetrModalisVisible(false)
//  }
const processSubmithandler = async () => {
  try {
    setLoading(true);
    await StoreData(convertedInputs);
    setLoading(false);
    // Optionally, show a success message
    alert("Data submitted successfully!");
    psetrModalisVisible(false);
  } catch (error) {
    setError("An error occurred while submitting the data. Please try again.");
    setLoading(false);
  }
};

  
  const [inputs,setInputs]= useState({
    date: new Date(),
    NIDNumber:'',
    department:'Sewing',    
    applicantName:'',
    machineName:'',                    
    processTime:'',
    rating:'100', 
    assessedBy:userInfo.userName,    
  }); 

  function inputChangeHandler(inputIdentifier,enteredValue) {
    setInputs((curInputs)=>{
      return{
         ...curInputs,
         [inputIdentifier]: enteredValue}
        })
  };
  const convertedInputs ={
    date: inputs.date,
    NIDNumber:+inputs.NIDNumber,
    department:inputs.department,    
    applicantName:inputs.applicantName,
    machineName:inputs.machineName,
    processName: inputs.processName?inputs.processName:'',
    factorySMV: +inputs.factorySMV,
    machineName:inputs.machineName,                     
    processTime:+inputs.processTime,
    rating:+inputs.rating,
    assessedBy:userInfo.userName,
  }
  function processHandler(){
  setModalisVisible(true)
  }

  const today= new Date();
  return (
    <>       
      <View style={styles.container}>
          <Header title={"Operator Assesment"}/>
        <ScrollView style={{flex:10,opacity:rmodalisVisible?0.3:1}}>
          <View style={{flex:7}}>            
            <View style={{backgroundColor:'white',justifyContent:'center',alignItems:'flex-end',padding:'1%',marginTop:2,flex:1,marginLeft:screen_width*0.7,borderTopLeftRadius:8,borderBottomLeftRadius:8}}>
              <Text style={{fontSize:10,fontWeight:'bold'}}> Date: {today.toLocaleDateString()} </Text>
            </View>
            <View style={{flex:6,marginTop:screen_height*0.05,marginHorizontal:screen_width*0.02}}>
              <Input label={'NID: '} 
                textInputConfig={{
                  keyboardType:'phone-pad',
                  maxLentgh: 10,
                  onChangeText: inputChangeHandler.bind(this,'NIDNumber'),
                  value: inputs.NIDNumber,
                }}/>
              <Input label={'Department:'} 
                textInputConfig={{
                  //keyboardType:'phone-pad',
                  maxLentgh: 10,
                  onChangeText: inputChangeHandler.bind(this,'department'),
                  value: inputs.department,
                }}/>
              <Input label={'Applicant Name:'} 
                textInputConfig={{
                  //keyboardType:'phone-pad',
                  maxLentgh: 10,
                  onChangeText: inputChangeHandler.bind(this,'applicantName'),
                  value: inputs.applicantName,
                }}/>
              {/* <Input label={'Machine Name'} 
                textInputConfig={{
                  //keyboardType:'phone-pad',
                  maxLentgh: 10,
                  onChangeText: inputChangeHandler.bind(this,'machineName'),
                  value: inputs.machineName,
                }}/> */}
            </View>
          </View> 
          
          <View style={styles.primaryButtonContainer}>      
            <PrimaryButton onPress={processHandler} >Select Process</PrimaryButton>
            {/* <PrimaryButton onPress={rejectsHandler}>Rejects</PrimaryButton>       */}
          </View>
        </ScrollView>
      </View>     
        <View style={{justifyContent:'center',alignItems:'center',}}>
          <Modal
            animationType="slide"
            //transparent={true}
            presentationStyle="modal"
            visible={modalisVisible}
            onRequestClose={()=>{
              setModalisVisible(!modalisVisible)
            }}>
            <View style={styles.modal1Container}> 
              <View style={styles.modal1TitleContainer}>
                <Text style={styles.modal1TitleText}> PRCOCESS LIST </Text>
              </View> 
              <View style={{elevation:2,backgroundColor:'white',borderTopStartRadius:10,borderTopEndRadius:10,justifyContent:'center',alignItems:'center',marginBottom:screen_height*0.01}}>
                <View style={{width:screen_width*0.9}}>
                  <Input label={'Process Search: '} 
                          textInputConfig={{
                            //keyboardType:'decimal-pad',
                            maxLentgh: 50,
                            onChangeText: handleFilter,
                            value: filterText,
                            placeholder:'Search by name...'
                          }}/>
                </View> 
                  <View style={{borderWidth:1,width:screen_width*0.9,borderColor:'gray',}}>
                </View>
              </View>   
              <FlatList
                style={{}} 
                data={data}
                renderItem={DefectsItem}
                keyExtractor={(item) => item.ID}
                numColumns={2}
              
                />
            </View>
          </Modal>
        </View>
        <View style={{}}>
          
          <Modal
            animationType="slide"
           // transparent={true}
            //presentationStyle="modal"
            visible={pmodalisVisible}
            onRequestClose={()=>{
              setModalisVisible(!pmodalisVisible)
            }}>
            <ScrollView style={{flex:1,}}>
              <View style={[styles.modal3Container,{marginTop:screen_height*0.08,minHeight:screen_height*0.8}]}> 
                <View style={styles.modal2TitleContainer}>
                  <Text style={styles.modal2TitleText}> PRCOCESS DETAILS </Text>
                </View>  
                <View style={{maxHeight:screen_height*0.3}}>
                  <Stopwatch laps={laps} setLaps={setLaps}  /> 
                </View>
                <View style={{maxWidth:screen_width,justifyContent:'space-around',flexDirection:'row',minWidth:screen_width*0.8,marginTop:screen_height*0.02}}>
                  <View style={{backgroundColor:'white',elevation:1,minWidth:screen_width*0.4}}>
                      <Input label={'Process Time: '} 
                        textInputConfig={{
                          keyboardType:'decimal-pad',
                          maxLentgh: 10,
                          onChangeText: inputChangeHandler.bind(this,'processTime'),
                          value: inputs.processTime.toString(),
                        }}/>
                  </View>
                  <View style={{backgroundColor:'white',elevation:1,minWidth:screen_width*0.4}}>
                        <Input label={'Rating:'} 
                        textInputConfig={{
                          keyboardType:'decimal-pad',
                          maxLentgh: 10,
                          onChangeText: inputChangeHandler.bind(this,'rating'),
                          value: inputs.rating.toString(),
                        }}/>
                    </View>
                </View> 
                <View style={{backgroundColor:'white',justifyContent:'center',alignItems:'center',marginTop:screen_height*0.008,width:screen_width*0.8,elevation:1,height:screen_height*0.08}}>
                      <Text style={{}}> Process Capacity: </Text>
                      <View style={{backgroundColor:'white',elevation:2,padding:screen_height*0.01,width:screen_width*0.5,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{}}> {inputs.processTime?(3600/(inputs.processTime*1.15*(inputs.rating/100))).toFixed(0):0} </Text>
                      </View>
                </View>
                      {/* <View style={styles.modal2ButtonContainer}>
                        <SeconderyButton onPress={processSubmithandler}>Submit</SeconderyButton>
                        <SeconderyButton onPress={()=>{psetrModalisVisible(false)}}>Cancel</SeconderyButton>
                      </View>       */}
                      
                <View style={styles.modal2ButtonContainer}>
                  <View style={{width:screen_width*0.4,justifyContent:'center',alignItems:'center'}}>
                    {!loading && <SeconderyButton onPress={processSubmithandler}>Submit</SeconderyButton>}
                    {loading && <Text>Loading...</Text>} 
                    {error && <Text style={{ color: 'red' }}>{error}</Text>} 
                  </View>
                  <View style={{width:screen_width*0.4,justifyContent:'center',alignItems:'center'}}>
                    <SeconderyButton onPress={() => { psetrModalisVisible(false) }}>Cancel</SeconderyButton>
                  </View>
                </View>
              </View>
            </ScrollView>
          </Modal>         
        </View>
        <StatusBar style="auto" />
    </>
   
  );
}
export default NewOperatorAssessmentPage;
const styles = StyleSheet.create({
  container:{
    flex:10,
    backgroundColor:GlobalStyles.colors.manageProductionInformationBackground
  },
  inputTitleBackgroundContainer:{
    backgroundColor:GlobalStyles.colors.titleBackground,
    justifyContent:'center',
    alignItems:'center',
    padding:screen_height*.02,
    //margin:10,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    elevation:10,
  },
  inputTitleText:{
    fontSize:30,
    fontWeight:'bold',
    color:GlobalStyles.colors.titleText,
  },
  defectsInnerContainer:{
    elevation:5,
    shadowColor:'#000',
    padding: 16 ,
    flex:1,
    borderRadius:10,
    margin:screen_width*.015,
    minWidth:screen_width*.40,
    maxWidth:screen_width*.40,
    minHeight:screen_height*.09,
    maxHeight:screen_height*.09,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:GlobalStyles.colors.defectsBackground,
  },
  primaryButtonContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    flex:3,
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    backgroundColor:'white',
    elevation:10,
    paddingBottom:'60%',
    paddingTop:"10%",
    marginTop:screen_height*0.20
  },
  defectsText:{
      fontWeight:'bold',
      textAlign:'center',
      color:GlobalStyles.colors.textcolor,
      fontSize:11, 
  },
  inputContainer:{
      marginHorizontal:4,
      marginVertical:8,
  },
  label:{
      fontSize:12,
      color:GlobalStyles.colors.textcolor,
      marginBottom: 4
  },
  input:{
      backgroundColor:GlobalStyles.colors.inputBackgroundColor,
      padding:11,
      borderRadius:10,
      fontSize:18,
      color:GlobalStyles.colors.inputtextcolor,
      elevation:2,
      borderWidth:.4,
      borderColor:'white',
      marginBottom:screen_height*0.02,
  },
  inputMultiline:{
      minHeight:100,
      textAlignVertical:'top',
  },
  invalidlabel:{
     // color: 'red'
  },
  invalidinput:{
       borderWidth:1,
       borderColor:GlobalStyles.colors.error50
  },
  modal1Container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:GlobalStyles.colors.manageProductionInformationBackground
  },
  modal1TitleContainer:{
    backgroundColor:GlobalStyles.colors.titleBackground,
    paddingHorizontal:screen_width*.28,
    paddingVertical:screen_width*.05,
    margin:10,
    elevation:10,
    borderRadius:10
  },
  modal1TitleText:{
    fontSize:screen_width*.05,
    color:GlobalStyles.colors.titleText
  },
  modal2Container:{
    backgroundColor:'white',
    paddingHorizontal:screen_width*.04,
    paddingVertical:screen_height*.02,
    elevation:10,
    marginHorizontal:screen_width*0.02,
    borderRadius:20,
    elevation:30,
    alignItems:'center',
    justifyContent:'center'
  },
  modal3Container:{
    backgroundColor:'white',
    paddingHorizontal:screen_width*.04,
    paddingVertical:screen_height*0.015,
    elevation:10,
    marginHorizontal:screen_width*0.02,
    borderRadius:20,
    elevation:30,
    alignItems:'center',
    marginVertical:screen_height*0.08
    //justifyContent:'center'
  },
  modal2ButtonContainer:{
    flexDirection:'row',
    marginTop:screen_height*0.05,
    alignContent:'center',
    justifyContent:'center',
  },
  modal2TitleContainer:{
    backgroundColor:GlobalStyles.colors.titleBackground,
    elevation:2,
    borderRadius:10,
    marginBottom:screen_height*0.04,
    paddingVertical:8,
    width:screen_width*0.8,
    justifyContent:'center',
    alignItems:'center'},
  modal2TitleText:{
    fontSize:screen_width*.07,
    color:GlobalStyles.colors.titleText,
    fontWeight:'bold'
    
  },
})


