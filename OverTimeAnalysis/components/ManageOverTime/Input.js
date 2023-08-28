import { TextInput, View,Text, StyleSheet, ScrollView } from "react-native";
import { GlobalStyles } from "../../../constants/styles";

export default function Input({label,style,textInputConfig,invalid}) {

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

const styles = StyleSheet.create({
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
        backgroundColor:GlobalStyles.colors.backgroundColor,
        padding:11,
        borderRadius:18,
        fontSize:18,
        color:GlobalStyles.colors.textcolor,
        elevation:5,
        borderWidth:.4,
        borderColor:'white',
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
})


