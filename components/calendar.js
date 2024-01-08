import React, {useState} from 'react';
import {View, Text, Button, TextInput, StyleSheet, Modal, Image} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

    function Calender({visible, onCancel}) {
        const [selectedStartDate, setSelectedStartDate] = useState();


        const onDateChange = (date, type) => {
            //function to handle the date change
            if (type === 'START_DATE') {
                const formatedDate = date.format('DD-MM-YYYY')
                setSelectedStartDate(formatedDate);
                onCancel(formatedDate.toString())
                
            } else {
                setSelectedStartDate();
            }
        };
        
        
        return(
            <Modal visible={visible} animationType="fade">
                <View style={styles.container}>
                    <Text style={styles.titleStyle}>
                        CALENDAR
                    </Text>
                
                    <CalendarPicker
                        startFromMonday={false}
                        allowRangeSelection={false}
                        minDate={new Date(2018, 1, 1)}
                        maxDate={new Date(2050, 6, 3)}
                        weekdays={
                            [ 
                                'Sat', 
                                'Sun',
                                'Mon', 
                                'Tue', 
                                'Wed', 
                                'Thur', 
                                'Fri',
                            ]}
                        months={
                            [
                                'January',
                                'Febraury',
                                'March',
                                'April',
                                'May',
                                'June',
                                'July',
                                'August',
                                'September',
                                'October',
                                'November',
                                'December',
                            ]}
                            previousTitle="Previous"
                            nextTitle="Next"
                            todayBackgroundColor="#e6ffe6"
                            selectedDayColor="#66ff33"
                            selectedDayTextColor="#000000"
                            scaleFactor={375}
                            textStyle={{
                                color: '#000000',
                            }}
                            onDateChange={onDateChange}
                            />
                    
                            <View style={styles.button}>
                                <Button title='HAVE A NICE DAY' color='#fc56ba'/>
                            </View>
                </View>
            </Modal>
    
        );
    };
    
    export default Calender

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 30,
            backgroundColor: '#ffffff',
            padding: 16,
          },
          textStyle: {
            marginTop: 10,
          },
          titleStyle: {
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            margin: 20,
          },
          button:{
            width: '30%',
            margin:10,
          },
    })

