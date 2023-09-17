import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View ,Text,Dimensions} from 'react-native';
import { fetchAssesment } from '../forDataSendingGetting';
import { useState } from 'react';
// expo add expo-file-system expo-sharing xlsx
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getFormattedDate, getdateMinusdays, getdatePlusdays, momentTime } from '../EfficiencyAnalysis/util/date';
import { Fontisto } from '@expo/vector-icons';
import UserContext from '../components/Store/UserContext';

export default function AssesmentDownloadPage() {
  const screenWidth = Dimensions.get('window').width
  const screen_height=Dimensions.get('window').height
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
    
    
    


  const generateExcel = async() => {
    //const data = await fetchAssesment(momentTime(date),momentTime(getdatePlusdays(cdate,1)));
    const data = await fetchAssesment(date,getdatePlusdays(cdate,1));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Assessment Data");
  
    const excelFilePath = FileSystem.documentDirectory + "AssessmentData.xlsx";
  
    FileSystem.writeAsStringAsync(excelFilePath, XLSX.write(wb, { type: "base64" }), {
      encoding: FileSystem.EncodingType.Base64,
    })
      .then(() => {
        Sharing.shareAsync(excelFilePath);
      })
      .catch((error) => {
        console.error('Error writing or sharing Excel file:', error);
      });
  };
  console.log(momentTime(getdatePlusdays(cdate,1)))

  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={showDatepicker} style={{justifyContent:'center',alignItems:'center',width:screenWidth*0.5,marginVertical:screen_height*0.04,backgroundColor:'white',elevation:10,borderRadius:10}}>
                                <View style={{flexDirection:'row',padding:screen_height*0.01,}}>
                                    <View style={{ justifyContent:'center',marginRight:screenWidth*0.03,marginLeft:screenWidth*0.03}}>
                                        <Text >From : {date.toLocaleDateString()} </Text>
                                    </View>
                                    <View style={{ justifyContent:'center', marginRight:screenWidth*0.03}}>
                                        <Fontisto name="date" size={16} color="black" />
                                    </View>
                                </View>
        </TouchableOpacity>  
        <TouchableOpacity onPress={cshowDatepicker} style={{justifyContent:'center',alignItems:'center',width:screenWidth*0.5,marginVertical:screen_height*0.04,backgroundColor:'white',elevation:10,borderRadius:10}}>
                                <View style={{flexDirection:'row',padding:screen_height*0.01,}}>
                                    <View style={{ justifyContent:'center',marginRight:screenWidth*0.03,marginLeft:screenWidth*0.03}}>
                                        <Text >To : {cdate.toLocaleDateString()} </Text>
                                    </View>
                                    <View style={{ justifyContent:'center', marginRight:screenWidth*0.03}}>
                                        <Fontisto name="date" size={16} color="black" />
                                    </View>
                                </View>
        </TouchableOpacity> 
      <Button title="Download Data" onPress={generateExcel} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
