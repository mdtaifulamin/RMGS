import { View,Text, Pressable, StyleSheet,TouchableOpacity,Dimensions } from "react-native";
import { useRef } from "react";
import * as Animateble from 'react-native-animatable';
import { GlobalStyles } from "./constants/styles";
const screen_width = Dimensions.get('screen').width
const screen_height = Dimensions.get('screen').height
export default function PrimaryButton({children,onPress}){
    const flashAnimRef= useRef();
    
    
    return(
       
       <Animateble.View ref={flashAnimRef}>

                <TouchableOpacity 
                    style={[styles.buttonInnerContainer,{backgroundColor:GlobalStyles.colors.primaryButtonColor}]}
                    onPress={()=>{flashAnimRef.current.pulse(800);onPress()}} 
                 >
                    <Text style={styles.buttonText}> {children}</Text>
                </TouchableOpacity>
        </Animateble.View>
                
        

    )
}

export  function SeconderyButton({children,onPress}){
    const flashAnimRef= useRef();
    
    
    return(
       
       <Animateble.View ref={flashAnimRef}>

                <TouchableOpacity 
                    style={[styles.SeconderyButtonbuttonInnerContainer,{backgroundColor:GlobalStyles.colors.primaryButtonColor}]}
                    onPress={()=>{flashAnimRef.current.pulse(800);onPress()}} 
                 >
                    <Text style={styles.buttonText}> {children}</Text>
                </TouchableOpacity>
        </Animateble.View>
                
        

    )
}


const styles= StyleSheet.create({
    
    buttonInnerContainer:{
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:4,
        elevation:5,
        shadowColor:'#000',
        marginHorizontal:5,
        width:screen_width*0.5,
        height:screen_height*0.07,
        borderRadius:10,
        justifyContent:'center'


    },
    SeconderyButtonbuttonInnerContainer:{
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:4,
        elevation:5,
        shadowColor:'#000',
        marginHorizontal:15,
        borderRadius:5,
        justifyContent:'center'


    },
    buttonText:{
        fontWeight:'900',
        textAlign:'center',
        color:GlobalStyles.colors.buttonTextColor,
        fontSize:20,
    }
})

