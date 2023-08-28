import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../../constants/styles";

export default function LostTimesSummery({lostTimes,periodName}){
    
    

    return(
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
        </View>
    )

}

const styles=StyleSheet.create({
    container:{
        
        backgroundColor:'white',
        borderRadius:6,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    period:{
        fontSize:12,
        color:GlobalStyles.colors.primary400
    },
    sum:{
        fontSize:16,
        fontWeight:'bold',
        color: GlobalStyles.colors.primary500,
    }
})