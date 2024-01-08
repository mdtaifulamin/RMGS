import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, View, Dimensions, KeyboardAvoidingView, ScrollView, Button} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import ContainerLine from '../components/ContainerLine';
import { store_line_data } from '../components/server_activity';
//import { ColorLibrary } from '../Style/color';
import { GlobalStyles } from '../constants/styles';

screen_width = Dimensions.get('window').width;
screen_height = Dimensions.get('window').height;

function Hourly_prod({navigation}) {

  const [openBlock, setOpenBlock] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    {label: 'Line: 1-6', value: [1,2,3,4,5,6]},
    {label: 'Line: 7-15', value: [7,8,9,10,11,12,13,14,15]},
    {label: 'Line: 16-21', value: [16,17,18,19,20,21] },
    {label: 'Line: 22-30', value: [22,23,24,25,26,27,28,29,30] },
    {label: 'Line: 31-36', value: [31,32,33,34,35,36] },
    {label: 'Line: 37-45', value: [37,38,39,40,41,42,43,44,45]},
    {label: 'Line: 46-55', value: [46,47,48,49,50,51,52,53,54,55]},
    {label: 'Line: 56-62', value: [56,57,58,59,60,61,62]},
    {label: 'Line: 63-69', value: [63,64,65,66,67,68,69]},
    {label: 'Line: 70-76', value: [70,71,72,73,74,75,76]},
    {label: 'Line: 77-81', value: [77,78,79,80,81]},
    {label: 'Line: 82-86', value: [82,83,84,85,86]},
    {label: 'Line: 87-91', value: [87,88,89,90,91]},
    {label: 'Line: 92-96', value: [92,93,94,95,96]},
    {label: 'Line: 97-105', value: [97,98,99,100,101,102,103,104,105]},
    {label: 'Line: 106-114', value: [106,107,108,109,110,111,112,113,114]},
  ]);

  const day = new Date()
  const enteredDate = day.toLocaleDateString().replace(/[/]/g,"-")
  const currentHour = day.getHours()

  const [openHour, setOpenHour] = useState(false);
  const [hour, setHour] = useState(currentHour)
  const [hoursList, setHoursList] = useState([
    {label: '8 AM', value: 8},
    {label: '9 AM', value: 9},
    {label: '10 AM', value: 10},
    {label: '11 AM', value: 11},
    {label: '12 PM', value: 12},
    {label: '1 PM', value: 13},
    {label: '2 PM', value: 14},
    {label: '3 PM', value: 15},
    {label: '4 PM', value: 16},
    {label: '5 PM', value: 17},
    {label: '6 PM', value: 18},
  ])

  const [lineValue, setLineValue] = useState([])

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setLineValue([...value.map((e) => ({"production": 0, "target":0, "issue": "", "uploadTime": currentHour}))])
  }, [value])

  async function send_data(){
    // console.log(lineValue);
          setIsSubmitting(true)
          let errormsg = 'success'
          errormsg = await store_line_data(enteredDate, value, hour, lineValue);
          
          if(errormsg === 'success'){
              setTimeout(() => {setIsSubmitting(false)}, 3000)
          }
          else{
              Alert.alert('A Network Error Occured, Please try Again')
              setTimeout(() => {setIsSubmitting(false)}, 1000)
          }
  }




  return (
    <View>
        <ImageBackground source={require('../assets/background.png')} style={styles.backgroundimage}>
          <View>
                <View style={styles.topcontainer}>
                <Spinner
                  visible={isSubmitting}
                  textContent={'Loading...'}
                  textStyle={styles.spinnerTextStyle}
                 />
                  <View>
                      <DropDownPicker
                        style={styles.dropdown}
                        open={openBlock}
                        value={value}
                        items={items}
                        setOpen={setOpenBlock}
                        setValue={setValue}
                        setItems={setItems}
                        listMode='MODAL'
                        modalTitle='Select Your Block'
                        modalProps={{animationType:'fade'}}
                        placeholder='Select Your Block'
                      />
                  </View>
                  <View>
                      <DropDownPicker
                        style={styles.dropdown}
                        containerStyle={{marginLeft:5}}
                        open={openHour}
                        value={hour}
                        items={hoursList}
                        setOpen={setOpenHour}
                        setValue={setHour}
                        setItems={setHoursList}
                        listMode="FLATLIST"
                        modalTitle='Select Hour'
                        modalProps={{animationType:'fade'}}
                        placeholder='Select Hour'
                      />
                  </View>                  
                </View>
                <View>
                  <KeyboardAvoidingView behavior='padding'>
                    <ScrollView style={styles.scrollview}>
                      {value.map((e, i) => <ContainerLine line={e} index={i} lineValue={lineValue} setLineValue={setLineValue} />)}
                      {value.length?<View style={styles.button}>
                        <Button title='SUBMIT' color={GlobalStyles.colors.button1} onPress={async() => send_data()} />
                      </View>:null}
                    </ScrollView>
                    
                  </KeyboardAvoidingView>
                </View>
              </View>
        </ImageBackground>
    </View>
  );
}

export default Hourly_prod

const styles = StyleSheet.create({
  backgroundimage:{
    width: screen_width,
    height: screen_height,
  },
  scrollview:{
    marginBottom:screen_height * 0.32,
  },
  dropdown:{
    marginTop: screen_height * 0.01,
    marginLeft: screen_width * 0.005,
    width: screen_width * 0.45,
    //backgroundColor: ColorLibrary.body_background,
  },
  topcontainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  hourInput:{
    flexDirection:'row',
    marginLeft:screen_width * 0.03,
    marginTop: screen_height * 0.01,
  },
  textInputText:{
    marginTop: 10,
    marginRight:10,
    fontSize: 20,
    fontFamily: 'Roboto-Regular'
  },
  button: {
    paddingHorizontal: '25%'
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});
