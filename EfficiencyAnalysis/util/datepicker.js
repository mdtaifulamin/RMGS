import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { View,Text,Button } from 'react-native';



export default function Datepicker({textInputConfig}){
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectDate,setSelectDate]= useState(selectDate);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
        onchange=(selectDate)
      };
    
      const handleConfirm = (d) => {
        
        const dt = new Date(d);
        const x= dt.toISOString().split('T');
        const x1= x[0].split('-');
        setSelectDate(x1[0]+'-'+x1[1]+'-'+x1[2])
        hideDatePicker();
        DateData(x);
        
        
      };


    return(
        <View>
       <TouchableOpacity onPress={showDatePicker} style={{borderWidth:2, width:200,padding:8}}>
            
            <TextInput {...textInputConfig} value={selectDate}/>
        </TouchableOpacity>    
        <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
        </View>
    )
}