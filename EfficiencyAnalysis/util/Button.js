
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

export default function ButtonM({children,onPress,mode,style}){
    return (
        <View style={style}>
            <Pressable onPress={onPress} style={({pressed})=>pressed && styles.pressed}>
                <View style={[styles.button,mode==='flat' && styles.flat]}>
                    <Text style={[styles.buttontext, mode==='flat' && styles.flatText]}> {children} </Text>
                </View>
            </Pressable>
        </View>
    )
}
const styles= StyleSheet.create({
    button:{
        borderRadius:15,
        padding:8,
        backgroundColor:GlobalStyles.colors.button1,
        elevation:10,
     },
    flat:{
        backgroundColor: GlobalStyles.colors.deleteButton
    },
    buttontext:{
        color:GlobalStyles.colors.buttonTextColor,
        textAlign:'center',
        flexWrap:'wrap'
    },
    flatText:{
        color: GlobalStyles.colors.buttonTextColor
    },
    pressed:{
        opacity:0.75,
        backgroundColor:GlobalStyles.colors.inputBox,
        borderRadius:15,
        elevation:-100,
    }

})