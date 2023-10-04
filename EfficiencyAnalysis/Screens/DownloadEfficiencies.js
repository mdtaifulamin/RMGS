import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View ,Text,Dimensions} from 'react-native';
import { fetchEfficienciesByDate } from '../util/forDataSendingGetting';
import { useState } from 'react';
// expo add expo-file-system expo-sharing xlsx
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getFormattedDate} from '../util/date';
import { Fontisto } from '@expo/vector-icons';
import BrightSkyBackground from '../../components/ColoredBackground';

export default function DownloadEfficiencies() {
  const [data,setData]=useState([])
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

  //start
  
  // Example data
  
  // Calculate cumulative Target10
  


  const generateExcel = async() => {
    //const data = await fetchAssesment(momentTime(date),momentTime(getdatePlusdays(cdate,1)));
   //const lines= [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50], [51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75], [76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100], [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114]]
    
   const result = await fetchEfficienciesByDate(date);
   const cumulativeSums = {};
   const highestCumulativeValues = {};

// Calculate cumulative sums and highest values
result.forEach((item) => {
  const { lineNumber, target10 } = item;

  cumulativeSums[lineNumber] = (cumulativeSums[lineNumber] || 0) + target10;

  if (
    !highestCumulativeValues[lineNumber] ||
    cumulativeSums[lineNumber] > highestCumulativeValues[lineNumber]
  ) {
    highestCumulativeValues[lineNumber] = cumulativeSums[lineNumber];
  }
});

// Update target10 for each item based on the highest cumulative value for its lineNumber
const resultData = result.map((item) => {
  const { lineNumber, ...rest } = item;
  return {
    ...rest,
    lineNumber,
    target10: (highestCumulativeValues[lineNumber]*item.hour/10).toFixed(0),
  };
});

console.log(resultData);

    var ws = XLSX.utils.json_to_sheet(resultData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Efficiency Data of " +getFormattedDate(date));
  
    const excelFilePath = FileSystem.documentDirectory + "Efficiency Data of " +getFormattedDate(date)+".xlsx";
  
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

  return (
    <View style={styles.container}>
      <BrightSkyBackground/>
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
