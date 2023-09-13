
import { useContext, useLayoutEffect, useState } from "react";
import { Text, View ,StyleSheet, ScrollView,Modal,TouchableOpacity, Dimensions} from "react-native"
import OverTimeForm from "../components/ManageOverTime/OverTimeForm";
import IconButton from "../components/UI/iconButton";
import Loadingspinner from "../components/UI/loading";
import { GlobalStyles } from "../../constants/styles";
import { OverTimesContext } from "../Store/overTimes-context";
import { deleteoverTime, storeOverTime, updateOverTime } from "../util/forDataSendingGetting";
import ButtonM from "../util/Button";
import { getdateMinusdays, momentTime } from "../util/date";
import { Fontisto } from '@expo/vector-icons';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'

const screenWidth = Dimensions.get('window').width
const screen_height=Dimensions.get('window').height
export default function ManageOverTime({route,navigation}){
    const [isSubmitting,setIsSubmitting]= useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const Today= new Date()
    const mdate= getdateMinusdays(Today,1)
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



    const overTimesCtx= useContext(OverTimesContext);
    const editedOverTimeId= route.params?.overTimeId; //overTimeId from overTimeitem
    const isEditing = !! editedOverTimeId;
    const selectedOverTime= overTimesCtx.overTimes.find(
        (overTime)=> {if(overTime.id==editedOverTimeId){
        return editedOverTimeId;
        };}
        )
  

    useLayoutEffect(()=>{
        navigation.setOptions({
        title: isEditing ? 'Edit OverTime' : 'Add OverTime',
       
    });
    },[navigation,isEditing]);
    
    async function deleteOverTimehandler(){
        setIsSubmitting(true);
        await deleteoverTime(editedOverTimeId);
        overTimesCtx.deleteOverTime(editedOverTimeId);
        navigation.goBack();
    }

    function cancelHandler(){
        navigation.goBack();
    }

    async function confirmHandler(overTimeData,Id){
        setIsSubmitting(true);
        if(isEditing){
            await updateOverTime(editedOverTimeId,overTimeData);
            overTimesCtx.updateOverTime(Id,overTimeData);
        }else{
        const id= Id;
        // console.log({...overTimeData,id:id});
            overTimesCtx.updateOverTime(id,overTimeData)
            overTimesCtx.addOverTime({...overTimeData,id:id});
            
        }
        navigation.goBack();
    }
    const handleOpenModal = () => {
        setModalVisible(true);
      };
    
      const handleCloseModal = () => {
        setModalVisible(false);
      };
      async function  copyHandlerIndi (){      
       const overTimeData= {
        lineNumber: selectedOverTime.lineNumber, 
        date: new Date(momentTime(date)),
        buyerName: selectedOverTime.buyerName,
        SO:        selectedOverTime.SO,
        daysRun: ' ',
        styleName:selectedOverTime.styleName,
        itemName: selectedOverTime.itemName,
        TWO_HOUR_OT:       +selectedOverTime.TWO_HOUR_OT,
        manpower:  0,
        hour:       0,
        production: '',
        without:   '',
        due:        '',
        rejection:  '',
        };
        //const id= await storeOverTime(overTimeData);
       await storeOverTime(overTimeData)
       setModalVisible(false); 
    }
    const [deleteButton, setdeleteButton] = useState(true);
    function testp(testp){
        setdeleteButton(testp);
       // console.log(testp);
    }

    if(isSubmitting){
        return <Loadingspinner/> 
         //console.log(isSubmitting)      
     }

    return (
        <ScrollView style={{flex:1,backgroundColor:GlobalStyles.colors.backgroundColor,}}>
        <View style={styles.container}>
       
        <View>
            
            <OverTimeForm 
            onButton={isEditing?'Update': 'Add'} 
            onCancel={cancelHandler} 
            onSubmit={confirmHandler}
            defaultValues={selectedOverTime}
            testp={testp}
            />
        </View>
       
       
        
         { isEditing && (
            
            <View style={styles.deleteCopyContainer }>
               {deleteButton && <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteOverTimehandler}/>}
               <IconButton icon="copy" color={GlobalStyles.colors.text_border_button} size={36} onPress={handleOpenModal}/>
            </View>
            )}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{borderWidth:1,borderRadius:10,padding:screen_height*0.01,elevation:10,backgroundColor:'white',paddingHorizontal:screenWidth*0.08}}>
                         <Text style={styles.modalText}> Select Your Desired Date </Text>
                        </View>
                        <TouchableOpacity onPress={showDatepicker} style={{justifyContent:'center',alignItems:'center',width:screenWidth*0.5,marginVertical:screen_height*0.04,backgroundColor:'white',elevation:10,borderRadius:10}}>
                            <View style={{flexDirection:'row',padding:screen_height*0.01,}}>
                                <View style={{ justifyContent:'center',marginRight:screenWidth*0.03,marginLeft:screenWidth*0.03}}>
                                    <Text >From Date: {date.toLocaleDateString()} </Text>
                                </View>
                                <View style={{ justifyContent:'center', marginRight:screenWidth*0.03}}>
                                    <Fontisto name="date" size={16} color="black" />
                                </View>
                            </View>
                        </TouchableOpacity> 
                        
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:screenWidth*0.6}}>
                            <ButtonM onPress={handleCloseModal} style={styles.button} mode={"flat"}>Cancel</ButtonM>
                            <ButtonM onPress={copyHandlerIndi} style={styles.button}> Copy </ButtonM>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
        </ScrollView>
        
   
)
}


const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:'5%',
        backgroundColor:GlobalStyles.colors.backgroundColor,
        justifyContent:'center',
        

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
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 10,
        justifyContent:'center',
        alignItems:'center',
        width:screenWidth*0.9,
        height:screen_height*0.3
      },
      modalText: {
        fontSize: 18,
        marginBottom: 10,
      },
      closeButton: {
        fontSize: 16,
        color: "blue",
        textAlign: "center",
      },
})