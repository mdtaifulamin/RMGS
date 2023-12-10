import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions,ScrollView } from 'react-native';
import ColoredCirclesBackground from '../components/ColoredCircle';
import Header from '../components/Header';
import SwipeUnlock from '../components/Slider';

const QualityDepartmentPage = ({ navigation }) => {
  const [animation] = useState(new Animated.Value(0));
  const buttonWidth = Dimensions.get('window').width / 2 - 30;

  useEffect(() => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  }, []);

  const buttonTransform = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1000, 0],
  });

  return (
    <View style={styles.container}>
      <ColoredCirclesBackground />
      <Header title={"Quality Department"}/>
      <ScrollView style={{marginTop:30,flex:1}}>
      <View style={styles.buttonRow}>
        <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: buttonTransform }] }]}>
          <TouchableOpacity
            style={[styles.subPageButton, { width: buttonWidth, elevation: 10 }]}
            onPress={() => navigation.navigate('')}>
            <Text style={[styles.buttonText, ]}>Sewing End Line QC</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: buttonTransform }] }]}>
          <TouchableOpacity
            style={[styles.subPageButton, { width: buttonWidth, elevation: 10 }]}
            onPress={() => navigation.navigate('')}>
            <Text style={[styles.buttonText,]}>S. Finishing QC</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <View style={styles.buttonRow}>
        <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: buttonTransform }] }]}>
          <TouchableOpacity
            style={[styles.subPageButton, { width: buttonWidth, elevation: 10 }]}
            onPress={() => navigation.navigate('Target')}>
            <Text style={[styles.buttonText,]}>Cutting QC</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: buttonTransform }] }]}>
          <TouchableOpacity
            style={[styles.subPageButton, { width: buttonWidth, elevation: 10 }]}
            onPress={() => navigation.navigate(' ')}>
            <Text style={[styles.buttonText,]}>Embroidery QC</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      </ScrollView>
      <SwipeUnlock/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical:"10%",
    justifyContent:'center',
    alignItems:'center',
    elevation:20,
    marginBottom:'15%'
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'center'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  subPageButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default QualityDepartmentPage;







// import React, { useState } from 'react'
// import { Text, TextInput, View,ScrollView, Button, TouchableOpacity,Platform } from 'react-native'

// import DateTimePicker from '@react-native-community/datetimepicker';
// import { MaterialIcons } from '@expo/vector-icons';
// // import { addData } from './dataSending';




// const QualityDepartmentPage = () => {
//   const [supervisor,SETsupervisor] = useState('');
//   const [buyer,SETbuyer] = useState('');
//   const [so,SETso] = useState('');
//   const [style,SETstyle] = useState('');
//   const [color,SETcolor] = useState('');
//   const [fab,SETfab] = useState('');
//   const [item,SETitem] = useState('');
//   const [bgsm,SETbgsm] = useState('');
//   const [rgsm,SETrgsm] = useState('');
//   const [bdia,SETbdia] = useState('');
//   const [rdia,SETrdia] = useState('');
//   const [BshrinkageL,SETBshrinkageL] = useState(0);
//   const [RshrinkageL,SETRshrinkageL] = useState(0);
//   const [ShrinkageResult,SETShrinkageResult] = useState(0);
//   const [BshrinkageW,SETBshrinkageW] = useState(0);
//   const [RshrinkageW,SETRshrinkageW] = useState(0);
//   const [ShrinkageResultW,SETShrinkageResultW] = useState(0);
//   const [Flength,SETFlength] = useState(0);
//   const [Fwidth,SETFwidth] = useState(0);
//   const [Fgsm,SETFgsm] = useState(0);
//   const [Fmr,SETFmr] = useState(0);
//   const [excessP,SETexcessP] = useState(0);
//   const [pcon,SETpcon] = useState(0);
//   const [rcon,SETrcon] = useState(0);
//   const [bcon,SETbcon] = useState(0);
//   const [conconp,SETconconp] = useState(0);
//   const [bookkg,SETbookkg] = useState(0);
//   const [reqkg,SETreqkg] = useState(0);
//   const [date, setDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Function to handle date selection
//   const handleDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShowDatePicker(Platform.OS === 'ios'); // Show date picker only on iOS
//     setDate(currentDate);
//   };

//    // Function to show the date picker
//    const showDatePickerModal = () => {
//     setShowDatePicker(true);
//   };



//   const refresh = () => {
//     SETsupervisor(0);
//     SETbuyer(0);
//     SETso(0);
//     SETstyle(0);
//     SETcolor(0);
//     SETfab(0);
//     SETitem(0);
//     SETbgsm(0);
//     SETrgsm(0);
//     SETbdia(0);
//     SETrdia(0);
//     SETBshrinkageL(0);
//     SETRshrinkageL(0);
//     SETShrinkageResult(0);
//     SETBshrinkageW(0);
//     SETRshrinkageW(0);
//     SETShrinkageResultW(0);
//     SETFlength(0);
//     SETFwidth(0);
//     SETFgsm(0);
//     SETFmr(0);
//     SETexcessP(0);
//     SETpcon(0);
//     SETrcon(0);
//     SETbcon(0);
//     SETconconp(0);
//     SETbookkg(0);
//     SETreqkg(0);
//   }
//   const save = () => {
//     const data={date,supervisor,buyer,so,style,color,fab,item,bgsm,rgsm,bdia,rdia,BshrinkageL,RshrinkageL,ShrinkageResult,
//     BshrinkageW,RshrinkageW,ShrinkageResultW,Flength,Fwidth,Fgsm,Fmr,excessP,rcon,bcon,conconp,bookkg,reqkg};
//     //addData(data)
//     setLoading(true)
//     refresh()
//   }
   
//   return (
//     <ScrollView>
//       <View style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
//           <View style={{flexDirection:"column",padding:0,marginTop:14,marginLeft:15}}>
//           <Text style={{padding:2}}>Date</Text>
//             <TouchableOpacity style={{fontSize: 20,flexDirection:"row"}} onPress={showDatePickerModal}>
//               <Text style={{marginTop:0,borderWidth:1,height:41,width:150,padding:5,borderRadius:5}}>{date.toDateString()}
//               <MaterialIcons name="date-range" size={20} color="black" />
//               </Text>
//             </TouchableOpacity>
//               {showDatePicker && (
//                <DateTimePicker
//                 value={date}
//                 mode="date"
//                 display="default"
//                 onChange={handleDateChange} 
//                />
//               )}
//           </View>
//           <View style={{flexDirection:"column",padding:0,margin:8,marginLeft:18}}>
//             <Text style={{padding:5}}>Spervisor name</Text>
//             <TextInput placeholder='name' style={{borderWidth:1,width:150,padding:5,borderRadius:5}} keyboardType="name-phone-pad" value={supervisor} onChangeText={SETsupervisor}></TextInput>
//           </View><View style={{flexDirection:"column",padding:0,margin:8,marginLeft:15}}>
//             <Text style={{padding:5}}>Buyer</Text>
//             <TextInput placeholder='Buyer' style={{borderWidth:1,width:150,padding:5,borderRadius:5}} keyboardType="name-phone-pad"
//             value={buyer} onChangeText={SETbuyer}></TextInput>
//           </View>
//           <View style={{flexDirection:"column",padding:0,margin:8}}>
//             <Text style={{padding:5}}>SO</Text>
//             <TextInput placeholder='SO' style={{borderWidth:1,width:150,padding:5,borderRadius:5}}
//             keyboardType="name-phone-pad" value={so} onChangeText={SETso}
//             ></TextInput>
//           </View>
//           <View style={{flexDirection:"column",padding:0,margin:8,marginLeft:15}}>
//             <Text style={{padding:5}}>Style</Text>
//             <TextInput placeholder='Style' style={{borderWidth:1,width:150,padding:5,borderRadius:5}}
//             keyboardType="name-phone-pad" value={style} onChangeText={SETstyle}
//             ></TextInput>
//           </View>
//           <View style={{flexDirection:"column",padding:0,margin:8}}>
//             <Text style={{padding:5}}>Color</Text>
//             <TextInput placeholder='Color' style={{borderWidth:1,width:150,padding:5,borderRadius:5}}
//             keyboardType="name-phone-pad" value={color} onChangeText={SETcolor}
//             ></TextInput>
//           </View>
//           <View style={{flexDirection:"column",padding:0,margin:8,marginLeft:15}}>
//             <Text style={{padding:5}}>Fabrication</Text>
//             <TextInput placeholder='Fabrication' style={{borderWidth:1,width:150,padding:5,borderRadius:5}}
//             keyboardType="name-phone-pad" value={fab} onChangeText={SETfab}
//             ></TextInput>
//           </View>
//           <View style={{flexDirection:"column",padding:0,margin:8}}>
//             <Text style={{padding:5}}>Item</Text>
//             <TextInput placeholder='Item' style={{borderWidth:1,width:150,padding:5,borderRadius:5}}
//             keyboardType="name-phone-pad" value={item} onChangeText={SETitem}
//             ></TextInput>
//           </View>
//           <View style={{flexDirection:"column",padding:0,margin:15,borderWidth:1,height:0,width:"90%",marginTop:15,borderColor:"darkgray"}}>

//             {/* <Text numberOfLines={1}>               
//           ______________________________________________________________
//           </Text> */}
//           </View>
//           <View style={{flexDirection:"column",paddingTop:0,margin:8,marginLeft:15}}>
//             <Text style={{padding:5}}>Booking GSM</Text>
//             <TextInput placeholder='GSM' style={{borderWidth:1,width:150,padding:5,borderRadius:5}}
//             keyboardType="number-pad" value={bgsm} onChangeText={SETbgsm}
//             ></TextInput>
//           </View>
//           <View style={{flexDirection:"column",paddingTop:0,margin:8}}>
//             <Text style={{padding:5}}>Recieve GSM</Text>
//             <TextInput placeholder='GSM' style={{borderWidth:1,width:150,padding:5,borderRadius:5}}
//             keyboardType="number-pad" value={rgsm} onChangeText={SETrgsm}
//             ></TextInput>
//           </View>
//           <View style={{flexDirection:"column",padding:0,margin:8,marginLeft:15}}>
//             <Text style={{padding:5}}>Booking Dia</Text>
//             <TextInput placeholder='Write in cm' style={{borderWidth:1,width:150,padding:5,borderRadius:5}}
//             keyboardType="number-pad" value={bdia} onChangeText={SETbdia}
//             ></TextInput>
//           </View>
//           <View style={{flexDirection:"column",padding:0,margin:8}}>
//             <Text style={{padding:5}}>Recieve Dia</Text>
//             <TextInput placeholder='Write in cm' style={{borderWidth:1,width:150,padding:5,borderRadius:5}}
//             keyboardType="number-pad" value={rdia} onChangeText={SETrdia}
//             ></TextInput>
//           </View>
//           <View style={{flexDirection:"column",padding:0,margin:15,borderWidth:1,height:0,width:"90%",marginTop:15,borderColor:"darkgray"}}>

//             {/* <Text numberOfLines={1}>               
//           ______________________________________________________________
//           </Text> */}
//           </View>
//           <View style={{flexDirection:"column",paddingTop:0,margin:8,marginLeft:15}}>
//             <Text style={{padding:5}}>Booking Shrinkage(L)</Text>
//             <TextInput placeholder='%' style={{borderWidth:1,width:150,padding:5,borderRadius:5}}
//             keyboardType="number-pad" value={BshrinkageL} onChangeText={SETBshrinkageL}
//             ></TextInput>
//           </View>
//           <View style={{flexDirection:"column",paddingTop:0,margin:8}}>
//             <Text style={{padding:5}}>Recieve Shrinkage(L)</Text>
//             <TextInput placeholder='%' style={{borderWidth:1,width:150,padding:5,borderRadius:5}}
//             keyboardType="number-pad" value={RshrinkageL} onChangeText={SETRshrinkageL}
//             ></TextInput>
//           </View>
          
//           <View style={{ padding:10,marginVertical:8,  width:"100%", justifyContent:"center", alignItems:"center"}}>
//             <TouchableOpacity onPress={() => SETShrinkageResult(BshrinkageL-RshrinkageL)} style={{width:"80%",backgroundColor:"#b6ccfe",padding:10,borderRadius:10}}>
//               <Text style={{alignSelf:"center",color:"#000"}}>Press</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={{flexDirection:"row",paddingTop:0,margin:8}}>
//             <Text style={{padding:5}}>Result of Length(%) = </Text>
//             <Text style={{borderWidth:2,width:180,padding:5, borderRadius:5}}>{ShrinkageResult}</Text>
            
//           </View>
//           <View style={{flexDirection:"column",paddingTop:0,margin:8,marginLeft:15}}>
//             <Text style={{padding:5}}>Booking Shrinkage(W)</Text>
//             <TextInput placeholder='%' style={{borderWidth:1,width:150,padding:5,borderRadius:5}}
//             keyboardType="number-pad" value={BshrinkageW} onChangeText={SETBshrinkageW}
//             ></TextInput>
//           </View>
//           <View style={{flexDirection:"column",paddingTop:0,margin:8}}>
//             <Text style={{padding:5}}>Recieve Shrinkage(W)</Text>
//             <TextInput placeholder='%' style={{borderWidth:1,width:150,padding:5,borderRadius:5}}
//             keyboardType="number-pad" value={RshrinkageW} onChangeText={SETRshrinkageW}
//             ></TextInput>
//           </View>
//           <View style={{ padding:10,marginVertical:8,  width:"100%", justifyContent:"center", alignItems:"center"}}>
//             <TouchableOpacity onPress={() => SETShrinkageResultW(BshrinkageW-RshrinkageW)} style={{width:"80%",backgroundColor:"#b6ccfe",padding:10,borderRadius:10}}>
//               <Text style={{alignSelf:"center",color:"#000"}}>Press</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={{flexDirection:"row",paddingTop:0,margin:8}}>
//             <Text style={{padding:5}}>Result of Width(%) = </Text>
//             <Text style={{borderWidth:0,width:180,padding:5, borderRadius:5}}>{ShrinkageResultW}</Text>
            
//           </View>
//           <View style={{flexDirection:"column",padding:0,margin:15,borderWidth:1,height:0,width:"90%",marginTop:15,borderColor:"darkgray"}}>

//             {/* <Text numberOfLines={1}>               
//           ______________________________________________________________
//           </Text> */}
//           </View>
//           <View style={{flexDirection:"column",padding:0,margin:8,marginLeft:15}}>
//             <Text style={{padding:5}}>Fabric Length</Text>
//             <TextInput placeholder='cm' style={{borderWidth:1,width:150,padding:5,borderRadius:5}}
//             keyboardType="number-pad" value={Flength} onChangeText={SETFlength}
//             ></TextInput>
//           </View>
//           <View style={{flexDirection:"column",padding:0,margin:8}}>
//             <Text style={{padding:5}}>Fabric Width</Text>
//             <TextInput placeholder='cm' style={{borderWidth:1,width:150,padding:5,borderRadius:5}}
//             keyboardType="number-pad" value={Fwidth} onChangeText={SETFwidth}
//             ></TextInput>
//           </View>
//           <View style={{flexDirection:"column",padding:0,margin:8,marginLeft:15}}>
//             <Text style={{padding:5}}>Fabric GSM</Text>
//             <TextInput placeholder='GSM' style={{borderWidth:1,width:150,padding:5,borderRadius:5}}
//             keyboardType="number-pad" value={Fgsm} onChangeText={SETFgsm}
//             ></TextInput>
//           </View>
//           <View style={{flexDirection:"column",padding:0,margin:8}}>
//             <Text style={{padding:5}}>Marker Ratio</Text>
//             <TextInput placeholder='pcs' style={{borderWidth:1,width:150,padding:5,borderRadius:5}}
//             keyboardType="number-pad" value={Fmr} onChangeText={SETFmr}
//             ></TextInput>
//           </View>
//           <View style={{flexDirection:"column",padding:0,margin:8,marginLeft:15}}>
//             <Text style={{padding:5}}>Excess Percentage</Text>
//             <TextInput placeholder='%' style={{borderWidth:1,width:150,padding:5,borderRadius:5}}
//             keyboardType="number-pad" value={excessP} onChangeText={SETexcessP}
//             ></TextInput>
//           </View>
//           <View style={{flexDirection:"column",padding:0,margin:8}}>
//             <Text style={{padding:5}}>Piping Consumtion</Text>
//             <TextInput placeholder='kg' style={{borderWidth:1,width:150,padding:5,borderRadius:5}}
//             keyboardType="number-pad" value={pcon} onChangeText={SETpcon}
//             ></TextInput>
//           </View>
//           <View style={{ padding:10,marginVertical:8,  width:"100%", justifyContent:"center", alignItems:"center"}}>
//             <TouchableOpacity onPress={() => SETrcon(((Flength*Fwidth*Fgsm*12)/(10000000*Fmr)+((Flength*Fwidth*Fgsm*12)/(10000000*Fmr))*(excessP/100))+(+pcon))} style={{width:"80%",backgroundColor:"#b6ccfe",padding:10,borderRadius:10}}>
//               <Text style={{alignSelf:"center",color:"#000"}}>Press</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={{flexDirection:"row",paddingTop:0,margin:8}}>
//             <Text style={{padding:5}}>Running Consumption = </Text>
//             <Text style={{borderWidth:0,width:150,padding:5, borderRadius:5}}>{rcon.toFixed(2)}</Text>
//           </View>
//           <View style={{flexDirection:"row",padding:0,margin:8,marginLeft:10}}>
//             <Text style={{padding:5}}>Booking Consumption =</Text>
//             <TextInput placeholder='kg' style={{borderWidth:2,width:150,padding:3,borderRadius:5}}
//             keyboardType="number-pad" value={bcon} onChangeText={SETbcon}
//             ></TextInput>
//           </View>
//           <View style={{ padding:10,marginVertical:8,  width:"100%", justifyContent:"center", alignItems:"center"}}>
//             <TouchableOpacity onPress={() => SETconconp(((rcon-bcon)/bcon)*100)} style={{width:"80%",backgroundColor:"#b6ccfe",padding:10,borderRadius:10}}>
//               <Text style={{alignSelf:"center",color:"#000"}}>Press</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={{flexDirection:"row",paddingTop:0,margin:8}}>
//             <Text style={{padding:5}}>Consumption Conparison(%) = </Text>
//             <Text style={{borderWidth:0,width:180,padding:5, borderRadius:5}}>{conconp.toFixed(2)}%</Text>           
//           </View>
//           <View style={{flexDirection:"row",padding:0,margin:8,marginLeft:10}}>
//             <Text style={{padding:5}}>Booking KG =</Text>
//             <TextInput placeholder='kg' style={{borderWidth:2,width:150,padding:3,borderRadius:5}}
//             keyboardType="number-pad" value={bookkg} onChangeText={SETbookkg}
//             ></TextInput>
//           </View>
//           <View style={{ padding:10,marginVertical:8,  width:"100%", justifyContent:"center", alignItems:"center"}}>
//             <TouchableOpacity onPress={() => SETreqkg((bookkg*conconp)/100)} style={{width:"80%",backgroundColor:"#b6ccfe",padding:10,borderRadius:10}}>
//               <Text style={{alignSelf:"center",color:"#000"}}>Press</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={{flexDirection:"row",paddingTop:0,margin:8}}>
//             <Text style={{padding:5}}>Required KG = </Text>
//             <Text style={{borderWidth:0,width:180,padding:5, borderRadius:5}}>{reqkg.toFixed(0)} kg</Text>           
//           </View>
//           <View style={{ padding:10,marginVertical:8, borderWidth:0, width:"100%",flexDirection:"row", justifyContent:'center',alignItems:'center'}}>
//           {!loading && <TouchableOpacity onPress={save} style={{width:"40%",backgroundColor:"#4ecdc4",padding:10,marginRight:50,borderRadius:20}}>
//               <Text style={{alignSelf:"center",color:"ghostwhite"}}>Save</Text>
//             </TouchableOpacity>}
//           {loading && <Text style={{width:"40%",backgroundColor:"#4ecdc4",padding:10,marginRight:50,borderRadius:20}}>Loading...</Text>} 
//             <TouchableOpacity onPress={refresh} style={{width:"40%",backgroundColor:"#b6ccfe",padding:10,borderRadius:20}}>
//               <Text style={{alignSelf:"center",color:"#000"}}>Refresh</Text>
//             </TouchableOpacity>
//           </View>
//           </View>
//     </ScrollView>
    
//   )
// }


// export default QualityDepartmentPage